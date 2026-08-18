'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { fadeInUp } from '@/constants/animation';
import type { NewsCardProps } from '@/types/home';

export function NewsCard({ news, className = '' }: NewsCardProps) {
  return (
    <motion.article
      variants={fadeInUp}
      className={`group relative rounded-3xl bg-linen/50 hover:bg-white border border-stone-200/80 hover:border-gold/40 shadow-xs hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col justify-between ${className}`}
    >
      <div>
        {/* ── Cover Image Container ── */}
        <div className="relative aspect-16/10 w-full overflow-hidden bg-stone-100">
          <Image
            src={news.imageUrl}
            alt={news.title}
            width={600}
            height={400}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-linear-to-t from-navy/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Category Badge */}
          <div className="absolute top-4 left-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/95 backdrop-blur-md border border-stone-200/80 text-xs font-semibold text-navy font-body shadow-xs group-hover:border-gold/40 transition-colors">
              {news.category}
            </span>
          </div>
        </div>

        {/* ── Content Body ── */}
        <div className="p-6 sm:p-7 space-y-4">
          {/* Meta Info (Date & Read Time) */}
          <div className="flex items-center gap-4 text-xs font-body text-stone-500">
            <div className="flex items-center gap-1.5">
              <Calendar size={13} className="text-gold" />
              <span>{news.publishedAt}</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1.5">
              <Clock size={13} className="text-stone-400" />
              <span>{news.readTime}</span>
            </div>
          </div>

          {/* Article Title */}
          <h3 className="font-heading font-bold text-lg sm:text-xl text-navy leading-snug tracking-tight group-hover:text-gold-dark transition-colors line-clamp-2">
            <Link href={`/news/${news.slug}`} className="focus:outline-hidden">
              <span className="absolute inset-0 z-10" />
              {news.title}
            </Link>
          </h3>

          {/* Excerpt */}
          <p className="font-body text-xs sm:text-sm text-stone-600 leading-relaxed line-clamp-3">
            {news.excerpt}
          </p>
        </div>
      </div>

      {/* ── Footer Link ── */}
      <div className="px-6 pb-6 sm:px-7 sm:pb-7 pt-2 border-t border-stone-200/50 flex items-center justify-between">
        <span className="font-heading font-semibold text-xs text-navy group-hover:text-gold-dark transition-colors flex items-center gap-1.5">
          Baca Selengkapnya
          <ArrowRight
            size={14}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </span>
        <span className="font-body text-[11px] text-stone-400">
          {news.author}
        </span>
      </div>
    </motion.article>
  );
}
