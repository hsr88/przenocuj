'use client';

import { useState } from 'react';
import { ChevronRight, ChevronLeft, Filter } from 'lucide-react';
import { Checkbox } from '@/components/ui/Checkbox';
import { Button } from '@/components/ui/Button';
import { Filters, PlaceType } from '@/types';

interface FilterPanelProps {
  filters: Filters;
  onUpdateFilters: (filters: Partial<Filters>) => void;
  onResetFilters: () => void;
}

const typeFilters: { value: PlaceType; label: string; color: string }[] = [
  { value: 'free', label: 'Darmowe / Wild camping', color: 'bg-green-500' },
  { value: 'zanocuj', label: 'Zanocuj w lesie', color: 'bg-green-600' },
  { value: 'van', label: 'Van / Camper friendly', color: 'bg-blue-500' },
  { value: 'glamping', label: 'Glamping', color: 'bg-purple-500' },
  { value: 'bike', label: 'Bike-friendly', color: 'bg-orange-500' },
  { value: 'warning', label: 'Strefy zakazane', color: 'bg-red-500' },
];

export function FilterPanel({ filters, onUpdateFilters, onResetFilters }: FilterPanelProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleType = (type: PlaceType) => {
    const newTypes = filters.types.includes(type)
      ? filters.types.filter(t => t !== type)
      : [...filters.types, type];
    onUpdateFilters({ types: newTypes });
  };

  return (
    <aside className={`
      fixed right-4 top-4 glass rounded-2xl shadow-2xl z-[1000]
      transition-all duration-300 max-h-[calc(100vh-8rem)] overflow-y-auto
      ${isCollapsed ? 'w-12' : 'w-72'}
    `}>
      <div className="p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          {!isCollapsed && (
            <h2 className="text-sm font-bold text-forest-800 flex items-center gap-2">
              <Filter size={16} className="text-forest-500" />
              Filtry
            </h2>
          )}
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1.5 text-forest-500 hover:bg-forest-100 rounded-lg ml-auto"
          >
            {isCollapsed ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
          </button>
        </div>

        {!isCollapsed && (
          <div className="space-y-4">
            {/* Type filters */}
            <div>
              <h3 className="text-xs font-semibold text-forest-600 uppercase tracking-wide mb-2">
                Typ miejsca
              </h3>
              <div className="space-y-2">
                {typeFilters.map(({ value, label, color }) => (
                  <Checkbox
                    key={value}
                    checked={filters.types.includes(value)}
                    onChange={() => toggleType(value)}
                    label={
                      <span className="flex items-center gap-1.5">
                        <span className={`w-3 h-3 rounded-full ${color}`} />
                        {label}
                      </span>
                    }
                  />
                ))}
              </div>
            </div>

            {/* Feature filters */}
            <div className="border-t border-forest-100 pt-3">
              <h3 className="text-xs font-semibold text-forest-600 uppercase tracking-wide mb-2">
                Cechy
              </h3>
              <div className="space-y-2">
                <Checkbox
                  checked={filters.legalOnly}
                  onChange={(checked) => onUpdateFilters({ legalOnly: checked })}
                  label="Tylko legalne"
                />
                <Checkbox
                  checked={filters.dogFriendly}
                  onChange={(checked) => onUpdateFilters({ dogFriendly: checked })}
                  label="🐕 Z psem"
                />
                <Checkbox
                  checked={filters.soloSafe}
                  onChange={(checked) => onUpdateFilters({ soloSafe: checked })}
                  label="👤 Solo safe"
                />
                <Checkbox
                  checked={filters.trueWild}
                  onChange={(checked) => onUpdateFilters({ trueWild: checked })}
                  label="🔌 Bez prądu/wody (true wild)"
                />
              </div>
            </div>

            {/* Distance slider */}
            <div className="border-t border-forest-100 pt-3">
              <h3 className="text-xs font-semibold text-forest-600 uppercase tracking-wide mb-2">
                Odległość od trasy EuroVelo
              </h3>
              <input
                type="range"
                min="0"
                max="100"
                value={filters.maxDistance}
                onChange={(e) => onUpdateFilters({ maxDistance: parseInt(e.target.value) })}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-forest-500 mt-1">
                <span>0 km</span>
                <span>{filters.maxDistance} km</span>
              </div>
            </div>

            {/* Reset */}
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onResetFilters}
              className="w-full"
            >
              Resetuj filtry
            </Button>
          </div>
        )}
      </div>
    </aside>
  );
}
