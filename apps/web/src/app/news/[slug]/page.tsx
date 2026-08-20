import Link from 'next/link';
import Image from 'next/image';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import {
  Calendar,
  Clock,
  User,
  ArrowLeft,
  Share2,
  ChevronRight,
  Eye,
  BookOpen,
} from 'lucide-react';
import { NewsSidebar, ViewTracker } from '@/components/news';
import { NewsCard } from '@/components/home/news/NewsCard';
import { createClient } from '@/utils/supabase/server';
import { calculateReadTime } from '@/utils/readTime.utils';
import { NewsItem } from '@/types/news';

interface NewsDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const revalidate = 60; // Revalidate every 60 seconds

function formatDate(dateStr: string | null): string {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return date.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}


export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
  const { slug } = await params;
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  // 1. Fetch main article by slug
  const { data: articleRow } = await supabase
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
      category_id,
      category:article_categories(name)
    `)
    .eq('slug', slug)
    .single();

  if (!articleRow) {
    notFound();
  }

  const article: NewsItem = {
    id: articleRow.id,
    title: articleRow.title,
    slug: articleRow.slug,
    excerpt: articleRow.excerpt,
    content: articleRow.content,
    category: (articleRow.category as any)?.name || 'Umum',
    publishedAt: formatDate(articleRow.published_at),
    author: articleRow.author || 'Pemerintah Desa',
    readTime: articleRow.content ? calculateReadTime(articleRow.content) : (articleRow.read_time || 3),
    imageUrl: articleRow.cover_image_url,
    viewCount: articleRow.view_count || 0,
  };

  // 2. Fetch Related articles (same category or recent)
  const { data: relatedRows } = await supabase
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
    .neq('slug', slug)
    .not('published_at', 'is', null)
    .lte('published_at', new Date().toISOString())
    .limit(2);

  const relatedArticles: NewsItem[] = (relatedRows || []).map((item: any) => ({
    id: item.id,
    title: item.title,
    slug: item.slug,
    excerpt: item.excerpt,
    content: item.content,
    category: item.category?.name || 'Umum',
    publishedAt: formatDate(item.published_at),
    author: item.author || 'Pemerintah Desa',
    readTime: item.content ? calculateReadTime(item.content) : (item.read_time || 3),
    imageUrl: item.cover_image_url || '/images/news-hortikultura.svg',
    viewCount: item.view_count || 0,
  }));

  // 3. Fetch Categories for Sidebar
  const { data: categoriesData } = await supabase
    .from('article_categories')
    .select('name')
    .order('name', { ascending: true });

  const categories: string[] = [
    'Semua',
    ...(categoriesData ? categoriesData.map((c) => c.name) : []),
  ];

  return (
    <div className="min-h-screen bg-linen pt-28 pb-20">
      {/* ── Client View Tracker ── */}
      <ViewTracker articleId={article.id} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">

        {/* ── Breadcrumb Navigation ── */}
        <nav className="flex items-center gap-2 text-xs sm:text-sm text-stone-500 font-medium overflow-x-auto py-2">
          <Link href="/" className="hover:text-navy transition-colors shrink-0">
            Beranda
          </Link>
          <ChevronRight size={14} className="text-stone-400 shrink-0" />
          <Link href="/news" className="hover:text-navy transition-colors shrink-0">
            Berita
          </Link>
          <ChevronRight size={14} className="text-stone-400 shrink-0" />
          <span className="text-navy font-semibold truncate max-w-xs sm:max-w-md">
            {article.title}
          </span>
        </nav>

        {/* ── 2-Column Reader Layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">

          {/* ════ LEFT COLUMN: ARTICLE CONTENT (8 Cols) ════ */}
          <main className="lg:col-span-8 space-y-8">
            <article className="rounded-3xl bg-white border border-stone-200/90 p-6 sm:p-10 shadow-xs space-y-8">

              {/* Category & Title Header */}
              <div className="space-y-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-navy/5 text-navy text-xs font-semibold border border-navy/15">
                  {article.category}
                </span>

                <h1 className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-4xl text-navy leading-tight tracking-tight">
                  {article.title}
                </h1>

                {/* Meta Details Bar */}
                <div className="flex flex-wrap items-center gap-y-2 gap-x-5 text-xs sm:text-sm text-stone-500 pt-2 border-y border-stone-100 py-3.5">
                  <div className="flex items-center gap-1.5 font-medium text-navy">
                    <User size={15} className="text-gold" />
                    <span>{article.author}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar size={15} className="text-stone-400" />
                    <span>{article.publishedAt}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock size={15} className="text-stone-400" />
                    <span>{article.readTime} mnt baca</span>
                  </div>
                  {article.viewCount !== undefined && (
                    <div className="flex items-center gap-1.5 text-gold-dark font-semibold">
                      <Eye size={15} />
                      <span>{article.viewCount.toLocaleString('id-ID')} pembaca</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Cover Image */}
              <div className="relative aspect-16/9 w-full rounded-2xl overflow-hidden bg-stone-100 shadow-sm border border-stone-200/60">
                <Image
                  src={article.imageUrl}
                  alt={article.title}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 65vw"
                />
              </div>

              {/* Excerpt Lead Box */}
              <div className="p-5 rounded-2xl bg-linen/60 border-l-4 border-gold text-stone-700 text-sm sm:text-base font-medium leading-relaxed italic">
                {article.excerpt}
              </div>

              {/* Article Paragraphs Body */}
              <div className="space-y-5 text-stone-700 text-base sm:text-lg leading-relaxed font-body">
                {article.content ? (
                  <div dangerouslySetInnerHTML={{ __html: article.content }} />
                ) : (
                  <p>{article.excerpt}</p>
                )}
              </div>

              {/* Action Buttons: Back & Share */}
              <div className="pt-6 border-t border-stone-100 flex items-center justify-between">
                <Link
                  href="/news"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-stone-200 bg-stone-50 hover:bg-stone-100 text-navy text-xs sm:text-sm font-semibold transition-colors"
                >
                  <ArrowLeft size={16} />
                  <span>Kembali ke Warta</span>
                </Link>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-stone-500 font-medium hidden sm:inline">
                    Bagikan:
                  </span>
                  <button
                    type="button"
                    className="p-2.5 rounded-xl border border-stone-200 bg-white hover:bg-navy hover:text-white text-stone-600 transition-colors shadow-2xs"
                    title="Bagikan artikel ini"
                  >
                    <Share2 size={16} />
                  </button>
                </div>
              </div>

            </article>

            {/* Related Articles Section */}
            {relatedArticles.length > 0 && (
              <div className="space-y-6 pt-6">
                <div className="flex items-center gap-2">
                  <BookOpen size={18} className="text-gold" />
                  <h3 className="font-heading font-bold text-xl text-navy">
                    Artikel Terkait Lainnya
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {relatedArticles.map((rel) => (
                    <NewsCard key={rel.id} news={rel} />
                  ))}
                </div>
              </div>
            )}
          </main>

          {/* ════ RIGHT COLUMN: SIDEBAR (4 Cols) ════ */}
          <div className="lg:col-span-4">
            <NewsSidebar
              categories={categories}
              popularArticles={relatedArticles}
            />
          </div>

        </div>

      </div>
    </div>
  );
}
