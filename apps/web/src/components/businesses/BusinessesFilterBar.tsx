'use client';

import { Tag } from 'lucide-react';
import type { BusinessFilterBarProps } from '@/types/businesses';

export function BusinessesFilterBar({
  categories,
  selectedCategory,
  onSelectCategory,
  categoryCounts,
  className,
}: BusinessFilterBarProps) {
  return (
    <div
      className={`sticky top-20 z-30 bg-white/95 backdrop-blur-md border-b border-stone-200/80 shadow-2xs py-3.5 transition-all duration-200 ${
        className || ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
          <div className="flex items-center gap-1.5 text-xs font-bold text-stone-400 uppercase tracking-wider mr-2 shrink-0">
            <Tag size={13} className="text-gold" />
            <span className="hidden sm:inline">Kategori:</span>
          </div>

          {categories.map((cat) => {
            const isSelected =
              selectedCategory.toLowerCase() === cat.toLowerCase();
            const count = categoryCounts ? categoryCounts[cat] : undefined;

            return (
              <button
                key={cat}
                type="button"
                onClick={() => onSelectCategory(cat)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 whitespace-nowrap cursor-pointer select-none ${
                  isSelected
                    ? 'bg-navy text-white shadow-xs scale-102'
                    : 'bg-stone-100 hover:bg-stone-200 text-stone-600 hover:text-navy'
                }`}
              >
                <span>{cat}</span>
                {count !== undefined && (
                  <span
                    className={`text-[11px] px-1.5 py-0.2 rounded-full font-bold ${
                      isSelected
                        ? 'bg-white/20 text-white'
                        : 'bg-stone-200/80 text-stone-600'
                    }`}
                  >
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default BusinessesFilterBar;
