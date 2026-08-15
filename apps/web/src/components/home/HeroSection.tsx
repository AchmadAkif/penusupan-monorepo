'use client';

import Image from 'next/image';
import { motion } from 'motion/react';
import { Sparkles, MapPin } from 'lucide-react';
import { CTAButton } from '@/components/CTAButton';
import {
  fadeInUp,
  staggerContainer,
  scaleIn,
} from '@/constants/animation';
import { DEFAULT_HERO_DATA } from '@/constants/seedData';
import type { HeroSectionProps } from '@/types/home';

export function HeroSection({
  eyebrow = DEFAULT_HERO_DATA.eyebrow,
  title = DEFAULT_HERO_DATA.title,
  subtitle = DEFAULT_HERO_DATA.subtitle,
  primaryCta = DEFAULT_HERO_DATA.primaryCta,
  secondaryCta = DEFAULT_HERO_DATA.secondaryCta,
}: HeroSectionProps) {
  return (
    <section className="relative min-h-[90vh] lg:min-h-screen bg-navy text-white flex items-center overflow-hidden pt-24 pb-28 lg:pt-28 lg:pb-36">
      {/* Background Pattern & Ambient Lighting */}
      <div className="absolute inset-0 hero-pattern pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-150 h-150 bg-gold/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-100 h-100 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* ── Left Column: Content & Calls to Action ── */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 flex flex-col space-y-6 sm:space-y-8 text-center lg:text-left"
          >
            {/* Eyebrow Badge */}
            <motion.div
              variants={fadeInUp}
              className="flex justify-center lg:justify-start"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-gold-light text-xs sm:text-sm font-medium font-body shadow-sm">
                <Sparkles size={14} className="text-gold" />
                <span>{eyebrow}</span>
              </div>
            </motion.div>

            {/* Massive Heading */}
            <motion.h1
              variants={fadeInUp}
              className="font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white tracking-tight leading-[1.15]"
            >
              {title.split(',')[0]},
              <span className="block text-transparent bg-clip-text bg-linear-to-r from-gold-light via-gold to-amber-200 mt-1">
                {title.split(',')[1] || ''}
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={fadeInUp}
              className="text-white/80 font-body text-base sm:text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0"
            >
              {subtitle}
            </motion.p>

            {/* Dual CTAs */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2"
            >
              <CTAButton
                href={primaryCta.href}
                label={primaryCta.label}
                variant="primary"
                size="lg"
              />

              <CTAButton
                href={secondaryCta.href}
                label={secondaryCta.label}
                variant="glass"
                size="lg"
                showIcon={false}
              />
            </motion.div>

            {/* Quick Location / Identity Footnote */}
            <motion.div
              variants={fadeInUp}
              className="pt-2 flex items-center justify-center lg:justify-start gap-6 text-xs sm:text-sm text-white/60 font-body"
            >
              <div className="flex items-center gap-1.5">
                <MapPin size={15} className="text-gold" />
                <span>Kec. Pejawaran, Banjarnegara</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-white/30" />
              <span>Ketinggian ± 1.200 mdpl</span>
            </motion.div>
          </motion.div>

          {/* ── Right Column: Dynamic Visual Composition ── */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="relative w-full max-w-md lg:max-w-none"
            >
              {/* Main Photo Card */}
              <motion.div
                variants={scaleIn}
                className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-white/15 aspect-4/3 bg-navy-light/40 backdrop-blur-sm group"
              >
                <Image
                  src="/images/hero-placeholder.svg"
                  alt="Panorama Desa Penusupan"
                  width={800}
                  height={600}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-linear-to-t from-navy/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white/90">
                  <span className="font-heading font-semibold">
                    Desa Penusupan
                  </span>
                  <span className="text-white/60">Kec. Pejawaran</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
