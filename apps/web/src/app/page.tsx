import { HeroSection } from '@/components/home/HeroSection';
import { StatsBar } from '@/components/home/StatsBar';
import { VillageHeadGreeting } from '@/components/home/VillageHeadGreeting';
import { VillageProfileIntro } from '@/components/home/VillageProfileIntro';
import { VisionMissionSection } from '@/components/home/vision-mission';
import { DemographicSection } from '@/components/home/DemographicSection';
import { GeographySection } from '@/components/home/GeographySection';
import { LatestNewsSection } from '@/components/home/news';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-linen">
      {/* ── 1. Hero Section ── */}
      <HeroSection />

      {/* ── 2. Floating Stats Bar (Bridging element) ── */}
      <StatsBar />

      {/* ── 3. Sambutan Kepala Desa (Head of Village Greeting) ── */}
      <VillageHeadGreeting />

      {/* ── 4. Profil Singkat Desa (Short Profile) ── */}
      <VillageProfileIntro />

      {/* ── 5. Visi & Misi Desa (Vision & Mission) ── */}
      <VisionMissionSection />

      {/* ── 6. Sekilas Demografi (Demographics Overview) ── */}
      <DemographicSection />

      {/* ── 7. Sekilas Geografi (Geographical Overview) ── */}
      <GeographySection />

      {/* ── 8. Berita & Liputan Terkini (Latest News) ── */}
      <LatestNewsSection />
    </main>
  );
}