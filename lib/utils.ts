import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getMarkerIcon(type: string) {
  const icons = {
    free: { class: 'marker-free', icon: 'TreePine', color: '#22c55e' },
    zanocuj: { class: 'marker-free', icon: 'Tent', color: '#16a34a' },
    van: { class: 'marker-van', icon: 'Van', color: '#3b82f6' },
    glamping: { class: 'marker-glamping', icon: 'Star', color: '#a855f7' },
    bike: { class: 'marker-bike', icon: 'Bike', color: '#f97316' },
    warning: { class: 'marker-warning', icon: 'AlertTriangle', color: '#dc2626' }
  };
  
  return icons[type as keyof typeof icons] || icons.free;
}

export function getTypeEmoji(type: string): string {
  const emojis: Record<string, string> = {
    free: '🌲',
    zanocuj: '🏕️',
    van: '🚐',
    glamping: '🏡',
    bike: '🚴',
    warning: '⚠️'
  };
  return emojis[type] || '📍';
}

export function getTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    free: 'Darmowe / Wild',
    zanocuj: 'Zanocuj w lesie',
    van: 'Van / Camper',
    glamping: 'Glamping',
    bike: 'Bike-friendly',
    warning: 'Strefa zakazana'
  };
  return labels[type] || type;
}
