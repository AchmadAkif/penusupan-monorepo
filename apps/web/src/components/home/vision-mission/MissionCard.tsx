'use client';

import { motion } from 'motion/react';
import { fadeInUp } from '@/constants/animation';
import type { MissionCardProps } from '@/types/home';

export function MissionCard({ mission, className = '' }: MissionCardProps) {
  const Icon = mission.icon;
  const formattedNumber = String(mission.id).padStart(2, '0');

  return (
    <motion.div
      variants={fadeInUp}
      className={`group relative rounded-2xl bg-linen hover:bg-white p-6 border border-stone-200/70 hover:border-gold/40 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between ${className}`}
    >
      <div className="space-y-4">
        {/* Card Header: Icon & Number Badge */}
        <div className="flex items-center justify-between">
          <div className="w-12 h-12 rounded-xl bg-navy/5 text-navy group-hover:bg-gold group-hover:text-navy transition-colors duration-300 flex items-center justify-center shrink-0">
            <Icon
              size={22}
              className="transition-transform duration-300 group-hover:scale-110"
            />
          </div>
          <span className="font-heading font-extrabold text-2xl text-stone-300 group-hover:text-gold transition-colors duration-300">
            {formattedNumber}
          </span>
        </div>

        {/* Mission Description Text */}
        <p className="font-body text-stone-700 text-sm leading-relaxed">
          {mission.text}
        </p>
      </div>

      {/* Bottom Accent Line */}
      <div className="mt-6 pt-4 border-t border-stone-200/50 flex items-center gap-1.5 text-stone-400 group-hover:text-gold transition-colors text-xs font-semibold font-heading">
        <span>Pilar {mission.id}</span>
      </div>
    </motion.div>
  );
}
