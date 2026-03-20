'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { Place } from '@/types';
import { fetchPlacesInBounds, fetchPlacesByCountry } from '@/lib/osm-api';

interface Bounds {
  south: number;
  west: number;
  north: number;
  east: number;
}

interface UseOSMPlacesOptions {
  enabled?: boolean;
  debounceMs?: number;
}

export function useOSMPlaces(options: UseOSMPlacesOptions = {}) {
  const { enabled = true, debounceMs = 1000 } = options;
  
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  
  const abortControllerRef = useRef<AbortController | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const loadedBoundsRef = useRef<Set<string>>(new Set());

  // Pobierz miejsca dla widocznego obszaru
  const loadPlacesInBounds = useCallback(async (bounds: Bounds) => {
    if (!enabled) return;
    
    // Sprawdź czy ten obszar już był pobierany
    const boundsKey = `${bounds.south.toFixed(2)},${bounds.west.toFixed(2)},${bounds.north.toFixed(2)},${bounds.east.toFixed(2)}`;
    if (loadedBoundsRef.current.has(boundsKey)) {
      return; // Już pobieraliśmy ten obszar
    }
    
    // Anuluj poprzednie zapytanie
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();
    
    // Debounce
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = setTimeout(async () => {
      setLoading(true);
      setError(null);
      
      try {
        const newPlaces = await fetchPlacesInBounds(bounds);
        
        if (newPlaces.length > 0) {
          setPlaces(prev => {
            // Unikaj duplikatów (po OSM ID)
            const existingIds = new Set(prev.map(p => p.osmId));
            const uniqueNew = newPlaces.filter(p => !existingIds.has(p.osmId));
            return [...prev, ...uniqueNew];
          });
          loadedBoundsRef.current.add(boundsKey);
        }
        
        setHasMore(newPlaces.length >= 1000); // Overpass zwraca max 1000
      } catch (err) {
        setError('Błąd pobierania danych z OSM');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }, debounceMs);
  }, [enabled, debounceMs]);

  // Pobierz miejsca dla kraju (przy starcie)
  const loadCountry = useCallback(async (country: string) => {
    if (!enabled) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const countryPlaces = await fetchPlacesByCountry(country);
      setPlaces(prev => {
        const existingIds = new Set(prev.map(p => p.osmId));
        const uniqueNew = countryPlaces.filter(p => !existingIds.has(p.osmId));
        return [...prev, ...uniqueNew];
      });
    } catch (err) {
      setError('Błąd pobierania danych kraju');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [enabled]);

  // Wyczyść dane (np. przy zmianie widoku)
  const clearPlaces = useCallback(() => {
    setPlaces([]);
    loadedBoundsRef.current.clear();
  }, []);

  // Cleanup
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return {
    places,
    loading,
    error,
    hasMore,
    loadPlacesInBounds,
    loadCountry,
    clearPlaces,
    totalLoaded: places.length,
  };
}
