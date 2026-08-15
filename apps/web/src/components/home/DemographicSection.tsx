'use client';

import { motion } from 'motion/react';
import { Eyebrow } from '@/components/Eyebrow';
import { CTAButton } from '@/components/CTAButton';
import { fadeInUp, staggerContainer } from '@/constants/animation';
import { DEFAULT_DEMOGRAPHIC_DATA } from '@/constants/seedData';
import type { DemographicSectionProps } from '@/types/home';

export function DemographicSection({
  data = DEFAULT_DEMOGRAPHIC_DATA,
  className,
}: DemographicSectionProps) {
  return (
    <section className={`py-20 lg:py-28 bg-white overflow-hidden ${className || ''}`}>
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
            <Eyebrow label='Sekilas Demografi' variant="gold" />
          </motion.div>

          <motion.h2
            variants={fadeInUp}
            className="font-heading font-bold text-2xl sm:text-3xl md:text-4xl text-navy tracking-tight"
          >
            Dinamika & Struktur Kependudukan
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            className="font-body text-stone-600 text-sm sm:text-base leading-relaxed"
          >
            Gambaran umum komposisi demografis dan persebaran masyarakat Desa Penusupan berdasarkan pencatatan resmi pemerintah desa.
          </motion.p>
        </motion.div>

        {/* ── 4-Metric Numeric Grid ── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {data.metrics.map((metric) => {
            const Icon = metric.icon;

            return (
              <motion.div
                key={metric.id}
                variants={fadeInUp}
                className="group relative rounded-3xl bg-linen/60 hover:bg-white p-7 border border-stone-200/80 hover:border-gold/40 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-5">
                  {/* Top Bar: Icon & Pill Badge */}
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-navy/5 text-navy group-hover:bg-gold group-hover:text-navy transition-colors duration-300 flex items-center justify-center shrink-0 shadow-xs">
                      <Icon
                        size={22}
                        className="transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                    {metric.badge && (
                      <span className="px-2.5 py-1 rounded-full bg-white/90 border border-stone-200/70 text-[11px] font-semibold text-stone-500 font-body group-hover:border-gold/30 group-hover:text-gold-dark transition-colors">
                        {metric.badge}
                      </span>
                    )}
                  </div>

                  {/* Big Number & Label */}
                  <div>
                    <div className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-4xl text-navy tracking-tight group-hover:text-navy transition-colors">
                      {metric.value}
                    </div>
                    <h3 className="font-heading font-bold text-base text-stone-800 mt-1">
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

        {/* ── Call to Action to View Full Demographic & Chart Page ── */}
        {data.ctaHref && (
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 text-center pt-4"
          >
            <p className="font-body text-xs sm:text-sm text-stone-500">
              Ingin melihat grafik piramida penduduk, distribusi usia, dan data kesehatan lengkap?
            </p>
            <CTAButton
              href={data.ctaHref}
              label={data.ctaLabel || 'Lihat Data Statistik Lengkap'}
              variant="outline"
              size="md"
            />
          </motion.div>
        )}

      </div>
    </section>
  );
}
