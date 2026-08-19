'use client';

import { motion } from 'motion/react';
import { Store, Search, X } from 'lucide-react';
import { Eyebrow } from '@/components/Eyebrow';
import { fadeInUp, staggerContainer } from '@/constants/animation';

interface BusinessesHeroProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  className?: string;
}

export function BusinessesHero({
  searchQuery,
  onSearchChange,
  className,
}: BusinessesHeroProps) {
  return (
    <section
      className={`relative pt-32 pb-16 lg:pt-36 lg:pb-20 bg-navy text-white overflow-hidden ${
        className || ''
      }`}
    >
      {/* Background Ambience / Glow */}
      <div className="absolute inset-0 bg-radial from-navy-light/40 via-navy to-navy pointer-events-none" />
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-gold/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="text-center max-w-3xl mx-auto space-y-6"
        >
          {/* Eyebrow Pill */}
          <motion.div variants={fadeInUp} className="flex justify-center">
            <Eyebrow
              label="Katalog Ekonomi & Potensi Desa"
              icon={Store}
              variant="glass"
            />
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={fadeInUp}
            className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-white leading-tight"
          >
            Daftar UMKM & Potensi Desa
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={fadeInUp}
            className="font-body text-stone-300 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto"
          >
            Dukung kemandirian ekonomi desa dengan berbelanja langsung dari para pelaku usaha, petani, perajin, dan produsen lokal Desa Penusupan.
          </motion.p>

          {/* ── Prominent Centered Search Bar ── */}
          <motion.div
            variants={fadeInUp}
            className="pt-2 max-w-xl mx-auto"
          >
            <div className="relative rounded-2xl bg-white/10 backdrop-blur-md p-1.5 border border-white/20 shadow-2xl focus-within:bg-white/15 focus-within:border-gold/60 transition-all duration-300">
              <div className="relative flex items-center">
                <Search
                  size={18}
                  className="absolute left-4 text-gold shrink-0 pointer-events-none"
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  placeholder="Cari nama warung, produk, kopi, atau dusun..."
                  className="w-full pl-11 pr-10 py-3 rounded-xl bg-white text-navy placeholder:text-stone-400 text-sm sm:text-base font-body focus:outline-none shadow-xs transition-colors"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => onSearchChange('')}
                    className="absolute right-3.5 p-1 rounded-full text-stone-400 hover:text-stone-700 transition-colors"
                    aria-label="Hapus pencarian"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}

export default BusinessesHero;
