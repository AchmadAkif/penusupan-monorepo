import React, { useState, useMemo } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  InputAdornment,
  Snackbar,
  Alert,
} from '@mui/material';
import { Plus, Search } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import type { ArticleCategory } from '../types/category';
import { CategoryTable } from '../components/categories/CategoryTable';
import { CategoryFormDialog } from '../components/categories/CategoryFormDialog';
import { DeleteCategoryDialog } from '../components/categories/DeleteCategoryDialog';

export const CategoriesManagerPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [categoryToEdit, setCategoryToEdit] = useState<ArticleCategory | null>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<ArticleCategory | null>(null);

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

  // Query: Fetch Categories
  const { data: categories = [], isLoading } = useQuery<ArticleCategory[]>({
    queryKey: ['article-categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('article_categories')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    },
  });

  // Filter Categories by Search
  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) return categories;
    const q = searchQuery.toLowerCase();
    return categories.filter(
      (cat) =>
        cat.name.toLowerCase().includes(q) ||
        cat.slug.toLowerCase().includes(q) ||
        (cat.description && cat.description.toLowerCase().includes(q))
    );
  }, [categories, searchQuery]);

  // Handlers
  const handleOpenAdd = () => {
    setCategoryToEdit(null);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (category: ArticleCategory) => {
    setCategoryToEdit(category);
    setIsFormOpen(true);
  };

  const handleOpenDelete = (category: ArticleCategory) => {
    setCategoryToDelete(category);
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
      {/* Top Header Row with Title and Action Button */}
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
            Kategori Berita
          </Typography>
          <Typography variant="body2" sx={{ color: '#78716C', mt: 0.5 }}>
            Kelola klasifikasi dan topik artikel berita desa.
          </Typography>
        </Box>

        {/* Top-Right "Tambah Kategori" Action Button */}
        <Button
          variant="contained"
          onClick={handleOpenAdd}
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
          Tambah Kategori
        </Button>
      </Box>

      {/* Search & Filter Bar */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 2,
          mb: 3,
        }}
      >
        <TextField
          placeholder="Cari nama kategori atau slug..."
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
                maxWidth: { xs: '100%', sm: 340 },
                fontSize: '0.88rem',
                border: '1px solid #F0EFEA',
                '& fieldset': { border: 'none' },
              },
            },
          }}
        />

        <Typography variant="body2" sx={{ color: '#78716C', fontWeight: 600, fontSize: '0.85rem' }}>
          Total: <strong style={{ color: '#1E1B4B' }}>{filteredCategories.length}</strong> Kategori
        </Typography>
      </Box>

      {/* Table Component */}
      <CategoryTable
        categories={filteredCategories}
        isLoading={isLoading}
        onEdit={handleOpenEdit}
        onDelete={handleOpenDelete}
        onAddClick={handleOpenAdd}
      />

      {/* Create / Edit Dialog */}
      <CategoryFormDialog
        open={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        categoryToEdit={categoryToEdit}
        onSuccess={(msg) => showToast(msg, 'success')}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteCategoryDialog
        open={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        categoryToDelete={categoryToDelete}
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
