import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import {
  Calendar,
  Clock,
  User,
  ArrowLeft,
  Share2,
  ChevronRight,
  Eye,
  Tag,
  BookOpen,
} from 'lucide-react';
import { NewsSidebar } from '@/components/news';
import { NewsCard } from '@/components/home/news/NewsCard';
import { DEFAULT_NEWS_DATA, DEFAULT_NEWS_CATEGORIES } from '@/constants/seedData';

interface NewsDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return DEFAULT_NEWS_DATA.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({
  params,
}: NewsDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = DEFAULT_NEWS_DATA.find((a) => a.slug === slug);

  if (!article) {
    return {
      title: 'Artikel Tidak Ditemukan',
    };
  }

  return {
    title: `${article.title} - Warta Desa Penusupan`,
    description: article.excerpt,
  };
}

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
  const { slug } = await params;
  const article = DEFAULT_NEWS_DATA.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  // Related articles (same category or general, excluding current)
  const relatedArticles = DEFAULT_NEWS_DATA.filter((a) => a.id !== article.id).slice(
    0,
    2
  );

  return (
    <div className="min-h-screen bg-linen pt-28 pb-20">
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
                    <span>{article.readTime}</span>
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
                  article.content.map((p: string, idx: number) => (
                    <p
                      key={idx}
                      className={
                        idx === 0
                          ? 'first-letter:float-left first-letter:text-5xl first-letter:pr-3 first-letter:font-heading first-letter:font-extrabold first-letter:text-navy first-letter:leading-none'
                          : ''
                      }
                    >
                      {p}
                    </p>
                  ))
                ) : (
                  <p>{article.excerpt}</p>
                )}
              </div>

              {/* Tags Section */}
              {article.tags && article.tags.length > 0 && (
                <div className="pt-6 border-t border-stone-100 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-stone-500 uppercase tracking-wider">
                    <Tag size={13} className="text-gold" />
                    <span>Kata Kunci Terkait</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {article.tags.map((tag: string) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full bg-stone-100 text-stone-700 text-xs font-medium hover:bg-navy hover:text-white transition-colors cursor-pointer"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

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
              categories={DEFAULT_NEWS_CATEGORIES}
              popularArticles={DEFAULT_NEWS_DATA}
            />
          </div>

        </div>

      </div>
    </div>
  );
}
