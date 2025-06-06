import React from 'react';
import { User, Trophy, Clock, Target, Settings, Star, Calendar, BarChart3, Headphones, LogOut } from 'lucide-react';
import BlurFade from '../components/ui/blur-fade';
import { MagicCard } from '../components/ui/magic-card';
import { ShimmerButton } from '../components/ui/shimmer-button';
import { useAuth } from '../contexts/AuthContext';

const Profile: React.FC = () => {
  const { user, signOut } = useAuth();

  const userStats = [
    { label: 'Lições Concluídas', value: '47', icon: <Trophy className="w-5 h-5" />, color: 'text-orange-600' },
    { label: 'Tempo Total', value: '32h', icon: <Clock className="w-5 h-5" />, color: 'text-blue-600' },
    { label: 'Sequência Atual', value: '12 dias', icon: <Target className="w-5 h-5" />, color: 'text-green-600' },
    { label: 'Pontos XP', value: '2,847', icon: <Star className="w-5 h-5" />, color: 'text-purple-600' },
  ];

  const weeklyProgress = [
    { day: 'Dom', minutes: 25, completed: true },
    { day: 'Seg', minutes: 35, completed: true },
    { day: 'Ter', minutes: 20, completed: true },
    { day: 'Qua', minutes: 45, completed: true },
    { day: 'Qui', minutes: 30, completed: true },
    { day: 'Sex', minutes: 0, completed: false },
    { day: 'Sáb', minutes: 0, completed: false },
  ];

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900">
      {/* Profile Header */}
      <BlurFade delay={0.1}>
        <div className="relative overflow-hidden bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-12 text-white">
          <div className="absolute inset-0 bg-black/10 backdrop-blur-sm"></div>
          <div className="relative z-10 text-center">
            <div className="mb-6">
              <div className="w-24 h-24 mx-auto bg-white/20 rounded-full flex items-center justify-center backdrop-blur-md border border-white/30">
                <User className="w-12 h-12 text-white" />
              </div>
            </div>
            
            <h1 className="text-2xl font-bold mb-2">
              {user?.email?.split('@')[0] || 'Usuário'}
            </h1>
            <p className="text-blue-100 mb-1">Estudante Intermediário</p>
            <p className="text-sm text-blue-200">{user?.email}</p>
            
            <div className="mt-6 flex items-center justify-center gap-2">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4].map((star) => (
                  <Star key={star} className="w-4 h-4 text-yellow-300 fill-current" />
                ))}
                <Star className="w-4 h-4 text-gray-300" />
              </div>
              <span className="text-sm text-blue-100 ml-2">Nível 4</span>
            </div>
          </div>
        </div>
      </BlurFade>

      {/* Statistics Grid */}
      <BlurFade delay={0.2}>
        <div className="px-6 py-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Suas Estatísticas
          </h2>
          
          <div className="grid grid-cols-2 gap-4">
            {userStats.map((stat, index) => (
              <BlurFade key={index} delay={0.3 + index * 0.1}>
                <MagicCard className="p-6 text-center h-full flex flex-col justify-center">
                  <div className={`${stat.color} mb-3 flex justify-center`}>
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300 leading-tight">
                    {stat.label}
                  </div>
                </MagicCard>
              </BlurFade>
            ))}
          </div>
        </div>
      </BlurFade>

      {/* Weekly Progress */}
      <BlurFade delay={0.6}>
        <div className="px-6 py-6">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="w-5 h-5 text-blue-600" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              Progresso Semanal
            </h3>
          </div>
          
          <MagicCard className="p-6">
            <div className="flex items-end justify-between gap-2 h-32">
              {weeklyProgress.map((day, index) => (
                <div key={index} className="flex flex-col items-center flex-1">
                  <div className="flex-1 flex items-end mb-2">
                    <div 
                      className={`w-8 rounded-t-lg transition-all duration-500 ${
                        day.completed 
                          ? 'bg-gradient-to-t from-blue-500 to-blue-400' 
                          : 'bg-gray-200 dark:bg-gray-700'
                      }`}
                      style={{ 
                        height: `${Math.max(day.minutes / 45 * 100, day.completed ? 20 : 10)}%` 
                      }}
                    ></div>
                  </div>
                  <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                    {day.day}
                  </span>
                  {day.minutes > 0 && (
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {day.minutes}min
                    </span>
                  )}
                </div>
              ))}
            </div>
            
            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-ios-lg">
              <div className="flex items-center gap-2 text-blue-600">
                <Calendar className="w-4 h-4" />
                <span className="text-sm font-medium">
                  Meta semanal: 5 de 7 dias completados
                </span>
              </div>
            </div>
          </MagicCard>
        </div>
      </BlurFade>

      {/* Achievement Badge */}
      <BlurFade delay={0.8}>
        <div className="px-6 py-6">
          <MagicCard className="p-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-ios-xl text-white">
                <Headphones className="w-8 h-8" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  Mestre da Escuta
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Você está se tornando um expert em listening!
                </p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-purple-600">85%</div>
                <div className="text-xs text-gray-500">completo</div>
              </div>
            </div>
          </MagicCard>
        </div>
      </BlurFade>

      {/* Action Buttons */}
      <BlurFade delay={1.0}>
        <div className="px-6 py-6 mb-20">
          <div className="space-y-4">
            <ShimmerButton
              background="linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)"
              className="w-full p-4 flex items-center justify-center gap-3"
              shimmerColor="#ffffff"
            >
              <Settings className="w-5 h-5" />
              <span className="font-medium">Configurações da Conta</span>
            </ShimmerButton>
            
            <ShimmerButton
              background="linear-gradient(135deg, #10b981 0%, #059669 100%)"
              className="w-full p-4 flex items-center justify-center gap-3"
              shimmerColor="#ffffff"
            >
              <Trophy className="w-5 h-5" />
              <span className="font-medium">Ver Todas as Conquistas</span>
            </ShimmerButton>

            <ShimmerButton
              onClick={handleLogout}
              background="linear-gradient(135deg, #ef4444 0%, #dc2626 100%)"
              className="w-full p-4 flex items-center justify-center gap-3"
              shimmerColor="#ffffff"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Sair da Conta</span>
            </ShimmerButton>
          </div>
        </div>
      </BlurFade>
    </div>
  );
};

export default Profile;
