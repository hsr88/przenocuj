'use client';

import { useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';

export function useFavorites() {
  const [favorites, setFavorites] = useLocalStorage<number[]>('przenocuj_favorites', []);

  const toggleFavorite = useCallback((placeId: number) => {
    setFavorites((prev: number[]) => {
      if (prev.includes(placeId)) {
        return prev.filter((id: number) => id !== placeId);
      }
      return [...prev, placeId];
    });
  }, [setFavorites]);

  const isFavorite = useCallback((placeId: number) => {
    return favorites.includes(placeId);
  }, [favorites]);

  const removeFavorite = useCallback((placeId: number) => {
    setFavorites((prev: number[]) => prev.filter((id: number) => id !== placeId));
  }, [setFavorites]);

  return {
    favorites,
    toggleFavorite,
    isFavorite,
    removeFavorite,
  };
}
