import React, { useState } from 'react';
import { Play, BookOpen, Trophy, Star, Zap, Headphones, Search, X } from 'lucide-react';
import LessonCard from '../components/LessonCard';
import BlurFade from '../components/ui/blur-fade';
import { ShimmerButton } from '../components/ui/shimmer-button';
import { MagicCard } from '../components/ui/magic-card';

// Mock de lição principal (foco em uma lição específica)
const mainLesson = {
  id: 1,
  title: "Ross and His Dad Talk About Fatherhood | Friends",
  description: "Aprenda inglês com diálogos autênticos da série Friends",
  duration: "15 min",
  difficulty: "Intermediário",
  completed: false,
  progress: 0,
  icon: <BookOpen className="w-6 h-6" />,
  color: "from-blue-500 to-blue-600",
  videoId: "SWBMp1kAScU" // ID do vídeo de Friends
};

// Mock de todas as lições disponíveis para pesquisa
const allLessons = [
  {
    id: 1,
    title: "Ross and His Dad Talk About Fatherhood | Friends",
    description: "Aprenda inglês com diálogos autênticos da série Friends",
    duration: "15 min",
    difficulty: "Intermediário",
    completed: false,
    progress: 0,
    icon: <BookOpen className="w-6 h-6" />,
    color: "from-blue-500 to-blue-600",
    videoId: "SWBMp1kAScU"
  },
  {
    id: 2,
    title: "Pronúncia Clara",
    description: "Melhore sua pronúncia com exercícios práticos",
    duration: "20 min",
    difficulty: "Intermediário",
    completed: false,
    progress: 60,
    icon: <Headphones className="w-6 h-6" />,
    color: "from-indigo-500 to-purple-600"
  },
  {
    id: 3,
    title: "Vocabulário de Negócios",
    description: "Termos e expressões para o ambiente profissional",
    duration: "25 min",
    difficulty: "Avançado",
    completed: true,
    progress: 100,
    icon: <Trophy className="w-6 h-6" />,
    color: "from-green-500 to-emerald-600"
  },
  {
    id: 4,
    title: "Compreensão Auditiva",
    description: "Pratique a escuta com áudios nativos",
    duration: "18 min",
    difficulty: "Intermediário",
    completed: false,
    progress: 30,
    icon: <Play className="w-6 h-6" />,
    color: "from-orange-500 to-red-500"
  },
  {
    id: 5,
    title: "Gramática Essencial",
    description: "Fundamentos da gramática inglesa",
    duration: "30 min",
    difficulty: "Iniciante",
    completed: false,
    progress: 45,
    icon: <BookOpen className="w-6 h-6" />,
    color: "from-cyan-500 to-blue-600"
  },
  {
    id: 6,
    title: "Expressões Idiomáticas",
    description: "Aprenda phrasal verbs e expressões comuns",
    duration: "22 min",
    difficulty: "Avançado",
    completed: false,
    progress: 80,
    icon: <Star className="w-6 h-6" />,
    color: "from-purple-500 to-pink-600"
  }
];

