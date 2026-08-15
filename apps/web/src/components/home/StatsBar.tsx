'use client';

import { motion } from 'motion/react';
import { Users, Map, Home, Store } from 'lucide-react';
import { fadeInUp, staggerContainer } from '@/constants/animation';

export interface StatItem {
  icon: typeof Users;
  value: string;
  label: string;
  sublabel?: string;
}

export interface StatsBarProps {
  stats?: StatItem[];
  className?: string;
}

const DEFAULT_STATS: StatItem[] = [
  {
    icon: Users,
    value: '2.850+',
    label: 'Jumlah Penduduk',
    sublabel: 'Jiwa terdata',
  },
  {
    icon: Map,
    value: '342,5',
    label: 'Luas Wilayah',
    sublabel: 'Hektar persegi',
  },
  {
    icon: Home,
    value: '4',
    label: 'Wilayah Dusun',
    sublabel: 'Rukun Warga & RT',
  },
  {
    icon: Store,
    value: '35+',
    label: 'UMKM Aktif',
    sublabel: 'Sektor usaha lokal',
  },
];

export function StatsBar({ stats = DEFAULT_STATS, className }: StatsBarProps) {
  return (
    <div className={`relative -mt-16 sm:-mt-20 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className || ''}`}>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        className="bg-white/95 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-2xl shadow-navy/10 border border-stone-100"
      >
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-stone-100">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                variants={fadeInUp}
                className={`flex items-center gap-4 ${idx > 0 ? 'pt-4 sm:pt-0 sm:pl-6 lg:pl-8' : ''}`}
              >
                <div className="w-12 h-12 rounded-2xl bg-navy/5 flex items-center justify-center text-navy shrink-0 group-hover:bg-gold/20 transition-colors">
                  <Icon size={24} className="text-gold" />
                </div>
                <div className="flex flex-col">
                  <span className="font-heading font-extrabold text-2xl sm:text-3xl text-navy tracking-tight leading-none">
                    {stat.value}
                  </span>
                  <span className="font-heading font-semibold text-xs sm:text-sm text-stone-700 mt-1">
                    {stat.label}
                  </span>
                  {stat.sublabel && (
                    <span className="font-body text-[11px] text-stone-400">
                      {stat.sublabel}
                    </span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
