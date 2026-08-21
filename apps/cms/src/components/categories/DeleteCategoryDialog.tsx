import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  CircularProgress,
  Box,
} from '@mui/material';
import { AlertTriangle } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../../lib/supabase';
import type { ArticleCategory } from '../../types/category';

interface DeleteCategoryDialogProps {
  open: boolean;
  onClose: () => void;
  categoryToDelete?: ArticleCategory | null;
  onSuccess?: (message: string) => void;
  onError?: (message: string) => void;
}

export const DeleteCategoryDialog: React.FC<DeleteCategoryDialogProps> = ({
  open,
  onClose,
  categoryToDelete,
  onSuccess,
  onError,
}) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('article_categories')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['article-categories'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard-stats'] });
      onSuccess?.('Kategori berhasil dihapus.');
      onClose();
    },
    onError: (err: Error) => {
      if (err.message.includes('foreign key') || err.message.includes('violates foreign key')) {
        onError?.('Kategori tidak dapat dihapus karena masih digunakan oleh artikel berita.');
      } else {
        onError?.(err.message || 'Gagal menghapus kategori.');
      }
      onClose();
    },
  });

  const handleDelete = () => {
    if (categoryToDelete) {
      mutation.mutate(categoryToDelete.id);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={mutation.isPending ? undefined : onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '24px',
          p: 1.5,
        },
      }}
    >
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1.5, pb: 1 }}>
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: '12px',
            bgcolor: 'rgba(239, 68, 68, 0.1)',
            color: '#EF4444',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <AlertTriangle size={22} />
        </Box>
        <Typography variant="h6" sx={{ fontWeight: 800, color: '#1E1B4B' }}>
          Hapus Kategori?
        </Typography>
      </DialogTitle>

      <DialogContent sx={{ py: 1.5 }}>
        <Typography variant="body2" sx={{ color: '#78716C', lineHeight: 1.6 }}>
          Apakah Anda yakin ingin menghapus kategori{' '}
          <strong style={{ color: '#1E1B4B' }}>&ldquo;{categoryToDelete?.name}&rdquo;</strong>?
          Tindakan ini tidak dapat dibatalkan.
        </Typography>
      </DialogContent>

      <DialogActions sx={{ px: 2, pb: 1.5, gap: 1 }}>
        <Button
          onClick={onClose}
          disabled={mutation.isPending}
          sx={{
            color: '#78716C',
            fontWeight: 600,
            borderRadius: '12px',
            '&:hover': { bgcolor: '#F5F5F4' },
          }}
        >
          Batal
        </Button>
        <Button
          onClick={handleDelete}
          disabled={mutation.isPending}
          sx={{
            bgcolor: '#EF4444',
            color: '#FFFFFF',
            fontWeight: 700,
            borderRadius: '12px',
            px: 2.5,
            '&:hover': {
              bgcolor: '#DC2626',
            },
          }}
        >
          {mutation.isPending ? (
            <CircularProgress size={20} sx={{ color: '#FFFFFF' }} />
          ) : (
            'Hapus'
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
