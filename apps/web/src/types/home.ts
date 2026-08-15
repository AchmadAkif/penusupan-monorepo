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

export interface VillageProfileData {
  eyebrow?: string;
  title: string;
  description: string;
  paragraphs: string[];
  ctaLabel?: string;
  ctaHref?: string;
}

export interface VillageProfileIntroProps {
  profile?: VillageProfileData;
  className?: string;
}

export interface MissionItem {
  id: number;
  text: string;
  icon: LucideIcon;
}

export interface MissionCardProps {
  mission: MissionItem;
  className?: string;
}

export interface VisionMissionData {
  vision: string;
  missions: MissionItem[];
}

export interface VisionMissionSectionProps {
  visionMission?: VisionMissionData;
  className?: string;
}
