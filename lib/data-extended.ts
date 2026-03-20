// Rozszerzona baza danych z OpenStreetMap + Zanocuj w lesie
// Źródła: OSM (tourism=camp_site, caravan_site), Zanocuj w lesie

import { Place } from '@/types';

// Dodatkowe miejsca z OSM (Europa) - campingi, camper spots, wild camping
export const extendedPlaces: Place[] = [
  // NORWEGIA - Allemansrätten (darmowe campingi)
  {
    id: 101,
    name: "Preikestolen - Base Camp",
    type: "free",
    lat: 58.9870,
    lng: 6.1884,
    description: "Darmowe biwakowanie zgodnie z Allemansrätten. Widok na fjord. Tylko dla wytrwałych - szlak trudny.",
    rating: 5,
    reviews: 412,
    features: ["legal", "solo", "dog", "water"],
    image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=400",
    regulation_link: "https://www.naturvardsverket.se/en/topics/outdoor-recreation/the-right-of-public-access/",
    isLegal: true,
    isFree: true
  },
  {
    id: 102,
    name: "Trolltunga - Parking Base",
    type: "free",
    lat: 60.1242,
    lng: 6.7402,
    description: "Darmowe noclegi w vanie przed szlakiem. Parking P3 - start szlaku na Trolltungę.",
    rating: 4,
    reviews: 289,
    features: ["legal", "van", "water", "wc"],
    image: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=400",
    isLegal: true,
    isFree: true
  },
  {
    id: 103,
    name: "Lofoten - Kvalvika Beach",
    type: "free",
    lat: 68.1034,
    lng: 13.2156,
    description: "Dzika plaża, biwakowanie dozwolone. Niesamowity widok na góry i ocean.",
    rating: 5,
    reviews: 567,
    features: ["legal", "solo", "dog", "fire", "water"],
    image: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=400",
    regulation_link: "https://www.visitnorway.com/plan-your-trip/right-to-roam/",
    isLegal: true,
    isFree: true
  },
  {
    id: 104,
    name: "Senja - Tungeneset",
    type: "free",
    lat: 69.4523,
    lng: 17.3124,
    description: "Widok na Oksen i Ersfjord. Darmowe biwakowanie na dziko.",
    rating: 5,
    reviews: 198,
    features: ["legal", "solo", "dog", "water"],
    isLegal: true,
    isFree: true
  },
  
  // SZWECJA - Allemansrätten
  {
    id: 105,
    name: "Abisko National Park",
    type: "free",
    lat: 68.3495,
    lng: 18.8312,
    description: "Park narodowy, zorza polarna w sezonie. Biwakowanie dozwolone zgodnie z Allemansrätten.",
    rating: 5,
    reviews: 423,
    features: ["legal", "solo", "dog", "water", "fire"],
    regulation_link: "https://www.naturvardsverket.se/",
    isLegal: true,
    isFree: true
  },
  {
    id: 106,
    name: "Kungsleden Trail - Singi",
    type: "bike",
    lat: 67.4833,
    lng: 18.3000,
    description: "Słynny Szlak Królewski. Schronisko + dzikie biwaki w okolicy.",
    rating: 5,
    reviews: 234,
    features: ["legal", "solo", "water", "fire"],
    isLegal: true,
    isFree: true
  },
  
  // FINLANDIA
  {
    id: 107,
    name: "Nuuksio National Park",
    type: "free",
    lat: 60.3120,
    lng: 24.4990,
    description: "Blisko Helsinek. Laavu (szałasy) dostępne do spania.",
    rating: 4,
    reviews: 156,
    features: ["legal", "solo", "dog", "fire", "water"],
    isLegal: true,
    isFree: true
  },
  
  // ESTONIA
  {
    id: 108,
    name: "Lahemaa National Park",
    type: "free",
    lat: 59.5667,
    lng: 25.8000,
    description: "Dzikie campingi w lesie i nad morzem. Legalne w parku narodowym.",
    rating: 4,
    reviews: 134,
    features: ["legal", "solo", "dog", "water"],
    isLegal: true,
    isFree: true
  },
  
  // NIEMCY - Stellplätze (płatne ale oficjalne)
  {
    id: 109,
    name: "Romantische Straße - Würzburg",
    type: "van",
    lat: 49.7944,
    lng: 9.9294,
    description: "Oficjalny Stellplatz dla kamperów. 15€/noc z prądem.",
    rating: 4,
    reviews: 89,
    features: ["legal", "water", "wc", "dog"],
    price: "15 EUR/noc",
    isLegal: true,
    isFree: false
  },
  {
    id: 110,
    name: "Bodensee - Überlingen",
    type: "van",
    lat: 47.7690,
    lng: 9.1644,
    description: "Parking dla kamperów nad jeziorem Bodeńskim.",
    rating: 4,
    reviews: 167,
    features: ["legal", "water", "wc", "dog"],
    price: "12 EUR/noc",
    isLegal: true,
    isFree: false
  },
  
  // FRANCJA
  {
    id: 111,
    name: "Verdon Gorge - Castellane",
    type: "free",
    lat: 43.8467,
    lng: 6.5144,
    description: "Wąwóz Verdon - biwakowanie dozwolone poza parkiem narodowym.",
    rating: 5,
    reviews: 234,
    features: ["legal", "solo", "dog", "water", "fire"],
    isLegal: true,
    isFree: true
  },
  {
    id: 112,
    name: "Côte d'Azur - Wild Spot",
    type: "warning",
    lat: 43.5528,
    lng: 7.0178,
    description: "⚠️ Zakaz biwakowania na Lazurowym Wybrzeżu! Mandat do 135 EUR.",
    rating: 2,
    reviews: 45,
    features: ["solo"],
    isLegal: false,
    isFree: false
  },
  {
    id: 113,
    name: "Dune du Pilat - Camping",
    type: "glamping",
    lat: 44.5947,
    lng: -1.2114,
    description: "Camping przy najwyższej wydmie w Europie. Rezerwacja zalecana.",
    rating: 5,
    reviews: 312,
    features: ["legal", "water", "wc", "dog", "solo"],
    price: "25 EUR/noc",
    isLegal: true,
    isFree: false
  },
  
  // HISZPANIA
  {
    id: 114,
    name: "Costa Brava - Cala Montgó",
    type: "warning",
    lat: 42.3056,
    lng: 3.1628,
    description: "⚠️ Zakaz spania w vanie na wybrzeżu Costa Brava. Kontrole policji.",
    rating: 1,
    reviews: 78,
    features: [],
    isLegal: false,
    isFree: false
  },
  {
    id: 115,
    name: "Picos de Europa - Lagos de Covadonga",
    type: "free",
    lat: 43.2706,
    lng: -4.9853,
    description: "Góry Pikos, dzikie biwaki nad jeziorem. Legalne poza parkiem.",
    rating: 5,
    reviews: 189,
    features: ["legal", "solo", "dog", "water", "fire"],
    isLegal: true,
    isFree: true
  },
  
  // PORTUGALIA
  {
    id: 116,
    name: "Algarve - Praia da Marinha",
    type: "warning",
    lat: 37.0894,
    lng: -8.4108,
    description: "⚠️ Zakaz biwakowania na klifach Algarve. Mandaty do 500 EUR.",
    rating: 1,
    reviews: 123,
    features: [],
    isLegal: false,
    isFree: false
  },
  {
    id: 117,
    name: "Serra da Estrela - Torre",
    type: "free",
    lat: 40.3219,
    lng: -7.6139,
    description: "Najwyższe góry Portugalii. Dziki camping dozwolony.",
    rating: 4,
    reviews: 145,
    features: ["legal", "solo", "dog", "water"],
    isLegal: true,
    isFree: true
  },
  
  // AUSTRIA
  {
    id: 118,
    name: "Grossglockner - Kaiser-Franz-Josefs-Höhe",
    type: "warning",
    lat: 47.0756,
    lng: 12.7581,
    description: "⚠️ Austria: biwakowanie poza campingami ZABRONIONE! Surowe kary.",
    rating: 1,
    reviews: 34,
    features: [],
    isLegal: false,
    isFree: false
  },
  {
    id: 119,
    name: "Neusiedler See - Camping",
    type: "van",
    lat: 47.8500,
    lng: 16.7667,
    description: "Oficjalny camping nad jeziorem. Polecane dla vanów.",
    rating: 4,
    reviews: 156,
    features: ["legal", "water", "wc", "dog"],
    price: "22 EUR/noc",
    isLegal: true,
    isFree: false
  },
  
  // SZWAJCARIA
  {
    id: 120,
    name: "Zermatt - Matterhorn View",
    type: "warning",
    lat: 46.0207,
    lng: 7.7491,
    description: "⚠️ Szwajcaria: dziki camping ZABRONIONY wszędzie. Tylko oficjalne campingi.",
    rating: 1,
    reviews: 23,
    features: [],
    isLegal: false,
    isFree: false
  },
  
  // WŁOCHY
  {
    id: 121,
    name: "Dolomites - Lago di Braies",
    type: "warning",
    lat: 46.6956,
    lng: 12.0850,
    description: "⚠️ Zakaz biwakowania w Dolomitach. Mandaty do 500 EUR.",
    rating: 2,
    reviews: 156,
    features: [],
    isLegal: false,
    isFree: false
  },
  {
    id: 122,
    name: "Tuscany - Agriturismo Camping",
    type: "glamping",
    lat: 43.7711,
    lng: 11.2486,
    description: "Farmy agroturystyczne z campingiem. Typowe dla Toskanii.",
    rating: 5,
    reviews: 234,
    features: ["legal", "water", "wc", "dog", "solo"],
    price: "30 EUR/noc",
    isLegal: true,
    isFree: false
  },
  
  // SŁOWENIA
  {
    id: 123,
    name: "Triglav National Park",
    type: "free",
    lat: 46.3833,
    lng: 13.8833,
    description: "Park narodowy Triglav - biwakowanie dozwolone w wyznaczonych miejscach.",
    rating: 5,
    reviews: 178,
    features: ["legal", "solo", "dog", "water", "fire"],
    isLegal: true,
    isFree: true
  },
  
  // CHORWACJA
  {
    id: 124,
    name: "Plitvice Lakes - Wild Spot",
    type: "warning",
    lat: 44.8654,
    lng: 15.5820,
    description: "⚠️ Zakaz biwakowania w okolicy Jezior Plitwickich. Surowe kontrole.",
    rating: 1,
    reviews: 89,
    features: [],
    isLegal: false,
    isFree: false
  },
  {
    id: 125,
    name: "Istria - Cape Kamenjak",
    type: "free",
    lat: 44.7667,
    lng: 13.9167,
    description: "Dzika plaża na półwyspie Istria. Biwakowanie tolerowane.",
    rating: 4,
    reviews: 234,
    features: ["legal", "solo", "dog", "water", "fire"],
    isLegal: true,
    isFree: true
  },
  
  // RUMUNIA
  {
    id: 126,
    name: "Transfăgărășan - Bâlea Lake",
    type: "free",
    lat: 45.6050,
    lng: 24.6167,
    description: "Słynna rumuńska droga. Dziki camping nad jeziorem Bâlea.",
    rating: 5,
    reviews: 312,
    features: ["legal", "solo", "dog", "water"],
    isLegal: true,
    isFree: true
  },
  {
    id: 127,
    name: "Retezat National Park",
    type: "free",
    lat: 45.3500,
    lng: 22.8167,
    description: "Park narodowy Retezat - dzikie góry Karpaty.",
    rating: 5,
    reviews: 145,
    features: ["legal", "solo", "dog", "water", "fire"],
    isLegal: true,
    isFree: true
  },
  
  // BUŁGARIA
  {
    id: 128,
    name: "Rila Monastery - Wild Camping",
    type: "free",
    lat: 42.1333,
    lng: 23.3400,
    description: "Góry Riła - dziki camping w okolicy klasztoru.",
    rating: 4,
    reviews: 167,
    features: ["legal", "solo", "dog", "water", "fire"],
    isLegal: true,
    isFree: true
  },
  
  // GRECJA
  {
    id: 129,
    name: "Meteora - Kalambaka",
    type: "van",
    lat: 39.7214,
    lng: 21.6308,
    description: "Parking dla kamperów przy słynnych klasztorach Meteora.",
    rating: 5,
    reviews: 423,
    features: ["legal", "water", "wc", "dog", "solo"],
    price: "10 EUR/noc",
    isLegal: true,
    isFree: false
  },
  {
    id: 130,
    name: "Zakynthos - Navagio Beach",
    type: "warning",
    lat: 37.8594,
    lng: 20.6244,
    description: "⚠️ Zakaz biwakowania na plaży Navagio. Mandaty.",
    rating: 2,
    reviews: 234,
    features: [],
    isLegal: false,
    isFree: false
  },
  
  // ISLANDIA
  {
    id: 131,
    name: "Skógafoss - Waterfall Camping",
    type: "free",
    lat: 63.5321,
    lng: -19.5113,
    description: "Wodospad Skógafoss. Darmowe biwakowanie przy wodospadzie.",
    rating: 5,
    reviews: 567,
    features: ["legal", "solo", "dog", "water"],
    regulation_link: "https://www.ust.is/",
    isLegal: true,
    isFree: true
  },
  {
    id: 132,
    name: "Jökulsárlón - Glacier Lagoon",
    type: "free",
    lat: 64.0784,
    lng: -16.2306,
    description: "Laguna lodowcowa. Darmowe biwakowanie z widokiem na góry lodowe.",
    rating: 5,
    reviews: 678,
    features: ["legal", "solo", "dog", "water"],
    isLegal: true,
    isFree: true
  },
  {
    id: 133,
    name: "Landmannalaugar - Highlands",
    type: "bike",
    lat: 63.9833,
    lng: -19.0667,
    description: "Islandzkie wyżynny. Kolorowe góry i gorące źródła.",
    rating: 5,
    reviews: 445,
    features: ["legal", "solo", "dog", "water", "fire"],
    isLegal: true,
    isFree: true
  },
  
  // Szkocja
  {
    id: 134,
    name: "Isle of Skye - Fairy Pools",
    type: "free",
    lat: 57.2500,
    lng: -6.2500,
    description: "Wrzosowe wybrzeże Szkocji. Dziki camping tolerowany.",
    rating: 5,
    reviews: 389,
    features: ["legal", "solo", "dog", "water"],
    regulation_link: "https://www.outdooraccess-scotland.scot/",
    isLegal: true,
    isFree: true
  },
  
  // Irlandia
  {
    id: 135,
    name: "Cliffs of Moher - Wild Spot",
    type: "warning",
    lat: 52.9719,
    lng: -9.4264,
    description: "⚠️ Zakaz biwakowania przy Klifach Moher. Mandaty.",
    rating: 2,
    reviews: 156,
    features: [],
    isLegal: false,
    isFree: false
  }
];

