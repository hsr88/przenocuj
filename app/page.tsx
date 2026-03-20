'use client';

import { useState, useCallback } from 'react';
import dynamic from 'next/dynamic';

import { usePlaces } from '@/hooks/usePlaces';
import { useFavorites } from '@/hooks/useFavorites';
import { useRoute } from '@/hooks/useRoute';
import { useGeolocation } from '@/hooks/useGeolocation';
import { useToast } from '@/hooks/useToast';

import { Sidebar } from '@/components/panels/Sidebar';
import { FilterPanel } from '@/components/panels/FilterPanel';
import { TripIdeasPanel } from '@/components/panels/TripIdeasPanel';
import { LegalDisclaimer } from '@/components/panels/LegalDisclaimer';
import { AddPlaceModal } from '@/components/modals/AddPlaceModal';
import { LoadingScreen } from '@/components/LoadingScreen';
import { OfflineIndicator } from '@/components/OfflineIndicator';
import { ToastContainer } from '@/components/ui/Toast';

import { tripIdeas } from '@/lib/data';
import { Place, PlaceType } from '@/types';

// Dynamic import for LeafletMap (client-side only)
const LeafletMap = dynamic(
  () => import('@/components/map/LeafletMap').then(mod => mod.LeafletMap),
  { ssr: false, loading: () => <div className="w-full h-full bg-forest-100" /> }
);

export default function Home() {
  const { 
    filteredPlaces, 
    filters, 
    stats, 
    loading: placesLoading,
    addPlace, 
    updateFilters, 
    resetFilters 
  } = usePlaces();
  
  const { favorites, toggleFavorite } = useFavorites();
  const { route, addToRoute, removeFromRoute, clearRoute } = useRoute();
  const { getPosition } = useGeolocation();
  const { toasts, showToast, removeToast } = useToast();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [mapInstance, setMapInstance] = useState<any>(null);

  const handleFlyToPlace = useCallback((place: Place) => {
    // This would be implemented with map ref in production
    console.log('Fly to:', place.lat, place.lng);
  }, []);

  const handleSearch = useCallback((query: string) => {
    // Simple search implementation
    console.log('Search:', query);
    showToast('Wyszukiwanie: ' + query);
  }, [showToast]);

  const handleGetLocation = useCallback(async (): Promise<[number, number] | null> => {
    return new Promise((resolve) => {
      if (!navigator.geolocation) {
        showToast('Geolokalizacja nie jest wspierana', 'error');
        resolve(null);
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve([position.coords.latitude, position.coords.longitude]);
          showToast('Lokalizacja pobrana');
        },
        () => {
          showToast('Nie udało się pobrać lokalizacji', 'error');
          resolve(null);
        }
      );
    });
  }, [showToast]);

  const handleAddPlace = useCallback(async (placeData: {
    name: string;
    type: PlaceType;
    lat: number;
    lng: number;
    description: string;
    features: string[];
    image?: string;
    regulation_link?: string;
  }) => {
    const newPlace: Place = {
      ...placeData,
      id: Date.now(),
      rating: 0,
      reviews: 0,
      isLegal: placeData.features.includes('legal') || placeData.type === 'zanocuj',
      isFree: placeData.type !== 'glamping',
    };
    
    await addPlace(newPlace);
    showToast('Miejsce dodane! Dziękujemy.');
  }, [addPlace, showToast]);

  const handleTripClick = useCallback((trip: typeof tripIdeas[0]) => {
    // Would fly to trip location
    showToast('Ładowanie trasy: ' + trip.name);
  }, [showToast]);

  const handleToggleFavorite = useCallback((id: number) => {
    toggleFavorite(id);
    const isFav = favorites.includes(id);
    showToast(isFav ? 'Usunięto z ulubionych' : 'Dodano do ulubionych');
  }, [toggleFavorite, favorites, showToast]);

  const handleAddToRoute = useCallback((id: number) => {
    addToRoute(id);
    showToast('Dodano do trasy');
  }, [addToRoute, showToast]);

  return (
    <main className="relative w-full h-screen overflow-hidden">
      {/* Loading Screen */}
      <LoadingScreen />

      {/* Offline Indicator */}
      <OfflineIndicator />

      {/* Map */}
      <div className="absolute inset-0 z-0">
        <LeafletMap
          places={filteredPlaces}
          favorites={favorites}
          route={route}
          onToggleFavorite={handleToggleFavorite}
          onAddToRoute={handleAddToRoute}
          enableOSM={true}
        />
      </div>

      {/* Sidebar */}
      <Sidebar
        places={filteredPlaces}
        favorites={favorites}
        route={route}
        stats={stats}
        onToggleFavorite={handleToggleFavorite}
        onRemoveFromRoute={removeFromRoute}
        onClearRoute={clearRoute}
        onFlyToPlace={handleFlyToPlace}
        onOpenAddModal={() => setIsAddModalOpen(true)}
        onSearch={handleSearch}
        onLocate={getPosition}
      />

      {/* Filter Panel */}
      <FilterPanel
        filters={filters}
        onUpdateFilters={updateFilters}
        onResetFilters={resetFilters}
      />

      {/* Trip Ideas */}
      <TripIdeasPanel
        trips={tripIdeas}
        onTripClick={handleTripClick}
      />

      {/* Legal Disclaimer */}
      <LegalDisclaimer />

      {/* Modals */}
      <AddPlaceModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddPlace}
        onGetLocation={handleGetLocation}
      />

      {/* Toasts */}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </main>
  );
}
