import { Place, TripIdea } from '@/types';
import { allExtendedPlaces } from './data-extended';

// Miejsca startowe (oryginalne 15 + rozszerzone)
export const initialPlaces: Place[] = [
  // POLSKA - Zanocuj w lesie (5 miejsc)
  {
    id: 1,
    name: "Połonina Wetlińska - Strefa ZWL",
    type: "zanocuj",
    lat: 49.2106,
    lng: 22.4514,
    description: "Oficjalna strefa Zanocuj w Lesie w Bieszczadach. Miejsce na 10 namiotów, dostęp do wody, toalety ekologiczne. Cudowne widoki na połoniny.",
    rating: 5,
    reviews: 127,
    features: ["legal", "water", "wc", "solo", "dog"],
    image: "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?w=400",
    regulation_link: "https://www.lasy.gov.pl/pl/nasze-dzialania/zanocuj-w-lesie",
    isLegal: true,
    isFree: true
  },
  {
    id: 2,
    name: "Puszcza Białowieska - ZWL",
    type: "zanocuj",
    lat: 52.7152,
    lng: 23.9067,
    description: "Strefa w sercu pierwotnej puszczy. Rezerwacja online wymagana. Możliwość spotkania żubrów!",
    rating: 5,
    reviews: 89,
    features: ["legal", "water", "wc", "dog"],
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400",
    regulation_link: "https://www.lasy.gov.pl/pl/nasze-dzialania/zanocuj-w-lesie",
    isLegal: true,
    isFree: true
  },
  {
    id: 3,
    name: "Bory Tucholskie - ZWL",
    type: "zanocuj",
    lat: 53.7000,
    lng: 17.8000,
    description: "Strefa nad jeziorem w Borach Tucholskich. Idealne miejsce dla kajakarzy i miłośników ciszy.",
    rating: 4,
    reviews: 64,
    features: ["legal", "water", "fire", "dog", "solo"],
    image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=400",
    regulation_link: "https://www.lasy.gov.pl/pl/nasze-dzialania/zanocuj-w-lesie",
    isLegal: true,
    isFree: true
  },
  {
    id: 4,
    name: "Roztocze - ZWL",
    type: "zanocuj",
    lat: 50.5833,
    lng: 22.9833,
    description: "Strefa w Puszczy Solskiej. Koniki polskie, piękne szlaki piesze i rowerowe.",
    rating: 4,
    reviews: 52,
    features: ["legal", "water", "dog", "solo"],
    image: "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=400",
    regulation_link: "https://www.lasy.gov.pl/pl/nasze-dzialania/zanocuj-w-lesie",
    isLegal: true,
    isFree: true
  },
  {
    id: 5,
    name: "Mazury - ZWL Krutynia",
    type: "zanocuj",
    lat: 53.7500,
    lng: 21.5000,
    description: "Strefa przy szlaku kajakowym Krutyni. Popularna w sezonie, rezerwacja zalecana.",
    rating: 4,
    reviews: 143,
    features: ["legal", "water", "fire", "wc", "dog"],
    image: "https://images.unsplash.com/photo-1537905569824-f89f14cceb68?w=400",
    regulation_link: "https://www.lasy.gov.pl/pl/nasze-dzialania/zanocuj-w-lesie",
    isLegal: true,
    isFree: true
  },
  
  // SZWECJA/NORWEGIA - Allemansrätten (3 miejsca)
  {
    id: 6,
    name: "Swedish Lapland - Allemansrätten",
    type: "free",
    lat: 68.3500,
    lng: 18.8000,
    description: "Dzikie kempingowanie zgodnie z prawem Allemansrätten. Zorza polarna w sezonie!",
    rating: 5,
    reviews: 234,
    features: ["legal", "solo", "dog"],
    image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=400",
    regulation_link: "https://www.naturvardsverket.se/en/topics/outdoor-recreation/the-right-of-public-access/",
    isLegal: true,
    isFree: true
  },
  {
    id: 7,
    name: "Lofoten - Norway Wild",
    type: "free",
    lat: 68.2000,
    lng: 13.9000,
    description: "Ikonowe fiordy Lofotów. Dzikie noclegi dozwolone na dziko. Niezapomniane widoki.",
    rating: 5,
    reviews: 312,
    features: ["legal", "solo", "dog", "water"],
    image: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=400",
    regulation_link: "https://www.visitnorway.com/plan-your-trip/right-to-roam/",
    isLegal: true,
    isFree: true
  },
  {
    id: 8,
    name: "Sarek National Park - Sweden",
    type: "bike",
    lat: 67.2833,
    lng: 17.5000,
    description: "Ekstremalna dziczyzna dla doświadczonych. Tylko dla pieszych, bez szlaków.",
    rating: 5,
    reviews: 78,
    features: ["legal", "solo"],
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400",
    regulation_link: "https://www.naturvardsverket.se/en/topics/outdoor-recreation/the-right-of-public-access/",
    isLegal: true,
    isFree: true
  },
  
  // GLAMPING (3 miejsca)
  {
    id: 9,
    name: "Glamp Village - Polska",
    type: "glamping",
    lat: 53.9194,
    lng: 14.2500,
    description: "Luksusowe sfery z widokiem na morze. Jacuzzi, klimatyzacja, śniadanie w cenie.",
    rating: 5,
    reviews: 156,
    features: ["legal", "water", "wc", "dog", "solo"],
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400",
    price: "450 zł/noc",
    isLegal: true,
    isFree: false
  },
  {
    id: 10,
    name: "Slovenia Treehouses",
    type: "glamping",
    lat: 46.1512,
    lng: 14.9955,
    description: "Magiczne domki na drzewach w Słowenii. Blisko jeziora Bled.",
    rating: 5,
    reviews: 198,
    features: ["legal", "water", "wc", "solo", "dog"],
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400",
    price: "120 EUR/noc",
    isLegal: true,
    isFree: false
  },
  {
    id: 11,
    name: "Portugal Eco Domes",
    type: "glamping",
    lat: 37.2000,
    lng: -8.4000,
    description: "Eko-kopuły na południu Portugalii. Solarna energia, kompostowe WC.",
    rating: 4,
    reviews: 87,
    features: ["legal", "water", "wc", "solo"],
    image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=400",
    price: "95 EUR/noc",
    isLegal: true,
    isFree: false
  },
  
  // WILD SPOTY (4 miejsca - z ostrzeżeniem)
  {
    id: 12,
    name: "Schwarzwald Wild Spot",
    type: "warning",
    lat: 48.1000,
    lng: 8.4000,
    description: "⚠️ WILD CAMPING NIELEGALNY W NIEMCZECH! Ryzyko mandatu do 500 EUR. Tylko informacyjnie.",
    rating: 3,
    reviews: 45,
    features: ["solo"],
    image: "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=400",
    isLegal: false,
    isFree: true
  },
  {
    id: 13,
    name: "Black Forest - Stellplatz",
    type: "van",
    lat: 48.1500,
    lng: 8.3000,
    description: "Oficjalny parking dla kamperów. 15 EUR/noc z prądem i wodą. Alternatywa dla wild.",
    rating: 4,
    reviews: 112,
    features: ["legal", "water", "wc", "dog"],
    image: "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?w=400",
    price: "15 EUR/noc",
    isLegal: true,
    isFree: false
  },
  {
    id: 14,
    name: "Vanoise National Park - France",
    type: "warning",
    lat: 45.3500,
    lng: 6.8000,
    description: "⚠️ CAŁKOWITY ZAKAZ w parku narodowym! Mandat 135-750 EUR. Bivouac dozwolony 19h-7h.",
    rating: 2,
    reviews: 23,
    features: [],
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400",
    isLegal: false,
    isFree: false
  },
  {
    id: 15,
    name: "Lake Annecy - France",
    type: "free",
    lat: 45.9000,
    lng: 6.1000,
    description: "Dozwolone bivouac 19-7, poza parkami. Przepiękne jezioro, popularne wśród vanliferów.",
    rating: 4,
    reviews: 167,
    features: ["legal", "water", "solo", "dog"],
    image: "https://images.unsplash.com/photo-1537905569824-f89f14cceb68?w=400",
    regulation_link: "https://www.annecy.fr/",
    isLegal: true,
    isFree: true
  }
];

