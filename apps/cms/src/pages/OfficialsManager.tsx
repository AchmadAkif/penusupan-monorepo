import React, { useState, useMemo } from 'react';
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
import { UserPlus, Search } from 'lucide-react';
import { useOfficials } from '../hooks/useOfficials';
import type { VillageOfficial } from '../types/official';
import { OfficialTable } from '../components/officials/OfficialTable';
import { OfficialFormDialog } from '../components/officials/OfficialFormDialog';
import { DeleteOfficialDialog } from '../components/officials/DeleteOfficialDialog';

const CATEGORY_FILTER_OPTIONS = [
  { value: 'all', label: 'Semua Kategori' },
  { value: 'pimpinan', label: 'Pimpinan' },
  { value: 'sekretariat', label: 'Sekretariat' },
  { value: 'teknis', label: 'Pelaksana Teknis' },
  { value: 'kewilayahan', label: 'Kewilayahan (Kadus)' },
];

export const OfficialsManagerPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [officialToEdit, setOfficialToEdit] = useState<VillageOfficial | null>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [officialToDelete, setOfficialToDelete] = useState<VillageOfficial | null>(null);

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

  // Query Officials
  const { data: officials = [], isLoading } = useOfficials(selectedCategory);

  // Search Filter
  const filteredOfficials = useMemo(() => {
    if (!searchQuery.trim()) return officials;
    const q = searchQuery.toLowerCase();
    return officials.filter(
      (off) =>
        off.name.toLowerCase().includes(q) ||
        off.role.toLowerCase().includes(q) ||
        off.category.toLowerCase().includes(q)
    );
  }, [officials, searchQuery]);

  // Handlers
  const handleOpenAdd = () => {
    setOfficialToEdit(null);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (official: VillageOfficial) => {
    setOfficialToEdit(official);
    setIsFormOpen(true);
  };

  const handleOpenDelete = (official: VillageOfficial) => {
    setOfficialToDelete(official);
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
      {/* Top Header Row */}
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
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 0.5 }}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 800,
                color: '#1E1B4B',
                letterSpacing: '-0.02em',
                fontSize: { xs: '1.75rem', sm: '2.25rem' },
              }}
            >
              Perangkat Desa
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ color: '#78716C' }}>
            Kelola data aparatur pemerintahan, pejabat pimpinan, dan kepala dusun Desa Penusupan.
          </Typography>
        </Box>

        {/* Top-Right "Tambah Perangkat" Action Button */}
        <Button
          variant="contained"
          onClick={handleOpenAdd}
          startIcon={<UserPlus size={18} />}
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
          Tambah Perangkat
        </Button>
      </Box>

      {/* Search & Filter Bar */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: { xs: 'stretch', sm: 'center' },
          justifyContent: 'space-between',
          gap: 2,
          mb: 3,
        }}
      >
        <Box sx={{ display: 'flex', gap: 1.5, flex: 1, maxWidth: { xs: '100%', sm: 540 } }}>
          <TextField
            placeholder="Cari nama atau jabatan..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            size="small"
            fullWidth
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
                  fontSize: '0.88rem',
                  border: '1px solid #F0EFEA',
                  '& fieldset': { border: 'none' },
                },
              },
            }}
          />

          <FormControl size="small" sx={{ minWidth: 170 }}>
            <Select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              sx={{
                borderRadius: '14px',
                bgcolor: '#FFFFFF',
                fontSize: '0.875rem',
                fontWeight: 600,
                color: '#1E1B4B',
                border: '1px solid #F0EFEA',
                '& fieldset': { border: 'none' },
              }}
            >
              {CATEGORY_FILTER_OPTIONS.map((opt) => (
                <MenuItem key={opt.value} value={opt.value} sx={{ fontSize: '0.875rem', fontWeight: 500 }}>
                  {opt.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Typography variant="body2" sx={{ color: '#78716C', fontWeight: 600, fontSize: '0.85rem' }}>
          Total: <strong style={{ color: '#1E1B4B' }}>{filteredOfficials.length}</strong> Perangkat
        </Typography>
      </Box>

      {/* Main Table */}
      <OfficialTable
        officials={filteredOfficials}
        isLoading={isLoading}
        onEdit={handleOpenEdit}
        onDelete={handleOpenDelete}
        onAddClick={handleOpenAdd}
      />

      {/* Create / Edit Dialog */}
      <OfficialFormDialog
        open={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        officialToEdit={officialToEdit}
        onSuccess={(msg) => showToast(msg, 'success')}
      />

      {/* Delete Dialog */}
      <DeleteOfficialDialog
        open={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        officialToDelete={officialToDelete}
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
