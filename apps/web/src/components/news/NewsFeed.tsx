'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Newspaper, SearchX, RotateCcw } from 'lucide-react';
import { NewsCard } from '@/components/home/news/NewsCard';
import { NewsSidebar } from './NewsSidebar';
import { staggerContainer, fadeInUp } from '@/constants/animation';
import type { NewsFeedProps } from '@/types/news';

export function NewsFeed({
  articles,
  categories,
  className,
}: NewsFeedProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');

  // Compute filtered articles
  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      // Category filter
      const matchCategory =
        selectedCategory === 'Semua' ||
        article.category.toLowerCase() === selectedCategory.toLowerCase();

      // Search filter
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        article.title.toLowerCase().includes(q) ||
        article.excerpt.toLowerCase().includes(q) ||
        article.category.toLowerCase().includes(q) ||
        article.tags?.some((t) => t.toLowerCase().includes(q));

      return matchCategory && matchSearch;
    });
  }, [articles, selectedCategory, searchQuery]);

  // Compute category counts for sidebar badges
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { Semua: articles.length };
    articles.forEach((art) => {
      counts[art.category] = (counts[art.category] || 0) + 1;
    });
    return counts;
  }, [articles]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('Semua');
  };

  return (
    <section className={`py-12 lg:py-16 ${className || ''}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ── 2-Column Responsive Layout (Main Feed 8 Cols + Sidebar 4 Cols) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* ════ LEFT COLUMN: NEWS ARTICLES FEED (8 Cols) ════ */}
          <main className="lg:col-span-8 space-y-8">
            
            {/* Feed Filter Header / Status */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200/80">
              <div className="space-y-1">
                <h2 className="font-heading font-extrabold text-xl sm:text-2xl text-navy">
                  {selectedCategory === 'Semua' ? 'Semua Artikel' : `Kategori: ${selectedCategory}`}
                </h2>
                <p className="font-body text-xs sm:text-sm text-stone-500">
                  Menampilkan <span className="font-semibold text-navy">{filteredArticles.length}</span> dari {articles.length} berita
                  {searchQuery && (
                    <span>
                      {' '}untuk kata kunci &ldquo;<span className="text-navy font-semibold">{searchQuery}</span>&rdquo;
                    </span>
                  )}
                </p>
              </div>

              {/* Active Filter Reset Button */}
              {(selectedCategory !== 'Semua' || searchQuery) && (
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors self-start sm:self-auto"
                >
                  <RotateCcw size={12} />
                  <span>Reset Filter</span>
                </button>
              )}
            </div>

            {/* Articles Grid or Empty State */}
            <AnimatePresence mode="wait">
              {filteredArticles.length > 0 ? (
                <motion.div
                  key={`${selectedCategory}-${searchQuery}`}
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8"
                >
                  {filteredArticles.map((news) => (
                    <NewsCard key={news.id} news={news} />
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="empty-state"
                  variants={fadeInUp}
                  initial="hidden"
                  animate="visible"
                  className="rounded-3xl bg-white border border-stone-200/90 p-10 sm:p-14 text-center space-y-4 shadow-xs"
                >
                  <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center mx-auto border border-amber-200/80">
                    <SearchX size={28} />
                  </div>
                  <div className="space-y-1 max-w-md mx-auto">
                    <h3 className="font-heading font-bold text-lg text-navy">
                      Tidak ada artikel yang ditemukan
                    </h3>
                    <p className="font-body text-sm text-stone-500 leading-relaxed">
                      Kami tidak menemukan berita yang sesuai dengan kata kunci atau filter yang Anda pilih. Silakan coba kata kunci lain.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleResetFilters}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-navy text-white text-xs sm:text-sm font-semibold hover:bg-navy-light transition-all shadow-xs"
                  >
                    <RotateCcw size={14} />
                    <span>Lihat Semua Berita</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </main>

          {/* ════ RIGHT COLUMN: SIDEBAR WIDGETS (4 Cols) ════ */}
          <div className="lg:col-span-4">
            <NewsSidebar
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              popularArticles={articles}
            />
          </div>

        </div>

      </div>
    </section>
  );
}

export default NewsFeed;
