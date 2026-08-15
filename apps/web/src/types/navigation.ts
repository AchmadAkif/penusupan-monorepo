import type { LucideIcon } from 'lucide-react';

export interface NavLinkItem {
  href: string;
  label: string;
}

export interface VillageConfig {
  name: string;
  tagline: string;
  address: string;
  region: string;
  phone: string;
  email: string;
  mapEmbed: string;
}

export interface SocialLinkItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

export interface NavLinkProps {
  href: string;
  label: string;
  variant?: 'desktop' | 'mobile';
  scrolled?: boolean;
  onClick?: () => void;
  className?: string;
}

export interface NavbarProps {
  links?: NavLinkItem[];
  cta?: NavLinkItem;
  className?: string;
  threshold?: number;
}

export interface MobileNavDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  links: NavLinkItem[];
  cta?: NavLinkItem;
}

export interface FooterProps {
  info?: VillageConfig;
  navLinks?: NavLinkItem[];
  socialLinks?: SocialLinkItem[];
  className?: string;
}
