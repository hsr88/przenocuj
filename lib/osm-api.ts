/**
 * OpenStreetMap API Service
 * Pobiera campingi, miejsca dla kamperów i punkty biwakowe z OSM
 * Na podstawie OpenCampingMap - używa Overpass API
 */

import { Place } from '@/types';

const OVERPASS_URL = 'https://overpass-api.de/api/interpreter';

// Tagi OSM używane przez OpenCampingMap
const OSM_TAGS = {
  camp_site: 'tourism=camp_site',
  caravan_site: 'tourism=caravan_site',
  picnic_site: 'tourism=picnic_site',
  wilderness_hut: 'tourism=wilderness_hut',
  alpine_hut: 'tourism=alpine_hut',
  shelter: 'amenity=shelter',
};

// Zapytanie Overpass dla campingów w danym obszarze
export function buildCampingQuery(
  south: number,
  west: number,
  north: number,
  east: number,
  limit: number = 1000
): string {
  return `
[out:json][timeout:60];
(
  // Campingi
  node["tourism"="camp_site"](${south},${west},${north},${east});
  way["tourism"="camp_site"](${south},${west},${north},${east});
  relation["tourism"="camp_site"](${south},${west},${north},${east});
  
  // Miejsca dla kamperów/caravanów
  node["tourism"="caravan_site"](${south},${west},${north},${east});
  way["tourism"="caravan_site"](${south},${west},${north},${east});
  relation["tourism"="caravan_site"](${south},${west},${north},${east});
  
  // Schroniska górskie
  node["tourism"="alpine_hut"](${south},${west},${north},${east});
  way["tourism"="alpine_hut"](${south},${west},${north},${east});
  relation["tourism"="alpine_hut"](${south},${west},${north},${east});
  
  // Schroniska dzikie
  node["tourism"="wilderness_hut"](${south},${west},${north},${east});
  way["tourism"="wilderness_hut"](${south},${west},${north},${east});
  relation["tourism"="wilderness_hut"](${south},${west},${north},${east});
  
  // Miejsca piknikowe z biwakiem
  node["tourism"="picnic_site"]["fireplace"="yes"](${south},${west},${north},${east});
  way["tourism"="picnic_site"]["fireplace"="yes"](${south},${west},${north},${east});
  
  // Parkingi dla kamperów
  node["amenity"="parking"]["caravans"="yes"](${south},${west},${north},${east});
  way["amenity"="parking"]["caravans"="yes"](${south},${west},${north},${east});
  relation["amenity"="parking"]["caravans"="yes"](${south},${west},${north},${east});
  
  // Miejsca biwakowe
  node["amenity"="shelter"](${south},${west},${north},${east});
  way["amenity"="shelter"](${south},${west},${north},${east});
);
out center tags ${limit};
`;
}

// Zapytanie dla konkretnego kraju (predefiniowane bbox)
export function buildCountryQuery(country: string): string | null {
  const bboxes: Record<string, [number, number, number, number]> = {
    poland: [49.0, 14.0, 55.0, 24.0],
    germany: [47.0, 5.5, 55.5, 15.5],
    france: [41.0, -5.0, 51.5, 10.0],
    spain: [35.0, -10.0, 44.0, 4.0],
    italy: [36.5, 6.5, 47.5, 19.0],
    norway: [57.0, 4.0, 71.5, 32.0],
    sweden: [55.0, 10.5, 69.5, 24.5],
    finland: [59.0, 19.0, 70.5, 32.0],
    austria: [46.0, 9.0, 49.5, 17.5],
    switzerland: [45.5, 5.5, 48.0, 11.0],
    croatia: [42.0, 13.0, 47.0, 20.0],
    greece: [34.0, 19.0, 42.0, 30.0],
    europe: [36.0, -10.0, 71.0, 32.0],
  };
  
  const bbox = bboxes[country.toLowerCase()];
  if (!bbox) return null;
  
  return buildCampingQuery(bbox[0], bbox[1], bbox[2], bbox[3], 2000);
}

// Pobieranie danych z Overpass API
export async function fetchOSMPlaces(
  south: number,
  west: number,
  north: number,
  east: number
): Promise<Place[]> {
  const query = buildCampingQuery(south, west, north, east);
  
  try {
    const response = await fetch(OVERPASS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `data=${encodeURIComponent(query)}`,
    });
    
    if (!response.ok) {
      throw new Error(`Overpass API error: ${response.status}`);
    }
    
    const data = await response.json();
    return convertOSMToPlaces(data.elements);
  } catch (error) {
    console.error('Error fetching OSM data:', error);
    return [];
  }
}