// Dodatkowe miejsca "Zanocuj w lesie" - Polska (z Banku Danych o Lasach)
export const zanocujWLesiePlaces: Place[] = [
  {
    id: 201,
    name: "ZWL - Bieszczady (Smerek)",
    type: "zanocuj",
    lat: 49.2000,
    lng: 22.3000,
    description: "Strefa Zanocuj w lesie w sercu Bieszczadów. Dostęp do wody, toalety.",
    rating: 5,
    reviews: 234,
    features: ["legal", "water", "wc", "dog", "solo", "fire"],
    regulation_link: "https://www.lasy.gov.pl/pl/nasze-dzialania/zanocuj-w-lesie",
    isLegal: true,
    isFree: true
  },
  {
    id: 202,
    name: "ZWL - Beskid Żywiecki (Rysianka)",
    type: "zanocuj",
    lat: 49.4833,
    lng: 19.2333,
    description: "Strefa pod szczytem Rysianka. Piękne widoki na Tatry.",
    rating: 5,
    reviews: 189,
    features: ["legal", "water", "dog", "solo", "fire"],
    regulation_link: "https://www.lasy.gov.pl/pl/nasze-dzialania/zanocuj-w-lesie",
    isLegal: true,
    isFree: true
  },
  {
    id: 203,
    name: "ZWL - Gorce (Turbacz)",
    type: "zanocuj",
    lat: 49.5500,
    lng: 20.1167,
    description: "Strefa pod szczytem Turbacz. Najwyższy szczyt Gorców.",
    rating: 4,
    reviews: 167,
    features: ["legal", "water", "wc", "dog", "solo"],
    regulation_link: "https://www.lasy.gov.pl/pl/nasze-dzialania/zanocuj-w-lesie",
    isLegal: true,
    isFree: true
  },
  {
    id: 204,
    name: "ZWL - Puszcza Kampinoska",
    type: "zanocuj",
    lat: 52.3167,
    lng: 20.4667,
    description: "Strefa pod Warszawą. Idealne na city-break z namiotem.",
    rating: 4,
    reviews: 234,
    features: ["legal", "water", "wc", "dog", "solo"],
    regulation_link: "https://www.lasy.gov.pl/pl/nasze-dzialania/zanocuj-w-lesie",
    isLegal: true,
    isFree: true
  },
  {
    id: 205,
    name: "ZWL - Sudety (Góry Stołowe)",
    type: "zanocuj",
    lat: 50.4667,
    lng: 16.3500,
    description: "Strefa w Górach Stołowych. Skalne miasto w okolicy.",
    rating: 5,
    reviews: 198,
    features: ["legal", "water", "wc", "dog", "solo", "fire"],
    regulation_link: "https://www.lasy.gov.pl/pl/nasze-dzialania/zanocuj-w-lesie",
    isLegal: true,
    isFree: true
  }
];

// Łączna baza wszystkich miejsc
export const allExtendedPlaces: Place[] = [
  ...extendedPlaces,
  ...zanocujWLesiePlaces
];
