import type { Metadata } from 'next';
import { ProfileHero } from '@/components/profile/ProfileHero';
import { VillageHistorySection } from '@/components/profile/history';
import { VisionMissionSection } from '@/components/home/vision-mission';
import { OrgChartSection } from '@/components/profile/org-chart';

export const metadata: Metadata = {
  title: 'Profil Desa',
  description:
    'Profil resmi Desa Penusupan, Kecamatan Pejawaran, Kabupaten Banjarnegara. Informasi visi & misi pembangunan, struktur organisasi, sejarah, dan data desa.',
};

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-linen">
      {/* ── 0. Profile Page Hero Header ── */}
      <ProfileHero />

      {/* ── 1. Sejarah Desa (Section 1) ── */}
      <VillageHistorySection />

      {/* ── 2. Visi & Misi Desa (Section 2) ── */}
      <VisionMissionSection className="bg-white border-t border-stone-200/80" />

      {/* ── 3. Struktur Organisasi Desa (Section 3) ── */}
      <OrgChartSection className="bg-linen/40" />
    </div>
  );
}
