import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  TextField,
  FormControl,
  Select,
  MenuItem,
  Card,
  Chip,
  InputAdornment,
  CircularProgress,
  Snackbar,
  Alert,
} from '@mui/material';
import {
  ArrowLeft,
  Save,
  Store,
  MapPin,
  Phone,
  MessageSquare,
  Globe,
  Plus,
  X,
  Sparkles,
} from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import type { LocalBusiness, CreateLocalBusinessInput, UpdateLocalBusinessInput } from '../types/umkm';
import { ImageDropzone, type ImageItem } from '../components/umkm/ImageDropzone';

import { useDusuns, DEFAULT_DUSUN_NAMES } from '../hooks/useDusuns';

const UMKM_CATEGORIES = [
  'Kuliner',
  'Kerajinan',
  'Pertanian & Peternakan',
  'Jasa',
  'Perdagangan & Toko',
  'Lainnya',
];

export const UmkmEditorPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditing = Boolean(id);
  const queryClient = useQueryClient();
  const { data: dusunList = [] } = useDusuns();

  // Form State
  const [name, setName] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [category, setCategory] = useState(UMKM_CATEGORIES[0]);
  const [description, setDescription] = useState('');
  const [productsSold, setProductsSold] = useState<string[]>([]);
  const [currentProductInput, setCurrentProductInput] = useState('');
  const [dusun, setDusun] = useState(DEFAULT_DUSUN_NAMES[0]);
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [mapsUrl, setMapsUrl] = useState('');
  const [images, setImages] = useState<ImageItem[]>([]);

  // Initialization State
  const [isInitialized, setIsInitialized] = useState(!isEditing);

  // Toast State
  const [toast, setToast] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error';
  }>({
    open: false,
    message: '',
    severity: 'success',
  });

  // Query Existing UMKM if editing
  const { data: existingBusiness, isLoading: isLoadingBusiness } = useQuery<LocalBusiness | null>({
    queryKey: ['business', id],
    queryFn: async () => {
      if (!id) return null;
      const { data, error } = await supabase
        .from('local_businesses')
        .select('*')
        .eq('id', id)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: isEditing,
  });

  // Populate data when editing
  useEffect(() => {
    if (existingBusiness) {
      setName(existingBusiness.name || '');
      setOwnerName(existingBusiness.owner_name || '');
      setCategory(existingBusiness.category || UMKM_CATEGORIES[0]);
      setDescription(existingBusiness.description || '');
      setProductsSold(existingBusiness.products_sold || []);
      setDusun(existingBusiness.dusun || DEFAULT_DUSUN_NAMES[0]);
      setAddress(existingBusiness.address || '');
      setPhone(existingBusiness.phone || '');
      setWhatsappNumber(existingBusiness.whatsapp_number || '');
      setMapsUrl(existingBusiness.maps_url || '');

      // Populate images
      const initialImages: ImageItem[] = (existingBusiness.image_urls || []).map((url) => ({
        id: url,
        url,
        isExisting: true,
      }));
      setImages(initialImages);
      setIsInitialized(true);
    }
  }, [existingBusiness]);

  // Product Tag handlers
  const handleAddProduct = () => {
    const trimmed = currentProductInput.trim();
    if (trimmed && !productsSold.includes(trimmed)) {
      setProductsSold([...productsSold, trimmed]);
      setCurrentProductInput('');
    }
  };

  const handleProductKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddProduct();
    }
  };

  const handleRemoveProduct = (prodToRemove: string) => {
    setProductsSold(productsSold.filter((p) => p !== prodToRemove));
  };

  // Mutation: Save / Update Business with deferred image uploads
  const saveMutation = useMutation({
    mutationFn: async () => {
      if (!name.trim()) throw new Error('Nama UMKM wajib diisi.');
      if (!ownerName.trim()) throw new Error('Nama pemilik wajib diisi.');
      if (!description.trim()) throw new Error('Deskripsi UMKM tidak boleh kosong.');

      // Process and upload new images to Supabase Storage: media/umkm
      const finalImageUrls: string[] = [];

      for (const item of images) {
        if (item.isExisting) {
          finalImageUrls.push(item.url);
        } else if (item.file) {
          const fileExt = item.file.name.split('.').pop() || 'jpg';
          const cleanFileName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
          const filePath = `umkm/${cleanFileName}`;

          const { error: uploadError } = await supabase.storage
            .from('media')
            .upload(filePath, item.file, {
              cacheControl: '3600',
              upsert: true,
            });

          if (uploadError) throw new Error(`Gagal mengunggah foto: ${uploadError.message}`);

          const { data: urlData } = supabase.storage
            .from('media')
            .getPublicUrl(filePath);

          finalImageUrls.push(urlData.publicUrl);
        }
      }

      if (isEditing && id) {
        const payload: Partial<UpdateLocalBusinessInput> = {
          name: name.trim(),
          owner_name: ownerName.trim(),
          category,
          description: description.trim(),
          products_sold: productsSold,
          dusun,
          address: address.trim() || null,
          phone: phone.trim() || null,
          whatsapp_number: whatsappNumber.trim() || null,
          maps_url: mapsUrl.trim() || null,
          image_urls: finalImageUrls,
        };

        const { data, error } = await supabase
          .from('local_businesses')
          .update({
            ...payload,
            updated_at: new Date().toISOString(),
          })
          .eq('id', id)
          .select()
          .single();

        if (error) throw error;
        return data;
      } else {
        const payload: CreateLocalBusinessInput = {
          name: name.trim(),
          owner_name: ownerName.trim(),
          category,
          description: description.trim(),
          products_sold: productsSold,
          dusun,
          address: address.trim() || null,
          phone: phone.trim() || null,
          whatsapp_number: whatsappNumber.trim() || null,
          maps_url: mapsUrl.trim() || null,
          image_urls: finalImageUrls,
        };

        const { data, error } = await supabase
          .from('local_businesses')
          .insert(payload)
          .select()
          .single();

        if (error) throw error;
        return data;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['businesses-list'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard-stats'] });
      setToast({
        open: true,
        message: isEditing ? 'Data UMKM berhasil diperbarui!' : 'Data UMKM berhasil ditambahkan!',
        severity: 'success',
      });
      setTimeout(() => {
        navigate('/businesses');
      }, 800);
    },
    onError: (err: Error) => {
      setToast({
        open: true,
        message: err.message || 'Gagal menyimpan data UMKM.',
        severity: 'error',
      });
    },
  });

  const handleSave = () => {
    saveMutation.mutate();
  };

  if (isEditing && (isLoadingBusiness || !isInitialized)) {
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '60vh',
        }}
      >
        <CircularProgress sx={{ color: '#CA8A04' }} />
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%', pb: 10 }}>
      {/* Sticky Top Header Bar */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          pb: 2.5,
          mb: 4,
          borderBottom: '1px solid #E7E5E4',
          position: 'sticky',
          top: 0,
          bgcolor: '#FAFAF9',
          zIndex: 10,
        }}
      >
        {/* Back Button */}
        <Button
          onClick={() => navigate('/businesses')}
          startIcon={<ArrowLeft size={18} />}
          sx={{
            color: '#1E1B4B',
            fontWeight: 700,
            fontSize: '0.95rem',
            textTransform: 'none',
            px: 1.5,
            py: 0.8,
            borderRadius: '12px',
            '&:hover': { bgcolor: 'rgba(30, 27, 75, 0.06)' },
          }}
        >
          {isEditing ? 'Edit Data UMKM' : 'Tambah UMKM Baru'}
        </Button>

        {/* Save Button */}
        <Button
          variant="contained"
          onClick={handleSave}
          disabled={saveMutation.isPending}
          startIcon={!saveMutation.isPending && <Save size={17} />}
          sx={{
            bgcolor: '#CA8A04',
            color: '#1E1B4B',
            fontWeight: 700,
            fontSize: '0.9rem',
            borderRadius: '12px',
            px: 3.5,
            py: 1,
            boxShadow: '0 2px 8px rgba(202, 138, 4, 0.25)',
            '&:hover': {
              bgcolor: '#EAB308',
              boxShadow: '0 4px 14px rgba(202, 138, 4, 0.35)',
            },
          }}
        >
          {saveMutation.isPending ? (
            <CircularProgress size={20} sx={{ color: '#1E1B4B' }} />
          ) : (
            'Simpan Data'
          )}
        </Button>
      </Box>

      {/* Main 2-Column Responsive Layout */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', lg: '1.4fr 1fr' },
          gap: 3.5,
          alignItems: 'start',
        }}
      >
        {/* Left Column: Core Identity & Details */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {/* Card 1: Identitas Bisnis */}
          <Card
            sx={{
              p: 3.5,
              borderRadius: '24px',
              bgcolor: '#FFFFFF',
              border: '1px solid #F0EFEA',
              boxShadow: '0 2px 10px rgba(0, 0, 0, 0.02)',
              display: 'flex',
              flexDirection: 'column',
              gap: 2.5,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 0.5 }}>
              <Box
                sx={{
                  p: 1,
                  borderRadius: '10px',
                  bgcolor: 'rgba(30, 27, 75, 0.06)',
                  color: '#1E1B4B',
                  display: 'flex',
                }}
              >
                <Store size={18} />
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#1E1B4B', fontSize: '1.1rem' }}>
                Identitas UMKM
              </Typography>
            </Box>

            {/* Nama UMKM */}
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 700, color: '#1E1B4B', mb: 0.8 }}>
                Nama Usaha / Toko <span style={{ color: '#EF4444' }}>*</span>
              </Typography>
              <TextField
                fullWidth
                placeholder="Contoh: Kopi Robusta Lereng Penusupan"
                value={name}
                onChange={(e) => setName(e.target.value)}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '14px',
                    '&:hover fieldset': { borderColor: '#CA8A04' },
                    '&.Mui-focused fieldset': { borderColor: '#CA8A04' },
                  },
                }}
              />
            </Box>

            {/* Nama Pemilik */}
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 700, color: '#1E1B4B', mb: 0.8 }}>
                Nama Pemilik / Penanggung Jawab <span style={{ color: '#EF4444' }}>*</span>
              </Typography>
              <TextField
                fullWidth
                placeholder="Contoh: Ibu Siti Aminah"
                value={ownerName}
                onChange={(e) => setOwnerName(e.target.value)}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '14px',
                    '&:hover fieldset': { borderColor: '#CA8A04' },
                    '&.Mui-focused fieldset': { borderColor: '#CA8A04' },
                  },
                }}
              />
            </Box>

            {/* Kategori Bisnis */}
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 700, color: '#1E1B4B', mb: 0.8 }}>
                Kategori Usaha <span style={{ color: '#EF4444' }}>*</span>
              </Typography>
              <FormControl fullWidth>
                <Select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  sx={{
                    borderRadius: '14px',
                    fontWeight: 600,
                    color: '#1E1B4B',
                    '& .MuiOutlinedInput-notchedOutline': { borderColor: '#E7E5E4' },
                    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#CA8A04' },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#CA8A04' },
                  }}
                >
                  {UMKM_CATEGORIES.map((cat) => (
                    <MenuItem key={cat} value={cat} sx={{ fontWeight: 500 }}>
                      {cat}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Card>

          {/* Card 2: Deskripsi Bisnis */}
          <Card
            sx={{
              p: 3.5,
              borderRadius: '24px',
              bgcolor: '#FFFFFF',
              border: '1px solid #F0EFEA',
              boxShadow: '0 2px 10px rgba(0, 0, 0, 0.02)',
              display: 'flex',
              flexDirection: 'column',
              gap: 1.5,
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 700, color: '#1E1B4B', fontSize: '1.1rem' }}>
              Deskripsi Usaha <span style={{ color: '#EF4444' }}>*</span>
            </Typography>
            <Typography variant="caption" sx={{ color: '#78716C', mt: -1 }}>
              Jelaskan sejarah singkat, keunikan rasa/kualitas, dan latar belakang usaha ini.
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={4}
              placeholder="Tuliskan gambaran umum dan keunggulan UMKM ini..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '14px',
                  '&:hover fieldset': { borderColor: '#CA8A04' },
                  '&.Mui-focused fieldset': { borderColor: '#CA8A04' },
                },
              }}
            />
          </Card>

          {/* Card 3: Produk Unggulan (Chip/Tag Input) */}
          <Card
            sx={{
              p: 3.5,
              borderRadius: '24px',
              bgcolor: '#FFFFFF',
              border: '1px solid #F0EFEA',
              boxShadow: '0 2px 10px rgba(0, 0, 0, 0.02)',
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Box
                sx={{
                  p: 1,
                  borderRadius: '10px',
                  bgcolor: 'rgba(202, 138, 4, 0.1)',
                  color: '#CA8A04',
                  display: 'flex',
                }}
              >
                <Sparkles size={18} />
              </Box>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#1E1B4B', fontSize: '1.1rem' }}>
                  Daftar Produk / Menu Unggulan
                </Typography>
                <Typography variant="caption" sx={{ color: '#78716C' }}>
                  Ketik nama produk lalu tekan Enter atau tombol Tambah.
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', gap: 1.5 }}>
              <TextField
                fullWidth
                size="small"
                placeholder="Contoh: Kopi Bubuk 250gr, Keripik Tempe..."
                value={currentProductInput}
                onChange={(e) => setCurrentProductInput(e.target.value)}
                onKeyDown={handleProductKeyDown}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                    '&:hover fieldset': { borderColor: '#CA8A04' },
                    '&.Mui-focused fieldset': { borderColor: '#CA8A04' },
                  },
                }}
              />
              <Button
                variant="outlined"
                onClick={handleAddProduct}
                disabled={!currentProductInput.trim()}
                startIcon={<Plus size={16} />}
                sx={{
                  borderRadius: '12px',
                  color: '#1E1B4B',
                  borderColor: '#E7E5E4',
                  fontWeight: 700,
                  px: 2.5,
                  textTransform: 'none',
                  '&:hover': {
                    borderColor: '#1E1B4B',
                    bgcolor: 'rgba(30, 27, 75, 0.04)',
                  },
                }}
              >
                Tambah
              </Button>
            </Box>

            {/* Rendered Product Chips */}
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, minHeight: 32 }}>
              {productsSold.map((prod) => (
                <Chip
                  key={prod}
                  label={prod}
                  onDelete={() => handleRemoveProduct(prod)}
                  deleteIcon={<X size={14} />}
                  sx={{
                    bgcolor: '#F5F5F4',
                    color: '#1E1B4B',
                    fontWeight: 600,
                    fontSize: '0.85rem',
                    borderRadius: '10px',
                    '& .MuiChip-deleteIcon': {
                      color: '#78716C',
                      '&:hover': { color: '#EF4444' },
                    },
                  }}
                />
              ))}
              {productsSold.length === 0 && (
                <Typography variant="caption" sx={{ color: '#A8A29E', fontStyle: 'italic', py: 0.5 }}>
                  Belum ada produk yang ditambahkan
                </Typography>
              )}
            </Box>
          </Card>
        </Box>

        {/* Right Column: Media, Location & Contact */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {/* Card 4: Galeri Foto UMKM */}
          <Card
            sx={{
              p: 3.5,
              borderRadius: '24px',
              bgcolor: '#FFFFFF',
              border: '1px solid #F0EFEA',
              boxShadow: '0 2px 10px rgba(0, 0, 0, 0.02)',
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
            }}
          >
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#1E1B4B', fontSize: '1.1rem' }}>
                Galeri Foto UMKM
              </Typography>
              <Typography variant="caption" sx={{ color: '#78716C' }}>
                Foto pertama akan menjadi foto utama (cover) di halaman direktori publik.
              </Typography>
            </Box>

            <ImageDropzone
              images={images}
              onImagesChange={setImages}
              maxFiles={6}
            />
          </Card>

          {/* Card 5: Lokasi & Kontak */}
          <Card
            sx={{
              p: 3.5,
              borderRadius: '24px',
              bgcolor: '#FFFFFF',
              border: '1px solid #F0EFEA',
              boxShadow: '0 2px 10px rgba(0, 0, 0, 0.02)',
              display: 'flex',
              flexDirection: 'column',
              gap: 2.5,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 0.5 }}>
              <Box
                sx={{
                  p: 1,
                  borderRadius: '10px',
                  bgcolor: 'rgba(30, 27, 75, 0.06)',
                  color: '#1E1B4B',
                  display: 'flex',
                }}
              >
                <MapPin size={18} />
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#1E1B4B', fontSize: '1.1rem' }}>
                Lokasi & Kontak
              </Typography>
            </Box>

            {/* Dusun */}
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 700, color: '#1E1B4B', mb: 0.8 }}>
                Dusun <span style={{ color: '#EF4444' }}>*</span>
              </Typography>
              <FormControl fullWidth size="small">
                <Select
                  value={dusun}
                  onChange={(e) => setDusun(e.target.value)}
                  sx={{
                    borderRadius: '12px',
                    fontWeight: 600,
                    color: '#1E1B4B',
                    '& .MuiOutlinedInput-notchedOutline': { borderColor: '#E7E5E4' },
                    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#CA8A04' },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#CA8A04' },
                  }}
                >
                  {dusunList.map((d) => (
                    <MenuItem key={d.id || d.name} value={d.name} sx={{ fontWeight: 500 }}>
                      {d.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            {/* Alamat Lengkap */}
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 700, color: '#1E1B4B', mb: 0.8 }}>
                Alamat Detail / Patokan
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={2}
                placeholder="Contoh: RT 03/RW 02, Samping Masjid Jami Penusupan"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                    '&:hover fieldset': { borderColor: '#CA8A04' },
                    '&.Mui-focused fieldset': { borderColor: '#CA8A04' },
                  },
                }}
              />
            </Box>

            {/* WhatsApp */}
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 700, color: '#1E1B4B', mb: 0.8 }}>
                Nomor WhatsApp
              </Typography>
              <TextField
                fullWidth
                size="small"
                placeholder="Contoh: 081234567890"
                value={whatsappNumber}
                onChange={(e) => setWhatsappNumber(e.target.value)}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <MessageSquare size={16} color="#16A34A" />
                      </InputAdornment>
                    ),
                  },
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                    '&:hover fieldset': { borderColor: '#CA8A04' },
                    '&.Mui-focused fieldset': { borderColor: '#CA8A04' },
                  },
                }}
              />
            </Box>

            {/* Phone */}
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 700, color: '#1E1B4B', mb: 0.8 }}>
                Nomor Telepon / Seluler
              </Typography>
              <TextField
                fullWidth
                size="small"
                placeholder="Contoh: 081234567890"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <Phone size={16} color="#78716C" />
                      </InputAdornment>
                    ),
                  },
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                    '&:hover fieldset': { borderColor: '#CA8A04' },
                    '&.Mui-focused fieldset': { borderColor: '#CA8A04' },
                  },
                }}
              />
            </Box>

            {/* Google Maps URL */}
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 700, color: '#1E1B4B', mb: 0.8 }}>
                Tautan Google Maps
              </Typography>
              <TextField
                fullWidth
                size="small"
                placeholder="https://maps.app.goo.gl/..."
                value={mapsUrl}
                onChange={(e) => setMapsUrl(e.target.value)}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <Globe size={16} color="#3B82F6" />
                      </InputAdornment>
                    ),
                  },
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                    '&:hover fieldset': { borderColor: '#CA8A04' },
                    '&.Mui-focused fieldset': { borderColor: '#CA8A04' },
                  },
                }}
              />
            </Box>
          </Card>
        </Box>
      </Box>

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
