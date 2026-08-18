'use client';

import { motion } from 'motion/react';
import { Landmark, Compass } from 'lucide-react';
import { Eyebrow } from '@/components/Eyebrow';
import { fadeInUp, staggerContainer } from '@/constants/animation';
import type { ProfileHeroProps } from '@/types/profile';

export function ProfileHero({
  title = 'Profil Resmi Desa Penusupan',
  subtitle = 'Mengenal lebih dekat visi pembangunan, struktur kepengurusan desa, sejarah, serta potensi demografi dan geografi wilayah.',
  eyebrow = 'Pemerintah Desa Penusupan',
  className,
}: ProfileHeroProps) {
  return (
    <section
      className={`relative bg-navy text-white pt-28 pb-16 sm:pt-32 sm:pb-20 lg:pt-36 lg:pb-24 overflow-hidden ${
        className || ''
      }`}
    >
      {/* ── Ambient Background Glow & Geometric Pattern ── */}
      <div className="absolute inset-0 hero-pattern pointer-events-none opacity-30" />
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -right-32 w-96 h-96 bg-gold/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-3xl mx-auto space-y-5"
        >
          {/* Eyebrow */}
          <motion.div variants={fadeInUp} className="flex justify-center">
            <Eyebrow
              label={eyebrow}
              icon={Landmark}
              variant="glass"
            />
          </motion.div>

          {/* Main Title */}
          <motion.h1
            variants={fadeInUp}
            className="font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-tight"
          >
            {title}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={fadeInUp}
            className="font-body text-base sm:text-lg text-stone-300 leading-relaxed max-w-2xl mx-auto"
          >
            {subtitle}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}

export default ProfileHero;
