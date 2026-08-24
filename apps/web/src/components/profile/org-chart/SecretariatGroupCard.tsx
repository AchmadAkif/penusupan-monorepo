'use client';

import { Briefcase } from 'lucide-react';
import { OfficialCard } from './OfficialCard';
import type { OfficialItem } from '@/types/profile';

interface SecretariatGroupCardProps {
  secretary?: OfficialItem | null;
  kaurs: OfficialItem[];
  className?: string;
}

export function SecretariatGroupCard({
  secretary,
  kaurs,
  className,
}: SecretariatGroupCardProps) {
  return (
    <div
      className={`rounded-3xl bg-linen/60 border border-stone-200/90 p-6 sm:p-8 lg:p-10 space-y-8 shadow-xs ${
        className || ''
      }`}
    >
      {/* ── Section Title ── */}
      <div className="text-center space-y-1">
        <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-navy/70">
          <Briefcase size={12} className="text-navy" />
          Pimpinan Sekretariat & Urusan Umum
        </span>
        <h3 className="font-heading font-bold text-lg sm:text-xl text-navy">
          Sekretariat Desa
        </h3>
      </div>

      {/* ── Sekretaris Desa (Centered) ── */}
      {secretary && (
        <div className="flex flex-col items-center mb-6">
          <OfficialCard
            official={secretary}
            size="md"
            className="max-w-xs w-full"
          />
        </div>
      )}

      {/* ── 3 Kepala Urusan (Kaur Sub-grid) ── */}
      <div className="space-y-4">
        <p className="text-center text-xs font-semibold text-stone-500 uppercase tracking-wider">
          Kepala Urusan (Kaur)
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {kaurs.map((kaur) => (
            <OfficialCard key={kaur.id} official={kaur} size="sm" />
          ))}
        </div>
      </div>
    </div>
  );
}
