'use client';

import { useState, useEffect } from 'react';

export function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-forest-600 z-[9999] flex flex-col items-center justify-center transition-opacity duration-500">
      <div className="text-6xl mb-4">🏕️</div>
      <h1 className="text-white text-2xl font-bold mb-2">Przenocuj.eu</h1>
      <p className="text-forest-200 mb-6">Ładowanie mapy noclegów...</p>
      <div className="w-10 h-10 border-3 border-forest-400 border-t-transparent rounded-full animate-spin" />
    </div>
  );
}
