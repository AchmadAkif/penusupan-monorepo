'use client';

import Image from 'next/image';
import { motion } from 'motion/react';
import { MapPin, Navigation } from 'lucide-react';
import { Eyebrow } from '@/components/Eyebrow';
import { CTAButton } from '@/components/CTAButton';
import {
  fadeInUp,
  staggerContainer,
  slideInLeft,
} from '@/constants/animation';
import { DEFAULT_GEOGRAPHY_METRICS } from '@/constants/seedData';
import type { GeographySectionProps } from '@/types/home';

export function GeographySection({
  metrics = DEFAULT_GEOGRAPHY_METRICS,
  imageUrl = '/images/geo.webp',
  ctaLabel = 'Lihat Peta & Tata Ruang Lengkap',
  ctaHref = '/profile#geografi',
  className,
}: GeographySectionProps) {
  return (
    <section className={`py-20 lg:py-28 bg-linen/50 overflow-hidden ${className || ''}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* ── Section Header ── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="text-center max-w-3xl mx-auto space-y-4"
        >
          <motion.div variants={fadeInUp} className="flex justify-center">
            <Eyebrow label="Sekilas Geografi" variant="gold" />
          </motion.div>

          <motion.h2
            variants={fadeInUp}
            className="font-heading font-bold text-2xl sm:text-3xl md:text-4xl text-navy tracking-tight"
          >
            Bentang Alam & Tata Guna Lahan
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            className="font-body text-stone-600 text-sm sm:text-base leading-relaxed"
          >
            Karakteristik topografi lembah subur dataran sejuk Kecamatan Pejawaran dengan dominasi pemanfaatan lahan untuk ketahanan pangan agrikultur.
          </motion.p>
        </motion.div>

        {/* ── Split Layout: Visual Terrain Map (Left) + 4-Metric Grid (Right) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* ── Left Column: Terrain & Coordinate Showcase (5 cols) ── */}
          <motion.div
            variants={slideInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="lg:col-span-5 relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-stone-200/80 aspect-5/4 group">
              <Image
                src={imageUrl}
                alt="Peta Topografi dan Elevasi Desa Penusupan"
                width={600}
                height={500}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>

            {/* Quick Coordinate Indicator Card */}
            <div className="mt-4 p-4 rounded-2xl bg-white border border-stone-200/80 shadow-xs flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gold/15 flex items-center justify-center text-gold-dark shrink-0">
                  <Navigation size={18} />
                </div>
                <div>
                  <p className="font-heading font-bold text-xs text-navy">Letak Astronomis</p>
                  <p className="font-mono text-[11px] text-stone-500">-7.246117 LS, 109.797028 BT</p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                <MapPin size={11} /> Pejawaran
              </span>
            </div>
          </motion.div>

          {/* ── Right Column: 4 Geographic Metrics Cards (7 cols) ── */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5"
          >
            {metrics.map((metric) => {
              const Icon = metric.icon;

              return (
                <motion.div
                  key={metric.id}
                  variants={fadeInUp}
                  className="group relative rounded-3xl bg-white p-6 sm:p-7 border border-stone-200/80 hover:border-gold/40 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    {/* Card Top: Icon & Badge */}
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-2xl bg-navy/5 text-navy group-hover:bg-gold group-hover:text-navy transition-colors duration-300 flex items-center justify-center shrink-0 shadow-xs">
                        <Icon
                          size={22}
                          className="transition-transform duration-300 group-hover:scale-110"
                        />
                      </div>
                      {metric.badge && (
                        <span className="px-2.5 py-1 rounded-full bg-linen border border-stone-200/70 text-[11px] font-semibold text-stone-600 font-body group-hover:border-gold/30 group-hover:text-gold-dark transition-colors">
                          {metric.badge}
                        </span>
                      )}
                    </div>

                    {/* Value & Label */}
                    <div>
                      <div className="font-heading font-extrabold text-2xl sm:text-3xl text-navy tracking-tight">
                        {metric.value}
                      </div>
                      <h3 className="font-heading font-bold text-sm sm:text-base text-stone-800 mt-1">
                        {metric.label}
                      </h3>
                    </div>

                    {/* Description */}
                    <p className="font-body text-xs sm:text-sm text-stone-600 leading-relaxed">
                      {metric.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

        </div>

        {/* ── Call to Action Link ── */}
        {ctaHref && (
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 text-center pt-4"
          >
            <p className="font-body text-xs sm:text-sm text-stone-500">
              Pelajari peta batas wilayah, pembagian dusun, dan tata ruang desa lebih terperinci.
            </p>
            <CTAButton
              href={ctaHref}
              label={ctaLabel}
              variant="outline"
              size="md"
            />
          </motion.div>
        )}

      </div>
    </section>
  );
}
