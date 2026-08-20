'use client';

import { motion } from 'motion/react';
import { Users, Building2, Layers } from 'lucide-react';
import { Eyebrow } from '@/components/Eyebrow';
import { OfficialCard } from './OfficialCard';
import { SecretariatGroupCard } from './SecretariatGroupCard';
import { OfficialTierGroup } from './OfficialTierGroup';
import { staggerContainer } from '@/constants/animation';
import { DEFAULT_ORG_STRUCTURE } from '@/constants/seedData';
import type { OrgChartSectionProps } from '@/types/profile';

export function OrgChartSection({
  data = DEFAULT_ORG_STRUCTURE,
  className,
}: OrgChartSectionProps) {
  return (
    <section
      id="struktur"
      className={`py-20 lg:py-28 bg-white border-t border-stone-200/80 overflow-hidden ${
        className || ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* ── Section Header ── */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="flex justify-center">
            <Eyebrow label="Pemerintahan Desa" icon={Building2} />
          </div>
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-4xl text-navy tracking-tight">
            Struktur Organisasi & Tata Kerja Desa
          </h2>
          <p className="font-body text-stone-600 text-sm sm:text-base leading-relaxed">
            Bagan susunan kepengurusan, perangkat kesekretariatan, pelaksana teknis, serta kepala dusun penunjang pelayanan masyarakat Desa Penusupan.
          </p>
        </div>

        {/* ── Hierarchy Card Composition ── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="space-y-14 max-w-6xl mx-auto"
        >
          
          {/* ════ LEVEL 1: KEPALA DESA (PIMPINAN UTAMA) ════ */}
          <div className="flex flex-col items-center">
            <OfficialCard
              official={data.head}
              size="lg"
              highlight={true}
              className="max-w-md w-full"
            />
          </div>

          {/* ════ LEVEL 2: SEKRETARIAT DESA (SEKDES & KAUR) ════ */}
          <SecretariatGroupCard
            secretary={data.secretary}
            kaurs={data.kaurs}
          />

          {/* ════ LEVEL 3: PELAKSANA TEKNIS (KASI) ════ */}
          <OfficialTierGroup
            badgeLabel="Pelaksana Teknis (Kasi)"
            badgeIcon={Layers}
            badgeVariant="emerald"
            officials={data.kasis}
            cardSize="md"
            gridClassName="grid-cols-1 md:grid-cols-3 gap-6"
          />

          {/* ════ LEVEL 4: PELAKSANA KEWILAYAHAN (KADUS I – V) ════ */}
          <OfficialTierGroup
            badgeLabel="Pelaksana Kewilayahan (Kepala Dusun I – V)"
            badgeIcon={Users}
            badgeVariant="amber"
            officials={data.kaduses}
            cardSize="sm"
            gridClassName="grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"
          />

        </motion.div>

      </div>
    </section>
  );
}

export default OrgChartSection;
