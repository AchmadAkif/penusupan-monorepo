import {
  Users,
  Map,
  Home,
  Store,
  ShieldCheck,
  Hammer,
  TrendingUp,
  HeartHandshake,
  Users2,
  Leaf,
  Handshake,
  Laptop,
  Activity,
  MapPin,
  Mountain,
  Trees,
  Sprout,
} from 'lucide-react';
import type {
  StatItem,
  HeroSectionProps,
  VillageHeadGreetingProps,
  VillageProfileData,
  VisionMissionData,
  DemographicSectionData,
  GeographyMetricItem,
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
    value: '4.155',
    label: 'Jumlah Penduduk',
    sublabel: 'Jiwa terdata resmi',
  },
  {
    icon: Map,
    value: '296',
    label: 'Luas Wilayah',
    sublabel: 'Hektar total area',
  },
  {
    icon: Home,
    value: '5',
    label: 'Wilayah Dusun',
    sublabel: '6 RW & 22 RT',
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

// ── 4. Village Profile Short Intro ──
export const DEFAULT_VILLAGE_PROFILE: VillageProfileData = {
  eyebrow: 'Tentang Desa Kami',
  title: 'Mengenal Lebih Dekat Desa Penusupan',
  description:
    'Terletak di kawasan lembah subur Kecamatan Pejawaran, Kabupaten Banjarnegara pada ketinggian ± 820 mdpl.',
  paragraphs: [
    'Desa Penusupan memiliki bentang alam lembah perbukitan yang asri dan tanah vulkanik yang subur. Mayoritas wilayah kami berupa lahan pertanian produktif yang menopang ketahanan pangan dan komoditas hortikultura.',
    'Selain kekayaan alamnya, Desa Penusupan kaya akan nilai budaya dan tradisi gotong royong yang terus terjaga secara turun-temurun, berpadu harmonis dengan semangat inovasi dan digitalisasi desa modern.',
  ],
  ctaLabel: 'Lihat Profil Lengkap',
  ctaHref: '/profile',
};

// ── 5. Village Vision & Mission ──
export const DEFAULT_VISION_MISSION: VisionMissionData = {
  vision:
    'Terwujudnya Desa Penusupan yang Maju, Mandiri, Sejahtera, Religius, Berbudaya, dan Berkelanjutan melalui Tata Kelola Pemerintahan yang Bersih, Transparan, dan Melayani',
  missions: [
    {
      id: 1,
      text: 'Meningkatkan kualitas tata kelola pemerintahan desa yang profesional, transparan, akuntabel, dan berorientasi pada pelayanan masyarakat.',
      icon: ShieldCheck,
    },
    {
      id: 2,
      text: 'Meningkatkan pembangunan infrastruktur desa yang merata, berkualitas, dan berkelanjutan.',
      icon: Hammer,
    },
    {
      id: 3,
      text: 'Mengembangkan potensi ekonomi desa melalui pemberdayaan masyarakat, UMKM, pertanian, peternakan, dan sektor unggulan desa.',
      icon: TrendingUp,
    },
    {
      id: 4,
      text: 'Meningkatkan kualitas pendidikan, kesehatan, serta kesejahteraan sosial masyarakat.',
      icon: HeartHandshake,
    },
    {
      id: 5,
      text: 'Memperkuat nilai-nilai keagamaan, budaya, gotong royong, dan kerukunan dalam kehidupan bermasyarakat.',
      icon: Users2,
    },
    {
      id: 6,
      text: 'Meningkatkan pelestarian lingkungan hidup serta pengelolaan sumber daya alam secara bijaksana.',
      icon: Leaf,
    },
    {
      id: 7,
      text: 'Mendorong partisipasi aktif masyarakat dalam perencanaan, pelaksanaan, dan pengawasan pembangunan desa.',
      icon: Handshake,
    },
    {
      id: 8,
      text: 'Mewujudkan pelayanan publik yang cepat, mudah, ramah, dan berbasis teknologi informasi menuju Desa Digital.',
      icon: Laptop,
    },
  ],
};

// ── 6. Demographics Section Data (Real Village Official Data) ──
export const DEFAULT_DEMOGRAPHIC_DATA: DemographicSectionData = {
  metrics: [
    {
      id: 'total-population',
      value: '4.155',
      label: 'Total Penduduk',
      description: 'Jiwa penduduk terdaftar resmi dalam catatan kependudukan.',
      icon: Users,
      badge: 'Populasi',
    },
    {
      id: 'head-of-household',
      value: '1.262',
      label: 'Kepala Keluarga',
      description: 'Rumah tangga aktif tersebar di seluruh wilayah rukun warga.',
      icon: Home,
      badge: '6 RW',
    },
    {
      id: 'administrative-units',
      value: '22',
      label: 'Rukun Tetangga (RT)',
      description: 'Unit rukun tetangga aktif yang menopang kerukunan warga.',
      icon: MapPin,
      badge: 'Struktur Desa',
    },
    {
      id: 'health-services',
      value: '4',
      label: 'Posyandu Aktif',
      description: 'Pos pelayanan kesehatan terpadu melayani ibu, bayi & balita.',
      icon: Activity,
      badge: 'Layanan Kesehatan',
    },
  ],
  ctaLabel: 'Lihat Data Statistik Lengkap',
  ctaHref: '/profile#demografi',
};

// ── 7. Geography Section Metrics (Real Village Official Data) ──
export const DEFAULT_GEOGRAPHY_METRICS: GeographyMetricItem[] = [
  {
    id: 'topography-altitude',
    value: 'Lembah',
    label: 'Topografi & Elevasi',
    description: 'Ketinggian ± 820 mdpl dengan bentang alam lembah subur beriklim sejuk.',
    icon: Mountain,
    badge: '820 mdpl',
  },
  {
    id: 'total-area',
    value: '296 Ha',
    label: 'Luas Wilayah Total',
    description: 'Total luas wilayah administratif Desa Penusupan di Kecamatan Pejawaran.',
    icon: Map,
    badge: 'Administrasi',
  },
  {
    id: 'agriculture-land',
    value: '296 Ha',
    label: 'Lahan Pertanian',
    description: 'Mendominasi tata ruang desa untuk budidaya komoditas hortikultura & pangan.',
    icon: Sprout,
    badge: 'Sektor Utama',
  },
  {
    id: 'plantation-land',
    value: '24 Ha',
    label: 'Lahan Perkebunan',
    description: 'Potensi perkebunan produktif masyarakat penunjang ekonomi pedesaan.',
    icon: Trees,
    badge: 'Perkebunan',
  },
];
