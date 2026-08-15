'use client';

import { motion } from 'motion/react';
import { Target } from 'lucide-react';
import { Eyebrow } from '@/components/Eyebrow';
import { MissionCard } from './MissionCard';
import { scaleIn, staggerContainer } from '@/constants/animation';
import { DEFAULT_VISION_MISSION } from '@/constants/seedData';
import type { VisionMissionSectionProps } from '@/types/home';

export function VisionMissionSection({
  visionMission = DEFAULT_VISION_MISSION,
  className,
}: VisionMissionSectionProps) {
  return (
    <section className={`py-20 lg:py-28 bg-linen/50 overflow-hidden ${className || ''}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* ── 1. Vision Spotlight Banner ── */}
        <motion.div
          variants={scaleIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="relative rounded-3xl bg-navy text-white p-8 sm:p-10 lg:p-14 shadow-2xl overflow-hidden"
        >
          {/* Ambient Lighting & Pattern */}
          <div className="absolute inset-0 hero-pattern pointer-events-none opacity-40" />
          <div className="absolute -top-24 -right-24 w-80 h-80 bg-gold/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-4xl mx-auto text-center space-y-5">
            {/* Eyebrow */}
            <Eyebrow
              label="Visi Desa Penusupan"
              icon={Target}
              variant="glass"
            />

            {/* Vision Quote Text */}
            <blockquote className="font-heading font-bold text-xl sm:text-2xl md:text-3xl lg:text-3xl text-white leading-relaxed tracking-tight">
              &ldquo;{visionMission.vision}&rdquo;
            </blockquote>

            <p className="font-body text-xs sm:text-sm text-white/60 pt-2">
              Arah Pembangunan Jangka Menengah & Panjang Desa Penusupan
            </p>
          </div>
        </motion.div>

        {/* ── 2. Mission Strategic Grid (8 Points) ── */}
        <div className="space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h3 className="font-heading font-bold text-2xl sm:text-3xl text-navy">
              Misi Pembangunan Desa
            </h3>
            <p className="font-body text-stone-600 text-sm sm:text-base">
              8 pilar langkah strategis untuk mewujudkan visi kemajuan dan kesejahteraan masyarakat Desa Penusupan.
            </p>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {visionMission.missions.map((mission) => (
              <MissionCard key={mission.id} mission={mission} />
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
}
