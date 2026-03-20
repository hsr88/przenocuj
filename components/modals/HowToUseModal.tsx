'use client';

import { X, MapPin, Search, Crosshair, Heart, Route, PlusCircle, ZoomIn } from 'lucide-react';

interface HowToUseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function HowToUseModal({ isOpen, onClose }: HowToUseModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-forest-800 flex items-center gap-2">
              <span className="text-3xl">🗺️</span>
              Jak używać mapy?
            </h2>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-forest-100 rounded-lg transition-colors"
            >
              <X size={20} className="text-forest-500" />
            </button>
          </div>

          <div className="space-y-4 text-gray-700">
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <ZoomIn className="text-amber-600 shrink-0 mt-0.5" size={20} />
                <div>
                  <h3 className="font-semibold text-amber-800 mb-1">Przybliż aby zobaczyć punkty</h3>
                  <p className="text-sm text-amber-700">
                    Miejsca ładują się dynamicznie z bazy OpenStreetMap. Przybliż mapę (zoom +8) aby 
                    zobaczyć dostępne pola namiotowe, campingi i miejsca biwakowe.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-forest-50 rounded-lg">
                <Search className="text-forest-600 shrink-0" size={18} />
                <div>
                  <h4 className="font-medium text-forest-800 text-sm">Wyszukiwanie</h4>
                  <p className="text-xs text-forest-600">
                    Użyj pola na górze panelu, aby znaleźć konkretne miejsce lub region.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-forest-50 rounded-lg">
                <Crosshair className="text-forest-600 shrink-0" size={18} />
                <div>
                  <h4 className="font-medium text-forest-800 text-sm">Twoja lokalizacja</h4>
                  <p className="text-xs text-forest-600">
                    Kliknij ikonę celownika przy polu wyszukiwania, aby znaleźć miejsca w pobliżu Ciebie.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-forest-50 rounded-lg">
                <Heart className="text-forest-600 shrink-0" size={18} />
                <div>
                  <h4 className="font-medium text-forest-800 text-sm">Ulubione</h4>
                  <p className="text-xs text-forest-600">
                    Kliknij serduszko na znaczniku, aby zapisać miejsce na swojej liście.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-forest-50 rounded-lg">
                <Route className="text-forest-600 shrink-0" size={18} />
                <div>
                  <h4 className="font-medium text-forest-800 text-sm">Planuj trasę</h4>
                  <p className="text-xs text-forest-600">
                    Dodawaj miejsca do trasy, aby zaplanować swoją wycieczkę.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-forest-50 rounded-lg">
                <PlusCircle className="text-forest-600 shrink-0" size={18} />
                <div>
                  <h4 className="font-medium text-forest-800 text-sm">Dodaj miejsce</h4>
                  <p className="text-xs text-forest-600">
                    Znasz fajne miejsce, którego nie ma na mapie? Dodaj je!
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-forest-50 rounded-lg">
                <MapPin className="text-forest-600 shrink-0" size={18} />
                <div>
                  <h4 className="font-medium text-forest-800 text-sm">Filtry</h4>
                  <p className="text-xs text-forest-600">
                    Użyj panelu filtrów, aby pokazać tylko darmowe miejsca, legalne campingi, 
                    miejsca dla vanów itp.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mt-4">
              <h3 className="font-semibold text-blue-800 mb-2">💡 Wskazówka</h3>
              <p className="text-sm text-blue-700">
                Im bliżej przybliżysz mapę, tym więcej szczegółów zobaczysz. 
                Niektóre miejsca mogą być ukryte przy dużym oddaleniu – przybliż aby odkryć wszystkie!
              </p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="w-full mt-6 py-3 bg-forest-600 hover:bg-forest-700 text-white font-medium rounded-xl transition-colors"
          >
            Rozumiem, jedziem! 🚐
          </button>
        </div>
      </div>
    </div>
  );
}
