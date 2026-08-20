import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { NewsHero, NewsFeed } from '@/components/news';
import { createClient } from '@/utils/supabase/server';
import { calculateReadTime } from '@/utils/readTime.utils';
import { NewsItem } from '@/types/news';

export const metadata: Metadata = {
  title: 'Berita & Informasi Terkini',
  description:
    'Portal berita resmi Desa Penusupan, Kecamatan Pejawaran, Banjarnegara. Berita pembangunan, pertanian, UMKM, kesehatan, dan kegiatan warga.',
};

export const revalidate = 60; // Revalidate cache every 60 seconds

function formatDate(dateStr: string | null): string {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return date.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export default async function NewsPage() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  // 1. Fetch Categories
  const { data: categoriesData } = await supabase
    .from('article_categories')
    .select('id, name, slug')
    .order('name', { ascending: true });

  // 2. Fetch Published Articles
  const { data: articlesData } = await supabase
    .from('articles')
    .select(`
      id,
      title,
      slug,
      excerpt,
      content,
      cover_image_url,
      author,
      read_time,
      view_count,
      published_at,
      category:article_categories(name)
    `)
    .not('published_at', 'is', null)
    .lte('published_at', new Date().toISOString())
    .order('published_at', { ascending: false });

  const categories: string[] = [
    'Semua',
    ...(categoriesData ? categoriesData.map((c) => c.name) : []),
  ];

  const articles: NewsItem[] = (articlesData || []).map((item: any) => ({
    id: item.id,
    title: item.title,
    slug: item.slug,
    excerpt: item.excerpt,
    content: item.content,
    category: item.category?.name || 'Umum',
    publishedAt: formatDate(item.published_at),
    author: item.author || 'Pemerintah Desa',
    readTime: item.content ? calculateReadTime(item.content) : (item.read_time || 3),
    imageUrl: item.cover_image_url || '/images/news-placeholder.svg',
    viewCount: item.view_count || 0,
  }));

  return (
    <div className="min-h-screen bg-linen">
      {/* ── 1. News Hero Banner ── */}
      <NewsHero />

      {/* ── 2. Interactive News Feed with Sidebar ── */}
      <NewsFeed articles={articles} categories={categories} />
    </div>
  );
}
