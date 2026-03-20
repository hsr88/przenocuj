export type PlaceType = 'free' | 'zanocuj' | 'van' | 'glamping' | 'bike' | 'warning';

export interface Place {
  id: number;
  name: string;
  type: PlaceType;
  lat: number;
  lng: number;
  description: string;
  rating: number;
  reviews: number;
  features: string[];
  image?: string;
  regulation_link?: string;
  price?: string;
  isLegal: boolean;
  isFree: boolean;
}

export interface Filters {
  types: PlaceType[];
  legalOnly: boolean;
  dogFriendly: boolean;
  soloSafe: boolean;
  trueWild: boolean;
  maxDistance: number;
}

export interface TripIdea {
  id: string;
  name: string;
  duration: string;
  icon: string;
  description: string;
  tags: string[];
  location: [number, number];
  zoom: number;
  gradient: string;
}
