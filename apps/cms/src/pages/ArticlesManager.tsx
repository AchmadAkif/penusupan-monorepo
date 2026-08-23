import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  TextField,
  InputAdornment,
  Snackbar,
  Alert,
  FormControl,
  Select,
  MenuItem,
} from '@mui/material';
import { Plus, Search } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import type { ArticleListItem } from '../types/article';
import type { ArticleCategory } from '../types/category';
import { ArticleTable } from '../components/articles/ArticleTable';
import { DeleteArticleDialog } from '../components/articles/DeleteArticleDialog';

export const ArticlesManagerPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [articleToDelete, setArticleToDelete] = useState<ArticleListItem | null>(null);

  // Notification Toast State
  const [toast, setToast] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error';
  }>({
    open: false,
    message: '',
    severity: 'success',
  });

  // Query: Fetch Articles with joined category name
  const { data: articles = [], isLoading } = useQuery<ArticleListItem[]>({
    queryKey: ['articles-list'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('articles')
        .select(`
          *,
          article_categories (
            id,
            name,
            slug
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    },
  });

  // Query: Fetch Categories for filter dropdown
  const { data: categories = [] } = useQuery<ArticleCategory[]>({
    queryKey: ['article-categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('article_categories')
        .select('*')
        .order('name');
      if (error) throw error;
      return data || [];
    },
  });

  // Filter articles
  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      // Category filter
      if (selectedCategory !== 'all' && article.category_id !== selectedCategory) {
        return false;
      }

      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = article.title.toLowerCase().includes(q);
        const matchesExcerpt = article.excerpt?.toLowerCase().includes(q);
        const matchesAuthor = article.author?.toLowerCase().includes(q);
        const matchesCategory = article.article_categories?.name.toLowerCase().includes(q);
        return matchesTitle || matchesExcerpt || matchesAuthor || matchesCategory;
      }

      return true;
    });
  }, [articles, selectedCategory, searchQuery]);

  // Handlers
  const handleAddNew = () => {
    navigate('/articles/new');
  };

  const handleEdit = (article: ArticleListItem) => {
    navigate(`/articles/edit/${article.id}`);
  };

  const handleOpenDelete = (article: ArticleListItem) => {
    setArticleToDelete(article);
    setIsDeleteOpen(true);
  };

  const showToast = (message: string, severity: 'success' | 'error' = 'success') => {
    setToast({
      open: true,
      message,
      severity,
    });
  };

  return (
    <Box sx={{ width: '100%' }}>
      {/* Header Row */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: { xs: 'flex-start', sm: 'center' },
          justifyContent: 'space-between',
          gap: 2,
          mb: 4,
        }}
      >
        <Box>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 800,
              color: '#1E1B4B',
              letterSpacing: '-0.02em',
              fontSize: { xs: '1.75rem', sm: '2.25rem' },
            }}
          >
            Berita & Artikel
          </Typography>
          <Typography variant="body2" sx={{ color: '#78716C', mt: 0.5 }}>
            Kelola publikasi dan arsip berita desa Penusupan.
          </Typography>
        </Box>

        {/* Top-Right "Tambah Berita" Button */}
        <Button
          variant="contained"
          onClick={handleAddNew}
          startIcon={<Plus size={18} />}
          sx={{
            bgcolor: '#CA8A04', // Gold
            color: '#1E1B4B', // Navy
            fontWeight: 700,
            fontSize: '0.9rem',
            borderRadius: '14px',
            px: 3,
            py: 1.2,
            boxShadow: '0 4px 14px rgba(202, 138, 4, 0.3)',
            transition: 'all 0.2s ease',
            whiteSpace: 'nowrap',
            '&:hover': {
              bgcolor: '#EAB308',
              transform: 'translateY(-1px)',
              boxShadow: '0 6px 20px rgba(202, 138, 4, 0.4)',
            },
          }}
        >
          Tambah Berita
        </Button>
      </Box>

      {/* Filter & Search Bar */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: { xs: 'stretch', md: 'center' },
          justifyContent: 'space-between',
          gap: 2,
          mb: 3,
        }}
      >
        <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap', flexGrow: 1 }}>
          <TextField
            placeholder="Cari judul berita atau penulis..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            size="small"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Search size={18} color="#78716C" />
                  </InputAdornment>
                ),
                sx: {
                  borderRadius: '14px',
                  bgcolor: '#FFFFFF',
                  minWidth: { xs: '100%', sm: 300 },
                  fontSize: '0.88rem',
                  border: '1px solid #F0EFEA',
                  '& fieldset': { border: 'none' },
                },
              },
            }}
          />

          <FormControl size="small" sx={{ minWidth: 160 }}>
            <Select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              sx={{
                borderRadius: '14px',
                bgcolor: '#FFFFFF',
                fontSize: '0.88rem',
                border: '1px solid #F0EFEA',
                '& fieldset': { border: 'none' },
              }}
            >
              <MenuItem value="all">Semua Kategori</MenuItem>
              {categories.map((cat) => (
                <MenuItem key={cat.id} value={cat.id}>
                  {cat.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Typography variant="body2" sx={{ color: '#78716C', fontWeight: 600, fontSize: '0.85rem' }}>
          Total: <strong style={{ color: '#1E1B4B' }}>{filteredArticles.length}</strong> Artikel
        </Typography>
      </Box>

      {/* Article Table */}
      <ArticleTable
        articles={filteredArticles}
        isLoading={isLoading}
        onEdit={handleEdit}
        onDelete={handleOpenDelete}
        onAddClick={handleAddNew}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteArticleDialog
        open={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        articleToDelete={articleToDelete}
        onSuccess={(msg) => showToast(msg, 'success')}
        onError={(msg) => showToast(msg, 'error')}
      />

      {/* Feedback Toast */}
      <Snackbar
        open={toast.open}
        autoHideDuration={4000}
        onClose={() => setToast((prev) => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          severity={toast.severity}
          onClose={() => setToast((prev) => ({ ...prev, open: false }))}
          sx={{ borderRadius: '12px', fontWeight: 600 }}
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};
