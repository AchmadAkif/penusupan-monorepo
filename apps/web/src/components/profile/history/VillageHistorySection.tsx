'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import { BookOpen, Quote, Sparkles, MapPin } from 'lucide-react';
import { Eyebrow } from '@/components/Eyebrow';
import { fadeInUp, staggerContainer, slideInLeft } from '@/constants/animation';
import { DEFAULT_VILLAGE_HISTORY } from '@/constants/seedData';
import type { VillageHistorySectionProps } from '@/types/profile';

export function VillageHistorySection({
  history = DEFAULT_VILLAGE_HISTORY,
  className,
}: VillageHistorySectionProps) {
  const [firstParagraph, ...restParagraphs] = history.paragraphs;

  return (
    <section
      id="sejarah"
      className={`py-20 lg:py-28 bg-linen/50 border-t border-stone-200/80 overflow-hidden ${
        className || ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* ── Section Header ── */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="flex justify-center">
            <Eyebrow label="Sejarah & Asal Usul" icon={BookOpen} />
          </div>
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-4xl text-navy tracking-tight">
            {history.title}
          </h2>
          <p className="font-body text-stone-600 text-sm sm:text-base leading-relaxed">
            {history.subtitle}
          </p>
        </div>

        {/* ── 2-Column Storybook Layout ── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start max-w-6xl mx-auto"
        >
          
          {/* ════ LEFT COLUMN: HERITAGE VISUAL & QUOTE (5 Cols) ════ */}
          <motion.div
            variants={slideInLeft}
            className="lg:col-span-5 space-y-6"
          >
            {/* Framed Image Card */}
            <div className="group relative rounded-3xl bg-navy p-2 sm:p-3 shadow-xl overflow-hidden border border-navy/20">
              <div className="relative aspect-4/3 w-full rounded-2xl overflow-hidden bg-stone-900">
                <Image
                  src={history.imageUrl}
                  alt="Ilustrasi Sejarah Desa Penusupan"
                  fill
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
                
                {/* Subtle Amber Vignette overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-navy/80 via-transparent to-transparent pointer-events-none" />

                {/* Location Badge */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2 px-3 py-1.5 rounded-xl bg-navy/80 backdrop-blur-md text-white text-xs border border-white/10">
                  <MapPin size={13} className="text-gold shrink-0" />
                  <span className="truncate font-medium">{history.imageCaption}</span>
                </div>
              </div>
            </div>

            {/* Inspiring Heritage Quote Card */}
            {history.quote && (
              <div className="relative rounded-2xl bg-white border border-stone-200/90 p-6 shadow-xs space-y-3">
                <Quote className="text-gold/80 w-6 h-6 rotate-180" />
                <p className="font-heading font-medium text-navy text-sm sm:text-base italic leading-relaxed">
                  &ldquo;{history.quote}&rdquo;
                </p>
                <div className="pt-1 flex items-center gap-2 text-xs font-semibold text-stone-500 uppercase tracking-wider">
                  <span className="w-5 h-px bg-gold" />
                  <span>Nilai Kearifan Lokal</span>
                </div>
              </div>
            )}
          </motion.div>

          {/* ════ RIGHT COLUMN: RICH TEXT PROSE CONTAINER (7 Cols) ════ */}
          <motion.div
            variants={fadeInUp}
            className="lg:col-span-7 space-y-6"
          >
            <div className="rounded-3xl bg-white border border-stone-200/90 p-6 sm:p-8 lg:p-10 shadow-xs space-y-6">
              
              {/* First Paragraph with Elegant Drop Cap */}
              {firstParagraph && (
                <p className="font-body text-stone-700 text-base sm:text-lg leading-relaxed first-letter:float-left first-letter:text-5xl first-letter:pr-3 first-letter:font-heading first-letter:font-extrabold first-letter:text-navy first-letter:leading-none">
                  {firstParagraph}
                </p>
              )}

              {/* Subsequent Narrative Paragraphs */}
              {restParagraphs.map((para, idx) => (
                <p
                  key={idx}
                  className="font-body text-stone-600 text-base sm:text-base leading-relaxed"
                >
                  {para}
                </p>
              ))}

              {/* Status Note / Documentation Tag */}
              <div className="pt-4 border-t border-stone-100 flex items-start gap-3 text-xs text-stone-500 bg-linen/50 -mx-6 -mb-6 sm:-mx-8 sm:-mb-8 lg:-mx-10 lg:-mb-10 p-5 rounded-b-3xl">
                <Sparkles size={16} className="text-gold shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  Penyusunan naskah babad dan arsip sejarah resmi Desa Penusupan terus diperkaya melalui penelusuran dokumen sejarah daerah dan penuturan sesepuh desa.
                </p>
              </div>

            </div>
          </motion.div>

        </motion.div>

      </div>
    </section>
  );
}

export default VillageHistorySection;
