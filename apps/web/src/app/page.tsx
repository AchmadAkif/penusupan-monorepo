import { HeroSection } from '@/components/home/HeroSection';
import { StatsBar } from '@/components/home/StatsBar';
import { VillageHeadGreeting } from '@/components/home/VillageHeadGreeting';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-linen">
      {/* ── 1. Hero Section ── */}
      <HeroSection />

      {/* ── 2. Floating Stats Bar (Bridging element) ── */}
      <StatsBar />

      {/* ── 3. Sambutan Kepala Desa (Head of Village Greeting) ── */}
      <VillageHeadGreeting />

      {/* ── Content placeholder for remaining Home sections (Sub-phase 2B) ── */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-block p-6 rounded-2xl bg-white/60 border border-stone-200/60 shadow-xs">
          <p className="font-heading font-semibold text-navy text-base">
            Sub-phase 2B: Bagian Visi Misi, Potensi & Berita Terkini
          </p>
          <p className="font-body text-stone-500 text-xs mt-1">
            Akan dilanjutkan pada langkah berikutnya.
          </p>
        </div>
      </section>
    </main>
  );
}