'use client';

import { useState } from 'react';
import { 
  Menu, X, Search, Crosshair, Heart, Route, PlusCircle, Crown, MapPin, HelpCircle
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Place } from '@/types';
import { getTypeEmoji } from '@/lib/utils';

interface SidebarProps {
  places: Place[];
  favorites: number[];
  route: number[];
  stats: { total: number; free: number; van: number };
  onToggleFavorite: (id: number) => void;
  onRemoveFromRoute: (id: number) => void;
  onClearRoute: () => void;
  onFlyToPlace: (place: Place) => void;
  onOpenAddModal: () => void;
  onSearch: (query: string) => void;
  onLocate: () => void;
  onOpenHowToUse?: () => void;
}

export function Sidebar({
  places,
  favorites,
  route,
  stats,
  onToggleFavorite,
  onRemoveFromRoute,
  onClearRoute,
  onFlyToPlace,
  onOpenAddModal,
  onSearch,
  onLocate,
  onOpenHowToUse,
}: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const favPlaces = places.filter(p => favorites.includes(p.id));
  const routePlaces = places.filter(p => route.includes(p.id));

  const handleSearch = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSearch(searchQuery);
    }
  };

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-[1100] md:hidden p-2 bg-white rounded-lg shadow-lg"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar */}
      <aside className={`
        fixed left-4 top-4 bottom-4 w-80 glass rounded-2xl shadow-2xl z-[1000]
        transition-transform duration-300 flex flex-col max-h-[calc(100vh-2rem)]
        ${isOpen ? 'translate-x-0' : '-translate-x-[calc(100%+2rem)]'} 
        md:translate-x-0
      `}>
        {/* Header */}
        <div className="p-4 border-b border-forest-100">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-3xl">🏕️</span>
            <div>
              <h1 className="text-xl font-bold text-forest-800">Przenocuj<span className="text-forest-500">.eu</span></h1>
              <p className="text-xs text-forest-500">Noclegi w naturze</p>
            </div>
          </div>

          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Szukaj miejsca, regionu..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearch}
              className="w-full pl-10 pr-10 py-2.5 bg-forest-50 border border-forest-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-forest-400"
            />
            <Search className="absolute left-3.5 top-3 text-forest-400" size={16} />
            <button 
              onClick={onLocate}
              className="absolute right-2 top-2 p-1.5 text-forest-500 hover:bg-forest-200 rounded-lg transition-colors"
              title="Moja lokalizacja"
            >
              <Crosshair size={16} />
            </button>
          </div>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Stats */}
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-forest-50 rounded-xl p-2 text-center">
              <div className="text-lg font-bold text-forest-600">{stats.total}</div>
              <div className="text-[10px] text-forest-500 uppercase tracking-wide">Miejsc</div>
            </div>
            <div className="bg-green-50 rounded-xl p-2 text-center">
              <div className="text-lg font-bold text-green-600">{stats.free}</div>
              <div className="text-[10px] text-green-600 uppercase tracking-wide">Darmowe</div>
            </div>
            <div className="bg-blue-50 rounded-xl p-2 text-center">
              <div className="text-lg font-bold text-blue-600">{stats.van}</div>
              <div className="text-[10px] text-blue-600 uppercase tracking-wide">Van</div>
            </div>
          </div>

          {/* Favorites */}
          <div className="border-t border-forest-100 pt-4">
            <h3 className="text-sm font-semibold text-forest-700 mb-3 flex items-center gap-2">
              <Heart size={16} className="text-red-400" />
              Moja lista
            </h3>
            <div className="space-y-2">
              {favPlaces.length === 0 ? (
                <p className="text-sm text-forest-400 italic">Brak zapisanych miejsc</p>
              ) : (
                favPlaces.map(place => (
                  <div 
                    key={place.id}
                    className="flex items-center justify-between p-2 bg-forest-50 rounded-lg hover:bg-forest-100 cursor-pointer"
                    onClick={() => onFlyToPlace(place)}
                  >
                    <div className="flex items-center gap-2">
                      <span>{getTypeEmoji(place.type)}</span>
                      <span className="text-sm text-forest-800 truncate max-w-[140px]">{place.name}</span>
                    </div>
                    <button 
                      onClick={(e) => { e.stopPropagation(); onToggleFavorite(place.id); }}
                      className="text-red-400 hover:text-red-600"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Route */}
          <div className="border-t border-forest-100 pt-4">
            <h3 className="text-sm font-semibold text-forest-700 mb-3 flex items-center gap-2">
              <Route size={16} className="text-forest-500" />
              Moja trasa
            </h3>
            <div className="space-y-2">
              {routePlaces.length === 0 ? (
                <p className="text-sm text-forest-400 italic">Dodaj miejsca do trasy</p>
              ) : (
                routePlaces.map((place, idx) => (
                  <div key={place.id} className="flex items-center gap-2 p-2 bg-forest-50 rounded-lg">
                    <span className="w-5 h-5 bg-forest-600 text-white rounded-full flex items-center justify-center text-xs">
                      {idx + 1}
                    </span>
                    <span className="text-sm text-forest-800 truncate flex-1">{place.name}</span>
                    <button 
                      onClick={() => onRemoveFromRoute(place.id)}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))
              )}
            </div>
            {routePlaces.length > 0 && (
              <button 
                onClick={onClearRoute}
                className="mt-2 w-full py-2 text-xs text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              >
                Wyczyść trasę
              </button>
            )}
          </div>

          {/* How to use */}
          {onOpenHowToUse && (
            <button 
              onClick={onOpenHowToUse}
              className="w-full flex items-center justify-center gap-2 py-2.5 bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200 rounded-xl transition-colors text-sm font-medium"
            >
              <HelpCircle size={18} />
              Jak używać?
            </button>
          )}

          {/* Add Place */}
          <Button onClick={onOpenAddModal} className="w-full flex items-center justify-center gap-2">
            <PlusCircle size={18} />
            Dodaj nowe miejsce
          </Button>

          {/* Open Source */}
          <div className="bg-gradient-to-r from-gray-100 to-gray-200 rounded-xl p-4 border border-gray-300">
            <div className="flex items-start gap-3">
              <svg className="w-6 h-6 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-800 text-sm">Open Source</h4>
                <p className="text-xs text-gray-600 mt-1">Projekt dostępny na GitHub</p>
                <a 
                  href="https://github.com/hsr88/przenocuj"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 w-full flex items-center justify-center gap-1 text-xs bg-gray-800 hover:bg-gray-900 text-white py-2 rounded-lg transition-colors"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                  Zobacz kod
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-forest-100 bg-forest-50/50">
          <div className="flex flex-wrap gap-2 text-xs text-forest-500">
            <a href="/o-nas/" className="hover:text-forest-700 transition-colors">O nas</a>
            <span>•</span>
            <a href="/polityka-prywatnosci/" className="hover:text-forest-700 transition-colors">Polityka prywatności</a>
            <span>•</span>
            <a href="/regulamin/" className="hover:text-forest-700 transition-colors">Regulamin</a>
          </div>
          <p className="text-[10px] text-forest-400 mt-2">
            © 2025 Przenocuj.eu • kontakt@hsr.gg
          </p>
        </div>
      </aside>
    </>
  );
}
