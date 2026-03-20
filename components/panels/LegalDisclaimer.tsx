'use client';

import { useState } from 'react';
import { AlertTriangle, X } from 'lucide-react';

export function LegalDisclaimer() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-20 left-4 right-4 md:left-88 md:right-80 bg-red-50 border border-red-200 rounded-xl p-3 z-[999] shadow-lg">
      <div className="flex items-start gap-3">
        <AlertTriangle className="text-red-500 mt-0.5 flex-shrink-0" size={18} />
        <div className="flex-1">
          <p className="text-xs text-red-700">
            <strong>Uwaga prawna:</strong> Nie ponosimy odpowiedzialności za mandaty czy kary. 
            Zawsze sprawdzaj aktualne przepisy lokalne. Wild camping może być nielegalny w niektórych krajach.
          </p>
        </div>
        <button 
          onClick={() => setIsVisible(false)}
          className="text-red-400 hover:text-red-600 flex-shrink-0"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
}
