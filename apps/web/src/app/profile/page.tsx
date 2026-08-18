import type { Metadata } from 'next';
import { ProfileHero } from '@/components/profile/ProfileHero';
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

      {/* ── 1. Visi & Misi Desa (Section 1) ── */}
      <VisionMissionSection />

      {/* ── 2. Struktur Organisasi Desa (Section 2) ── */}
      <OrgChartSection />
    </div>
  );
}
