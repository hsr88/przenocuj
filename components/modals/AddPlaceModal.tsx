'use client';

import { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { MapPin } from 'lucide-react';
import { PlaceType } from '@/types';

interface AddPlaceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (place: {
    name: string;
    type: PlaceType;
    lat: number;
    lng: number;
    description: string;
    features: string[];
    image?: string;
    regulation_link?: string;
  }) => void;
  onGetLocation: () => Promise<[number, number] | null>;
}

const typeOptions = [
  { value: 'free', label: '🌲 Darmowe / Wild camping' },
  { value: 'zanocuj', label: '🏕️ Zanocuj w lesie' },
  { value: 'van', label: '🚐 Van / Camper friendly' },
  { value: 'glamping', label: '🏡 Glamping' },
  { value: 'bike', label: '🚴 Bike-friendly' },
  { value: 'warning', label: '⚠️ Strefa zakazana (ostrzeżenie)' },
];

const featureOptions = [
  { value: 'dog', label: '🐕 Pies' },
  { value: 'solo', label: '👤 Solo safe' },
  { value: 'legal', label: '✅ Legalne' },
  { value: 'water', label: '💧 Woda' },
  { value: 'fire', label: '🔥 Ognisko' },
  { value: 'wc', label: '🚽 WC' },
];

export function AddPlaceModal({ isOpen, onClose, onSubmit, onGetLocation }: AddPlaceModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    type: 'free' as PlaceType,
    lat: '',
    lng: '',
    description: '',
    image: '',
    regulation_link: '',
    features: [] as string[],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      name: formData.name,
      type: formData.type,
      lat: parseFloat(formData.lat),
      lng: parseFloat(formData.lng),
      description: formData.description,
      features: formData.features,
      image: formData.image || undefined,
      regulation_link: formData.regulation_link || undefined,
    });
    setFormData({
      name: '',
      type: 'free',
      lat: '',
      lng: '',
      description: '',
      image: '',
      regulation_link: '',
      features: [],
    });
    onClose();
  };

  const handleGetLocation = async () => {
    const location = await onGetLocation();
    if (location) {
      setFormData(prev => ({
        ...prev,
        lat: location[0].toFixed(6),
        lng: location[1].toFixed(6),
      }));
    }
  };

  const toggleFeature = (feature: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature],
    }));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Dodaj nowe miejsce">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Nazwa miejsca *"
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          required
        />

        <Select
          label="Typ miejsca *"
          value={formData.type}
          onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as PlaceType }))}
          options={typeOptions}
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Opis</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-500"
            placeholder="Opis miejsca, jak dojechać, udogodnienia..."
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Input
            label="Szerokość *"
            type="number"
            step="any"
            value={formData.lat}
            onChange={(e) => setFormData(prev => ({ ...prev, lat: e.target.value }))}
            placeholder="np. 49.2984"
            required
          />
          <Input
            label="Długość *"
            type="number"
            step="any"
            value={formData.lng}
            onChange={(e) => setFormData(prev => ({ ...prev, lng: e.target.value }))}
            placeholder="np. 22.4221"
            required
          />
        </div>

        <Button
          type="button"
          variant="secondary"
          onClick={handleGetLocation}
          className="w-full flex items-center justify-center gap-2"
        >
          <MapPin size={16} />
          Użyj mojej lokalizacji
        </Button>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Cechy</label>
          <div className="flex flex-wrap gap-2">
            {featureOptions.map(({ value, label }) => (
              <label
                key={value}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full cursor-pointer transition-colors ${
                  formData.features.includes(value) 
                    ? 'bg-forest-100 text-forest-700' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <input
                  type="checkbox"
                  checked={formData.features.includes(value)}
                  onChange={() => toggleFeature(value)}
                  className="sr-only"
                />
                <span className="text-sm">{label}</span>
              </label>
            ))}
          </div>
        </div>

        <Input
          label="Link do zdjęcia"
          type="url"
          value={formData.image}
          onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
          placeholder="https://..."
        />

        <Input
          label="Link do regulaminu"
          type="url"
          value={formData.regulation_link}
          onChange={(e) => setFormData(prev => ({ ...prev, regulation_link: e.target.value }))}
          placeholder="https://..."
        />

        <div className="flex gap-3 pt-2">
          <Button type="button" variant="outline" onClick={onClose} className="flex-1">
            Anuluj
          </Button>
          <Button type="submit" className="flex-1">
            Dodaj miejsce
          </Button>
        </div>
      </form>
    </Modal>
  );
}
