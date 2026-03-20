'use client';

import { useState, useEffect } from 'react';

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookieConsent', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-forest-900/95 backdrop-blur-sm border-t border-forest-700 p-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-white/90 text-sm text-center sm:text-left">
          Ta strona używa plików cookie do analizy ruchu (Google Analytics). 
          Korzystając ze strony, zgadzasz się na ich użycie.{' '}
          <a href="/polityka-prywatnosci/" className="text-forest-300 hover:text-forest-200 underline">
            Polityka prywatności
          </a>
        </p>
        <div className="flex gap-2 shrink-0">
          <button
            onClick={acceptCookies}
            className="px-4 py-2 bg-forest-600 hover:bg-forest-500 text-white text-sm font-medium rounded-lg transition-colors"
          >
            Akceptuję
          </button>
        </div>
      </div>
    </div>
  );
}
