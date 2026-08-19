'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Store,
  SearchX,
  RotateCcw,
  Sparkles,
  MessageCircle,
  HelpCircle,
} from 'lucide-react';
import { BusinessesHero } from './BusinessesHero';
import { BusinessesFilterBar } from './BusinessesFilterBar';
import { BusinessCard } from './BusinessCard';
import { staggerContainer, fadeInUp } from '@/constants/animation';
import type { BusinessItem } from '@/types/businesses';

interface BusinessesGridProps {
  businesses?: BusinessItem[];
  categories?: string[];
  className?: string;
}

export function BusinessesGrid({
  businesses = [],
  categories = [],
  className,
}: BusinessesGridProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');

  // Compute filtered items
  const filteredBusinesses = useMemo(() => {
    return businesses.filter((b) => {
      // Category match
      const matchCategory =
        selectedCategory === 'Semua' ||
        b.category.toLowerCase() === selectedCategory.toLowerCase();

      // Search match
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        b.name.toLowerCase().includes(q) ||
        b.ownerName.toLowerCase().includes(q) ||
        b.description.toLowerCase().includes(q) ||
        b.dusun.toLowerCase().includes(q) ||
        b.productsSold.some((p) => p.toLowerCase().includes(q));

      return matchCategory && matchSearch;
    });
  }, [businesses, selectedCategory, searchQuery]);

  // Compute category item counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { Semua: businesses.length };
    businesses.forEach((b) => {
      counts[b.category] = (counts[b.category] || 0) + 1;
    });
    return counts;
  }, [businesses]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('Semua');
  };

  const isDatabaseEmpty = businesses.length === 0;

  return (
    <div className={className || ''}>
      {/* ── 1. Hero Section with Integrated Live Search ── */}
      <BusinessesHero
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* ── 2. Sticky Category Filter Bar ── */}
      {!isDatabaseEmpty && (
        <BusinessesFilterBar
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          categoryCounts={categoryCounts}
        />
      )}

      {/* ── 3. Main Catalog Content ── */}
      <section className="py-12 lg:py-16 bg-linen/60 min-h-[50vh]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          {/* Header Status Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200/80">
            <div className="space-y-1">
              <h2 className="font-heading font-extrabold text-xl sm:text-2xl text-navy">
                {selectedCategory === 'Semua'
                  ? 'Semua Pelaku Usaha'
                  : `Kategori: ${selectedCategory}`}
              </h2>
              <p className="font-body text-xs sm:text-sm text-stone-500">
                {isDatabaseEmpty ? (
                  'Belum ada data usaha yang terdaftar'
                ) : (
                  <>
                    Menampilkan{' '}
                    <span className="font-semibold text-navy">
                      {filteredBusinesses.length}
                    </span>{' '}
                    dari {businesses.length} UMKM desa
                    {searchQuery && (
                      <span>
                        {' '}untuk pencarian &ldquo;
                        <span className="text-navy font-semibold">
                          {searchQuery}
                        </span>
                        &rdquo;
                      </span>
                    )}
                  </>
                )}
              </p>
            </div>

            {/* Reset Filter Button */}
            {(selectedCategory !== 'Semua' || searchQuery) && !isDatabaseEmpty && (
              <button
                type="button"
                onClick={handleResetFilters}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-stone-200/80 hover:bg-stone-300 text-stone-700 transition-colors self-start sm:self-auto cursor-pointer"
              >
                <RotateCcw size={13} />
                <span>Reset Filter</span>
              </button>
            )}
          </div>

          {/* Cards Grid or Distinct Empty State */}
          <AnimatePresence mode="wait">
            {filteredBusinesses.length > 0 ? (
              <motion.div
                key={`${selectedCategory}-${searchQuery}`}
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
              >
                {filteredBusinesses.map((biz) => (
                  <BusinessCard key={biz.id} business={biz} />
                ))}
              </motion.div>
            ) : isDatabaseEmpty ? (
              /* Empty State 1: Database has zero items */
              <motion.div
                key="empty-database"
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                className="rounded-3xl bg-white border border-stone-200/90 p-10 sm:p-14 text-center space-y-4 shadow-xs max-w-xl mx-auto"
              >
                <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-navy flex items-center justify-center mx-auto border border-indigo-100">
                  <Store size={28} className="text-navy" />
                </div>
                <div className="space-y-1.5">
                  <h3 className="font-heading font-bold text-lg sm:text-xl text-navy">
                    Belum Ada Data UMKM yang Terdaftar
                  </h3>
                  <p className="font-body text-sm text-stone-500 leading-relaxed">
                    Pemerintah Desa Penusupan sedang melakukan pendataan profil usaha masyarakat. Direktori UMKM akan segera diperbarui secara berkala.
                  </p>
                </div>
              </motion.div>
            ) : (
              /* Empty State 2: Filter/Search yielded 0 matches */
              <motion.div
                key="empty-search"
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                className="rounded-3xl bg-white border border-stone-200/90 p-10 sm:p-14 text-center space-y-4 shadow-xs max-w-xl mx-auto"
              >
                <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center mx-auto border border-amber-200/80">
                  <SearchX size={28} />
                </div>
                <div className="space-y-1.5">
                  <h3 className="font-heading font-bold text-lg text-navy">
                    Tidak Ada Usaha yang Cocok
                  </h3>
                  <p className="font-body text-sm text-stone-500 leading-relaxed">
                    Kami tidak menemukan UMKM yang sesuai dengan pencarian &ldquo;<span className="font-semibold text-stone-700">{searchQuery || selectedCategory}</span>&rdquo;. Coba kata kunci lain seperti nama produk atau dusun.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-navy text-white text-xs sm:text-sm font-semibold hover:bg-navy-light transition-all shadow-xs cursor-pointer"
                >
                  <RotateCcw size={14} />
                  <span>Lihat Semua UMKM</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── 4. Call-to-Action Box: Daftarkan Usaha Anda ── */}
          <div className="rounded-3xl bg-navy text-white p-8 sm:p-10 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-gold/10 blur-3xl pointer-events-none" />
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
              <div className="space-y-2 max-w-xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/20 border border-gold/30 text-gold-light text-xs font-semibold">
                  <Sparkles size={13} className="text-gold" />
                  <span>Promosikan Usaha Anda</span>
                </div>
                <h3 className="font-heading font-bold text-xl sm:text-2xl text-white">
                  Punya Usaha atau Produk di Desa Penusupan?
                </h3>
                <p className="font-body text-xs sm:text-sm text-stone-300 leading-relaxed">
                  Daftarkan profil UMKM Anda secara gratis kepada perangkat desa agar tercatat dalam direktori resmi dan dipromosikan ke masyarakat luas.
                </p>
              </div>

              <a
                href="https://wa.me/6281234567890?text=Halo%20Admin%20Desa%20Penusupan,%20saya%20ingin%20mendaftarkan%20usaha%20UMKM%20saya%20di%20website%20desa."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gold hover:bg-gold-light text-navy font-heading font-bold text-sm transition-all duration-300 shadow-md hover:scale-105 shrink-0"
              >
                <MessageCircle size={18} />
                <span>Daftarkan Usaha via WA</span>
              </a>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}

export default BusinessesGrid;
