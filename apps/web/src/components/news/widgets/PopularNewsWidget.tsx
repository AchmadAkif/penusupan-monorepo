'use client';

import Link from 'next/link';
import Image from 'next/image';
import { TrendingUp, Eye, Calendar } from 'lucide-react';
import type { NewsItem } from '@/types/news';

interface PopularNewsWidgetProps {
  articles: NewsItem[];
  limit?: number;
  className?: string;
}

export function PopularNewsWidget({
  articles,
  limit = 3,
  className,
}: PopularNewsWidgetProps) {
  // Sort articles by viewCount descending and take top N
  const popularArticles = [...articles]
    .sort((a, b) => (b.viewCount || 0) - (a.viewCount || 0))
    .slice(0, limit);

  return (
    <div
      className={`rounded-2xl bg-white border border-stone-200/90 p-5 shadow-xs space-y-4 ${
        className || ''
      }`}
    >
      <div className="flex items-center gap-2">
        <TrendingUp size={16} className="text-gold" />
        <h3 className="font-heading font-bold text-sm uppercase tracking-wider text-navy">
          Berita Terpopuler
        </h3>
      </div>

      {popularArticles.length > 0 ? (
        <div className="space-y-3.5 divide-y divide-stone-100">
          {popularArticles.map((article, idx) => (
            <Link
              key={article.id}
              href={`/news/${article.slug}`}
              className="group flex items-start gap-3.5 pt-3.5 first:pt-0 transition-colors"
            >
              {/* Rank / Number Badge */}
              <span className="font-heading font-black text-lg text-stone-300 group-hover:text-gold transition-colors w-4 text-center shrink-0">
                {idx + 1}
              </span>

              {/* Thumbnail */}
              <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-stone-100 shrink-0 border border-stone-200/60">
                <Image
                  src={article.imageUrl}
                  alt={article.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                  sizes="64px"
                />
              </div>

              {/* Content Details */}
              <div className="flex-1 min-w-0 space-y-1">
                <h4 className="font-heading font-bold text-xs sm:text-sm text-navy line-clamp-2 leading-snug group-hover:text-gold-dark transition-colors">
                  {article.title}
                </h4>

                <div className="flex items-center gap-2.5 text-[11px] text-stone-500 font-medium">
                  <span className="flex items-center gap-1">
                    <Calendar size={11} className="text-stone-400" />
                    {article.publishedAt}
                  </span>
                  <span className="flex items-center gap-1 text-gold-dark font-semibold">
                    <Eye size={11} />
                    {article.viewCount?.toLocaleString('id-ID') || 0}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-xs text-stone-400 italic py-2">
          Belum ada berita terpopuler saat ini.
        </p>
      )}
    </div>
  );
}
