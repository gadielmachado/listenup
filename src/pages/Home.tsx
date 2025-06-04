import React from 'react';
import { Play, BookOpen, Trophy, Star, Zap, Headphones } from 'lucide-react';
import LessonCard from '../components/LessonCard';
import BlurFade from '../components/ui/blur-fade';
import { ShimmerButton } from '../components/ui/shimmer-button';

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

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900">
      {/* Hero Section */}
      <BlurFade delay={0.1}>
        <div className="relative overflow-hidden bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-12 text-white">
          <div className="absolute inset-0 bg-black/10 backdrop-blur-sm"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-white/20 rounded-ios-lg backdrop-blur-md">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">ListenUp!</h1>
                <p className="text-blue-100">Domine o inglês com IA</p>
              </div>
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
