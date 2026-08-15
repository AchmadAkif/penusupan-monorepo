import { HeroSection } from '@/components/home/HeroSection';
import { StatsBar } from '@/components/home/StatsBar';
import { VillageHeadGreeting } from '@/components/home/VillageHeadGreeting';
import { VillageProfileIntro } from '@/components/home/VillageProfileIntro';
import { VisionMissionSection } from '@/components/home/vision-mission';
import { DemographicSection } from '@/components/home/DemographicSection';
import { GeographySection } from '@/components/home/GeographySection';

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

      {/* ── Content placeholder for remaining Home sections (Sub-phase 2B) ── */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center bg-linen">
        <div className="inline-block p-6 rounded-2xl bg-white/80 border border-stone-200/80 shadow-xs">
          <p className="font-heading font-semibold text-navy text-base">
            Sub-phase 2B: Bagian Berita Terkini & Agenda Desa
          </p>
          <p className="font-body text-stone-500 text-xs mt-1">
            Akan dilanjutkan pada langkah berikutnya.
          </p>
        </div>
      </section>
    </main>
  );
}