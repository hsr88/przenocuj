import { createClient } from '@supabase/supabase-js';
import { Place } from '@/types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Fetch places from Supabase
export async function fetchPlaces(): Promise<Place[]> {
  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Supabase not configured');
    return [];
  }

  const { data, error } = await supabase
    .from('places')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching places:', error);
    return [];
  }

  return data || [];
}

// Add place to Supabase
export async function addPlaceToSupabase(place: Omit<Place, 'id'>) {
  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Supabase not configured');
    return null;
  }

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
}
