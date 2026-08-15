'use client';

import Image from 'next/image';
import { motion } from 'motion/react';
import { CTAButton } from '@/components/CTAButton';
import { Eyebrow } from '@/components/Eyebrow';
import {
  fadeInUp,
  staggerContainer,
  slideInLeft,
} from '@/constants/animation';
import { DEFAULT_VILLAGE_PROFILE } from '@/constants/seedData';
import type { VillageProfileIntroProps } from '@/types/home';

export function VillageProfileIntro({
  profile = DEFAULT_VILLAGE_PROFILE,
  className,
}: VillageProfileIntroProps) {
  return (
    <section className={`py-20 lg:py-28 bg-white overflow-hidden ${className || ''}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* ── Left: Narrative & Description (7 cols) ── */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="lg:col-span-7 flex flex-col space-y-6"
          >
            {/* Eyebrow */}
            {profile.eyebrow && (
              <motion.div variants={fadeInUp}>
                <Eyebrow label={profile.eyebrow} variant="gold" />
              </motion.div>
            )}

            {/* Title */}
            <motion.h2
              variants={fadeInUp}
              className="font-heading font-bold text-2xl sm:text-3xl md:text-4xl text-navy tracking-tight leading-tight"
            >
              {profile.title}
            </motion.h2>

            {/* Lead Description */}
            <motion.p
              variants={fadeInUp}
              className="font-heading font-semibold text-stone-800 text-base sm:text-lg leading-relaxed"
            >
              {profile.description}
            </motion.p>

            {/* Paragraphs */}
            <motion.div
              variants={fadeInUp}
              className="space-y-4 font-body text-sm sm:text-base text-stone-600 leading-relaxed"
            >
              {profile.paragraphs.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </motion.div>

            {/* CTA Button */}
            {profile.ctaHref && (
              <motion.div variants={fadeInUp} className="pt-2">
                <CTAButton
                  href={profile.ctaHref}
                  label={profile.ctaLabel || 'Lihat Profil Lengkap'}
                  variant="navy"
                  size="md"
                />
              </motion.div>
            )}
          </motion.div>

          {/* ── Right: Visual Composition / Image Showcase (5 cols) ── */}
          <motion.div
            variants={slideInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="lg:col-span-5 relative flex justify-center"
          >
            <div className="relative w-full max-w-md">
              {/* Decorative background aura */}
              <div className="absolute -inset-4 bg-linear-to-tr from-navy/5 via-gold/10 to-transparent rounded-[36px] blur-lg -z-10" />

              {/* Main Image */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-stone-100 aspect-4/3 group">
                <Image
                  src="/images/village-landscape-placeholder.svg"
                  alt="Lanskap Perbukitan Desa Penusupan"
                  width={600}
                  height={400}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-navy/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <p className="font-heading font-bold text-sm">Dataran Tinggi Pejawaran</p>
                  <p className="font-body text-xs text-white/80">Ketinggian ± 820 mdpl</p>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
