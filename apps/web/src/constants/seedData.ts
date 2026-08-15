import { Users, Map, Home, Store } from 'lucide-react';
import type {
  StatItem,
  HeroSectionProps,
  VillageHeadGreetingProps,
} from '@/types/home';

// ── 1. Hero Section Default Data ──
export const DEFAULT_HERO_DATA: Required<HeroSectionProps> = {
  eyebrow: 'Website Resmi Pemerintah Desa',
  title: 'Harmoni Tradisi, Menuju Desa Berdaya & Sejahtera',
  subtitle:
    'Selamat datang di portal informasi resmi Desa Penusupan, Kecamatan Pejawaran, Kabupaten Banjarnegara. Temukan layanan, potensi UMKM, berita terkini, dan profil desa.',
  primaryCta: { label: 'Jelajahi Profil', href: '/profile' },
  secondaryCta: { label: 'Potensi UMKM', href: '/businesses' },
};

// ── 2. Village Statistics (StatsBar) ──
export const DEFAULT_VILLAGE_STATS: StatItem[] = [
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

// ── 3. Village Head Greeting & Info ──
export const DEFAULT_VILLAGE_HEAD: Required<VillageHeadGreetingProps> = {
  name: 'Kepala Desa Penusupan',
  role: 'Kepala Desa',
  period: 'Masa Bakti 2019 – 2025',
  photoUrl: '/images/village-head-placeholder.svg',
  greetingTitle:
    'Mewujudkan Desa Penusupan yang Maju, Transparan, dan Sejahtera',
  signatureText: 'Salam Hangat & Gotong Royong,',
  profileHref: '/profile',
  paragraphs: [
    'Puji syukur senantiasa kita panjatkan ke hadirat Tuhan Yang Maha Esa atas limpahan rahmat dan karunia-Nya, sehingga website resmi Desa Penusupan ini dapat hadir sebagai jembatan komunikasi dan keterbukaan informasi publik bagi seluruh warga masyarakat.',
    'Di era transformasi digital ini, kami berkomitmen untuk mewujudkan tata kelola pemerintahan desa yang transparan, akuntabel, dan berorientasi pada pelayanan prima. Website ini dirancang agar masyarakat dapat mengakses layanan administrasi, memantau perkembangan pembangunan desa, serta mengeksplorasi potensi pertanian dan UMKM unggulan kami dengan mudah.',
    'Mari bersama-sama kita satukan tekad dan semangat gotong royong untuk membangun Desa Penusupan yang maju, mandiri, sejahtera, dan senantiasa melestarikan nilai-nilai kearifan lokal.',
  ],
};
