import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Check, 
  X, 
  ArrowLeft,
  ArrowRight,
  Volume2,
  Headphones,
  Mic,
  Eye,
  EyeOff,
  Video
} from 'lucide-react';
import BlurFade from '../components/ui/blur-fade';
import { MagicCard } from '../components/ui/magic-card';
import { ShimmerButton } from '../components/ui/shimmer-button';

// Declare YouTube API types
declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

const Lesson: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const playerRef = useRef<any>(null);
  const playerContainerRef = useRef<HTMLDivElement>(null);
  
  const [currentTrack, setCurrentTrack] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [hasChecked, setHasChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showingFeedback, setShowingFeedback] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Estados para melhor controle
  const [currentInterval, setCurrentInterval] = useState<NodeJS.Timeout | null>(null);
  const [isBuffering, setIsBuffering] = useState(false);
  const [isSeeking, setIsSeeking] = useState(false);
  const [pauseTimeoutId, setPauseTimeoutId] = useState<NodeJS.Timeout | null>(null);
  
  // NOVO: Ref para armazenar os dados do segmento atual em reprodução
  const currentPlayingSegmentRef = useRef<typeof lessonData.tracks[0] | null>(null);
  
  // NOVO: Estado para controlar se há um segmento sendo reproduzido
  const [isPlayingSegment, setIsPlayingSegment] = useState(false);

  // Mock lesson data com segmentos de vídeo
  const lessonData = {
    id: Number(id),
    title: "Ross and His Dad Talk About Fatherhood | Friends",
    description: "Aprenda inglês com diálogos autênticos da série Friends",
    videoId: "SWBMp1kAScU", // ID do vídeo do YouTube
    tracks: [
      {
        id: 1,
        startTime: 1,
        endTime: 6,
        correctText: "I'll tell you one thing. I wouldn't mind having a piece of this sun-dried tomato business.",
        translation: "Vou te dizer uma coisa. Eu não me importaria de ter uma parte desse negócio de tomate seco ao sol.",
        difficulty: "medium"
      },
      {
        id: 2,
        startTime: 5,
        endTime: 14,
        correctText: "Five years ago, if somebody had said to me, \"Here's a tomato that looks like a prune,\" I'd have said, \"Get out of my office.\"",
        translation: "Cinco anos atrás, se alguém tivesse me dito: \"Aqui está um tomate que parece uma ameixa seca\", eu teria dito: \"Saia do meu escritório.\"",
        difficulty: "hard"
      },
      {
        id: 3,
        startTime: 13,
        endTime: 19,
        correctText: "Dad, before I was born, did you freak out at all?",
        translation: "Pai, antes de eu nascer, você ficou nervoso de alguma forma?",
        difficulty: "medium"
      },
      {
        id: 4,
        startTime: 20,
        endTime: 21,
        correctText: "I'm not freaking out.",
        translation: "Eu não estou surtando.",
        difficulty: "easy"
      },
      {
        id: 5,
        startTime: 21,
        endTime: 24,
        correctText: "I'm just saying if someone had come to me with the idea that—",
        translation: "Só estou dizendo que, se alguém tivesse vindo até mim com essa ideia—",
        difficulty: "medium"
      },
      {
        id: 6,
        startTime: 24,
        endTime: 35,
        correctText: "Dad, Dad, Dad. I'm talking about the whole, uh, baby thing. Did you, uh, ever get this sort of panicky, \"Oh, my God. I'm gonna be a father,\" kind of a thing?",
        translation: "Pai, pai, pai. Eu estou falando sobre toda essa coisa de, ahn, bebê. Você já sentiu esse tipo de pânico, tipo: \"Ai, meu Deus. Eu vou ser pai\", esse tipo de coisa?",
        difficulty: "hard"
      },
      {
        id: 7,
        startTime: 35,
        endTime: 37,
        correctText: "No.",
        translation: "Não.",
        difficulty: "easy"
      }
    ]
  };

  const currentTrackData = lessonData.tracks[currentTrack];
  const progress = ((currentTrack + 1) / lessonData.tracks.length) * 100;

  // Carrega a API do YouTube
  useEffect(() => {
    const loadYouTubeAPI = () => {
      if (window.YT) {
        initializePlayer();
        return;
      }

      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

      window.onYouTubeIframeAPIReady = initializePlayer;
    };

    const initializePlayer = () => {
      if (playerContainerRef.current && !playerRef.current) {
        playerRef.current = new window.YT.Player(playerContainerRef.current, {
          height: '315',
          width: '100%',
          videoId: lessonData.videoId,
          playerVars: {
            controls: 0,        // Remove controles do YouTube
            disablekb: 1,       // Desabilita teclado
            modestbranding: 1,  // Remove logo YouTube
            rel: 0,             // Remove vídeos relacionados
            showinfo: 0,        // Remove informações
            fs: 0,              // Remove fullscreen
            playsinline: 1      // Para mobile
          },
          events: {
            onReady: onPlayerReady,
            onStateChange: onPlayerStateChange
          }
        });
      }
    };

    loadYouTubeAPI();
  }, []);

  const onPlayerReady = () => {
    setIsVideoReady(true);
  };

  const onPlayerStateChange = (event: any) => {
    if (event.data === window.YT.PlayerState.PLAYING) {
      setIsPlaying(true);
      setIsBuffering(false);
      
    } else if (event.data === window.YT.PlayerState.PAUSED ||
               event.data === window.YT.PlayerState.ENDED ||
               event.data === window.YT.PlayerState.CUED) {
      setIsPlaying(false);
      setIsBuffering(false);
      setIsPlayingSegment(false);
      currentPlayingSegmentRef.current = null;
      clearCurrentInterval(); // Limpa se ainda usar interval para algo
      clearCurrentTimeout(); // Limpa o timeout de pausa
      
    } else if (event.data === window.YT.PlayerState.BUFFERING) {
      setIsBuffering(true);
      // Pausa temporariamente os timeouts durante buffering para evitar timing incorreto
      clearCurrentTimeout();
    }
  };

  // Função melhorada para reproduzir segmento
  const playVideoSegment = async () => {
    if (!playerRef.current || !isVideoReady || isSeeking) return; // Evita chamadas concorrentes

    setIsSeeking(true); // Bloqueia novas chamadas
    clearCurrentInterval(); // Limpa intervalo anterior
    clearCurrentTimeout(); // Limpa timeout anterior
    
    // Define o segmento atual antes de qualquer operação
    const segmentToPlay = currentTrackData;
    currentPlayingSegmentRef.current = segmentToPlay;
    setIsPlayingSegment(true);

    try {
      playerRef.current.pauseVideo(); // Garante que está pausado antes de buscar
      // Um pequeno delay pode ajudar antes do seekTo
      await new Promise(resolve => setTimeout(resolve, 150));

      console.log(`Playing segment ${segmentToPlay.id}: ${segmentToPlay.startTime}s - ${segmentToPlay.endTime}s`);
      playerRef.current.seekTo(segmentToPlay.startTime, true);

      // Aguarda a confirmação do seek
      await waitForSeek(segmentToPlay.startTime);

      // Só reproduz APÓS confirmar o seek
      console.log("Seek confirmed, playing video...");
      playerRef.current.playVideo();
      
      // Aguarda um pouco antes de iniciar o timeout para pausar no endTime
      // Usa os dados do segmento definido no início da função
      setTimeout(() => {
        if (currentPlayingSegmentRef.current?.id === segmentToPlay.id) {
          startPauseTimeout(segmentToPlay);
        } else {
          console.log("Segment changed during setup, skipping timeout setup");
        }
      }, 400); // Aumentei para 400ms para maior estabilidade

    } catch (error) {
      console.error("Error playing video segment:", error);
      setIsPlayingSegment(false);
      currentPlayingSegmentRef.current = null;
    } finally {
      setIsSeeking(false); // Libera o bloqueio
    }
  };

  // Função melhorada para replay
  const replayVideoSegment = async () => {
    if (!playerRef.current || !isVideoReady || isSeeking) return;
    
    setIsSeeking(true);
    clearCurrentInterval();
    clearCurrentTimeout();
    
    // Define o segmento atual antes de qualquer operação
    const segmentToPlay = currentTrackData;
    currentPlayingSegmentRef.current = segmentToPlay;
    setIsPlayingSegment(true);
    
    try {
      playerRef.current.pauseVideo();
      await new Promise(resolve => setTimeout(resolve, 150));
      
      console.log(`Replaying segment ${segmentToPlay.id}: ${segmentToPlay.startTime}s - ${segmentToPlay.endTime}s`);
      playerRef.current.seekTo(segmentToPlay.startTime, true);
      await waitForSeek(segmentToPlay.startTime);
      
      console.log("Seek confirmed, playing video...");
      playerRef.current.playVideo();
      
      // Aguarda um pouco antes de iniciar o timeout para pausar no endTime
      setTimeout(() => {
        if (currentPlayingSegmentRef.current?.id === segmentToPlay.id) {
          startPauseTimeout(segmentToPlay);
        } else {
          console.log("Segment changed during replay setup, skipping timeout setup");
        }
      }, 400); // Aumentei para 400ms para maior estabilidade
      
    } catch (error) {
      console.error("Error replaying segment:", error);
      setIsPlayingSegment(false);
      currentPlayingSegmentRef.current = null;
    } finally {
      setIsSeeking(false);
    }
  };

  const checkAnswer = () => {
    const correct = userInput.toLowerCase().trim() === currentTrackData.correctText.toLowerCase();
    setIsCorrect(correct);
    setHasChecked(true);
    setShowingFeedback(true);
  };

  const showCorrectAnswer = () => {
    setShowAnswer(true);
  };

  const hideAnswer = () => {
    setShowAnswer(false);
  };

  const tryAgain = () => {
    setHasChecked(false);
    setIsCorrect(null);
    setShowingFeedback(false);
    setShowAnswer(false);
    setUserInput('');
  };

  // Função melhorada para próximo segmento
  const nextTrack = async () => {
    if (currentTrack < lessonData.tracks.length - 1) {
      clearCurrentInterval();
      clearCurrentTimeout();

      const nextTrackIndex = currentTrack + 1;
      const nextTrackData = lessonData.tracks[nextTrackIndex]; // Obtém os dados do PRÓXIMO track ANTES de atualizar o estado

      // Atualiza o estado (ainda assíncrono)
      setCurrentTrack(nextTrackIndex);
      setUserInput('');
      setHasChecked(false);
      setIsCorrect(null);
      setShowingFeedback(false);
      setShowAnswer(false);

      // Inicia próximo segmento
      if (playerRef.current && isVideoReady && !isSeeking) {
        setIsSeeking(true);
        
        // Define o segmento que será reproduzido
        currentPlayingSegmentRef.current = nextTrackData;
        setIsPlayingSegment(true);
        
        try {
          playerRef.current.pauseVideo();
          await new Promise(resolve => setTimeout(resolve, 150));

          console.log(`Next track - Playing segment ${nextTrackData.id}: ${nextTrackData.startTime}s - ${nextTrackData.endTime}s`);
          playerRef.current.seekTo(nextTrackData.startTime, true);
          await waitForSeek(nextTrackData.startTime);

          console.log("Next track seek confirmed, playing video...");
          playerRef.current.playVideo();

          // Aguarda um pouco antes de iniciar o timeout para pausar no endTime
          setTimeout(() => {
            if (currentPlayingSegmentRef.current?.id === nextTrackData.id) {
              startPauseTimeout(nextTrackData);
            } else {
              console.log("Segment changed during next track setup, skipping timeout setup");
            }
          }, 400); // 400ms de delay para estabilizar

        } catch (error) {
          console.error('Erro ao iniciar próximo segmento:', error);
          setIsPlayingSegment(false);
          currentPlayingSegmentRef.current = null;
        } finally {
          setIsSeeking(false);
        }
      }
    } else {
      navigate(`/lesson/${id}/complete`);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'from-green-500 to-emerald-600';
      case 'medium': return 'from-orange-500 to-amber-600';
      case 'hard': return 'from-red-500 to-rose-600';
      default: return 'from-gray-500 to-slate-600';
    }
  };

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'Fácil';
      case 'medium': return 'Médio';
      case 'hard': return 'Difícil';
      default: return difficulty;
    }
  };

  // Função para limpar intervals anteriores
  const clearCurrentInterval = () => {
    if (currentInterval) {
      clearInterval(currentInterval);
      setCurrentInterval(null);
    }
  };

  // Função para limpar timeout anterior
  const clearCurrentTimeout = () => {
    if (pauseTimeoutId) {
      clearTimeout(pauseTimeoutId);
      setPauseTimeoutId(null);
    }
  };

  // Função para aguardar o seekTo
  const waitForSeek = (targetTime: number, timeout = 5000): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (!playerRef.current) {
        reject(new Error("Player not available"));
        return;
      }

      const startTime = Date.now();
      const checkInterval = setInterval(() => {
        if (Date.now() - startTime > timeout) {
          clearInterval(checkInterval);
          reject(new Error(`Seek to ${targetTime} timed out after ${timeout}ms`));
          return;
        }

        try {
          const currentTime = playerRef.current.getCurrentTime();
          // Tolerância de 0.5 segundos para precisão
          if (Math.abs(currentTime - targetTime) < 0.5) {
            clearInterval(checkInterval);
            console.log(`Seek successful: reached ${currentTime}s (target: ${targetTime}s)`);
            resolve();
          }
        } catch (error) {
          clearInterval(checkInterval);
          console.error("Error checking current time during seek:", error);
          reject(error);
        }
      }, 100); // Verifica a cada 100ms
    });
  };

  // Função para iniciar timeout de pausa preciso (MODIFICADA)
  const startPauseTimeout = (trackData: typeof lessonData.tracks[0]) => { // Aceita trackData como argumento
    clearCurrentTimeout(); // Garante limpeza de timeouts anteriores

    if (!playerRef.current || !trackData) return; // Verifica se trackData foi passado

    try {
      // Função auxiliar para verificar e configurar o timeout
      const setupTimeout = (attempt = 1, maxAttempts = 5) => {
        // Verifica se ainda é o segmento correto sendo reproduzido
        if (currentPlayingSegmentRef.current?.id !== trackData.id) {
          console.log(`Timeout canceled - segment changed (expected: ${trackData.id}, current: ${currentPlayingSegmentRef.current?.id})`);
          return;
        }

        const currentTime = playerRef.current.getCurrentTime();
        
        // Verifica se o currentTime está dentro do range esperado do segmento
        const timeFromStart = currentTime - trackData.startTime;
        const segmentDuration = trackData.endTime - trackData.startTime;
        
        // Se o tempo atual não está no range esperado e ainda há tentativas
        if ((timeFromStart < -0.5 || timeFromStart > segmentDuration + 0.5) && attempt < maxAttempts) {
          console.log(`Current time ${currentTime.toFixed(1)}s not in expected range for segment ${trackData.id} (${trackData.startTime}s-${trackData.endTime}s), retrying... (attempt ${attempt})`);
          setTimeout(() => setupTimeout(attempt + 1, maxAttempts), 150);
          return;
        }

        // Calcula a duração restante usando o endTime do trackData passado
        const remainingDuration = (trackData.endTime - currentTime) * 1000;

        console.log(`Setting pause timeout for segment ${trackData.id} - currentTime: ${currentTime.toFixed(1)}s, endTime: ${trackData.endTime}s, duration: ${remainingDuration.toFixed(0)}ms`);

        if (remainingDuration > 200) { // Aumentei de 100 para 200ms
          const timeoutId = setTimeout(() => {
            // Verifica novamente se ainda é o segmento correto
            if (currentPlayingSegmentRef.current?.id === trackData.id && 
                playerRef.current && 
                playerRef.current.getPlayerState() === window.YT.PlayerState.PLAYING) {
              console.log(`Pausing video at endTime: ${trackData.endTime}s for segment ${trackData.id}`);
              playerRef.current.pauseVideo();
              setIsPlaying(false);
              setIsPlayingSegment(false);
              currentPlayingSegmentRef.current = null;
            } else {
              console.log(`Timeout executed but segment changed or not playing (segment: ${trackData.id})`);
            }
            setPauseTimeoutId(null); // Limpa o ID após execução
          }, remainingDuration - 150); // Buffer de 150ms para compensar latência

          setPauseTimeoutId(timeoutId);
        } else if (remainingDuration > 0) {
          console.log(`Segment ${trackData.id} duration very short (${remainingDuration.toFixed(0)}ms), scheduling immediate pause.`);
          const timeoutId = setTimeout(() => {
            if (currentPlayingSegmentRef.current?.id === trackData.id && 
                playerRef.current && 
                playerRef.current.getPlayerState() === window.YT.PlayerState.PLAYING) {
              playerRef.current.pauseVideo();
              setIsPlaying(false);
              setIsPlayingSegment(false);
              currentPlayingSegmentRef.current = null;
            }
            setPauseTimeoutId(null);
          }, Math.max(remainingDuration - 50, 0));
          setPauseTimeoutId(timeoutId);
        } else {
          console.warn(`Segment ${trackData.id} already ended (${remainingDuration.toFixed(0)}ms), pausing immediately.`);
          if (currentPlayingSegmentRef.current?.id === trackData.id && 
              playerRef.current.getPlayerState() === window.YT.PlayerState.PLAYING) {
            playerRef.current.pauseVideo();
            setIsPlaying(false);
            setIsPlayingSegment(false);
            currentPlayingSegmentRef.current = null;
          }
        }
      };

      // Inicia a configuração do timeout
      setupTimeout();

    } catch (error) {
      console.error("Error setting pause timeout:", error);
    }
  };

  // Cleanup quando componente desmonta
  useEffect(() => {
    return () => {
      clearCurrentInterval();
      clearCurrentTimeout();
      setIsPlayingSegment(false);
      currentPlayingSegmentRef.current = null;
    };
  }, []);

  // Cleanup quando muda de track
  useEffect(() => {
    clearCurrentInterval();
    clearCurrentTimeout();
    // NÃO limpa isPlayingSegment aqui pois nextTrack já gerencia isso
  }, [currentTrack]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900">
      
      {/* Header Simples - Apenas botão voltar */}
      <BlurFade delay={0.1}>
        <div className="relative bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm px-6 py-4 border-b border-gray-200/50 dark:border-gray-700/50">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm font-medium">Voltar</span>
          </button>
        </div>
      </BlurFade>

      {/* Video Player - Movido para o topo */}
      <div className="px-6 py-4">
        <BlurFade delay={0.2}>
          <MagicCard className="p-6 mb-6">
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 rounded-full text-red-700 text-sm font-medium mb-4">
                <Video className="w-4 h-4" />
                <span>Player de Vídeo</span>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Assista o segmento do vídeo e digite o que você entendeu
              </p>
            </div>

            {/* YouTube Video Visível */}
            <div className="relative aspect-video mb-6 rounded-xl overflow-hidden shadow-lg bg-black">
              <div ref={playerContainerRef} className="w-full h-full"></div>
              
              {/* Overlay de status quando necessário */}
              {!isVideoReady && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/80 text-white">
                  <div className="flex items-center gap-2">
                    <Video className="w-5 h-5 animate-pulse" />
                    <span>Carregando vídeo...</span>
                  </div>
                </div>
              )}
            </div>
            
            {/* Control Buttons */}
            <div className="flex justify-center items-center gap-4 mb-8">
              <button
                onClick={replayVideoSegment}
                disabled={!isVideoReady || isSeeking}
                className="w-12 h-12 flex items-center justify-center bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-full transition-all duration-200 transform hover:scale-105 active:scale-95"
              >
                <RotateCcw className="w-5 h-5 text-gray-700" />
              </button>
              
              <button
                onClick={playVideoSegment}
                disabled={!isVideoReady || isSeeking || isPlaying}
                className="w-14 h-14 flex items-center justify-center bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-full transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg text-white"
              >
                <Play className="w-6 h-6 ml-1" />
              </button>
            </div>

            {/* Input Section */}
            <div className="space-y-4">
              <div className="relative">
                <Mic className="absolute left-3 top-4 text-gray-400 w-5 h-5" />
                <textarea
                  placeholder="Digite o que você ouviu..."
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  disabled={hasChecked && isCorrect}
                  rows={2}
                  className={`w-full pl-11 pr-4 py-4 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:border-blue-500 focus:outline-none transition-all duration-200 text-center text-lg resize-none min-h-[80px] ${
                    hasChecked && isCorrect ? 'opacity-50' : ''
                  } ${showAnswer ? 'bg-yellow-50 border-yellow-300' : ''}`}
                  style={{
                    height: 'auto',
                    minHeight: '80px',
                    maxHeight: '200px'
                  }}
                  onInput={(e) => {
                    const target = e.target as HTMLTextAreaElement;
                    target.style.height = 'auto';
                    target.style.height = Math.min(target.scrollHeight, 200) + 'px';
                  }}
                />
              </div>

              {!hasChecked ? (
                <div className="space-y-3">
                  {/* Botão principal - Verificar Resposta */}
                  <ShimmerButton
                    onClick={checkAnswer}
                    disabled={!userInput.trim() || showAnswer}
                    background="linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)"
                    className="w-full p-4 flex items-center justify-center gap-3 disabled:opacity-50"
                    shimmerColor="#ffffff"
                  >
                    <Check className="w-5 h-5" />
                    <span className="font-medium">Verificar Resposta</span>
                  </ShimmerButton>
                  
                  {/* Botão secundário - Mostrar/Ocultar */}
                  {!showAnswer ? (
                    <button
                      onClick={showCorrectAnswer}
                      className="w-full py-3 px-4 bg-transparent border-2 border-gray-300 hover:border-amber-400 hover:bg-amber-50 text-gray-600 hover:text-amber-700 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 text-sm font-medium"
                    >
                      <Eye className="w-4 h-4" />
                      <span>Mostrar resposta</span>
                    </button>
                  ) : (
                    <button
                      onClick={hideAnswer}
                      className="w-full py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-700 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 text-sm font-medium"
                    >
                      <EyeOff className="w-4 h-4" />
                      <span>Ocultar resposta</span>
                    </button>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Feedback */}
                  <div className={`p-6 rounded-xl text-center ${
                    isCorrect 
                      ? 'bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200' 
                      : 'bg-gradient-to-r from-red-50 to-rose-50 border border-red-200'
                  }`}>
                    <div className="flex items-center justify-center mb-3">
                      {isCorrect ? (
                        <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                          <Check className="w-6 h-6 text-white" />
                        </div>
                      ) : (
                        <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
                          <X className="w-6 h-6 text-white" />
                        </div>
                      )}
                    </div>
                    <h3 className={`text-xl font-bold mb-2 ${
                      isCorrect ? 'text-green-800' : 'text-red-800'
                    }`}>
                      {isCorrect ? 'Excelente!' : 'Quase lá!'}
                    </h3>
                    <p className={`text-sm ${
                      isCorrect ? 'text-green-700' : 'text-red-700'
                    }`}>
                      {isCorrect 
                        ? 'Você entendeu perfeitamente o vídeo!' 
                        : 'Não foi dessa vez. Continue praticando!'
                      }
                    </p>
                  </div>

                  {/* Text Comparison */}
                  <MagicCard className="p-6 bg-gray-50/50">
                    <h4 className="font-semibold text-gray-800 mb-4 text-center">Comparação de Respostas</h4>
                    <div className="space-y-4">
                      <div className="p-4 bg-white rounded-lg border">
                        <div className="text-sm font-medium text-gray-600 mb-1">Sua resposta:</div>
                        <div className={`font-medium ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                          {userInput || '(vazio)'}
                        </div>
                      </div>
                      <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                        <div className="text-sm font-medium text-gray-600 mb-1">Resposta correta:</div>
                        <div className="font-medium text-green-700 mb-2">{currentTrackData.correctText}</div>
                        <div className="text-sm text-green-600">
                          <span className="font-medium">Tradução:</span> {currentTrackData.translation}
                        </div>
                      </div>
                    </div>
                  </MagicCard>

                  {/* Botões de ação após feedback */}
                  <div className="space-y-3">
                    {/* Botão principal - Próximo/Finalizar */}
                    <ShimmerButton
                      onClick={nextTrack}
                      background={isCorrect 
                        ? "linear-gradient(135deg, #10b981 0%, #059669 100%)" 
                        : "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)"
                      }
                      className="w-full p-4 flex items-center justify-center gap-3"
                      shimmerColor="#ffffff"
                    >
                      {currentTrack < lessonData.tracks.length - 1 ? (
                        <>
                          <span className="font-medium">Próximo Segmento</span>
                          <ArrowRight className="w-5 h-5" />
                        </>
                      ) : (
                        <>
                          <span className="font-medium">Finalizar Lição</span>
                          <Check className="w-5 h-5" />
                        </>
                      )}
                    </ShimmerButton>
                    
                    {/* Botão secundário - Tentar Novamente (apenas se errou) */}
                    {!isCorrect && (
                      <button
                        onClick={tryAgain}
                        className="w-full py-3 px-4 bg-transparent border-2 border-blue-300 hover:border-blue-400 hover:bg-blue-50 text-blue-600 hover:text-blue-700 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 text-sm font-medium"
                      >
                        <RotateCcw className="w-4 h-4" />
                        <span>Tentar Novamente</span>
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* Aviso de resposta revelada */}
              {showAnswer && !hasChecked && (
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl">
                  <div className="flex items-center gap-2 text-amber-800 mb-3">
                    <Eye className="w-4 h-4" />
                    <span className="font-medium text-sm">Resposta revelada</span>
                  </div>
                  <div className="space-y-3">
                    <div className="p-3 bg-white rounded-lg border border-amber-300">
                      <p className="text-gray-800 font-medium text-center">
                        {currentTrackData.correctText}
                      </p>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg border border-blue-300">
                      <p className="text-blue-800 text-sm text-center">
                        <span className="font-medium">Tradução:</span> {currentTrackData.translation}
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-amber-700 mt-2 text-center">
                    Digite a resposta em inglês acima para praticar
                  </p>
                </div>
              )}
            </div>
          </MagicCard>
        </BlurFade>
      </div>
    </div>
  );
};

export default Lesson;
