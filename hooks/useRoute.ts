'use client';

import { useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';

export function useRoute() {
  const [route, setRoute] = useLocalStorage<number[]>('przenocuj_route', []);

  const addToRoute = useCallback((placeId: number) => {
    setRoute((prev: number[]) => {
      if (prev.includes(placeId)) return prev;
      return [...prev, placeId];
    });
  }, [setRoute]);

  const removeFromRoute = useCallback((placeId: number) => {
    setRoute((prev: number[]) => prev.filter((id: number) => id !== placeId));
  }, [setRoute]);

  const clearRoute = useCallback(() => {
    setRoute([]);
  }, [setRoute]);

  const isInRoute = useCallback((placeId: number) => {
    return route.includes(placeId);
  }, [route]);

  const reorderRoute = useCallback((newOrder: number[]) => {
    setRoute(newOrder);
  }, [setRoute]);

  return {
    route,
    addToRoute,
    removeFromRoute,
    clearRoute,
    isInRoute,
    reorderRoute,
  };
}
