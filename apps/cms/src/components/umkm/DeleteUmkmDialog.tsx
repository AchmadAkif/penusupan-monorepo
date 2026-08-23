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
import type { LocalBusiness } from '../../types/umkm';

interface DeleteUmkmDialogProps {
  open: boolean;
  onClose: () => void;
  businessToDelete?: LocalBusiness | null;
  onSuccess?: (message: string) => void;
  onError?: (message: string) => void;
}

export const DeleteUmkmDialog: React.FC<DeleteUmkmDialogProps> = ({
  open,
  onClose,
  businessToDelete,
  onSuccess,
  onError,
}) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('local_businesses')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['businesses-list'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard-stats'] });
      onSuccess?.('Data UMKM berhasil dihapus.');
      onClose();
    },
    onError: (err: Error) => {
      onError?.(err.message || 'Gagal menghapus data UMKM.');
      onClose();
    },
  });

  const handleDelete = () => {
    if (businessToDelete) {
      mutation.mutate(businessToDelete.id);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      slotProps={{
        paper: {
          sx: {
            borderRadius: '24px',
            p: 1.5,
          },
        },
      }}
    >
      <DialogTitle sx={{ pb: 1, display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Box
          sx={{
            p: 1,
            borderRadius: '12px',
            bgcolor: 'rgba(239, 68, 68, 0.1)',
            color: '#EF4444',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <AlertTriangle size={20} />
        </Box>
        <Typography variant="h6" sx={{ fontWeight: 700, color: '#1E1B4B' }}>
          Hapus UMKM?
        </Typography>
      </DialogTitle>

      <DialogContent sx={{ pb: 2 }}>
        <Typography variant="body2" sx={{ color: '#57534E', lineHeight: 1.6 }}>
          Apakah Anda yakin ingin menghapus UMKM{' '}
          <Box component="span" sx={{ fontWeight: 700, color: '#1E1B4B' }}>
            "{businessToDelete?.name}"
          </Box>
          ? Tindakan ini tidak dapat dibatalkan.
        </Typography>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2, gap: 1 }}>
        <Button
          onClick={onClose}
          disabled={mutation.isPending}
          sx={{
            color: '#57534E',
            fontWeight: 600,
            borderRadius: '12px',
            px: 2.5,
            py: 1,
            textTransform: 'none',
            '&:hover': { bgcolor: '#F5F5F4' },
          }}
        >
          Batal
        </Button>
        <Button
          onClick={handleDelete}
          variant="contained"
          color="error"
          disabled={mutation.isPending}
          sx={{
            fontWeight: 700,
            borderRadius: '12px',
            px: 2.5,
            py: 1,
            textTransform: 'none',
            bgcolor: '#EF4444',
            boxShadow: '0 2px 8px rgba(239, 68, 68, 0.25)',
            '&:hover': {
              bgcolor: '#DC2626',
            },
          }}
        >
          {mutation.isPending ? (
            <CircularProgress size={20} color="inherit" />
          ) : (
            'Hapus UMKM'
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