export const tripIdeas: TripIdea[] = [
  {
    id: "bieszczady",
    name: "Bieszczady → Słowacja",
    duration: "7 dni",
    icon: "🚴",
    description: "350 km przez przełęcze",
    tags: ["Rower", "Wild"],
    location: [49.2106, 22.4514],
    zoom: 9,
    gradient: "from-forest-700 to-forest-800"
  },
  {
    id: "norwegia",
    name: "Norwegia Fjordy",
    duration: "14 dni",
    icon: "🚐",
    description: "Allemansrätten tour",
    tags: ["Van", "Free"],
    location: [68.2000, 13.9000],
    zoom: 6,
    gradient: "from-blue-700 to-blue-800"
  },
  {
    id: "portugalia",
    name: "Portugalia Glamping",
    duration: "10 dni",
    icon: "🏕️",
    description: "Od Lizbony do Algarve",
    tags: ["Glamping", "Coast"],
    location: [37.2000, -8.4000],
    zoom: 7,
    gradient: "from-purple-700 to-purple-800"
  },
  {
    id: "mazury",
    name: "Mazury Kayak Trail",
    duration: "5 dni",
    icon: "🛶",
    description: "Zanocuj w lesie",
    tags: ["Kajak", "Legal"],
    location: [53.7500, 21.5000],
    zoom: 10,
    gradient: "from-green-700 to-green-800"
  },
  {
    id: "alpy",
    name: "Alpy Bikepacking",
    duration: "12 dni",
    icon: "🚵",
    description: "Transalp MTB",
    tags: ["MTB", "Alpy"],
    location: [46.8182, 8.2275],
    zoom: 7,
    gradient: "from-orange-700 to-orange-800"
  }
];

// Wszystkie miejsca razem (startowe + rozszerzone)
export const allPlaces: Place[] = [...initialPlaces, ...allExtendedPlaces];

// Statystyki
export const placesStats = {
  total: allPlaces.length,
  byType: allPlaces.reduce((acc, p) => {
    acc[p.type] = (acc[p.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>),
  byCountry: {
    poland: allPlaces.filter(p => p.lat > 49 && p.lat < 55 && p.lng > 14 && p.lng < 24).length,
    norway: allPlaces.filter(p => p.lat > 57 && p.lat < 72 && p.lng > 4 && p.lng < 32).length,
    sweden: allPlaces.filter(p => p.lat > 55 && p.lat < 70 && p.lng > 10 && p.lng < 25).length,
    germany: allPlaces.filter(p => p.lat > 47 && p.lat < 56 && p.lng > 5 && p.lng < 16).length,
    france: allPlaces.filter(p => p.lat > 41 && p.lat < 52 && p.lng > -5 && p.lng < 11).length,
  }
};

// Supabase config - UŻYTKOWNIK MUSI ZASTĄPIĆ
export const supabaseConfig = {
  url: process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://your-project.supabase.co',
  anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'your-anon-key',
};
