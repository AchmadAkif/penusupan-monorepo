import type { LucideIcon } from 'lucide-react';

export interface StatItem {
  icon: LucideIcon;
  value: string;
  label: string;
  sublabel?: string;
}

export interface StatsBarProps {
  stats?: StatItem[];
  className?: string;
}

export interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  eyebrow?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
}

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
