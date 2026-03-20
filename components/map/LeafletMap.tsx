'use client';

import { useEffect, useRef, useCallback } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Place } from '@/types';
import { createMarkerIcon } from './MarkerIcon';
import { Reviews } from '@/components/Reviews';
import { useOSMPlaces } from '@/hooks/useOSMPlaces';

interface LeafletMapProps {
  places: Place[];
  favorites: number[];
  route: number[];
  onToggleFavorite: (id: number) => void;
  onAddToRoute: (id: number) => void;
  onFlyTo?: (lat: number, lng: number, zoom: number) => void;
  enableOSM?: boolean;
}

export function LeafletMap({ 
  places: staticPlaces, 
  favorites, 
  route,
  onToggleFavorite, 
  onAddToRoute,
  enableOSM = true,
}: LeafletMapProps) {
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const osmMarkersRef = useRef<L.Marker[]>([]);
  
  // OSM dynamic loading
  const { 
    places: osmPlaces, 
    loading: osmLoading, 
    loadPlacesInBounds,
    totalLoaded 
  } = useOSMPlaces({ enabled: enableOSM });

  // Initialize map
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current, {
      zoomControl: false,
      attributionControl: false,
    }).setView([52.0, 19.0], 6);

    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap'
    }).addTo(map);

    // Add zoom control
    L.control.zoom({ position: 'bottomright' }).addTo(map);

    // Add attribution
    L.control.attribution({
      position: 'bottomleft',
      prefix: '© OpenStreetMap | Przenocuj.eu'
    }).addTo(map);

    // Listen to moveend to load more OSM data
    if (enableOSM) {
      map.on('moveend', () => {
        try {
          const bounds = map.getBounds();
          if (bounds && bounds.isValid()) {
            loadPlacesInBounds({
              south: bounds.getSouth(),
              west: bounds.getWest(),
              north: bounds.getNorth(),
              east: bounds.getEast(),
            });
          }
        } catch (e) {
          console.log('Map bounds not ready');
        }
      });
      
      // Initial load - wait for map to be fully ready
      const checkMapReady = () => {
        if (map.getContainer() && map.getBounds) {
          try {
            const bounds = map.getBounds();
            if (bounds.isValid()) {
              loadPlacesInBounds({
                south: bounds.getSouth(),
                west: bounds.getWest(),
                north: bounds.getNorth(),
                east: bounds.getEast(),
              });
            }
          } catch (e) {
            console.log('Map not ready yet, retrying...');
            setTimeout(checkMapReady, 500);
          }
        } else {
          setTimeout(checkMapReady, 500);
        }
      };
      
      setTimeout(checkMapReady, 1500);
    }

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [enableOSM, loadPlacesInBounds]);

  // Render static places (from data.ts)
  useEffect(() => {
    if (!mapRef.current) return;

    // Clear static markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    // Add static markers
    staticPlaces.forEach(place => {
      const isFav = favorites.includes(place.id);
      const isInRoute = route.includes(place.id);
      
      const marker = L.marker([place.lat, place.lng], {
        icon: createMarkerIcon(place.type, isFav, true), // true = isStatic
      }).addTo(mapRef.current!);

          // Create popup
      const popup = marker.bindPopup(
        createPopupHTML(place, isFav, isInRoute),
        { maxWidth: 320, className: 'custom-popup' }
      );

      popup.on('popupopen', () => {
        const favBtn = document.querySelector('.leaflet-popup-content .fav-btn');
        const routeBtn = document.querySelector('.leaflet-popup-content .route-btn');
        
        favBtn?.addEventListener('click', () => onToggleFavorite(place.id));
        routeBtn?.addEventListener('click', () => onAddToRoute(place.id));
      });

      markersRef.current.push(marker);
    });
  }, [staticPlaces, favorites, route, onToggleFavorite, onAddToRoute]);

  // Render OSM places (dynamic)
  useEffect(() => {
    if (!mapRef.current || !enableOSM) return;

    // Clear OSM markers
    osmMarkersRef.current.forEach(marker => marker.remove());
    osmMarkersRef.current = [];

    // Add OSM markers (smaller, less prominent)
    osmPlaces.forEach(place => {
      const isFav = favorites.includes(place.id);
      const isInRoute = route.includes(place.id);
      
      const marker = L.marker([place.lat, place.lng], {
        icon: createMarkerIcon(place.type, isFav, false), // false = from OSM
      }).addTo(mapRef.current!);

      const popupContent = document.createElement('div');
      popupContent.innerHTML = createPopupHTML(place, isFav, isInRoute);
      
      marker.bindPopup(popupContent, {
        maxWidth: 320,
        className: 'custom-popup'
      });

      marker.on('popupopen', () => {
        const favBtn = popupContent.querySelector('.fav-btn');
        const routeBtn = popupContent.querySelector('.route-btn');
        
        favBtn?.addEventListener('click', () => onToggleFavorite(place.id));
        routeBtn?.addEventListener('click', () => onAddToRoute(place.id));
      });

      osmMarkersRef.current.push(marker);
    });
  }, [osmPlaces, favorites, route, onToggleFavorite, onAddToRoute, enableOSM]);

  return (
    <div className="relative w-full h-full">
      <div ref={containerRef} className="w-full h-full" />
      
      {/* OSM Loading indicator */}
      {enableOSM && (
        <div className="absolute bottom-24 left-4 z-[1000] bg-white/90 backdrop-blur rounded-lg px-3 py-2 shadow-lg text-xs">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${osmLoading ? 'bg-amber-400 animate-pulse' : 'bg-green-500'}`} />
            <span className="text-forest-700">
              {osmLoading ? 'Pobieram z OSM...' : `Załadowano ${totalLoaded} miejsc`}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

function createPopupHTML(place: Place, isFav: boolean, isInRoute: boolean): string {
  const stars = '★'.repeat(Math.floor(place.rating)) + '☆'.repeat(5 - Math.floor(place.rating));
  const typeColors: Record<string, string> = {
    free: '#22c55e',
    zanocuj: '#16a34a',
    van: '#3b82f6',
    glamping: '#a855f7',
    bike: '#f97316',
    warning: '#dc2626'
  };

  let featuresHtml = '';
  if (place.features.includes('dog')) featuresHtml += '<span class="text-xs bg-gray-100 px-2 py-0.5 rounded">🐕</span>';
  if (place.features.includes('solo')) featuresHtml += '<span class="text-xs bg-gray-100 px-2 py-0.5 rounded">👤</span>';
  if (place.features.includes('water')) featuresHtml += '<span class="text-xs bg-gray-100 px-2 py-0.5 rounded">💧</span>';
  if (place.features.includes('wc')) featuresHtml += '<span class="text-xs bg-gray-100 px-2 py-0.5 rounded">🚽</span>';
  if (place.features.includes('fire')) featuresHtml += '<span class="text-xs bg-gray-100 px-2 py-0.5 rounded">🔥</span>';
  if (place.features.includes('legal')) featuresHtml += '<span class="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">✅ Legal</span>';

  const priceHtml = place.price 
    ? `<span class="text-amber-600 font-semibold">${place.price}</span>` 
    : '<span class="text-green-600 font-semibold">Darmowe</span>';

  const warningHtml = place.type === 'warning' 
    ? '<div class="bg-red-50 border border-red-200 rounded p-2 mb-2"><p class="text-xs text-red-600">⚠️ Strefa zakazana lub ograniczona</p></div>' 
    : '';

  const regulationHtml = place.regulation_link 
    ? `<a href="${place.regulation_link}" target="_blank" class="text-xs text-forest-600 hover:underline"><i class="fas fa-external-link-alt mr-1"></i>Regulamin</a>` 
    : '';
  
  // External review links
  const reviewLinksHtml = place.osmId 
    ? `<div class="mt-3 pt-3 border-t border-gray-100">
         <p class="text-xs text-gray-500 mb-1">Opinie zewnętrzne:</p>
         <div class="flex flex-wrap gap-1">
           <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.name + ' ' + place.lat + ' ' + place.lng)}" 
              target="_blank" class="text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded hover:bg-blue-100">
             Google Maps
           </a>
           ${place.type === 'van' || place.type === 'free' ? 
             `<a href="https://www.park4night.com/pl/search?lat=${place.lat}&lng=${place.lng}&radius=10" 
                target="_blank" class="text-[10px] bg-green-50 text-green-600 px-2 py-0.5 rounded hover:bg-green-100">
               Park4Night
             </a>` : ''}
         </div>
       </div>`
    : '';

  const emojis: Record<string, string> = {
    free: '🌲',
    zanocuj: '🏕️',
    van: '🚐',
    glamping: '🏡',
    bike: '🚴',
    warning: '⚠️'
  };

  // OSM source badge
  const osmBadge = place.osmId 
    ? '<span class="text-[10px] bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded">OSM</span>' 
    : '';

  return `
    <div class="relative">
      ${place.image ? `<img src="${place.image}" alt="${place.name}" class="w-full h-32 object-cover rounded-t-lg">` : ''}
      <div class="p-3">
        <div class="flex items-start justify-between mb-2">
          <h3 class="font-bold text-forest-800 text-sm pr-2">${place.name}</h3>
          <span class="text-lg" style="color: ${typeColors[place.type]}">${emojis[place.type]}</span>
        </div>
        
        ${warningHtml}
        
        <p class="text-xs text-gray-600 mb-2 line-clamp-2">${place.description}</p>
        
        <div class="flex items-center gap-1 mb-2">
          <span class="text-amber-400 text-sm">${stars}</span>
          <span class="text-xs text-gray-400">(${place.reviews})</span>
          ${osmBadge}
        </div>
        
        <div class="flex flex-wrap gap-1 mb-2">
          ${featuresHtml}
        </div>
        
        <div class="flex items-center justify-between mb-3">
          ${priceHtml}
          ${regulationHtml}
        </div>
        
        ${reviewLinksHtml}
        
        <div class="flex gap-2">
          <button class="fav-btn flex-1 py-1.5 px-2 rounded-lg text-xs font-medium transition-colors ${isFav ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}">
            <i class="fas fa-heart mr-1"></i>${isFav ? 'Usuń' : 'Zapisz'}
          </button>
          <button class="route-btn flex-1 py-1.5 px-2 rounded-lg text-xs font-medium transition-colors ${isInRoute ? 'bg-forest-100 text-forest-600' : 'bg-forest-600 text-white hover:bg-forest-700'}">
            <i class="fas fa-route mr-1"></i>${isInRoute ? 'Dodano' : 'Do trasy'}
          </button>
        </div>
      </div>
    </div>
  `;
}
