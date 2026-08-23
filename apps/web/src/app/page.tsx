import { cookies } from 'next/headers';
import { HeroSection } from '@/components/home/HeroSection';
import { StatsBar } from '@/components/home/StatsBar';
import { VillageHeadGreeting } from '@/components/home/VillageHeadGreeting';
import { VillageProfileIntro } from '@/components/home/VillageProfileIntro';
import { VisionMissionSection } from '@/components/home/vision-mission';
import { DemographicSection } from '@/components/home/DemographicSection';
import { GeographySection } from '@/components/home/GeographySection';
import { LatestNewsSection } from '@/components/home/news';
import { createClient } from '@/utils/supabase/server';
import { calculateReadTime } from '@/utils/readTime.utils';
import type { NewsItem } from '@/types/news';

export const revalidate = 60;

function formatDate(dateStr: string | null): string {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return date.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export default async function HomePage() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  // Fetch the latest 3 published articles for the 1-row grid
  const { data: articlesData } = await supabase
    .from('articles')
    .select(`
      id,
      title,
      slug,
      excerpt,
      content,
      cover_image_url,
      author,
      read_time,
      view_count,
      published_at,
      category:article_categories(name)
    `)
    .not('published_at', 'is', null)
    .lte('published_at', new Date().toISOString())
    .order('published_at', { ascending: false })
    .limit(3);

  const latestNews: NewsItem[] = (articlesData || []).map((item: any) => ({
    id: item.id,
    title: item.title,
    slug: item.slug,
    excerpt: item.excerpt,
    content: item.content,
    category: item.category?.name || 'Umum',
    publishedAt: formatDate(item.published_at),
    author: item.author || 'Pemerintah Desa',
    readTime: item.content ? calculateReadTime(item.content) : (item.read_time || 3),
    imageUrl: item.cover_image_url || '/images/news-hortikultura.svg',
    viewCount: item.view_count || 0,
  }));

  // Fetch Kepala Desa for the greeting section
  const { data: headData } = await supabase
    .from('village_officials')
    .select('*')
    .or('category.eq.pimpinan,hierarchy_level.eq.1')
    .order('hierarchy_level', { ascending: true })
    .limit(1)
    .maybeSingle();

  return (
    <main className="min-h-screen bg-linen">
      {/* ── 1. Hero Section ── */}
      <HeroSection />

      {/* ── 2. Floating Stats Bar (Bridging element) ── */}
      <StatsBar />

      {/* ── 3. Sambutan Kepala Desa (Head of Village Greeting) ── */}
      <VillageHeadGreeting
        name={headData?.name}
        role={headData?.role}
        photoUrl={headData?.image_url || undefined}
      />

      {/* ── 4. Profil Singkat Desa (Short Profile) ── */}
      <VillageProfileIntro />

      {/* ── 5. Visi & Misi Desa (Vision & Mission) ── */}
      <VisionMissionSection />

      {/* ── 6. Sekilas Demografi (Demographics Overview) ── */}
      <DemographicSection />

      {/* ── 7. Sekilas Geografi (Geographical Overview) ── */}
      <GeographySection />

      {/* ── 8. Berita & Liputan Terkini (Latest News) ── */}
      <LatestNewsSection news={latestNews} />
    </main>
  );
}