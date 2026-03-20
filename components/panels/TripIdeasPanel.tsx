'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, MapPinned } from 'lucide-react';
import { TripIdea } from '@/types';

interface TripIdeasPanelProps {
  trips: TripIdea[];
  onTripClick: (trip: TripIdea) => void;
}

export function TripIdeasPanel({ trips, onTripClick }: TripIdeasPanelProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="fixed left-4 right-4 bottom-4 md:left-88 md:right-80 glass-dark rounded-2xl shadow-2xl z-[1000]">
      <div className="p-3">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <MapPinned size={16} className="text-amber-400" />
            Pomysły na wyprawy
          </h2>
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1.5 text-forest-300 hover:text-white transition-colors"
          >
            {isCollapsed ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        </div>

        {/* Trip cards */}
        {!isCollapsed && (
          <div className="flex gap-3 overflow-x-auto pb-2 scroll-smooth snap-x">
            {trips.map(trip => (
              <div
                key={trip.id}
                onClick={() => onTripClick(trip)}
                className={`trip-card min-w-[280px] bg-gradient-to-br ${trip.gradient} rounded-xl p-3 cursor-pointer hover:opacity-90 transition-opacity snap-start`}
              >
                <div className="flex items-start justify-between mb-2">
                  <span className="text-xs font-medium text-white/80">{trip.duration}</span>
                  <span className="text-lg">{trip.icon}</span>
                </div>
                <h3 className="text-sm font-bold text-white mb-1">{trip.name}</h3>
                <p className="text-xs text-white/70">{trip.description}</p>
                <div className="flex items-center gap-1 mt-2">
                  {trip.tags.map(tag => (
                    <span key={tag} className="text-[10px] bg-white/20 text-white/90 px-1.5 py-0.5 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
