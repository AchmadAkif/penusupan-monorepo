'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import { User, Shield, Briefcase, MapPin, Award } from 'lucide-react';
import { fadeInUp } from '@/constants/animation';
import type { OfficialCardProps } from '@/types/profile';

const categoryBadges = {
  pimpinan: {
    bg: 'bg-gold/10 text-gold-dark border-gold/30',
    icon: Award,
    label: 'Pimpinan',
  },
  sekretariat: {
    bg: 'bg-blue-50 text-blue-700 border-blue-200',
    icon: Briefcase,
    label: 'Sekretariat',
  },
  teknis: {
    bg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    icon: Shield,
    label: 'Pelaksana Teknis',
  },
  kewilayahan: {
    bg: 'bg-amber-50 text-amber-800 border-amber-200',
    icon: MapPin,
    label: 'Kewilayahan',
  },
};

export function OfficialCard({
  official,
  size = 'md',
  highlight = false,
  className,
}: OfficialCardProps) {
  const badgeConfig = categoryBadges[official.category] || categoryBadges.teknis;
  const BadgeIcon = badgeConfig.icon;

  const sizeClasses = {
    sm: 'p-4 max-w-xs',
    md: 'p-5 max-w-sm',
    lg: 'p-6 sm:p-7 max-w-md',
  };

  const avatarSizes = {
    sm: 'w-14 h-14 text-lg',
    md: 'w-16 h-16 sm:w-18 sm:h-18 text-xl',
    lg: 'w-20 h-20 sm:w-24 sm:h-24 text-2xl',
  };

  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className={`group relative w-full bg-white rounded-2xl border transition-all duration-300 shadow-xs hover:shadow-lg ${
        highlight
          ? 'border-gold/50 ring-2 ring-gold/20 shadow-md bg-linear-to-b from-white to-amber-50/20'
          : 'border-stone-200/80 hover:border-navy/30'
      } ${sizeClasses[size]} ${className || ''}`}
    >
      <div className="flex flex-col items-center text-center space-y-3">
        {/* Category Pill */}
        <span
          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium border ${badgeConfig.bg}`}
        >
          <BadgeIcon size={11} className="shrink-0" />
          <span>{badgeConfig.label}</span>
        </span>

        {/* Official Avatar / Placeholder */}
        <div
          className={`relative rounded-full flex items-center justify-center font-heading font-bold overflow-hidden shadow-inner shrink-0 ${
            avatarSizes[size]
          } ${
            highlight
              ? 'bg-navy text-gold ring-4 ring-gold/20'
              : 'bg-stone-100 text-navy/70 border-2 border-stone-200 group-hover:border-navy/30'
          }`}
        >
          {official.photoUrl ? (
            <Image
              src={official.photoUrl}
              alt={official.name}
              fill
              className="object-cover"
              sizes="96px"
            />
          ) : (
            <User className={size === 'lg' ? 'w-10 h-10' : 'w-7 h-7 text-stone-400 group-hover:text-navy'} />
          )}
        </div>

        {/* Role & Name */}
        <div className="space-y-1 w-full">
          <p
            className={`font-heading font-semibold text-navy leading-snug tracking-tight ${
              size === 'lg'
                ? 'text-lg sm:text-xl font-bold text-navy'
                : size === 'md'
                ? 'text-base sm:text-lg'
                : 'text-sm sm:text-base'
            }`}
          >
            {official.name}
          </p>

          <p
            className={`font-body font-medium ${
              highlight
                ? 'text-gold-dark font-semibold text-xs sm:text-sm'
                : 'text-stone-500 text-xs sm:text-sm'
            }`}
          >
            {official.role}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
