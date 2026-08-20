'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Store } from 'lucide-react';

interface BusinessImageCarouselProps {
  images: string[];
  businessName: string;
  className?: string;
}

export function BusinessImageCarousel({
  images,
  businessName,
  className,
}: BusinessImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const validImages = images && images.length > 0 ? images : ['/images/news-umkm-digital.svg'];
  const hasMultiple = validImages.length > 1;

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? validImages.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === validImages.length - 1 ? 0 : prev + 1));
  };

  const handleDotClick = (e: React.MouseEvent, idx: number) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex(idx);
  };

  return (
    <div
      className={`relative aspect-4/3 w-full overflow-hidden bg-stone-900 group select-none ${
        className || ''
      }`}
    >
      {/* ── Active Image with Fade/Scale Transition ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0.6, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0.4 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="relative w-full h-full"
        >
          <Image
            src={validImages[currentIndex]}
            alt={`${businessName} foto ${currentIndex + 1}`}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </motion.div>
      </AnimatePresence>

      {/* Subtle top and bottom gradient vignette */}
      <div className="absolute inset-0 bg-linear-to-t from-navy/60 via-transparent to-navy/20 pointer-events-none" />

      {/* ── Carousel Arrows (shown on hover or on touch) ── */}
      {hasMultiple && (
        <>
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Foto sebelumnya"
            className="absolute left-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-navy/70 hover:bg-navy backdrop-blur-md text-white border border-white/20 flex items-center justify-center opacity-80 sm:opacity-0 group-hover:opacity-100 transition-all duration-200 z-10 cursor-pointer shadow-md hover:scale-105"
          >
            <ChevronLeft size={16} />
          </button>

          <button
            type="button"
            onClick={handleNext}
            aria-label="Foto berikutnya"
            className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-navy/70 hover:bg-navy backdrop-blur-md text-white border border-white/20 flex items-center justify-center opacity-80 sm:opacity-0 group-hover:opacity-100 transition-all duration-200 z-10 cursor-pointer shadow-md hover:scale-105"
          >
            <ChevronRight size={16} />
          </button>

          {/* ── Dot Indicators ── */}
          <div className="absolute bottom-2.5 left-0 right-0 flex items-center justify-center gap-1.5 z-10">
            {validImages.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={(e) => handleDotClick(e, idx)}
                aria-label={`Lihat foto ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  idx === currentIndex
                    ? 'w-5 bg-gold shadow-xs'
                    : 'w-1.5 bg-white/60 hover:bg-white/90'
                }`}
              />
            ))}
          </div>

          {/* Image Counter Badge (e.g. 1/3) */}
          <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-md bg-navy/80 backdrop-blur-md border border-white/10 text-[10px] font-medium text-white/90 z-10 pointer-events-none">
            {currentIndex + 1}/{validImages.length}
          </div>
        </>
      )}
    </div>
  );
}

export default BusinessImageCarousel;
