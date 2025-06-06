import React from 'react';
import { Heart, BookOpen, Trophy, Star, Zap, Headphones, Play } from 'lucide-react';
import LessonCard from '../components/LessonCard';
import BlurFade from '../components/ui/blur-fade';
import { MagicCard } from '../components/ui/magic-card';
import { useFavorites } from '../contexts/FavoritesContext';

// Mock de todas as lições disponíveis
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
    videoId: "SWBMp1kAScU" // ID do vídeo de Friends
  }
];

const MyLessons: React.FC = () => {
  const { favorites } = useFavorites();

  // Filtrar apenas as lições que estão nos favoritos
  const favoriteLessons = allLessons.filter(lesson => favorites.includes(lesson.id));

  const totalFavorites = favoriteLessons.length;
  const completedFavorites = favoriteLessons.filter(lesson => lesson.completed).length;
  const averageProgress = totalFavorites > 0 
    ? Math.round(favoriteLessons.reduce((sum, lesson) => sum + lesson.progress, 0) / totalFavorites)
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900">
      {/* Header */}
      <BlurFade delay={0.1}>
        <div className="relative overflow-hidden bg-gradient-to-r from-red-500 to-pink-600 px-6 py-12 text-white">
          <div className="absolute inset-0 bg-black/10 backdrop-blur-sm"></div>
          <div className="relative z-10 text-center">
            <div className="mb-6">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-2xl backdrop-blur-md border border-white/30 mb-6">
                <Heart className="w-10 h-10 text-white fill-current" />
              </div>
            </div>
            
            <h1 className="text-3xl font-bold mb-2">Minhas Lições</h1>
            <p className="text-pink-100">
              Suas lições favoritas em um só lugar
            </p>
            
            <div className="mt-6 grid grid-cols-3 gap-4">
              <div className="p-4 bg-white/10 backdrop-blur-md rounded-ios-xl border border-white/20">
                <div className="text-2xl font-bold">{totalFavorites}</div>
                <div className="text-sm text-pink-100">Favoritas</div>
              </div>
              <div className="p-4 bg-white/10 backdrop-blur-md rounded-ios-xl border border-white/20">
                <div className="text-2xl font-bold">{completedFavorites}</div>
                <div className="text-sm text-pink-100">Concluídas</div>
              </div>
              <div className="p-4 bg-white/10 backdrop-blur-md rounded-ios-xl border border-white/20">
                <div className="text-2xl font-bold">{averageProgress}%</div>
                <div className="text-sm text-pink-100">Progresso</div>
              </div>
            </div>
          </div>
        </div>
      </BlurFade>

      <div className="px-6 py-6">
        {totalFavorites > 0 ? (
          <>
            {/* Progress Overview */}
            <BlurFade delay={0.2}>
              <MagicCard className="p-6 mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <Heart className="w-5 h-5 text-red-600 fill-current" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                      Resumo dos Favoritos
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Acompanhe seu progresso nas lições favoritas
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-300">Progresso Geral</span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {averageProgress}%
                    </span>
                  </div>
                  <div className="relative h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className="absolute left-0 top-0 h-full bg-gradient-to-r from-red-500 to-pink-500 rounded-full transition-all duration-500 ease-out"
                      style={{ width: `${averageProgress}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{completedFavorites} de {totalFavorites} lições concluídas</span>
                    <span>{totalFavorites - completedFavorites} restantes</span>
                  </div>
                </div>
              </MagicCard>
            </BlurFade>

            {/* Favorite Lessons Grid */}
            <BlurFade delay={0.3}>
              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Suas Lições Favoritas
                </h2>
                <div className="space-y-4">
                  {favoriteLessons.map((lesson, index) => (
                    <BlurFade key={lesson.id} delay={0.4 + index * 0.1}>
                      <LessonCard lesson={lesson} />
                    </BlurFade>
                  ))}
                </div>
              </div>
            </BlurFade>
          </>
        ) : (
          /* Empty State */
          <BlurFade delay={0.2}>
            <MagicCard className="p-12 text-center">
              <div className="mb-6">
                <div className="w-24 h-24 mx-auto bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
                  <Heart className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  Nenhuma lição favorita ainda
                </h3>
                <p className="text-gray-600 dark:text-gray-300 max-w-md mx-auto">
                  Explore as lições disponíveis e toque no ícone de coração para adicionar suas favoritas aqui.
                </p>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-ios-xl">
                  <div className="flex items-center justify-center gap-3 text-blue-600 dark:text-blue-400">
                    <Zap className="w-5 h-5" />
                    <span className="font-medium">Dica: Use o coração para favoritar lições!</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-ios-lg text-center">
                    <BookOpen className="w-6 h-6 mx-auto mb-2 text-blue-500" />
                    <div className="text-sm font-medium text-gray-700 dark:text-gray-300">Explorar</div>
                    <div className="text-xs text-gray-500">Lições</div>
                  </div>
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-ios-lg text-center">
                    <Star className="w-6 h-6 mx-auto mb-2 text-yellow-500" />
                    <div className="text-sm font-medium text-gray-700 dark:text-gray-300">Favoritar</div>
                    <div className="text-xs text-gray-500">& Salvar</div>
                  </div>
                </div>
              </div>
            </MagicCard>
          </BlurFade>
        )}
      </div>
    </div>
  );
};

export default MyLessons;
