'use client';

import { motion } from 'motion/react';
import { Newspaper } from 'lucide-react';
import { Eyebrow } from '@/components/Eyebrow';
import { CTAButton } from '@/components/CTAButton';
import { NewsCard } from './NewsCard';
import { fadeInUp, staggerContainer } from '@/constants/animation';
import type { LatestNewsSectionProps } from '@/types/home';

export function LatestNewsSection({
  news = [],
  ctaLabel = 'Lihat Semua Berita',
  ctaHref = '/news',
  className,
}: LatestNewsSectionProps) {
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
            <Eyebrow label="Kabar & Informasi" variant="gold" />
          </motion.div>

          <motion.h2
            variants={fadeInUp}
            className="font-heading font-bold text-2xl sm:text-3xl md:text-4xl text-navy tracking-tight"
          >
            Berita & Liputan Terkini
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            className="font-body text-stone-600 text-sm sm:text-base leading-relaxed"
          >
            Ikuti perkembangan pembangunan desa, inovasi pertanian, geliat UMKM, dan ragam kegiatan masyarakat Desa Penusupan.
          </motion.p>
        </motion.div>

        {/* ── 3-Column News Cards Grid or Empty State ── */}
        {news.length > 0 ? (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {news.map((item) => (
              <NewsCard key={item.id} news={item} />
            ))}
          </motion.div>
        ) : (
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            className="rounded-3xl bg-linen/50 border border-stone-200/80 p-8 sm:p-12 text-center max-w-xl mx-auto space-y-3"
          >
            <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-navy flex items-center justify-center mx-auto border border-indigo-100/80 shadow-2xs">
              <Newspaper size={26} className="text-navy" />
            </div>
            <h3 className="font-heading font-bold text-lg text-navy">
              Belum Ada Warta yang Dipublikasikan
            </h3>
            <p className="font-body text-xs sm:text-sm text-stone-500 leading-relaxed">
              Liputan terkini dan kabar resmi seputar Desa Penusupan akan segera hadir di halaman ini.
            </p>
          </motion.div>
        )}

        {/* ── Call to Action to View All News (Only if news exists) ── */}
        {ctaHref && news.length > 0 && (
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 text-center pt-4"
          >
            <p className="font-body text-xs sm:text-sm text-stone-500">
              Temukan seluruh arsip artikel dan dokumentasi kegiatan desa lainnya.
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

export default LatestNewsSection;
