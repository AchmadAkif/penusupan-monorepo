'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X } from 'lucide-react';

interface NewsSearchWidgetProps {
  value?: string;
  onChange?: (val: string) => void;
  className?: string;
}

export function NewsSearchWidget({
  value: controlledValue,
  onChange,
  className,
}: NewsSearchWidgetProps) {
  const router = useRouter();
  const [internalValue, setInternalValue] = useState('');

  const isControlled = controlledValue !== undefined && onChange !== undefined;
  const currentValue = isControlled ? controlledValue : internalValue;

  const handleChange = (val: string) => {
    if (isControlled) {
      onChange(val);
    } else {
      setInternalValue(val);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isControlled && currentValue.trim()) {
      router.push(`/news?q=${encodeURIComponent(currentValue.trim())}`);
    }
  };

  return (
    <div
      className={`rounded-2xl bg-white border border-stone-200/90 p-5 shadow-xs space-y-3 ${
        className || ''
      }`}
    >
      <div className="flex items-center gap-2">
        <div className="w-1.5 h-4 bg-gold rounded-full" />
        <h3 className="font-heading font-bold text-sm uppercase tracking-wider text-navy">
          Pencarian
        </h3>
      </div>

      <form onSubmit={handleSubmit} className="relative">
        <Search
          size={16}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none"
        />
        <input
          type="text"
          value={currentValue}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="Cari judul atau topik..."
          className="w-full pl-10 pr-9 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm text-navy placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy transition-all duration-200"
        />
        {currentValue && (
          <button
            type="button"
            onClick={() => handleChange('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 transition-colors p-0.5"
            aria-label="Hapus pencarian"
          >
            <X size={15} />
          </button>
        )}
      </form>
    </div>
  );
}
