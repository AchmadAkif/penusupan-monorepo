import type { Metadata } from 'next';
import { BusinessesGrid } from '@/components/businesses';
import {
  DEFAULT_BUSINESSES_DATA,
  DEFAULT_BUSINESS_CATEGORIES,
} from '@/constants/seedData';

export const metadata: Metadata = {
  title: 'Katalog UMKM & Potensi Desa',
  description:
    'Direktori resmi pelaku usaha mikro, kecil, menengah, sentra pertanian, dan potensi ekonomi lokal masyarakat Desa Penusupan, Kecamatan Pejawaran.',
};

export default function BusinessesPage() {
  return (
    <main className="min-h-screen bg-linen">
      <BusinessesGrid
        businesses={DEFAULT_BUSINESSES_DATA}
        categories={DEFAULT_BUSINESS_CATEGORIES}
      />
    </main>
  );
}
