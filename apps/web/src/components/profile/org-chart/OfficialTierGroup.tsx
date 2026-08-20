'use client';

import type { LucideIcon } from 'lucide-react';
import { OfficialCard } from './OfficialCard';
import type { OfficialItem } from '@/types/profile';

interface OfficialTierGroupProps {
  badgeLabel: string;
  badgeIcon: LucideIcon;
  badgeVariant?: 'emerald' | 'amber' | 'blue' | 'navy';
  officials: OfficialItem[];
  cardSize?: 'sm' | 'md' | 'lg';
  gridClassName?: string;
  className?: string;
}

const badgeVariants = {
  emerald: 'bg-emerald-50 text-emerald-800 border-emerald-200/80',
  amber: 'bg-amber-50 text-amber-900 border-amber-200/80',
  blue: 'bg-blue-50 text-blue-800 border-blue-200/80',
  navy: 'bg-navy/5 text-navy border-navy/20',
};

export function OfficialTierGroup({
  badgeLabel,
  badgeIcon: BadgeIcon,
  badgeVariant = 'emerald',
  officials,
  cardSize = 'md',
  gridClassName = 'grid-cols-1 md:grid-cols-3 gap-6',
  className,
}: OfficialTierGroupProps) {
  return (
    <div className={`space-y-6 ${className || ''}`}>
      {/* ── Section Divider Badge ── */}
      <div className="flex items-center gap-3">
        <div className="h-px bg-stone-200 flex-1" />
        <span
          className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold border shadow-2xs ${badgeVariants[badgeVariant]}`}
        >
          <BadgeIcon size={13} />
          <span>{badgeLabel}</span>
        </span>
        <div className="h-px bg-stone-200 flex-1" />
      </div>

      {/* ── Officials Card Grid ── */}
      <div className={`grid ${gridClassName}`}>
        {officials.map((official) => (
          <OfficialCard
            key={official.id}
            official={official}
            size={cardSize}
          />
        ))}
      </div>
    </div>
  );
}
