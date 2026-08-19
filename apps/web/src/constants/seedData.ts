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
import type { NewsItem } from '@/types/news';
import type {
  VillageOrgStructure,
  VillageHistoryData,
} from '@/types/profile';
import type { BusinessItem } from '@/types/businesses';


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
  name: 'Budi Indarto',
  role: 'Kepala Desa',
  period: 'Masa Bakti 2019 – 2025',
  photoUrl: '/images/village-head-placeholder.svg',
  greetingTitle:
    'Mewujudkan Desa Penusupan yang Maju, Transparan, dan Sejahtera',
  signatureText: 'Salam Hangat & Gotong Royong,',
  profileHref: '/profile#struktur',
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






// ── 9. Organizational Structure Default Data (Real Official Data) ──
export const DEFAULT_ORG_STRUCTURE: VillageOrgStructure = {
  head: {
    id: 'kades',
    name: 'Budi Indarto',
    role: 'Kepala Desa',
    category: 'pimpinan',
    photoUrl: '/images/village-head-placeholder.svg',
    hierarchyLevel: 1,
  },
  secretary: {
    id: 'sekdes',
    name: 'Ovik Suprayitno',
    role: 'Sekretaris Desa',
    category: 'pimpinan',
    hierarchyLevel: 2,
  },
  kaurs: [
    {
      id: 'kaur-1',
      name: 'Jana',
      role: 'Kaur Perencanaan',
      category: 'sekretariat',
      hierarchyLevel: 3,
    },
    {
      id: 'kaur-2',
      name: 'Heli Susanto',
      role: 'Kaur Tata Usaha & Umum',
      category: 'sekretariat',
      hierarchyLevel: 3,
    },
    {
      id: 'kaur-3',
      name: 'Santi Wiji Jayanti, S.Pd',
      role: 'Kaur Keuangan',
      category: 'sekretariat',
      hierarchyLevel: 3,
    },
  ],
  kasis: [
    {
      id: 'kasi-1',
      name: 'Baidowi',
      role: 'Kasi Pemerintahan',
      category: 'teknis',
      hierarchyLevel: 3,
    },
    {
      id: 'kasi-2',
      name: 'Nurwahyuni',
      role: 'Kasi Pelayanan',
      category: 'teknis',
      hierarchyLevel: 3,
    },
    {
      id: 'kasi-3',
      name: 'Yunita Septa Dewi',
      role: 'Kasi Kesejahteraan',
      category: 'teknis',
      hierarchyLevel: 3,
    },
  ],
  kaduses: [
    {
      id: 'kadus-1',
      name: 'Suwadi',
      role: 'Kadus I',
      category: 'kewilayahan',
      hierarchyLevel: 4,
    },
    {
      id: 'kadus-2',
      name: 'Slamet',
      role: 'Kadus II',
      category: 'kewilayahan',
      hierarchyLevel: 4,
    },
    {
      id: 'kadus-3',
      name: 'Miswanto',
      role: 'Kadus III',
      category: 'kewilayahan',
      hierarchyLevel: 4,
    },
    {
      id: 'kadus-4',
      name: 'Rudi Darmawan',
      role: 'Kadus IV',
      category: 'kewilayahan',
      hierarchyLevel: 4,
    },
    {
      id: 'kadus-5',
      name: 'Tanton Riyo Fernandi',
      role: 'Kadus V',
      category: 'kewilayahan',
      hierarchyLevel: 4,
    },
  ],
};