// Konwersja danych OSM na format Place
function convertOSMToPlaces(elements: any[]): Place[] {
  const places: Place[] = [];
  let idCounter = 100000;
  
  for (const element of elements) {
    const tags = element.tags || {};
    
    // Pobierz współrzędne
    let lat: number, lng: number;
    if (element.type === 'node') {
      lat = element.lat;
      lng = element.lon;
    } else if (element.center) {
      lat = element.center.lat;
      lng = element.center.lon;
    } else {
      continue;
    }
    
    // Określ typ miejsca
    let type: Place['type'] = 'free';
    
    if (tags.tourism === 'caravan_site' || tags.caravans === 'yes') {
      type = 'van';
    } else if (tags.tourism === 'camp_site') {
      if (tags.camp_site === 'glamping' || tags.glamping === 'yes') {
        type = 'glamping';
      } else if (tags.backcountry === 'yes' || tags.bicycle === 'yes') {
        type = 'bike';
      } else {
        type = 'free';
      }
    } else if (tags.tourism === 'alpine_hut' || tags.tourism === 'wilderness_hut') {
      type = 'free';
    } else if (tags.bicycle === 'yes' || tags.mtb === 'yes') {
      type = 'bike';
    }
    
    // Sprawdź czy to płatne (komercyjne campingi)
    const isCommercial = tags.fee === 'yes' || 
                        tags.payment || 
                        tags['camp_site:type'] === 'commercial' ||
                        tags.operator ||
                        tags.website?.includes('booking');
    
    if (isCommercial && type === 'free') {
      type = 'van'; // Komercyjne campingi jako van-friendly
    }
    
    // Zbuduj opis
    let description = '';
    if (tags.description) {
      description = tags.description;
    } else {
      const parts: string[] = [];
      if (tags.tourism === 'camp_site') parts.push('Camping');
      if (tags.tourism === 'caravan_site') parts.push('Miejsce dla kamperów');
      if (tags.tourism === 'alpine_hut') parts.push('Schronisko górskie');
      if (tags.tourism === 'wilderness_hut') parts.push('Schronisko dzikie');
      if (tags.backcountry === 'yes') parts.push('backcountry');
      description = parts.join(', ') || 'Miejsce noclegowe z OpenStreetMap';
    }
    
    // Dodaj informacje o udogodnieniach do opisu
    const amenities: string[] = [];
    if (tags.toilets === 'yes') amenities.push('🚽');
    if (tags.shower === 'yes') amenities.push('🚿');
    if (tags.drinking_water === 'yes') amenities.push('💧');
    if (tags.power_supply === 'yes') amenities.push('🔌');
    if (tags.internet_access === 'yes' || tags.wifi === 'yes') amenities.push('📶');
    if (tags.fireplace === 'yes' || tags.openfire === 'yes') amenities.push('🔥');
    if (tags.shop === 'yes') amenities.push('🏪');
    if (tags.restaurant === 'yes') amenities.push('🍽️');
    
    if (amenities.length > 0) {
      description += ` | ${amenities.join(' ')}`;
    }
    
    // Określ cechy
    const features: string[] = [];
    if (tags.dogs === 'yes' || tags.pets === 'yes') features.push('dog');
    if (tags.drinking_water === 'yes') features.push('water');
    if (tags.toilets === 'yes') features.push('wc');
    if (tags.fireplace === 'yes' || tags.openfire === 'yes') features.push('fire');
    if (tags.nudism === 'yes') features.push('solo'); // Nudist = solo-friendly
    if (tags.access !== 'private' && tags.access !== 'no') features.push('legal');
    
    // Określ cenę
    let price: string | undefined;
    if (tags.fee === 'yes' && tags.charge) {
      price = tags.charge;
    } else if (tags.fee === 'yes') {
      price = 'Płatne';
    }
    
    // Nazwa
    const name = tags.name || 
                tags['name:pl'] || 
                tags['name:en'] || 
                `${tags.tourism === 'camp_site' ? 'Camping' : 'Miejsce'} #${idCounter - 99999}`;
    
    // Zbuduj obiekt Place
    const place: Place = {
      id: idCounter++,
      name: name,
      type: type,
      lat: lat,
      lng: lng,
      description: description,
      rating: 0,
      reviews: 0,
      features: features,
      price: price,
      isLegal: tags.access !== 'private' && tags.access !== 'no',
      isFree: tags.fee === 'no' || !tags.fee,
      osmId: element.id,
      osmType: element.type,
    };
    
    places.push(place);
  }
  
  return places;
}

// Pobierz campingi dla widocznego obszaru mapy (bbox z Leaflet)
export async function fetchPlacesInBounds(
  bounds: { south: number; west: number; north: number; east: number }
): Promise<Place[]> {
  // Ogranicz rozmiar zapytania (max ~100km x 100km dla wydajności)
  const latDiff = bounds.north - bounds.south;
  const lngDiff = bounds.east - bounds.west;
  
  if (latDiff > 2 || lngDiff > 2) {
    console.warn('Obszar za duży, pobieram tylko część danych');
    return [];
  }
  
  return fetchOSMPlaces(bounds.south, bounds.west, bounds.north, bounds.east);
}

// Pobierz campingi dla konkretnego kraju
export async function fetchPlacesByCountry(country: string): Promise<Place[]> {
  const query = buildCountryQuery(country);
  if (!query) {
    throw new Error(`Nieznany kraj: ${country}`);
  }
  
  try {
    const response = await fetch(OVERPASS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `data=${encodeURIComponent(query)}`,
    });
    
    if (!response.ok) {
      throw new Error(`Overpass API error: ${response.status}`);
    }
    
    const data = await response.json();
    return convertOSMToPlaces(data.elements);
  } catch (error) {
    console.error('Error fetching country data:', error);
    return [];
  }
}

// Statystyki OSM
export async function getOSMStats(): Promise<{
  totalCampings: number;
  byCountry: Record<string, number>;
}> {
  // To wymagałoby zapytania do Overpass - uproszczone dla demo
  return {
    totalCampings: 150000, // Szacunek dla Europy
    byCountry: {
      france: 25000,
      germany: 20000,
      italy: 18000,
      spain: 15000,
      poland: 8000,
      norway: 5000,
      sweden: 6000,
    }
  };
}
