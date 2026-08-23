'use client';

import { motion } from 'motion/react';
import { Users, Building2, Layers, ShieldAlert } from 'lucide-react';
import { Eyebrow } from '@/components/Eyebrow';
import { OfficialCard } from './OfficialCard';
import { SecretariatGroupCard } from './SecretariatGroupCard';
import { OfficialTierGroup } from './OfficialTierGroup';
import { staggerContainer, fadeInUp } from '@/constants/animation';
import type { OrgChartSectionProps } from '@/types/profile';

export function OrgChartSection({
  data,
  className,
}: OrgChartSectionProps) {
  const hasOfficials =
    data &&
    (data.head ||
      data.secretary ||
      data.kaurs.length > 0 ||
      data.kasis.length > 0 ||
      data.kaduses.length > 0);

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

        {hasOfficials ? (
          /* ── Hierarchy Card Composition ── */
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="space-y-14 max-w-6xl mx-auto"
          >
            {/* ════ LEVEL 1: KEPALA DESA (PIMPINAN UTAMA) ════ */}
            {data.head && (
              <div className="flex flex-col items-center">
                <OfficialCard
                  official={data.head}
                  size="lg"
                  highlight={true}
                  className="max-w-md w-full"
                />
              </div>
            )}

            {/* ════ LEVEL 2: SEKRETARIAT DESA (SEKDES & KAUR) ════ */}
            {(data.secretary || data.kaurs.length > 0) && (
              <SecretariatGroupCard
                secretary={data.secretary}
                kaurs={data.kaurs}
              />
            )}

            {/* ════ LEVEL 3: PELAKSANA TEKNIS (KASI) ════ */}
            {data.kasis.length > 0 && (
              <OfficialTierGroup
                badgeLabel="Pelaksana Teknis (Kasi)"
                badgeIcon={Layers}
                badgeVariant="emerald"
                officials={data.kasis}
                cardSize="md"
                gridClassName="grid-cols-1 md:grid-cols-3 gap-6"
              />
            )}

            {/* ════ LEVEL 4: PELAKSANA KEWILAYAHAN (KADUS I – V) ════ */}
            {data.kaduses.length > 0 && (
              <OfficialTierGroup
                badgeLabel="Pelaksana Kewilayahan (Kepala Dusun)"
                badgeIcon={Users}
                badgeVariant="amber"
                officials={data.kaduses}
                cardSize="sm"
                gridClassName="grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"
              />
            )}
          </motion.div>
        ) : (
          /* ── Empty State ── */
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="rounded-3xl bg-linen/60 border border-stone-200/90 p-10 sm:p-14 text-center space-y-4 max-w-xl mx-auto shadow-xs"
          >
            <div className="w-16 h-16 rounded-2xl bg-navy/5 text-navy flex items-center justify-center mx-auto border border-navy/10">
              <Users size={28} className="text-navy" />
            </div>
            <div className="space-y-1.5">
              <h3 className="font-heading font-bold text-lg sm:text-xl text-navy">
                Data Perangkat Desa Sedang Dimutakhirkan
              </h3>
              <p className="font-body text-sm text-stone-500 leading-relaxed">
                Struktur organisasi dan data kepengurusan perangkat Desa Penusupan sedang dalam proses pemutakhiran resmi.
              </p>
            </div>
          </motion.div>
        )}

      </div>
    </section>
  );
}

export default OrgChartSection;
