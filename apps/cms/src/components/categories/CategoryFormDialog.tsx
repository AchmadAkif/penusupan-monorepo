import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
  Alert,
  CircularProgress,
  IconButton,
} from '@mui/material';
import { X } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../../lib/supabase';
import type { ArticleCategory, CreateCategoryInput, UpdateCategoryInput } from '../../types/category';

interface CategoryFormDialogProps {
  open: boolean;
  onClose: () => void;
  categoryToEdit?: ArticleCategory | null;
  onSuccess?: (message: string) => void;
}

// Utility to generate URL-friendly slug
const generateSlug = (text: string): string => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // remove non-word characters except hyphens and spaces
    .replace(/[\s_-]+/g, '-') // replace spaces, underscores with hyphens
    .replace(/^-+|-+$/g, ''); // remove leading/trailing hyphens
};

export const CategoryFormDialog: React.FC<CategoryFormDialogProps> = ({
  open,
  onClose,
  categoryToEdit,
  onSuccess,
}) => {
  const queryClient = useQueryClient();
  const isEditing = Boolean(categoryToEdit);

  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Populate or reset form when dialog opens/categoryToEdit changes
  useEffect(() => {
    if (open) {
      if (categoryToEdit) {
        setName(categoryToEdit.name);
        setSlug(categoryToEdit.slug);
        setDescription(categoryToEdit.description || '');
      } else {
        setName('');
        setSlug('');
        setDescription('');
      }
      setErrorMsg(null);
    }
  }, [open, categoryToEdit]);

  // Always auto-generate slug when name changes
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setName(newName);
    setSlug(generateSlug(newName));
  };

  // Mutation for creating/updating category
  const mutation = useMutation({
    mutationFn: async (payload: CreateCategoryInput | UpdateCategoryInput) => {
      if (isEditing && categoryToEdit) {
        const { data, error } = await supabase
          .from('article_categories')
          .update({
            name: payload.name.trim(),
            slug: payload.slug.trim(),
            description: payload.description?.trim() || null,
            updated_at: new Date().toISOString(),
          })
          .eq('id', categoryToEdit.id)
          .select()
          .single();

        if (error) throw error;
        return data;
      } else {
        const { data, error } = await supabase
          .from('article_categories')
          .insert({
            name: payload.name.trim(),
            slug: payload.slug.trim(),
            description: payload.description?.trim() || null,
          })
          .select()
          .single();

        if (error) throw error;
        return data;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['article-categories'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard-stats'] });
      onSuccess?.(
        isEditing
          ? 'Kategori berhasil diperbarui!'
          : 'Kategori baru berhasil ditambahkan!'
      );
      onClose();
    },
    onError: (err: Error) => {
      if (err.message.includes('unique') || err.message.includes('duplicate')) {
        setErrorMsg('Nama kategori atau slug sudah terdaftar. Silakan gunakan nama lain.');
      } else {
        setErrorMsg(err.message || 'Terjadi kesalahan saat menyimpan kategori.');
      }
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMsg('Nama kategori wajib diisi.');
      return;
    }
    if (!slug.trim()) {
      setErrorMsg('Slug kategori wajib diisi.');
      return;
    }

    mutation.mutate({
      name,
      slug,
      description,
    });
  };

  return (
    <Dialog
      open={open}
      onClose={mutation.isPending ? undefined : onClose}
      maxWidth="sm"
      fullWidth
      slotProps={{
        paper: {
          sx: {
            borderRadius: '24px',
            p: 1,
          },
        },
      }}
    >
      <DialogTitle
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          pb: 1,
          pt: 2,
          px: 3,
        }}
      >
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 800, color: '#1E1B4B' }}>
            {isEditing ? 'Edit Kategori Berita' : 'Tambah Kategori Baru'}
          </Typography>
          <Typography variant="caption" sx={{ color: '#78716C' }}>
            {isEditing
              ? 'Perbarui rincian kategori artikel'
              : 'Tambahkan klasifikasi kategori untuk artikel berita desa'}
          </Typography>
        </Box>
        <IconButton
          onClick={onClose}
          disabled={mutation.isPending}
          size="small"
          sx={{ color: '#78716C' }}
        >
          <X size={20} />
        </IconButton>
      </DialogTitle>

      <Box component="form" onSubmit={handleSubmit} noValidate>
        <DialogContent sx={{ px: 3, py: 2 }}>
          {errorMsg && (
            <Alert severity="error" sx={{ mb: 2.5, borderRadius: '12px' }}>
              {errorMsg}
            </Alert>
          )}

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            {/* Category Name */}
            <Box>
              <Typography
                variant="body2"
                sx={{ fontWeight: 600, color: '#1E1B4B', mb: 0.6, fontSize: '0.85rem' }}
              >
                Nama Kategori <span style={{ color: '#EF4444' }}>*</span>
              </Typography>
              <TextField
                fullWidth
                placeholder="Contoh: Pembangunan, Pertanian, Layanan"
                value={name}
                onChange={handleNameChange}
                disabled={mutation.isPending}
                autoFocus
                slotProps={{
                  input: {
                    sx: {
                      borderRadius: '14px',
                      bgcolor: '#FAFAF9',
                      fontSize: '0.9rem',
                    },
                  },
                }}
              />
            </Box>

            {/* Category Slug (Read-only / Auto-generated) */}
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 0.6 }}>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 600, color: '#1E1B4B', fontSize: '0.85rem' }}
                >
                  Slug URL (Otomatis)
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ color: '#CA8A04', fontWeight: 700, fontSize: '0.72rem', letterSpacing: '0.04em' }}
                >
                  AUTO-GENERATED
                </Typography>
              </Box>
              <TextField
                fullWidth
                placeholder="nama-kategori-otomatis"
                value={slug}
                disabled
                helperText="Dihasilkan secara otomatis dari nama kategori untuk format URL yang ramah SEO."
                slotProps={{
                  input: {
                    sx: {
                      borderRadius: '14px',
                      bgcolor: '#F5F5F4',
                      fontSize: '0.9rem',
                      fontFamily: 'monospace',
                      color: '#44403C',
                      '& .MuiInputBase-input.Mui-disabled': {
                        WebkitTextFillColor: '#44403C',
                        fontWeight: 600,
                      },
                    },
                  },
                }}
              />
            </Box>

            {/* Description */}
            <Box>
              <Typography
                variant="body2"
                sx={{ fontWeight: 600, color: '#1E1B4B', mb: 0.6, fontSize: '0.85rem' }}
              >
                Deskripsi Singkat (Opsional)
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={3}
                placeholder="Penjelasan singkat mengenai jenis berita dalam kategori ini..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                disabled={mutation.isPending}
                slotProps={{
                  input: {
                    sx: {
                      borderRadius: '14px',
                      bgcolor: '#FAFAF9',
                      fontSize: '0.9rem',
                    },
                  },
                }}
              />
            </Box>
          </Box>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2.5, pt: 1, gap: 1 }}>
          <Button
            onClick={onClose}
            disabled={mutation.isPending}
            sx={{
              color: '#78716C',
              fontWeight: 600,
              borderRadius: '12px',
              px: 2.5,
              '&:hover': { bgcolor: '#F5F5F4' },
            }}
          >
            Batal
          </Button>
          <Button
            type="submit"
            disabled={mutation.isPending}
            sx={{
              bgcolor: '#CA8A04', // Gold
              color: '#1E1B4B', // Navy
              fontWeight: 700,
              borderRadius: '12px',
              px: 3,
              py: 1,
              boxShadow: '0 2px 8px rgba(202, 138, 4, 0.25)',
              '&:hover': {
                bgcolor: '#EAB308',
                boxShadow: '0 4px 12px rgba(202, 138, 4, 0.35)',
              },
            }}
          >
            {mutation.isPending ? (
              <CircularProgress size={20} sx={{ color: '#1E1B4B' }} />
            ) : isEditing ? (
              'Simpan Perubahan'
            ) : (
              'Tambah Kategori'
            )}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};