// ── 10. Village History Default Narrative ──
export const DEFAULT_VILLAGE_HISTORY: VillageHistoryData = {
  title: 'Menelusuri Jejak Langkah & Warisan Leluhur',
  subtitle:
    'Rangkaian kisah perjalanan sejarah, kearifan lokal, dan nilai luhur gotong royong yang membentuk identitas Desa Penusupan.',
  paragraphs: [
    'Keberadaan Desa Penusupan tidak terlepas dari kisah perjalanan panjang para sesepuh pendahulu yang membuka permukiman di kawasan lembah pegunungan yang subur ini. Nama "Penusupan" secara turun-temurun diyakini sarat akan makna filosofis mengenai keteguhan, ketenangan alam, dan ikatan kekerabatan masyarakat yang erat dalam menjaga keharmonisan lingkungan.',
    'Seiring berjalannya waktu dan pergantian generasi, Desa Penusupan terus bertransformasi dari sebuah permukiman agraris tradisional menjadi desa yang mandiri, berdaya, dan terbuka terhadap kemajuan. Nilai-nilai kearifan lokal seperti gotong royong, musyawarah mufakat, serta penghormatan terhadap alam tetap menjadi fondasi utama yang mendasari setiap gerak langkah pembangunan desa.',
    'Saat ini, pemerintah desa bersama seluruh elemen masyarakat dan tokoh adat terus mendokumentasikan serta menghimpun arsip sejarah resmi desa secara komprehensif, guna memastikan warisan nilai luhur ini dapat terus dipelajari dan diwariskan dengan bangga kepada generasi mendatang.',
  ],
  imageUrl: '/images/village-history.svg',
  imageCaption: 'Bentang alam lembah dan harmoni kehidupan masyarakat Desa Penusupan.',
  quote:
    'Menjaga warisan luhur para pendahulu, melangkah bersama membangun masa depan desa yang berdaulat dan sejahtera.',
};

