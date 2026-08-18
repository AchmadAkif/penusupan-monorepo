'use client';

import { motion } from 'motion/react';
import { Newspaper } from 'lucide-react';
import { Eyebrow } from '@/components/Eyebrow';
import { fadeInUp, staggerContainer } from '@/constants/animation';

interface NewsHeroProps {
  title?: string;
  subtitle?: string;
  eyebrow?: string;
  className?: string;
}

export function NewsHero({
  title = 'Kabar & Informasi Terkini',
  subtitle = 'Pusat publikasi berita resmi, laporan pembangunan, agenda kemasyarakatan, dan liputan potensi Desa Penusupan.',
  eyebrow = 'Warta Desa Penusupan',
  className,
}: NewsHeroProps) {
  return (
    <section
      className={`relative pt-32 pb-16 lg:pt-36 lg:pb-20 bg-navy text-white overflow-hidden ${
        className || ''
      }`}
    >
      {/* Background Ambience / Glow */}
      <div className="absolute inset-0 bg-radial from-navy-light/40 via-navy to-navy pointer-events-none" />
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-gold/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="text-center max-w-3xl mx-auto space-y-5"
        >
          {/* Eyebrow Pill */}
          <motion.div variants={fadeInUp} className="flex justify-center">
            <Eyebrow
              label={eyebrow}
              icon={Newspaper}
              variant="glass"
            />
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={fadeInUp}
            className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-white leading-tight"
          >
            {title}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={fadeInUp}
            className="font-body text-stone-300 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto"
          >
            {subtitle}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}

export default NewsHero;
