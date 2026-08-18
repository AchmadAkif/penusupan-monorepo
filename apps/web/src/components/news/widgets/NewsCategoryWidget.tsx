'use client';

import Link from 'next/link';
import { Tag, ChevronRight } from 'lucide-react';

interface NewsCategoryWidgetProps {
  categories: string[];
  selectedCategory?: string;
  onSelectCategory?: (category: string) => void;
  categoryCounts?: Record<string, number>;
  className?: string;
}

export function NewsCategoryWidget({
  categories,
  selectedCategory = 'Semua',
  onSelectCategory,
  categoryCounts,
  className,
}: NewsCategoryWidgetProps) {
  return (
    <div
      className={`rounded-2xl bg-white border border-stone-200/90 p-5 shadow-xs space-y-3 ${
        className || ''
      }`}
    >
      <div className="flex items-center gap-2">
        <Tag size={15} className="text-gold" />
        <h3 className="font-heading font-bold text-sm uppercase tracking-wider text-navy">
          Kategori
        </h3>
      </div>

      <div className="space-y-1 pt-1">
        {categories.map((cat) => {
          const isSelected = selectedCategory.toLowerCase() === cat.toLowerCase();
          const count = categoryCounts ? categoryCounts[cat] : undefined;

          const content = (
            <>
              <div className="flex items-center gap-2">
                <ChevronRight
                  size={14}
                  className={isSelected ? 'text-gold' : 'text-stone-400'}
                />
                <span>{cat}</span>
              </div>

              {count !== undefined && (
                <span
                  className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                    isSelected
                      ? 'bg-white/20 text-white'
                      : 'bg-stone-100 text-stone-500'
                  }`}
                >
                  {count}
                </span>
              )}
            </>
          );

          const baseClass = `w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 text-left ${
            isSelected
              ? 'bg-navy text-white shadow-xs font-semibold'
              : 'text-stone-600 hover:text-navy hover:bg-stone-100/80'
          }`;

          if (onSelectCategory) {
            return (
              <button
                key={cat}
                type="button"
                onClick={() => onSelectCategory(cat)}
                className={baseClass}
              >
                {content}
              </button>
            );
          }

          return (
            <Link
              key={cat}
              href={cat === 'Semua' ? '/news' : `/news?category=${encodeURIComponent(cat)}`}
              className={baseClass}
            >
              {content}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
