import { Facebook, Instagram, Youtube } from 'lucide-react';
import type {
  NavLinkItem,
  VillageConfig,
  SocialLinkItem,
} from '@/types/navigation';

export const NAV_LINKS: NavLinkItem[] = [
  { href: '/', label: 'Beranda' },
  { href: '/profile', label: 'Profil Desa' },
  { href: '/businesses', label: 'UMKM' },
  { href: '/news', label: 'Berita' },
];

export const FOOTER_NAV_LINKS: NavLinkItem[] = [
  { href: '/', label: 'Beranda' },
  { href: '/profile', label: 'Profil Desa' },
  { href: '/businesses', label: 'UMKM' },
  { href: '/news', label: 'Berita & Pengumuman' },
];

export const DEFAULT_CTA_LINK: NavLinkItem = {
  href: '/news',
  label: 'Lihat Berita',
};

export const SOCIAL_LINKS: SocialLinkItem[] = [
  { href: '#', icon: Facebook, label: 'Facebook' },
  { href: '#', icon: Instagram, label: 'Instagram' },
  { href: '#', icon: Youtube, label: 'YouTube' },
];

export const VILLAGE_INFO: VillageConfig = {
  name: 'Desa Penusupan',
  tagline: 'Desa yang maju, sejahtera, dan berbudaya',
  address: 'Jl. Raya Karangkobar-Pejawaran',
  region: 'Kec. Pejawaran, Kab. Banjarnegara, Jawa Tengah 53454',
  phone: '-',
  email: 'desapenusupan014@gmail.com',
  mapEmbed:
    'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15832.096090734074!2d109.7948854!3d-7.2380989!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e700f2d10fcfe31%3A0xa6a31727a4e1c99f!2sBalai%20Desa%20Panusupan%20Pejawaran!5e0!3m2!1sid!2sid!4v1786763538432!5m2!1sid!2sid',
};
