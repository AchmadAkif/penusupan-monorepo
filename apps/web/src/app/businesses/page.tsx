import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { BusinessesGrid } from '@/components/businesses';
import { createClient } from '@/utils/supabase/server';
import type { BusinessItem } from '@/types/businesses';

export const metadata: Metadata = {
  title: 'Katalog UMKM & Potensi Desa',
  description:
    'Direktori resmi pelaku usaha mikro, kecil, menengah, sentra pertanian, dan potensi ekonomi lokal masyarakat Desa Penusupan, Kecamatan Pejawaran.',
};

export const revalidate = 60; // Revalidate cache every 60 seconds

export default async function BusinessesPage() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  // Fetch all registered local businesses
  const { data: businessesData } = await supabase
    .from('local_businesses')
    .select('*')
    .order('created_at', { ascending: false });

  const businesses: BusinessItem[] = (businessesData || []).map((b: any) => ({
    id: b.id,
    name: b.name,
    ownerName: b.owner_name,
    category: b.category,
    description: b.description,
    productsSold: b.products_sold || [],
    phone: b.phone || '',
    whatsappNumber: b.whatsapp_number || undefined,
    address: b.address || '',
    dusun: b.dusun || '',
    mapsUrl: b.maps_url || undefined,
    imageUrls:
      b.image_urls && b.image_urls.length > 0
        ? b.image_urls
        : ['/images/umkm-placeholder.svg'],
  }));

  // Dynamically extract unique categories from database records
  const uniqueCategories = Array.from(
    new Set(businesses.map((b) => b.category))
  ).filter(Boolean);

  const categories: string[] = ['Semua', ...uniqueCategories];

  return (
    <main className="min-h-screen bg-linen">
      <BusinessesGrid
        businesses={businesses}
        categories={categories}
      />
    </main>
  );
}
