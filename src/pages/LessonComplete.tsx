import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Trophy, 
  Target, 
  Clock, 
  RotateCcw, 
  Home,
  ArrowRight,
  Star,
  CheckCircle,
  XCircle,
  Award,
  TrendingUp
} from 'lucide-react';
import BlurFade from '../components/ui/blur-fade';
import { MagicCard } from '../components/ui/magic-card';
import { ShimmerButton } from '../components/ui/shimmer-button';

const LessonComplete = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock completion data
  const completionData = {
    lessonTitle: "Ross and His Dad Talk About Fatherhood | Friends",
    totalTracks: 7,
    correctAnswers: 5,
    accuracy: 71,
    timeSpent: "12m 35s",
    newWordsLearned: 8,
    pointsEarned: 85
  };

  const accuracy = (completionData.correctAnswers / completionData.totalTracks) * 100;

  const getAccuracyMessage = (acc: number) => {
    if (acc >= 90) return { 
      title: 'Excelente! 🎉', 
      message: 'Você dominou esta lição!', 
      color: 'from-green-500 to-emerald-600',
      bgColor: 'from-green-50 to-emerald-50',
      textColor: 'text-green-800'
    };
    if (acc >= 70) return { 
      title: 'Bom trabalho! 👏', 
      message: 'Você está no caminho certo!', 
      color: 'from-blue-500 to-indigo-600',
      bgColor: 'from-blue-50 to-indigo-50',
      textColor: 'text-blue-800'
    };
    return { 
      title: 'Continue praticando! 💪', 
      message: 'A prática leva à perfeição!', 
      color: 'from-orange-500 to-red-500',
      bgColor: 'from-orange-50 to-red-50',
      textColor: 'text-orange-800'
    };
  };

  const result = getAccuracyMessage(accuracy);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900">
      
      {/* Celebration Header */}
      <BlurFade delay={0.1}>
        <div className={`relative overflow-hidden bg-gradient-to-r ${result.color} px-6 py-12 text-white`}>
          <div className="absolute inset-0 bg-black/10 backdrop-blur-sm"></div>
          <div className="relative z-10 text-center">
            <div className="mb-6">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-white/20 rounded-full backdrop-blur-md border border-white/30 mb-6">
                <Trophy className="w-12 h-12 text-white" />
              </div>
            </div>
            
            <h1 className="text-3xl font-bold mb-2">Lição Concluída!</h1>
            <p className="text-white/90 text-lg mb-4">
              {completionData.lessonTitle}
            </p>
            
            <div className={`inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r ${result.bgColor} rounded-full border border-white/20 backdrop-blur-md`}>
              <Award className={`w-5 h-5 ${result.textColor}`} />
              <span className={`font-semibold ${result.textColor}`}>
                {result.title}
              </span>
            </div>
          </div>
        </div>
      </BlurFade>

      <div className="px-6 py-6 space-y-6">
        
        {/* Results Summary */}
        <BlurFade delay={0.2}>
          <MagicCard className="p-6">
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-3 mb-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    Resumo dos Resultados
                  </h3>
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {result.message}
              </p>
            </div>

            {/* Accuracy Circle */}
            <div className="text-center mb-8">
              <div className="relative inline-flex items-center justify-center mb-4">
                <div className="w-32 h-32">
                  <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="transparent"
                      className="text-gray-200"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="transparent"
                      strokeDasharray={`${accuracy * 2.51327} 251.327`}
                      className={accuracy >= 70 ? 'text-blue-500' : 'text-orange-500'}
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gray-900 dark:text-white">
                      {Math.round(accuracy)}%
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      Precisão
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {completionData.correctAnswers} de {completionData.totalTracks} segmentos corretos
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
              <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border border-blue-200/50 dark:border-blue-700/50">
                <Clock className="h-6 w-6 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
                <div className="font-bold text-lg text-gray-900 dark:text-white">{completionData.timeSpent}</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Tempo gasto</div>
              </div>

              <div className="text-center p-4 bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 rounded-xl border border-emerald-200/50 dark:border-emerald-700/50">
                <Star className="h-6 w-6 text-emerald-600 dark:text-emerald-400 mx-auto mb-2" />
                <div className="font-bold text-lg text-gray-900 dark:text-white">{completionData.pointsEarned}</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Pontos ganhos</div>
              </div>
            </div>
          </MagicCard>
        </BlurFade>

        {/* Detailed Breakdown */}
        <BlurFade delay={0.3}>
          <MagicCard className="p-6">
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-3 mb-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Target className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    Detalhes por Segmento
                  </h3>
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Seu desempenho em cada parte
              </p>
            </div>

            <div className="space-y-3 max-w-md mx-auto">
              {Array.from({ length: completionData.totalTracks }, (_, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200/50 dark:border-gray-700/50">
                  <span className="font-medium text-gray-700 dark:text-gray-300">Segmento {i + 1}</span>
                  <div className="flex items-center gap-2">
                    {i < completionData.correctAnswers ? (
                      <>
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-sm font-medium rounded-full">
                          Correto
                        </span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-5 h-5 text-red-500" />
                        <span className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 text-sm font-medium rounded-full">
                          Incorreto
                        </span>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </MagicCard>
        </BlurFade>

        {/* Action Buttons */}
        <BlurFade delay={0.4}>
          <div className="space-y-4 max-w-md mx-auto">
            <ShimmerButton
              onClick={() => navigate('/')}
              background="linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)"
              className="w-full p-4 flex items-center justify-center gap-3"
              shimmerColor="#ffffff"
            >
              <Home className="w-5 h-5" />
              <span className="font-medium">Voltar ao Início</span>
            </ShimmerButton>
            
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => navigate(`/lesson/${id}`)}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-gray-700 dark:text-gray-300 hover:text-blue-700 dark:hover:text-blue-300 rounded-xl transition-all duration-200 font-medium"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Repetir</span>
              </button>

              <button
                onClick={() => navigate('/my-lessons')}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 hover:border-purple-400 dark:hover:border-purple-500 hover:bg-purple-50 dark:hover:bg-purple-900/20 text-gray-700 dark:text-gray-300 hover:text-purple-700 dark:hover:text-purple-300 rounded-xl transition-all duration-200 font-medium"
              >
                <ArrowRight className="w-4 h-4" />
                <span>Minhas Lições</span>
              </button>
            </div>
          </div>
        </BlurFade>
      </div>
    </div>
  );
};

export default LessonComplete;
