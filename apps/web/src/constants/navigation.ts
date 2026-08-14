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
  name: string;
  icon: string;
}

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

export const VILLAGE_INFO: VillageConfig = {
  name: 'Desa Penusupan',
  tagline: 'Desa yang maju, sejahtera, dan berbudaya',
  address: 'Jl. Raya Karangkobar-Pejawaran',
  region: 'Kec. Pejawaran, Kab. Banjarnegara, Jawa Tengah 53454',
  phone: '-',
  email: 'desapenusupan014@gmail.com',
  mapEmbed: 'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15831.800668192936!2d109.796944!3d-7.246512!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e700f2d10fcfe31%3A0xa6a31727a4e1c99f!2sBalai%20Desa%20Panusupan%20Pejawaran!5e0!3m2!1sid!2sid!4v1786688234639!5m2!1sid!2sid'
};
