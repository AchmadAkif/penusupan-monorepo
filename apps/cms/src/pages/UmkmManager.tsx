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
import { Plus, Search, Store } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import type { LocalBusiness } from '../types/umkm';
import { UmkmTable } from '../components/umkm/UmkmTable';
import { DeleteUmkmDialog } from '../components/umkm/DeleteUmkmDialog';
import { useDusuns } from '../hooks/useDusuns';

const UMKM_CATEGORIES = [
  'Semua Kategori',
  'Kuliner',
  'Kerajinan',
  'Pertanian & Peternakan',
  'Jasa',
  'Perdagangan & Toko',
  'Lainnya',
];

export const UmkmManagerPage: React.FC = () => {
  const navigate = useNavigate();
  const { data: dusunList = [] } = useDusuns();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua Kategori');
  const [selectedDusun, setSelectedDusun] = useState<string>('Semua Dusun');
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [businessToDelete, setBusinessToDelete] = useState<LocalBusiness | null>(null);

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

  // Query: Fetch Local Businesses
  const { data: businesses = [], isLoading } = useQuery<LocalBusiness[]>({
    queryKey: ['businesses-list'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('local_businesses')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    },
  });

  // Filter businesses
  const filteredBusinesses = useMemo(() => {
    return businesses.filter((biz) => {
      // Category filter
      if (selectedCategory !== 'Semua Kategori' && biz.category.toLowerCase() !== selectedCategory.toLowerCase()) {
        return false;
      }

      // Dusun filter
      if (selectedDusun !== 'Semua Dusun' && biz.dusun.toLowerCase() !== selectedDusun.toLowerCase()) {
        return false;
      }

      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = biz.name.toLowerCase().includes(q);
        const matchesOwner = biz.owner_name.toLowerCase().includes(q);
        const matchesDesc = biz.description.toLowerCase().includes(q);
        const matchesProducts = biz.products_sold?.some((p) => p.toLowerCase().includes(q));
        return matchesName || matchesOwner || matchesDesc || Boolean(matchesProducts);
      }

      return true;
    });
  }, [businesses, selectedCategory, selectedDusun, searchQuery]);

  // Handlers
  const handleAddNew = () => {
    navigate('/businesses/new');
  };

  const handleEdit = (biz: LocalBusiness) => {
    navigate(`/businesses/edit/${biz.id}`);
  };

  const handleDeleteClick = (biz: LocalBusiness) => {
    setBusinessToDelete(biz);
    setIsDeleteOpen(true);
  };

  return (
    <Box sx={{ width: '100%', pb: 6 }}>
      {/* Header Section */}
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
            <Box
              sx={{
                p: 1,
                borderRadius: '12px',
                bgcolor: 'rgba(202, 138, 4, 0.12)',
                color: '#CA8A04',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Store size={22} />
            </Box>
            <Typography variant="h4" sx={{ fontWeight: 800, color: '#1E1B4B', fontSize: '1.75rem' }}>
              Manajemen UMKM Desa
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ color: '#78716C' }}>
            Kelola data usaha mikro, produk unggulan, dan direktori bisnis warga Desa Penusupan.
          </Typography>
        </Box>

        <Button
          variant="contained"
          onClick={handleAddNew}
          startIcon={<Plus size={18} />}
          sx={{
            bgcolor: '#CA8A04',
            color: '#1E1B4B',
            fontWeight: 700,
            fontSize: '0.9rem',
            borderRadius: '14px',
            px: 3,
            py: 1.2,
            textTransform: 'none',
            boxShadow: '0 4px 14px rgba(202, 138, 4, 0.25)',
            '&:hover': {
              bgcolor: '#EAB308',
              boxShadow: '0 6px 20px rgba(202, 138, 4, 0.35)',
            },
          }}
        >
          Tambah UMKM
        </Button>
      </Box>

      {/* Filter and Search Bar */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: 2,
          mb: 3,
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <TextField
          placeholder="Cari nama UMKM, pemilik, atau produk..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          size="small"
          fullWidth
          sx={{
            maxWidth: { xs: '100%', md: 380 },
            '& .MuiOutlinedInput-root': {
              borderRadius: '14px',
              bgcolor: '#FFFFFF',
              borderColor: '#E7E5E4',
              '&:hover fieldset': { borderColor: '#CA8A04' },
              '&.Mui-focused fieldset': { borderColor: '#CA8A04' },
            },
          }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Search size={18} color="#A8A29E" />
                </InputAdornment>
              ),
            },
          }}
        />

        <Box sx={{ display: 'flex', gap: 1.5, width: { xs: '100%', md: 'auto' }, flexWrap: 'wrap' }}>
          {/* Category Filter */}
          <FormControl size="small" sx={{ minWidth: 170, flex: { xs: 1, sm: 'unset' } }}>
            <Select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              sx={{
                borderRadius: '14px',
                bgcolor: '#FFFFFF',
                fontSize: '0.875rem',
                fontWeight: 600,
                color: '#1E1B4B',
                '& .MuiOutlinedInput-notchedOutline': { borderColor: '#E7E5E4' },
                '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#CA8A04' },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#CA8A04' },
              }}
            >
              {UMKM_CATEGORIES.map((cat) => (
                <MenuItem key={cat} value={cat} sx={{ fontSize: '0.875rem', fontWeight: 500 }}>
                  {cat}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Dusun Filter */}
          <FormControl size="small" sx={{ minWidth: 150, flex: { xs: 1, sm: 'unset' } }}>
            <Select
              value={selectedDusun}
              onChange={(e) => setSelectedDusun(e.target.value)}
              sx={{
                borderRadius: '14px',
                bgcolor: '#FFFFFF',
                fontSize: '0.875rem',
                fontWeight: 600,
                color: '#1E1B4B',
                '& .MuiOutlinedInput-notchedOutline': { borderColor: '#E7E5E4' },
                '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#CA8A04' },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#CA8A04' },
              }}
            >
              <MenuItem value="Semua Dusun" sx={{ fontSize: '0.875rem', fontWeight: 500 }}>
                Semua Dusun
              </MenuItem>
              {dusunList.map((dusun) => (
                <MenuItem key={dusun.id || dusun.name} value={dusun.name} sx={{ fontSize: '0.875rem', fontWeight: 500 }}>
                  {dusun.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>

      {/* Main Table Card */}
      <UmkmTable
        businesses={filteredBusinesses}
        isLoading={isLoading}
        onEdit={handleEdit}
        onDelete={handleDeleteClick}
        onAddClick={handleAddNew}
      />

      {/* Delete Confirmation Modal */}
      <DeleteUmkmDialog
        open={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        businessToDelete={businessToDelete}
        onSuccess={(msg) => setToast({ open: true, message: msg, severity: 'success' })}
        onError={(msg) => setToast({ open: true, message: msg, severity: 'error' })}
      />

      {/* Global Notification Toast */}
      <Snackbar
        open={toast.open}
        autoHideDuration={4000}
        onClose={() => setToast((prev) => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          severity={toast.severity}
          onClose={() => setToast((prev) => ({ ...prev, open: false }))}
          sx={{ borderRadius: '14px', fontWeight: 600, boxShadow: '0 4px 14px rgba(0,0,0,0.1)' }}
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};
