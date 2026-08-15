'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';
import { Quote, ArrowRight, Award, Sparkles } from 'lucide-react';
import { fadeInUp, staggerContainer, scaleIn, slideInLeft } from '@/constants/animation';

export interface VillageHeadGreetingProps {
  name?: string;
  role?: string;
  period?: string;
  photoUrl?: string;
  greetingTitle?: string;
  paragraphs?: string[];
  signatureText?: string;
  profileHref?: string;
}

const DEFAULT_PARAGRAPHS = [
  'Puji syukur senantiasa kita panjatkan ke hadirat Tuhan Yang Maha Esa atas limpahan rahmat dan karunia-Nya, sehingga website resmi Desa Penusupan ini dapat hadir sebagai jembatan komunikasi dan keterbukaan informasi publik bagi seluruh warga masyarakat.',
  'Di era transformasi digital ini, kami berkomitmen untuk mewujudkan tata kelola pemerintahan desa yang transparan, akuntabel, dan berorientasi pada pelayanan prima. Website ini dirancang agar masyarakat dapat mengakses layanan administrasi, memantau perkembangan pembangunan desa, serta mengeksplorasi potensi pertanian dan UMKM unggulan kami dengan mudah.',
  'Mari bersama-sama kita satukan tekad dan semangat gotong royong untuk membangun Desa Penusupan yang maju, mandiri, sejahtera, dan senantiasa melestarikan nilai-nilai kearifan lokal.',
];

export function VillageHeadGreeting({
  name = 'Kepala Desa Penusupan',
  role = 'Kepala Desa',
  period = 'Masa Bakti 2019 – 2025',
  photoUrl = '/images/village-head-placeholder.svg',
  greetingTitle = 'Mewujudkan Desa Penusupan yang Maju, Transparan, dan Sejahtera',
  paragraphs = DEFAULT_PARAGRAPHS,
  signatureText = 'Salam Hangat & Gotong Royong,',
  profileHref = '/profile',
}: VillageHeadGreetingProps) {
  return (
    <section className="relative py-20 lg:py-28 bg-linen overflow-hidden">
      {/* Subtle background ambient accents */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-gold/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-navy/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* ── Column 1: Portrait & Official Badge (5 cols) ── */}
          <motion.div
            variants={slideInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="relative w-full max-w-md">
              {/* Decorative background border frame */}
              <div className="absolute -inset-2 sm:-inset-3 rounded-[36px] bg-linear-to-tr from-gold/30 via-transparent to-navy/20 blur-xs -z-10" />

              {/* Main Portrait Card */}
              <div className="relative rounded-3xl overflow-hidden bg-navy shadow-2xl border-2 border-white/60 group">
                <div className="aspect-4/5 relative w-full overflow-hidden">
                  <Image
                    src={photoUrl}
                    alt={`Foto ${name}`}
                    width={480}
                    height={600}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Subtle bottom gradient overlay */}
                  <div className="absolute inset-0 bg-linear-to-t from-navy via-navy/30 to-transparent" />
                </div>

                {/* Overlaid Name & Role Footer */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white text-center sm:text-left">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold/20 backdrop-blur-md border border-gold/30 text-gold-light text-xs font-semibold font-body mb-2">
                    <Award size={13} className="text-gold" />
                    <span>{role}</span>
                  </div>
                  <h3 className="font-heading font-bold text-xl sm:text-2xl text-white leading-snug">
                    {name}
                  </h3>
                  <p className="text-white/70 font-body text-xs mt-1">
                    Pemerintah Desa Penusupan, Banjarnegara
                  </p>
                </div>
              </div>

              {/* Floating Period Tag Badge */}
              <div className="absolute -top-4 -right-2 sm:-right-4 px-4 py-2 rounded-2xl bg-white/95 backdrop-blur-md border border-stone-200/80 shadow-lg flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-gold animate-pulse" />
                <span className="font-heading font-semibold text-navy text-xs">
                  {period}
                </span>
              </div>
            </div>
          </motion.div>

          {/* ── Column 2: Welcome Message & Signature (7 cols) ── */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="lg:col-span-7 flex flex-col space-y-6"
          >
            {/* Section Eyebrow */}
            <motion.div variants={fadeInUp}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy/5 border border-navy/10 text-navy text-xs sm:text-sm font-semibold font-body">
                <Sparkles size={14} className="text-gold" />
                <span>Sambutan Kepala Desa</span>
              </div>
            </motion.div>

            {/* Greeting Main Heading */}
            <motion.h2
              variants={fadeInUp}
              className="font-heading font-bold text-2xl sm:text-3xl md:text-4xl text-navy tracking-tight leading-tight"
            >
              {greetingTitle}
            </motion.h2>

            {/* Quote Block with decorative quote icon */}
            <motion.div variants={fadeInUp} className="relative pt-2">
              <Quote
                size={54}
                className="absolute -top-3 -left-2 text-gold/20 -z-10 rotate-180 select-none pointer-events-none"
              />
              <div className="space-y-4 text-stone-700 font-body text-sm sm:text-base leading-relaxed">
                {paragraphs.map((p, idx) => (
                  <p key={idx} className="text-justify sm:text-left">
                    {p}
                  </p>
                ))}
              </div>
            </motion.div>

            {/* Signature & CTA Section */}
            <motion.div
              variants={fadeInUp}
              className="pt-4 border-t border-stone-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-6"
            >
              <div>
                <p className="font-body text-xs text-stone-500 italic">
                  {signatureText}
                </p>
                <p className="font-heading font-bold text-navy text-base sm:text-lg mt-0.5">
                  {name}
                </p>
                <p className="font-body text-xs text-stone-500">
                  {role} Desa Penusupan
                </p>
              </div>

              {profileHref && (
                <Link
                  href={profileHref}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-navy hover:bg-navy-light text-white font-heading font-semibold text-sm transition-all duration-200 shadow-md hover:shadow-lg hover:translate-x-0.5 active:scale-95 shrink-0"
                >
                  <span>Profil Lengkap Desa</span>
                  <ArrowRight size={16} className="text-gold" />
                </Link>
              )}
            </motion.div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}
