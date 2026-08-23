import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import {
  Newspaper,
  Eye,
  Store,
  Tags,
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { SummaryCard } from '../components/dashboard/SummaryCard';

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();

  // Dynamic current date in Indonesian format
  const currentDate = new Intl.DateTimeFormat('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date()).toUpperCase();

  // Fetch Dashboard Stats via React Query
  const { data: stats, isLoading } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: async () => {
      // 1. Articles Count & Total Views
      const { data: articles, count: articlesCount } = await supabase
        .from('articles')
        .select('view_count', { count: 'exact' });

      const totalViews = (articles || []).reduce(
        (sum, item) => sum + (Number(item.view_count) || 0),
        0
      );

      // 2. UMKM / Local Businesses Count
      const { count: businessesCount } = await supabase
        .from('local_businesses')
        .select('*', { count: 'exact', head: true });

      // 3. Article Categories Count
      const { count: categoriesCount } = await supabase
        .from('article_categories')
        .select('*', { count: 'exact', head: true });

      return {
        articlesCount: articlesCount ?? 0,
        totalViews: totalViews ?? 0,
        businessesCount: businessesCount ?? 0,
        categoriesCount: categoriesCount ?? 0,
      };
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  return (
    <Box sx={{ width: '100%' }}>
      {/* Header Section */}
      <Box sx={{ mb: { xs: 3.5, md: 4.5 } }}>
        <Typography
          variant="subtitle2"
          sx={{
            color: '#78716C', // Stone
            fontSize: '0.75rem',
            letterSpacing: '0.1em',
            fontWeight: 700,
            mb: 0.5,
          }}
        >
          {currentDate}
        </Typography>
        <Typography
          variant="h4"
          sx={{
            color: '#1E1B4B', // Navy
            fontWeight: 800,
            letterSpacing: '-0.02em',
            fontSize: { xs: '1.75rem', sm: '2.25rem' },
          }}
        >
          Dashboard Overview
        </Typography>
      </Box>

      {/* Metric Cards Grid */}
      <Grid container spacing={{ xs: 2.5, md: 3 }}>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <SummaryCard
            title="TOTAL ARTIKEL"
            value={stats?.articlesCount}
            description="Semua publikasi berita"
            icon={Newspaper}
            watermarkIcon={Newspaper}
            iconBgColor="rgba(30, 27, 75, 0.08)"
            iconColor="#1E1B4B"
            isLoading={isLoading}
            onClick={() => navigate('/articles')}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <SummaryCard
            title="TOTAL PEMBACA"
            value={stats?.totalViews}
            description="Akumulasi tayangan artikel"
            icon={Eye}
            watermarkIcon={Eye}
            iconBgColor="rgba(202, 138, 4, 0.12)"
            iconColor="#CA8A04"
            isLoading={isLoading}
            onClick={() => navigate('/articles')}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <SummaryCard
            title="UMKM TERDAFTAR"
            value={stats?.businessesCount}
            description="Katalog usaha potensi desa"
            icon={Store}
            watermarkIcon={Store}
            iconBgColor="rgba(16, 185, 129, 0.12)"
            iconColor="#059669"
            isLoading={isLoading}
            onClick={() => navigate('/businesses')}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <SummaryCard
            title="KATEGORI BERITA"
            value={stats?.categoriesCount}
            description="Topik klasifikasi aktif"
            icon={Tags}
            watermarkIcon={Tags}
            iconBgColor="rgba(99, 102, 241, 0.12)"
            iconColor="#4F46E5"
            isLoading={isLoading}
            onClick={() => navigate('/categories')}
          />
        </Grid>
      </Grid>
    </Box>
  );
};
