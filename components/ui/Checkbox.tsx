'use client';

import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

interface CheckboxProps {
  id?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: React.ReactNode;
  className?: string;
}

export function Checkbox({ id, checked, onChange, label, className }: CheckboxProps) {
  return (
    <label className={cn('flex items-center gap-2 cursor-pointer', className)}>
      <div className="relative">
        <input
          type="checkbox"
          id={id}
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only"
        />
        <div className={cn(
          'w-4 h-4 rounded border transition-colors',
          checked ? 'bg-forest-600 border-forest-600' : 'border-forest-300 bg-white'
        )}>
          {checked && (
            <Check size={12} className="text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          )}
        </div>
      </div>
      {label && <span className="text-sm text-forest-700">{label}</span>}
    </label>
  );
}
