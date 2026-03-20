import { createClient } from '@supabase/supabase-js';
import { Place } from '@/types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Dummy client for when env vars are missing
const dummyClient = {
  from: () => ({
    select: () => ({
      order: () => Promise.resolve({ data: [], error: null }),
    }),
    insert: () => ({
      select: () => ({
        single: () => Promise.resolve({ data: null, error: null }),
      }),
    }),
  }),
  channel: () => ({
    on: () => ({ subscribe: () => ({ unsubscribe: () => {} }) }),
  }),
} as any;

export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : dummyClient;

// Fetch places from Supabase
export async function fetchPlaces(): Promise<Place[]> {
  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Supabase not configured');
    return [];
  }

  try {
    const { data, error } = await supabase
      .from('places')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching places:', error);
      return [];
    }

    return data || [];
  } catch (err) {
    console.error('Error fetching places:', err);
    return [];
  }
}

// Add place to Supabase
export async function addPlaceToSupabase(place: Omit<Place, 'id'>) {
  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Supabase not configured');
    return null;
  }

  try {
    const { data, error } = await supabase
      .from('places')
      .insert([place])
      .select()
      .single();

    if (error) {
      console.error('Error adding place:', error);
      return null;
    }

    return data;
  } catch (err) {
    console.error('Error adding place:', err);
    return null;
  }
}
