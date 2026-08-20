'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';
import { Calendar, User, Clock, Eye, Sparkles } from 'lucide-react';
import { slideInLeft } from '@/constants/animation';
import type { NewsItem } from '@/types/news';

interface NewsFeaturedCardProps {
  article: NewsItem;
  className?: string;
}

export function NewsFeaturedCard({
  article,
  className = '',
}: NewsFeaturedCardProps) {
  return (
    <motion.article
      variants={slideInLeft}
      initial="hidden"
      animate="visible"
      className={`group relative w-full aspect-16/10 sm:aspect-21/9 min-h-[300px] sm:min-h-[360px] rounded-3xl overflow-hidden border border-stone-200/90 shadow-xs hover:shadow-xl transition-all duration-500 flex flex-col justify-end p-6 sm:p-8 lg:p-9 ${className}`}
    >
      {/* ── Background Cover Image ── */}
      <Image
        src={article.imageUrl || '/images/news-hortikultura.svg'}
        alt={article.title}
        fill
        priority
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        sizes="(max-width: 1024px) 100vw, 65vw"
      />

      {/* ── High Contrast Gradient Overlays ── */}
      <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/45 to-black/10" />
      <div className="absolute inset-0 bg-navy/20 group-hover:bg-transparent transition-colors duration-300" />

      {/* ── Top Badges ── */}
      <div className="absolute top-5 left-5 sm:top-6 sm:left-6 flex items-center gap-2.5 z-20">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold text-navy-dark text-xs font-bold shadow-xs">
          <Sparkles size={12} className="text-navy" />
          <span>Terbaru</span>
        </span>
        <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-semibold">
          {article.category}
        </span>
      </div>

      {/* ── Bottom Content Details ── */}
      <div className="relative z-20 space-y-2.5 max-w-2xl">
        {/* Title */}
        <h3 className="font-heading font-extrabold text-xl sm:text-2xl lg:text-3xl text-white leading-tight tracking-tight group-hover:text-gold transition-colors line-clamp-2">
          <Link href={`/news/${article.slug}`} className="focus:outline-hidden">
            <span className="absolute inset-0 z-10" />
            {article.title}
          </Link>
        </h3>

        {/* Excerpt */}
        {article.excerpt && (
          <p className="font-body text-xs sm:text-sm text-stone-200/90 leading-relaxed line-clamp-2 max-w-xl">
            {article.excerpt}
          </p>
        )}

        {/* Metadata Bar */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-stone-300 font-body pt-1">
          <div className="flex items-center gap-1.5">
            <Calendar size={13} className="text-gold" />
            <span>{article.publishedAt}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <User size={13} className="text-gold" />
            <span>{article.author}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock size={13} className="text-stone-400" />
            <span>{article.readTime} mnt baca</span>
          </div>
          {article.viewCount !== undefined && (
            <div className="flex items-center gap-1.5 text-gold font-medium">
              <Eye size={13} />
              <span>{article.viewCount.toLocaleString('id-ID')} tayang</span>
            </div>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export default NewsFeaturedCard;
