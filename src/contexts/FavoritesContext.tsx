import React, { createContext, useContext, useState, useEffect } from 'react';

interface FavoritesContextType {
  favorites: number[];
  addToFavorites: (lessonId: number) => void;
  removeFromFavorites: (lessonId: number) => void;
  isFavorite: (lessonId: number) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<number[]>([]);

  // Carregar favoritos do localStorage na inicialização
  useEffect(() => {
    const savedFavorites = localStorage.getItem('listenup-favorites');
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites));
      } catch (error) {
        console.error('Erro ao carregar favoritos:', error);
      }
    }
  }, []);

  // Salvar favoritos no localStorage sempre que mudar
  useEffect(() => {
    localStorage.setItem('listenup-favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (lessonId: number) => {
    setFavorites(prev => {
      if (!prev.includes(lessonId)) {
        return [...prev, lessonId];
      }
      return prev;
    });
  };

  const removeFromFavorites = (lessonId: number) => {
    setFavorites(prev => prev.filter(id => id !== lessonId));
  };

  const isFavorite = (lessonId: number) => {
    return favorites.includes(lessonId);
  };

  const value = {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
  };

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}; 