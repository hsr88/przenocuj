'use client';

import { useState, useEffect } from 'react';
import { X, AlertTriangle, Github, Mail } from 'lucide-react';

export function AlphaBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem('alphaBannerDismissed');
    if (!dismissed) {
      setIsVisible(true);
    }
  }, []);

  const dismiss = () => {
    localStorage.setItem('alphaBannerDismissed', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[3000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full animate-in fade-in zoom-in duration-300">
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-100 rounded-lg">
                <AlertTriangle className="text-amber-600" size={24} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800">Wczesna wersja Alpha</h2>
                <p className="text-sm text-gray-500">Projekt w fazie rozwoju</p>
              </div>
            </div>
            <button 
              onClick={dismiss}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X size={20} className="text-gray-400" />
            </button>
          </div>

          <div className="space-y-4">
            <p className="text-gray-700 leading-relaxed">
              Przenocuj.eu jest w wczesnej fazie alpha. Wszystko może się zmienić, 
              a niektóre funkcje mogą nie działać perfekcyjnie.
            </p>

            <div className="bg-forest-50 border border-forest-200 rounded-xl p-4">
              <h3 className="font-semibold text-forest-800 mb-3 flex items-center gap-2">
                💬 Masz pomysł lub znalazłeś błąd?
              </h3>
              <p className="text-sm text-forest-700 mb-3">
                Twoja opinia jest dla nas bezcenna! Pomóż nam ulepszyć narzędzie.
              </p>
              
              <div className="space-y-2">
                <a 
                  href="https://github.com/hsr88/przenocuj/issues/new"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={dismiss}
                  className="flex items-center gap-2 p-3 bg-white hover:bg-gray-50 border border-forest-200 rounded-lg transition-colors text-sm"
                >
                  <Github size={18} className="text-gray-700" />
                  <span className="text-gray-700">Zgłoś na GitHub</span>
                </a>
                
                <a 
                  href="mailto:kontakt@hsr.gg"
                  onClick={dismiss}
                  className="flex items-center gap-2 p-3 bg-white hover:bg-gray-50 border border-forest-200 rounded-lg transition-colors text-sm"
                >
                  <Mail size={18} className="text-forest-600" />
                  <span className="text-gray-700">kontakt@hsr.gg</span>
                </a>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              Aktywny rozwój • Nowe funkcje wkrótce
            </div>
          </div>

          <button 
            onClick={dismiss}
            className="w-full mt-6 py-3 bg-forest-600 hover:bg-forest-700 text-white font-medium rounded-xl transition-colors"
          >
            Rozpocznij eksplorację 🏕️
          </button>
        </div>
      </div>
    </div>
  );
}
