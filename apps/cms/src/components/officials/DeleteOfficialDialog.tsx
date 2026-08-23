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
import { useDeleteOfficial } from '../../hooks/useOfficials';
import type { VillageOfficial } from '../../types/official';

interface DeleteOfficialDialogProps {
  open: boolean;
  onClose: () => void;
  officialToDelete?: VillageOfficial | null;
  onSuccess?: (message: string) => void;
  onError?: (message: string) => void;
}

export const DeleteOfficialDialog: React.FC<DeleteOfficialDialogProps> = ({
  open,
  onClose,
  officialToDelete,
  onSuccess,
  onError,
}) => {
  const deleteMutation = useDeleteOfficial();

  const handleDelete = async () => {
    if (!officialToDelete) return;
    try {
      await deleteMutation.mutateAsync(officialToDelete.id);
      onSuccess?.(`Data "${officialToDelete.name}" berhasil dihapus.`);
      onClose();
    } catch (err: unknown) {
      const error = err as Error;
      onError?.(error.message || 'Gagal menghapus data perangkat desa.');
      onClose();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={deleteMutation.isPending ? undefined : onClose}
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
          Hapus Perangkat Desa?
        </Typography>
      </DialogTitle>

      <DialogContent sx={{ pt: 1 }}>
        <Typography variant="body2" sx={{ color: '#78716C', lineHeight: 1.6 }}>
          Apakah Anda yakin ingin menghapus data pejabat{' '}
          <strong style={{ color: '#1E1B4B' }}>
            &ldquo;{officialToDelete?.name}&rdquo; ({officialToDelete?.role})
          </strong>
          ? Tindakan ini tidak dapat dibatalkan.
        </Typography>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2, pt: 1, gap: 1.5 }}>
        <Button
          onClick={onClose}
          disabled={deleteMutation.isPending}
          sx={{
            borderRadius: '12px',
            color: '#78716C',
            fontWeight: 600,
            '&:hover': { bgcolor: 'rgba(120, 113, 108, 0.08)' },
          }}
        >
          Batal
        </Button>
        <Button
          variant="contained"
          onClick={handleDelete}
          disabled={deleteMutation.isPending}
          startIcon={deleteMutation.isPending ? <CircularProgress size={16} color="inherit" /> : null}
          sx={{
            bgcolor: '#EF4444',
            color: '#FFFFFF',
            fontWeight: 700,
            borderRadius: '12px',
            px: 2.5,
            boxShadow: '0 4px 14px rgba(239, 68, 68, 0.25)',
            '&:hover': {
              bgcolor: '#DC2626',
              boxShadow: '0 6px 20px rgba(239, 68, 68, 0.35)',
            },
          }}
        >
          {deleteMutation.isPending ? 'Menghapus...' : 'Ya, Hapus'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
