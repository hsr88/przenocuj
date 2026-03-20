#!/usr/bin/env node

/**
 * Skrypt do pobierania danych o campingach z OpenStreetMap (Overpass API)
 * Użycie: node fetch-osm-data.js [country]
 * Przykład: node fetch-osm-data.js poland
 */

const fs = require('fs');
const https = require('https');

// Konfiguracja
const CONFIG = {
  // Bounding box dla różnych krajów [south, west, north, east]
  countries: {
    poland: [49.0, 14.0, 55.0, 24.0],
    germany: [47.0, 5.5, 55.5, 15.5],
    france: [41.0, -5.0, 51.5, 10.0],
    spain: [35.0, -10.0, 44.0, 4.0],
    italy: [36.5, 6.5, 47.5, 19.0],
    norway: [57.0, 4.0, 71.5, 32.0],
    sweden: [55.0, 10.5, 69.5, 24.5],
    europe: [36.0, -10.0, 71.0, 32.0]
  },
  outputDir: './data'
};

// Zapytanie Overpass QL dla campingów
function buildOverpassQuery(bbox) {
  const [south, west, north, east] = bbox;
  return `
[out:json][timeout:300];
(
  // Campingi
  node["tourism"="camp_site"](${south},${west},${north},${east});
  way["tourism"="camp_site"](${south},${west},${north},${east});
  relation["tourism"="camp_site"](${south},${west},${north},${east});
  
  // Miejsca dla kamperów
  node["tourism"="caravan_site"](${south},${west},${north},${east});
  way["tourism"="caravan_site"](${south},${west},${north},${east});
  relation["tourism"="caravan_site"](${south},${west},${north},${east});
  
  // Parkingi dla kamperów
  node["amenity"="parking"]["caravans"="yes"](${south},${west},${north},${east});
  way["amenity"="parking"]["caravans"="yes"](${south},${west},${north},${east});
  
  // Schroniska
  node["tourism"="alpine_hut"](${south},${west},${north},${east});
  way["tourism"="alpine_hut"](${south},${west},${north},${east});
  
  // Miejsca biwakowe
  node["tourism"="wilderness_hut"](${south},${west},${north},${east});
  way["tourism"="wilderness_hut"](${south},${west},${north},${east});
);
out center tags 1000;
`;
}

// Pobieranie danych z Overpass API
function fetchOverpassData(query) {
  return new Promise((resolve, reject) => {
    const encodedQuery = encodeURIComponent(query);
    const url = `https://overpass-api.de/api/interpreter?data=${encodedQuery}`;
    
    console.log('Pobieranie danych z Overpass API...');
    console.log('URL:', url.substring(0, 100) + '...');
    
    https.get(url, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          resolve(json);
        } catch (e) {
          reject(new Error('Błąd parsowania JSON: ' + e.message));
        }
      });
    }).on('error', (err) => {
      reject(new Error('Błąd HTTP: ' + err.message));
    });
  });
}

// Konwersja danych OSM na format aplikacji
function convertOSMToPlaces(osmData) {
  const places = [];
  const elements = osmData.elements || [];
  
  console.log(`Znaleziono ${elements.length} obiektów`);
  
  elements.forEach((element, index) => {
    const tags = element.tags || {};
    
    // Określenie typu miejsca
    let type = 'free';
    if (tags.tourism === 'caravan_site' || tags.caravans === 'yes') {
      type = 'van';
    } else if (tags.tourism === 'camp_site' && tags.camp_site === 'glamping') {
      type = 'glamping';
    } else if (tags.bicycle === 'yes' || tags.mtb === 'yes') {
      type = 'bike';
    }
    
    // Określenie cech
    const features = [];
    if (tags.drinking_water === 'yes' || tags.water === 'yes') features.push('water');
    if (tags.toilets === 'yes') features.push('wc');
    if (tags.openfire === 'yes' || tags.fireplace === 'yes') features.push('fire');
    if (tags.dogs === 'yes') features.push('dog');
    if (tags.fee === 'no') features.push('legal');
    
    // Cena
    let price = null;
    if (tags.fee === 'yes' && tags.charge) {
      price = tags.charge;
    }
    
    // Nazwa
    const name = tags.name || tags['name:pl'] || tags['name:en'] || `Miejsce #${index + 1}`;
    
    // Współrzędne
    let lat, lng;
    if (element.type === 'node') {
      lat = element.lat;
      lng = element.lon;
    } else if (element.center) {
      lat = element.center.lat;
      lng = element.center.lon;
    } else {
      return; // Pomiń jeśli nie ma współrzędnych
    }
    
    places.push({
      id: 10000 + index,
      name: name,
      type: type,
      lat: lat,
      lng: lng,
      description: tags.description || `Miejsce z OpenStreetMap: ${tags.tourism || 'camping'}`,
      rating: 0,
      reviews: 0,
      features: features,
      price: price,
      isLegal: tags.fee !== 'no' || tags.access !== 'private',
      isFree: tags.fee === 'no' || !tags.fee,
      osmId: element.id,
      osmType: element.type
    });
  });
  
  return places;
}

// Zapis do pliku
function saveToFile(data, filename) {
  if (!fs.existsSync(CONFIG.outputDir)) {
    fs.mkdirSync(CONFIG.outputDir, { recursive: true });
  }
  
  const filepath = `${CONFIG.outputDir}/${filename}`;
  fs.writeFileSync(filepath, JSON.stringify(data, null, 2));
  console.log(`Zapisano ${data.length} miejsc do: ${filepath}`);
}

// Główna funkcja
async function main() {
  const country = process.argv[2] || 'poland';
  const bbox = CONFIG.countries[country];
  
  if (!bbox) {
    console.error(`Nieznany kraj: ${country}`);
    console.error('Dostępne kraje:', Object.keys(CONFIG.countries).join(', '));
    process.exit(1);
  }
  
  console.log(`Pobieranie danych dla: ${country}`);
  console.log(`Bounding box: ${bbox.join(', ')}`);
  
  try {
    const query = buildOverpassQuery(bbox);
    const osmData = await fetchOverpassData(query);
    const places = convertOSMToPlaces(osmData);
    
    // Zapis jako JSON
    saveToFile(places, `camping-${country}.json`);
    
    // Zapis jako TypeScript (do wklejenia w kod)
    const tsContent = `import { Place } from '@/types';

export const osmPlaces${country.charAt(0).toUpperCase() + country.slice(1)}: Place[] = ${JSON.stringify(places, null, 2)};
`;
    fs.writeFileSync(`${CONFIG.outputDir}/camping-${country}.ts`, tsContent);
    console.log(`Zapisano również jako TypeScript: camping-${country}.ts`);
    
    // Statystyki
    const byType = places.reduce((acc, p) => {
      acc[p.type] = (acc[p.type] || 0) + 1;
      return acc;
    }, {});
    
    console.log('\nStatystyki:');
    console.log('  Razem:', places.length);
    Object.entries(byType).forEach(([type, count]) => {
      console.log(`  ${type}: ${count}`);
    });
    
  } catch (error) {
    console.error('Błąd:', error.message);
    process.exit(1);
  }
}

main();
