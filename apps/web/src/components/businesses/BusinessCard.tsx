'use client';

import { motion } from 'motion/react';
import {
  MapPin,
  User,
  MessageCircle,
  ShieldCheck,
  Tag,
} from 'lucide-react';
import { fadeInUp } from '@/constants/animation';
import { BusinessImageCarousel } from './BusinessImageCarousel';
import type { BusinessCardProps } from '@/types/businesses';

export function BusinessCard({
  business,
  className = '',
}: BusinessCardProps) {
  // Format WhatsApp Link
  const waPhone =
    business.whatsappNumber ||
    business.phone.replace(/^0/, '62').replace(/\D/g, '');
  const waText = encodeURIComponent(
    `Halo ${business.ownerName} (${business.name}), saya tertarik dengan produk/layanan Anda dari Website Desa Penusupan.`
  );
  const waUrl = `https://wa.me/${waPhone}?text=${waText}`;

  // Default Maps URL fallback
  const mapsUrl =
    business.mapsUrl ||
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      `${business.name} ${business.address} Penusupan Pejawaran`
    )}`;

  return (
    <motion.article
      variants={fadeInUp}
      className={`group relative rounded-3xl bg-white border border-stone-200/90 hover:border-gold/50 shadow-xs hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between ${className}`}
    >
      <div>
        {/* ── Top Image Carousel ── */}
        <div className="relative">
          <BusinessImageCarousel
            images={business.imageUrls}
            businessName={business.name}
          />

          {/* Category Pill Tag (Overlaid top-left) */}
          <div className="absolute top-3 left-3 z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md border border-stone-200/80 text-xs font-bold text-navy shadow-xs">
              <Tag size={12} className="text-gold" />
              <span>{business.category}</span>
            </span>
          </div>
        </div>

        {/* ── Content Details ── */}
        <div className="p-5 sm:p-6 space-y-4">

          {/* Identity: Name & Owner */}
          <div className="space-y-1.5">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-heading font-extrabold text-lg sm:text-xl text-navy leading-snug group-hover:text-gold-dark transition-colors">
                {business.name}
              </h3>
              {business.isVerified && (
                <span
                  title="Usaha Terverifikasi Desa"
                  className="shrink-0 p-1 rounded-full bg-amber-50 text-gold-dark border border-gold/30 mt-0.5"
                >
                  <ShieldCheck size={14} />
                </span>
              )}
            </div>

            {/* Owner & Dusun Meta */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-stone-500 font-medium">
              <div className="flex items-center gap-1 text-stone-700">
                <User size={13} className="text-gold" />
                <span className="font-semibold">{business.ownerName}</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1">
                <MapPin size={13} className="text-stone-400" />
                <span>{business.dusun}</span>
              </div>
            </div>
          </div>

          {/* Business Description */}
          <p className="font-body text-xs sm:text-sm text-stone-600 leading-relaxed line-clamp-2">
            {business.description}
          </p>

          {/* Products / Services Badges */}
          {business.productsSold && business.productsSold.length > 0 && (
            <div className="space-y-1.5 pt-1">
              <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block">
                Komoditas / Layanan:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {business.productsSold.map((prod, idx) => (
                  <span
                    key={idx}
                    className="inline-block px-2.5 py-0.5 rounded-lg bg-linen/90 border border-stone-200/80 text-[11px] font-medium text-stone-700"
                  >
                    {prod}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Dual Action Buttons: Hubungi (WhatsApp) & Lokasi (Maps) ── */}
      <div className="p-4 sm:p-5 pt-0 grid grid-cols-2 gap-2.5">
        {/* Button 1: WhatsApp */}
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-semibold transition-colors shadow-2xs hover:shadow-sm"
        >
          <MessageCircle size={15} />
          <span>Hubungi WA</span>
        </a>

        {/* Button 2: Google Maps */}
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-navy text-xs sm:text-sm font-semibold transition-colors border border-stone-200"
        >
          <MapPin size={15} className="text-gold" />
          <span>Petunjuk Arah</span>
        </a>
      </div>
    </motion.article>
  );
}

export default BusinessCard;
