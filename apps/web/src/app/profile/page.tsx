import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { ProfileHero } from '@/components/profile/ProfileHero';
import { VillageHistorySection } from '@/components/profile/history';
import { VisionMissionSection } from '@/components/home/vision-mission';
import { OrgChartSection } from '@/components/profile/org-chart';
import { createClient } from '@/utils/supabase/server';
import { transformOfficialsData } from '@/utils/officials';

export const metadata: Metadata = {
  title: 'Profil Desa',
  description:
    'Profil resmi Desa Penusupan, Kecamatan Pejawaran, Kabupaten Banjarnegara. Informasi visi & misi pembangunan, struktur organisasi, sejarah, dan data desa.',
};

export const revalidate = 60; // Revalidate cache every 60 seconds

export default async function ProfilePage() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  // Fetch all village officials from Supabase ordered by hierarchy & order_index
  const { data: officialsData } = await supabase
    .from('village_officials')
    .select('*')
    .order('hierarchy_level', { ascending: true })
    .order('order_index', { ascending: true })
    .order('created_at', { ascending: true });

  const orgStructure = transformOfficialsData(officialsData);

  return (
    <div className="min-h-screen bg-linen">
      {/* ── 0. Profile Page Hero Header ── */}
      <ProfileHero />

      {/* ── 1. Sejarah Desa (Section 1) ── */}
      <VillageHistorySection />

      {/* ── 2. Visi & Misi Desa (Section 2) ── */}
      <VisionMissionSection className="bg-white border-t border-stone-200/80" />

      {/* ── 3. Struktur Organisasi Desa (Section 3) ── */}
      <OrgChartSection data={orgStructure} className="bg-linen/40" />
    </div>
  );
}
