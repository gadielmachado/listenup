import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Clock, CheckCircle, Star, Heart } from 'lucide-react';
import { MagicCard } from './ui/magic-card';
import { useFavorites } from '../contexts/FavoritesContext';

interface LessonCardProps {
  lesson: {
    id: number;
    title: string;
    description: string;
    duration: string;
    difficulty: string;
    completed?: boolean;
    progress: number;
    icon?: React.ReactNode;
    color?: string;
    videoId?: string;
  };
}

const LessonCard: React.FC<LessonCardProps> = ({ lesson }) => {
  const navigate = useNavigate();
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites();

  const handleStart = () => {
    navigate(`/lesson/${lesson.id}`);
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isFavorite(lesson.id)) {
      removeFromFavorites(lesson.id);
    } else {
      addToFavorites(lesson.id);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'iniciante':
        return 'text-green-600 bg-green-100';
      case 'intermediário':
        return 'text-orange-600 bg-orange-100';
      case 'avançado':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const isLessonFavorite = isFavorite(lesson.id);

  // Função para obter URL da thumbnail do YouTube
  const getYouTubeThumbnail = (videoId: string) => {
    return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  };

  // Fallback para thumbnail de qualidade média se a alta não carregar
  const handleThumbnailError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const img = e.target as HTMLImageElement;
    if (lesson.videoId && img.src.includes('maxresdefault')) {
      img.src = `https://img.youtube.com/vi/${lesson.videoId}/hqdefault.jpg`;
    }
  };

  return (
    <MagicCard 
      className="w-full overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
      gradientColor="#3b82f6"
      gradientSize={300}
      onClick={handleStart}
    >
      {/* Video Thumbnail */}
      <div className="relative aspect-video bg-gray-900 overflow-hidden">
        {lesson.videoId ? (
          <>
            {/* Thumbnail Real do YouTube */}
            <img
              src={getYouTubeThumbnail(lesson.videoId)}
              alt={lesson.title}
              className="absolute inset-0 w-full h-full object-cover"
              onError={handleThumbnailError}
            />
            {/* Overlay escuro para melhor legibilidade dos elementos */}
            <div className="absolute inset-0 bg-black/20"></div>
          </>
        ) : (
          <>
            {/* Fallback: Gradiente original caso não tenha videoId */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-700">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-600/20 to-indigo-700/20 backdrop-blur-sm">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%224%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
              </div>
            </div>
          </>
        )}
        
        {/* Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg transform transition-all duration-200 hover:scale-110 hover:bg-white">
            <Play className="w-7 h-7 text-gray-800 ml-1" />
          </div>
        </div>

        {/* Duration Badge */}
        <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/80 text-white text-xs font-medium rounded backdrop-blur-sm">
          {lesson.duration}
        </div>

        {/* Favorite Button */}
        <button
          onClick={handleToggleFavorite}
          className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-200 transform hover:scale-110 active:scale-95 backdrop-blur-sm ${
            isLessonFavorite
              ? 'bg-red-500/90 text-white hover:bg-red-600/90'
              : 'bg-white/20 text-white hover:bg-white/30'
          }`}
        >
          <Heart 
            className={`w-4 h-4 ${isLessonFavorite ? 'fill-current' : ''}`}
          />
        </button>

        {/* Completion Badge */}
        {lesson.completed && (
          <div className="absolute top-3 left-3 p-2 bg-green-500/90 rounded-full backdrop-blur-sm">
            <CheckCircle className="w-4 h-4 text-white fill-current" />
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-4 space-y-3">
        {/* Title */}
        <h3 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-2">
          {lesson.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
          {lesson.description}
        </p>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-300">Progresso</span>
            <span className="font-semibold text-gray-900 dark:text-white">
              {lesson.progress}%
            </span>
          </div>
          <div className="relative h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div 
              className={`absolute left-0 top-0 h-full bg-gradient-to-r ${lesson.color || 'from-blue-500 to-blue-600'} rounded-full transition-all duration-500 ease-out`}
              style={{ width: `${lesson.progress}%` }}
            />
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex items-center justify-between pt-2">
          {/* Left Side - Difficulty Badge */}
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(lesson.difficulty)}`}>
            {lesson.difficulty}
          </span>

          {/* Right Side - Action Button */}
          <button 
            onClick={(e) => {
              e.stopPropagation();
              handleStart();
            }}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-md"
          >
            <Play className="w-4 h-4" />
            <span className="text-sm font-medium">
              {lesson.completed ? 'Revisar' : lesson.progress > 0 ? 'Continuar' : 'Iniciar'}
            </span>
          </button>
        </div>

        {/* Achievement Section */}
        {lesson.completed && (
          <div className="flex items-center gap-2 pt-2 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-1">
              {[1, 2, 3].map((star) => (
                <Star 
                  key={star} 
                  className="w-4 h-4 text-yellow-400 fill-current" 
                />
              ))}
            </div>
            <span className="text-sm text-gray-600 dark:text-gray-300">
              Lição completada!
            </span>
          </div>
        )}
      </div>
    </MagicCard>
  );
};

export default LessonCard;
