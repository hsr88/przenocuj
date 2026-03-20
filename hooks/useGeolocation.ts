'use client';

import { useState, useCallback } from 'react';

interface GeolocationState {
  position: [number, number] | null;
  error: string | null;
  loading: boolean;
}

export function useGeolocation() {
  const [state, setState] = useState<GeolocationState>({
    position: null,
    error: null,
    loading: false,
  });

  const getPosition = useCallback(() => {
    if (!navigator.geolocation) {
      setState(prev => ({ ...prev, error: 'Geolokalizacja nie jest wspierana' }));
      return;
    }

    setState(prev => ({ ...prev, loading: true, error: null }));

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setState({
          position: [position.coords.latitude, position.coords.longitude],
          error: null,
          loading: false,
        });
      },
      (error) => {
        setState({
          position: null,
          error: 'Nie udało się pobrać lokalizacji',
          loading: false,
        });
      }
    );
  }, []);

  return {
    ...state,
    getPosition,
  };
}