// ── 11. Local Businesses & MSME Default Data ──
export const DEFAULT_BUSINESSES_DATA: BusinessItem[] = [
  {
    id: 'umkm-1',
    name: 'Warung Bu Romlah',
    ownerName: 'Ibu Romlah',
    category: 'Kuliner & Sembako',
    description:
      'Penyedia aneka sembako harian, jajanan pasar tradisional khas desa, dan aneka olahan sayuran segar hasil panen petani lokal Penusupan.',
    productsSold: ['Sembako Lengkap', 'Jajanan Pasar', 'Gorengan Hangat', 'Sayuran Segar'],
    phone: '081234567890',
    whatsappNumber: '6281234567890',
    address: 'Jl. Melati RT 02 / RW 02, Dusun II Penusupan',
    dusun: 'Dusun II',
    mapsUrl: 'https://maps.google.com/?q=Penusupan+Pejawaran+Banjarnegara',
    imageUrls: [
      '/images/news-umkm-digital.svg',
      '/images/news-hortikultura.svg',
      '/images/village-landscape-placeholder.svg',
    ],
  },
  {
    id: 'umkm-2',
    name: 'Kopi Lereng Penusupan (Pak Slamet)',
    ownerName: 'Pak Slamet Riyadi',
    category: 'Pertanian & Perkebunan',
    description:
      'Biji kopi Arabika dan Robusta petik merah pilihan yang ditanam di lereng pegunungan Penusupan dengan proses pascapanen natural dan honey process.',
    productsSold: ['Green Beans Arabika', 'Roast Beans Robusta', 'Kopi Bubuk Murni', 'Drip Bag Coffee'],
    phone: '082198765432',
    whatsappNumber: '6282198765432',
    address: 'Kawasan Kebun Dusun I RT 01 / RW 01, Penusupan',
    dusun: 'Dusun I',
    mapsUrl: 'https://maps.google.com/?q=Penusupan+Pejawaran+Banjarnegara',
    imageUrls: [
      '/images/hero-placeholder.svg',
      '/images/village-history.svg',
      '/images/news-hortikultura.svg',
    ],
  },
  {
    id: 'umkm-3',
    name: 'Keripik Kentang & Carica Bu Titik',
    ownerName: 'Ibu Titik Handayani',
    category: 'Kuliner & Oleh-oleh',
    description:
      'Produsen keripik kentang renyah aneka rasa serta manisan carica segar khas pegunungan Dieng tanpa bahan pengawet buatan.',
    productsSold: ['Keripik Kentang Balado', 'Keripik Kentang Original', 'Manisan Carica Cup', 'Stik Keju'],
    phone: '085712345678',
    whatsappNumber: '6285712345678',
    address: 'Dusun III RT 03 / RW 03, Penusupan',
    dusun: 'Dusun III',
    mapsUrl: 'https://maps.google.com/?q=Penusupan+Pejawaran+Banjarnegara',
    imageUrls: [
      '/images/news-umkm-digital.svg',
      '/images/news-jalan-desa.svg',
    ],
  },
  {
    id: 'umkm-4',
    name: 'Anyaman Bambu & Besek Mbah Harjo',
    ownerName: 'Mbah Harjosuwito',
    category: 'Kerajinan & Seni',
    description:
      'Kerajinan anyaman bambu tradisional ramah lingkungan, memproduksi besek wadah makanan, tampah, kukusan, dan perabot bambu dekoratif.',
    productsSold: ['Besek Bambu P-IRT', 'Tampah Beras', 'Kukusan Tradisional', 'Keranjang Hias'],
    phone: '081398712345',
    whatsappNumber: '6281398712345',
    address: 'Dusun V RT 01 / RW 05, Penusupan',
    dusun: 'Dusun V',
    mapsUrl: 'https://maps.google.com/?q=Penusupan+Pejawaran+Banjarnegara',
    imageUrls: [
      '/images/village-history.svg',
      '/images/village-landscape-placeholder.svg',
      '/images/hero-placeholder.svg',
    ],
  },
  {
    id: 'umkm-5',
    name: 'Bengkel & Servis Mas Joko',
    ownerName: 'Mas Joko Susilo',
    category: 'Jasa & Perdagangan',
    description:
      'Layanan servis sepeda motor, ganti oli, tambal ban, serta penjualan spare parts motor dan perkakas pertanian warga desa.',
    productsSold: ['Servis Ringan Motor', 'Tambal Ban Tubeless', 'Ganti Oli Mesin', 'Spare Part Roda Dua'],
    phone: '087823456789',
    whatsappNumber: '6287823456789',
    address: 'Jl. Poros Desa Dusun IV RT 02 / RW 04, Penusupan',
    dusun: 'Dusun IV',
    mapsUrl: 'https://maps.google.com/?q=Penusupan+Pejawaran+Banjarnegara',
    imageUrls: [
      '/images/news-jalan-desa.svg',
      '/images/news-umkm-digital.svg',
    ],
  },
  {
    id: 'umkm-6',
    name: 'Bibit & Sayur Organik Tani Makmur',
    ownerName: 'Kelompok Tani Dusun I',
    category: 'Pertanian & Perkebunan',
    description:
      'Penyedia bibit hortikultura unggul (cabai, tomat, kubis), pupuk kompos organik lokal, serta sayuran panen segar siap kirim.',
    productsSold: ['Bibit Cabai Rawit', 'Bibit Tomat Sayur', 'Pupuk Kompos Organik', 'Sayur Pakchoi Segar'],
    phone: '082234567891',
    whatsappNumber: '6282234567891',
    address: 'Dusun I RT 03 / RW 01, Penusupan',
    dusun: 'Dusun I',
    mapsUrl: 'https://maps.google.com/?q=Penusupan+Pejawaran+Banjarnegara',
    imageUrls: [
      '/images/news-hortikultura.svg',
      '/images/village-topography-placeholder.svg',
      '/images/village-landscape-placeholder.svg',
    ],
  },
];

export const DEFAULT_BUSINESS_CATEGORIES: string[] = [
  'Semua',
  'Kuliner & Sembako',
  'Pertanian & Perkebunan',
  'Kuliner & Oleh-oleh',
  'Kerajinan & Seni',
  'Jasa & Perdagangan',
];



