/**
 * System opinii/reviews
 * OSM nie ma opinii, więc budujemy własny system:
 * 1. Własne opinie (Supabase) - crowdsourced
 * 2. Tagi OSM (rzadkie): stars=*, rating=* 
 * 3. Linki do zewnętrznych źródeł (TripAdvisor, Google)
 */

import { Place } from '@/types';
import { supabase } from './supabase';

export interface Review {
  id: number;
  placeId: number;
  rating: number; // 1-5
  text: string;
  author: string;
  createdAt: string;
  helpful: number;
}

// Pobierz opinie dla miejsca
export async function fetchReviews(placeId: number): Promise<Review[]> {
  try {
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .eq('place_id', placeId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (err) {
    console.error('Error fetching reviews:', err);
    return [];
  }
}

// Dodaj opinię
export async function addReview(
  placeId: number,
  rating: number,
  text: string,
  author: string
): Promise<Review | null> {
  try {
    const { data, error } = await supabase
      .from('reviews')
      .insert([{
        place_id: placeId,
        rating,
        text,
        author,
        helpful: 0,
      }])
      .select()
      .single();

    if (error) throw error;
    
    // Aktualizuj średnią ocenę miejsca
    await updatePlaceRating(placeId);
    
    return data;
  } catch (err) {
    console.error('Error adding review:', err);
    return null;
  }
}

// Aktualizuj średnią ocenę miejsca
async function updatePlaceRating(placeId: number) {
  try {
    const { data: reviews } = await supabase
      .from('reviews')
      .select('rating')
      .eq('place_id', placeId);

    if (reviews && reviews.length > 0) {
      const avg = reviews.reduce((sum: number, r: { rating: number }) => sum + r.rating, 0) / reviews.length;
      
      await supabase
        .from('places')
        .update({ 
          rating: Math.round(avg),
          reviews: reviews.length 
        })
        .eq('id', placeId);
    }
  } catch (err) {
    console.error('Error updating rating:', err);
  }
}

// Sprawdź czy OSM ma tagi rating/stars
export function extractOSMRating(tags: Record<string, string>): number | null {
  // OSM ma rzadko używane tagi:
  // stars=3 (hotele/guesthouse)
  // rating=4.5 (rzadkie)
  // camp_site:rating=*
  
  if (tags.stars) {
    return parseInt(tags.stars) || null;
  }
  if (tags.rating) {
    return parseFloat(tags.rating) || null;
  }
  if (tags['camp_site:rating']) {
    return parseInt(tags['camp_site:rating']) || null;
  }
  
  return null;
}

// Generuj linki do zewnętrznych opinii
export function getExternalReviewLinks(place: Place): { name: string; url: string; icon: string }[] {
  const links: { name: string; url: string; icon: string }[] = [];
  
  // Google Maps - szukaj po nazwie i lokalizacji
  const googleQuery = encodeURIComponent(`${place.name} ${place.lat} ${place.lng}`);
  links.push({
    name: 'Google',
    url: `https://www.google.com/maps/search/?api=1&query=${googleQuery}`,
    icon: 'google',
  });
  
  // TripAdvisor - campingi
  if (place.type === 'glamping' || place.type === 'van') {
    const taQuery = encodeURIComponent(place.name);
    links.push({
      name: 'TripAdvisor',
      url: `https://www.tripadvisor.com/Search?q=${taQuery}`,
      icon: 'tripadvisor',
    });
  }
  
  // Booking.com - dla glampingów
  if (place.type === 'glamping') {
    const bkQuery = encodeURIComponent(place.name);
    links.push({
      name: 'Booking',
      url: `https://www.booking.com/searchresults.html?ss=${bkQuery}`,
      icon: 'booking',
    });
  }
  
  // Park4Night - dla vanów
  if (place.type === 'van' || place.type === 'free') {
    links.push({
      name: 'Park4Night',
      url: `https://www.park4night.com/pl/search?lat=${place.lat}&lng=${place.lng}&radius=10`,
      icon: 'van',
    });
  }
  
  return links;
}

// Pobierz ogólną ocenę (nasza + OSM + fallback)
export function calculatePlaceRating(place: Place, reviews: Review[]): { rating: number; source: string; count: number } {
  // 1. Jeśli mamy własne opinie - używamy ich
  if (reviews.length > 0) {
    const avg = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
    return { rating: Math.round(avg), source: 'użytkowników', count: reviews.length };
  }
  
  // 2. Sprawdź OSM (rzadkie)
  if (place.osmId) {
    // W rzeczywistej aplikacji pobralibyśmy tags z OSM
    // Na razie zwracamy placeholder
  }
  
  // 3. Fallback - brak opinii
  return { rating: 0, source: 'brak', count: 0 };
}

// SQL do stworzenia tabeli reviews w Supabase:
/*
CREATE TABLE reviews (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  place_id BIGINT NOT NULL REFERENCES places(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  text TEXT,
  author TEXT NOT NULL,
  helpful INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Indeks dla szybszego pobierania
CREATE INDEX idx_reviews_place_id ON reviews(place_id);

-- Polityka RLS
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Reviews are viewable by everyone" ON reviews FOR SELECT USING (true);
CREATE POLICY "Authenticated users can add reviews" ON reviews FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Users can update own reviews" ON reviews FOR UPDATE TO authenticated USING (auth.uid()::text = author);
*/
