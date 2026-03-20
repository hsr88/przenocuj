'use client';

import { useState, useEffect, useCallback } from 'react';
import { Place } from '@/types';
import { supabase, fetchPlaces, addPlaceToSupabase } from '@/lib/supabase';

export function useSupabase() {
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isConfigured, setIsConfigured] = useState(false);

  // Check if Supabase is configured
  useEffect(() => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    setIsConfigured(!!url && !!key && !url.includes('your-project'));
  }, []);

  // Load places from Supabase
  const loadPlaces = useCallback(async () => {
    if (!isConfigured) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const data = await fetchPlaces();
      setPlaces(data);
    } catch (err) {
      setError('Failed to load places');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [isConfigured]);

  // Initial load
  useEffect(() => {
    loadPlaces();
  }, [loadPlaces]);

  // Add place
  const addPlace = useCallback(async (place: Omit<Place, 'id'>) => {
    if (!isConfigured) return null;
    
    const data = await addPlaceToSupabase(place);
    if (data) {
      setPlaces(prev => [data, ...prev]);
    }
    return data;
  }, [isConfigured]);

  // Subscribe to realtime changes
  useEffect(() => {
    if (!isConfigured) return;

    const subscription = supabase
      .channel('places_changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'places' },
        (payload: { eventType: string; new: Place; old: { id: number } }) => {
          if (payload.eventType === 'INSERT') {
            setPlaces(prev => [payload.new, ...prev]);
          } else if (payload.eventType === 'DELETE') {
            setPlaces(prev => prev.filter(p => p.id !== payload.old.id));
          } else if (payload.eventType === 'UPDATE') {
            setPlaces(prev => prev.map(p => 
              p.id === payload.new.id ? payload.new : p
            ));
          }
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [isConfigured]);

  return {
    places,
    loading,
    error,
    isConfigured,
    addPlace,
    refresh: loadPlaces,
  };
}
