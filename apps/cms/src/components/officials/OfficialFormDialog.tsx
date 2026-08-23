import React, { useState, useEffect, useRef } from 'react';
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
  FormControl,
  Select,
  MenuItem,
  Avatar,
} from '@mui/material';
import { X, UploadCloud, Image as ImageIcon, Users } from 'lucide-react';
import { useCreateOfficial, useUpdateOfficial } from '../../hooks/useOfficials';
import { supabase } from '../../lib/supabase';
import {
  type VillageOfficial,
  type OfficialCategory,
  OFFICIAL_CATEGORIES,
  HIERARCHY_LEVELS,
} from '../../types/official';

interface OfficialFormDialogProps {
  open: boolean;
  onClose: () => void;
  officialToEdit?: VillageOfficial | null;
  onSuccess?: (message: string) => void;
}

export const OfficialFormDialog: React.FC<OfficialFormDialogProps> = ({
  open,
  onClose,
  officialToEdit,
  onSuccess,
}) => {
  const isEditing = Boolean(officialToEdit);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [category, setCategory] = useState<OfficialCategory>('pimpinan');
  const [hierarchyLevel, setHierarchyLevel] = useState<number>(1);
  const [orderIndex, setOrderIndex] = useState<number>(0);
  const [imageUrl, setImageUrl] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const createMutation = useCreateOfficial();
  const updateMutation = useUpdateOfficial();

  const isPending = createMutation.isPending || updateMutation.isPending || isUploading;

  // Auto-sync hierarchy level when category changes if user hasn't explicitly customized
  const handleCategoryChange = (newCat: OfficialCategory) => {
    setCategory(newCat);
    if (newCat === 'pimpinan') setHierarchyLevel(1);
    else if (newCat === 'sekretariat') setHierarchyLevel(2);
    else if (newCat === 'teknis') setHierarchyLevel(3);
    else if (newCat === 'kewilayahan') setHierarchyLevel(4);
  };

  useEffect(() => {
    if (open) {
      if (officialToEdit) {
        setName(officialToEdit.name);
        setRole(officialToEdit.role);
        setCategory(officialToEdit.category);
        setHierarchyLevel(officialToEdit.hierarchy_level);
        setOrderIndex(officialToEdit.order_index);
        setImageUrl(officialToEdit.image_url || '');
      } else {
        setName('');
        setRole('');
        setCategory('pimpinan');
        setHierarchyLevel(1);
        setOrderIndex(0);
        setImageUrl('');
      }
      setErrorMsg(null);
    }
  }, [open, officialToEdit]);

  // Handle Photo Upload to Supabase Storage
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      setErrorMsg(null);

      const fileExt = file.name.split('.').pop();
      const fileName = `official-${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
      const filePath = `officials/${fileName}`;

      // Upload to 'media' bucket (matching ArticleEditor and UmkmEditor)
      const { error: uploadError } = await supabase.storage
        .from('media')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true,
        });

      if (uploadError) {
        throw new Error(`Gagal mengunggah foto ke storage: ${uploadError.message}`);
      }

      const { data: publicUrlData } = supabase.storage
        .from('media')
        .getPublicUrl(filePath);

      setImageUrl(publicUrlData.publicUrl);
    } catch (err: unknown) {
      const error = err as Error;
      setErrorMsg(error.message || 'Gagal mengunggah foto.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !role.trim()) {
      setErrorMsg('Nama dan Jabatan (Role) wajib diisi.');
      return;
    }

    if (imageUrl && imageUrl.startsWith('blob:')) {
      setErrorMsg('Foto belum berhasil diunggah ke storage cloud. Silakan unggah ulang foto.');
      return;
    }

    try {
      if (isEditing && officialToEdit) {
        await updateMutation.mutateAsync({
          id: officialToEdit.id,
          name: name.trim(),
          role: role.trim(),
          category,
          hierarchy_level: hierarchyLevel,
          order_index: Number(orderIndex) || 0,
          image_url: imageUrl.trim() || null,
        });
        onSuccess?.('Perangkat Desa berhasil diperbarui.');
      } else {
        await createMutation.mutateAsync({
          name: name.trim(),
          role: role.trim(),
          category,
          hierarchy_level: hierarchyLevel,
          order_index: Number(orderIndex) || 0,
          image_url: imageUrl.trim() || null,
        });
        onSuccess?.('Perangkat Desa baru berhasil ditambahkan.');
      }
      onClose();
    } catch (err: unknown) {
      const error = err as Error;
      setErrorMsg(error.message || 'Terjadi kesalahan saat menyimpan data.');
    }
  };

  return (
    <Dialog
      open={open}
      onClose={isPending ? undefined : onClose}
      maxWidth="sm"
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
      <form onSubmit={handleSubmit}>
        {/* Header */}
        <DialogTitle
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            pb: 1,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: '12px',
                bgcolor: 'rgba(202, 138, 4, 0.1)',
                color: '#CA8A04',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Users size={20} />
            </Box>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 800, color: '#1E1B4B', lineHeight: 1.2 }}>
                {isEditing ? 'Edit Data Perangkat Desa' : 'Tambah Perangkat Desa'}
              </Typography>
              <Typography variant="caption" sx={{ color: '#78716C', display: 'block' }}>
                {isEditing
                  ? 'Perbarui informasi dan struktur jabatan pejabat desa.'
                  : 'Lengkapi data jabatan dan struktur perangkat desa.'}
              </Typography>
            </Box>
          </Box>
          <IconButton
            size="small"
            onClick={onClose}
            disabled={isPending}
            sx={{ color: '#78716C', '&:hover': { color: '#1E1B4B' } }}
          >
            <X size={20} />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, pt: 2 }}>
          {errorMsg && (
            <Alert severity="error" sx={{ borderRadius: '12px', fontSize: '0.85rem' }}>
              {errorMsg}
            </Alert>
          )}

          {/* Photo Preview & Upload */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2.5,
              p: 2,
              borderRadius: '16px',
              bgcolor: '#FAFAF9',
              border: '1px solid #E7E5E4',
            }}
          >
            <Avatar
              src={imageUrl}
              sx={{
                width: 68,
                height: 68,
                borderRadius: '16px',
                bgcolor: '#FFFFFF',
                color: '#CA8A04',
                border: '2px solid #CA8A04',
                boxShadow: '0 4px 12px rgba(202, 138, 4, 0.15)',
              }}
            >
              <ImageIcon size={28} />
            </Avatar>

            <Box sx={{ flex: 1 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#1E1B4B', mb: 0.5 }}>
                Foto Resmi / Profil
              </Typography>
              <Typography variant="caption" sx={{ color: '#78716C', display: 'block', mb: 1.2 }}>
                Format JPG/PNG/WEBP (Rekomendasi rasio 1:1 atau pasfoto resmi)
              </Typography>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                style={{ display: 'none' }}
              />

              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button
                  size="small"
                  variant="outlined"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isPending}
                  startIcon={isUploading ? <CircularProgress size={14} /> : <UploadCloud size={16} />}
                  sx={{
                    borderRadius: '10px',
                    borderColor: '#CA8A04',
                    color: '#CA8A04',
                    fontWeight: 700,
                    fontSize: '0.78rem',
                    textTransform: 'none',
                    '&:hover': {
                      borderColor: '#EAB308',
                      bgcolor: 'rgba(202, 138, 4, 0.06)',
                    },
                  }}
                >
                  {isUploading ? 'Mengunggah...' : 'Unggah Foto'}
                </Button>
                {imageUrl && (
                  <Button
                    size="small"
                    color="error"
                    onClick={() => {
                      setImageUrl('');
                      if (fileInputRef.current) fileInputRef.current.value = '';
                    }}
                    disabled={isPending}
                    sx={{ borderRadius: '10px', fontSize: '0.78rem', textTransform: 'none' }}
                  >
                    Hapus Foto
                  </Button>
                )}
              </Box>
            </Box>
          </Box>

          {/* Full Name */}
          <Box>
            <Typography variant="body2" sx={{ fontWeight: 700, color: '#1E1B4B', mb: 0.8 }}>
              Nama Lengkap Pejabat <span style={{ color: '#EF4444' }}>*</span>
            </Typography>
            <TextField
              fullWidth
              size="small"
              placeholder="Contoh: Budi Santoso, S.Sos."
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isPending}
              required
              slotProps={{
                input: {
                  sx: {
                    borderRadius: '12px',
                    bgcolor: '#FFFFFF',
                    fontWeight: 600,
                  },
                },
              }}
            />
          </Box>

          {/* Role / Jabatan */}
          <Box>
            <Typography variant="body2" sx={{ fontWeight: 700, color: '#1E1B4B', mb: 0.8 }}>
              Jabatan (Role) <span style={{ color: '#EF4444' }}>*</span>
            </Typography>
            <TextField
              fullWidth
              size="small"
              placeholder="Contoh: Kepala Desa, Sekretaris Desa, Kepala Dusun I"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              disabled={isPending}
              required
              slotProps={{
                input: {
                  sx: {
                    borderRadius: '12px',
                    bgcolor: '#FFFFFF',
                    fontWeight: 600,
                  },
                },
              }}
            />
          </Box>

          {/* Category Dropdown */}
          <Box>
            <Typography variant="body2" sx={{ fontWeight: 700, color: '#1E1B4B', mb: 0.8 }}>
              Kelompok / Kategori Jabatan <span style={{ color: '#EF4444' }}>*</span>
            </Typography>
            <FormControl fullWidth size="small">
              <Select
                value={category}
                onChange={(e) => handleCategoryChange(e.target.value as OfficialCategory)}
                disabled={isPending}
                sx={{
                  borderRadius: '12px',
                  fontWeight: 600,
                  color: '#1E1B4B',
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: '#E7E5E4' },
                  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#CA8A04' },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#CA8A04' },
                }}
              >
                {OFFICIAL_CATEGORIES.map((cat) => (
                  <MenuItem key={cat.value} value={cat.value} sx={{ py: 1 }}>
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 700, color: '#1E1B4B' }}>
                        {cat.label}
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#78716C' }}>
                        {cat.description}
                      </Typography>
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          {/* Hierarchy Level & Order Index (2 columns) */}
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 700, color: '#1E1B4B', mb: 0.8 }}>
                Tingkat Hierarki <span style={{ color: '#EF4444' }}>*</span>
              </Typography>
              <FormControl fullWidth size="small">
                <Select
                  value={hierarchyLevel}
                  onChange={(e) => setHierarchyLevel(Number(e.target.value))}
                  disabled={isPending}
                  sx={{
                    borderRadius: '12px',
                    fontWeight: 600,
                    color: '#1E1B4B',
                  }}
                >
                  {HIERARCHY_LEVELS.map((lvl) => (
                    <MenuItem key={lvl.value} value={lvl.value}>
                      {lvl.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            <Box>
              <Typography variant="body2" sx={{ fontWeight: 700, color: '#1E1B4B', mb: 0.8 }}>
                Urutan Tampilan
              </Typography>
              <TextField
                fullWidth
                size="small"
                type="number"
                placeholder="0"
                value={orderIndex}
                onChange={(e) => setOrderIndex(parseInt(e.target.value, 10) || 0)}
                disabled={isPending}
                slotProps={{
                  input: {
                    sx: {
                      borderRadius: '12px',
                      fontWeight: 600,
                    },
                  },
                }}
              />
            </Box>
          </Box>
        </DialogContent>

        {/* Footer Actions */}
        <DialogActions sx={{ px: 3, pb: 2, pt: 1, gap: 1.5 }}>
          <Button
            onClick={onClose}
            disabled={isPending}
            sx={{
              borderRadius: '12px',
              color: '#78716C',
              fontWeight: 600,
              px: 2.5,
              '&:hover': { bgcolor: 'rgba(120, 113, 108, 0.08)' },
            }}
          >
            Batal
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={isPending}
            startIcon={isPending ? <CircularProgress size={16} color="inherit" /> : null}
            sx={{
              bgcolor: '#CA8A04',
              color: '#1E1B4B',
              fontWeight: 700,
              borderRadius: '12px',
              px: 3.5,
              py: 1,
              boxShadow: '0 4px 14px rgba(202, 138, 4, 0.3)',
              '&:hover': {
                bgcolor: '#EAB308',
                boxShadow: '0 6px 20px rgba(202, 138, 4, 0.4)',
              },
            }}
          >
            {isPending ? 'Menyimpan...' : isEditing ? 'Simpan Perubahan' : 'Tambah Perangkat'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
