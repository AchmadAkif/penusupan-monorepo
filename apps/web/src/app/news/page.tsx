import type { Metadata } from 'next';
import { NewsHero, NewsFeed } from '@/components/news';
import { DEFAULT_NEWS_DATA, DEFAULT_NEWS_CATEGORIES } from '@/constants/seedData';

export const metadata: Metadata = {
  title: 'Berita & Informasi Terkini',
  description:
    'Portal berita resmi Desa Penusupan, Kecamatan Pejawaran, Banjarnegara. Berita pembangunan, pertanian, UMKM, kesehatan, dan kegiatan warga.',
};

export default function NewsPage() {
  return (
    <div className="min-h-screen bg-linen">
      {/* ── 1. News Hero Banner ── */}
      <NewsHero />

      {/* ── 2. Interactive News Feed with Sidebar ── */}
      <NewsFeed
        articles={DEFAULT_NEWS_DATA}
        categories={DEFAULT_NEWS_CATEGORIES}
      />
    </div>
  );
}
