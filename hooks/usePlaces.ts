'use client';

import { useState, useMemo, useCallback, useEffect } from 'react';
import { Place, Filters } from '@/types';
import { allPlaces } from '@/lib/data';
import { supabase } from '@/lib/supabase';

export function usePlaces() {
  const [places, setPlaces] = useState<Place[]>(allPlaces || []);
  const [loading, setLoading] = useState(false);
  // Fetch places from Supabase on mount
  useEffect(() => {
    async function loadPlaces() {
      const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
      
      if (!url || !key || url.includes('your-project')) {
        console.log('Supabase not configured, using initial places');
        return;
      }

      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('places')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching places:', error);
        } else if (data && data.length > 0) {
          setPlaces(data);
        }
      } catch (err) {
        console.error('Failed to fetch places:', err);
      } finally {
        setLoading(false);
      }
    }

    loadPlaces();
  }, []);

  const [filters, setFilters] = useState<Filters>({
    types: ['free', 'zanocuj', 'van', 'glamping', 'bike'],
    legalOnly: false,
    dogFriendly: false,
    soloSafe: false,
    trueWild: false,
    maxDistance: 100,
  });

  const filteredPlaces = useMemo(() => {
    return places.filter(place => {
      if (!filters.types.includes(place.type)) return false;
      if (filters.legalOnly && !place.isLegal) return false;
      if (filters.dogFriendly && !place.features.includes('dog')) return false;
      if (filters.soloSafe && !place.features.includes('solo')) return false;
      if (filters.trueWild && (place.features.includes('water') || place.type === 'glamping')) return false;
      return true;
    });
  }, [places, filters]);

  const addPlace = useCallback(async (newPlace: Omit<Place, 'id'>) => {
    const place: Place = {
      ...newPlace,
      id: Date.now(),
    };
    
    // Add to local state immediately
    setPlaces(prev => [...prev, place]);
    
    // Try to add to Supabase
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    if (url && key && !url.includes('your-project')) {
      try {
        const { data, error } = await supabase
          .from('places')
          .insert([newPlace])
          .select()
          .single();
        
        if (error) {
          console.error('Error adding to Supabase:', error);
        } else if (data) {
          // Update with server-generated ID
          setPlaces(prev => prev.map(p => 
            p.id === place.id ? data : p
          ));
        }
      } catch (err) {
        console.error('Failed to add place:', err);
      }
    }
    
    return place;
  }, []);

  const updateFilters = useCallback((newFilters: Partial<Filters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters({
      types: ['free', 'zanocuj', 'van', 'glamping', 'bike'],
      legalOnly: false,
      dogFriendly: false,
      soloSafe: false,
      trueWild: false,
      maxDistance: 100,
    });
  }, []);

  const stats = useMemo(() => ({
    total: places.length,
    free: places.filter(p => p.isFree).length,
    van: places.filter(p => p.type === 'van').length,
    glamping: places.filter(p => p.type === 'glamping').length,
  }), [places]);

  return {
    places,
    filteredPlaces,
    filters,
    stats,
    loading,
    addPlace,
    updateFilters,
    resetFilters,
  };
}