const Home: React.FC = () => {
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Filtrar lições baseado na pesquisa
  const filteredLessons = allLessons.filter(lesson =>
    lesson.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lesson.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lesson.difficulty.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchToggle = () => {
    setIsSearchActive(!isSearchActive);
    if (!isSearchActive) {
      setSearchQuery('');
    }
  };

  const handleSearchClose = () => {
    setIsSearchActive(false);
    setSearchQuery('');
  };

  if (isSearchActive) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900">
        {/* Search Header */}
        <div className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Pesquisar lições..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
                autoFocus
              />
            </div>
            <button
              onClick={handleSearchClose}
              className="p-3 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Search Results */}
        <div className="px-6 py-6">
          {searchQuery.length === 0 ? (
            <BlurFade delay={0.1}>
              <MagicCard className="p-8 text-center">
                <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Pesquisar Lições
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Digite o nome da lição, descrição ou nível de dificuldade para encontrar o que você procura
                </p>
              </MagicCard>
            </BlurFade>
          ) : filteredLessons.length > 0 ? (
            <>
              <div className="mb-4">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {filteredLessons.length} resultado{filteredLessons.length !== 1 ? 's' : ''} encontrado{filteredLessons.length !== 1 ? 's' : ''}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  para "{searchQuery}"
                </p>
              </div>
              <div className="space-y-4">
                {filteredLessons.map((lesson, index) => (
                  <BlurFade key={lesson.id} delay={index * 0.1}>
                    <LessonCard lesson={lesson} />
                  </BlurFade>
                ))}
              </div>
            </>
          ) : (
            <BlurFade delay={0.1}>
              <MagicCard className="p-8 text-center">
                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Nenhum resultado encontrado
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Não encontramos lições que correspondam a "{searchQuery}"
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Tente pesquisar por palavras-chave diferentes ou verifique a ortografia
                </p>
              </MagicCard>
            </BlurFade>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900">
      {/* Hero Section */}
      <BlurFade delay={0.1}>
        <div className="relative overflow-hidden bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-12 text-white">
          <div className="absolute inset-0 bg-black/10 backdrop-blur-sm"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-white/20 rounded-ios-lg backdrop-blur-md">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold">ListenUp!</h1>
                  <p className="text-blue-100">Domine o inglês com IA</p>
                </div>
              </div>
              
              {/* Search Icon */}
              <button
                onClick={handleSearchToggle}
                className="p-3 bg-white/20 rounded-full backdrop-blur-md border border-white/30 hover:bg-white/30 transition-all duration-200 transform hover:scale-105"
              >
                <Search className="w-6 h-6 text-white" />
              </button>
            </div>
            
            <div className="mt-8 p-6 bg-white/10 backdrop-blur-md rounded-ios-xl border border-white/20">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold">Progresso Diário</h3>
                  <p className="text-blue-100">Continue sua jornada</p>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-300 fill-current" />
                  <span className="font-bold">847</span>
                </div>
              </div>
              
              <div className="relative h-2 bg-white/20 rounded-full overflow-hidden">
                <div className="absolute left-0 top-0 h-full w-3/4 bg-gradient-to-r from-yellow-300 to-orange-300 rounded-full"></div>
              </div>
              <p className="text-sm text-blue-100 mt-2">75% da meta diária concluída</p>
            </div>
          </div>
        </div>
      </BlurFade>

      {/* Quick Actions */}
      <BlurFade delay={0.2}>
        <div className="px-6 py-6">
          <div className="grid grid-cols-2 gap-4">
            <ShimmerButton
              background="linear-gradient(135deg, #007AFF 0%, #5AC8FA 100%)"
              className="p-4 h-auto flex-col text-center"
              shimmerColor="#ffffff"
            >
              <Play className="w-6 h-6 mb-2" />
              <span className="text-sm font-medium">Continuar Lição</span>
            </ShimmerButton>
            
            <ShimmerButton
              background="linear-gradient(135deg, #34C759 0%, #30D158 100%)"
              className="p-4 h-auto flex-col text-center"
              shimmerColor="#ffffff"
            >
              <Trophy className="w-6 h-6 mb-2" />
              <span className="text-sm font-medium">Desafio Diário</span>
            </ShimmerButton>
          </div>
        </div>
      </BlurFade>

      {/* Lessons Section */}
      <div className="px-6 pb-6">
        <BlurFade delay={0.3}>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Sua Lição
            </h2>
          </div>
        </BlurFade>

        <div className="space-y-4">
          <BlurFade delay={0.4}>
            <LessonCard lesson={mainLesson} />
          </BlurFade>
        </div>
      </div>

      {/* Stats Section */}
      <BlurFade delay={0.8}>
        <div className="px-6 py-6 bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Estatísticas da Semana
          </h3>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 bg-white/60 dark:bg-gray-700/60 rounded-ios-lg backdrop-blur-sm">
              <div className="text-2xl font-bold text-blue-600">12</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Lições</div>
            </div>
            
            <div className="text-center p-4 bg-white/60 dark:bg-gray-700/60 rounded-ios-lg backdrop-blur-sm">
              <div className="text-2xl font-bold text-green-600">4h 30m</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Tempo</div>
            </div>
            
            <div className="text-center p-4 bg-white/60 dark:bg-gray-700/60 rounded-ios-lg backdrop-blur-sm">
              <div className="text-2xl font-bold text-orange-600">847</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Pontos</div>
            </div>
          </div>
        </div>
      </BlurFade>
    </div>
  );
};

export default Home;
