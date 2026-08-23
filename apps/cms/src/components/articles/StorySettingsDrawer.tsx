import React from 'react';
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Divider,
  Switch,
  FormControlLabel,
  FormControl,
  Select,
  MenuItem,
  TextField,
  Card,
  Chip,
} from '@mui/material';
import { X, Clock } from 'lucide-react';
import type { ArticleCategory } from '../../types/category';

interface StorySettingsDrawerProps {
  open: boolean;
  onClose: () => void;
  isDraft: boolean;
  onDraftChange: (isDraft: boolean) => void;
  categoryId: string;
  onCategoryChange: (categoryId: string) => void;
  categories: ArticleCategory[];
  author: string;
  onAuthorChange: (author: string) => void;
  readTime: number;
}

export const StorySettingsDrawer: React.FC<StorySettingsDrawerProps> = ({
  open,
  onClose,
  isDraft,
  onDraftChange,
  categoryId,
  onCategoryChange,
  categories,
  author,
  onAuthorChange,
  readTime,
}) => {
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      slotProps={{
        paper: {
          sx: {
            width: { xs: '100%', sm: 380 },
            p: 3,
            boxSizing: 'border-box',
            bgcolor: '#FFFFFF',
            boxShadow: '-10px 0 30px rgba(0, 0, 0, 0.08)',
          },
        },
      }}
    >
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 800, color: '#1E1B4B' }}>
          Story Settings
        </Typography>
        <IconButton onClick={onClose} size="small" sx={{ color: '#78716C' }}>
          <X size={20} />
        </IconButton>
      </Box>

      <Divider sx={{ mb: 3 }} />

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3.5, overflowY: 'auto' }}>
        {/* Publish / Draft Toggle */}
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 700, color: '#1E1B4B' }}>
                {isDraft ? 'Status: Draft' : 'Status: Publikasi'}
              </Typography>
              <Typography variant="caption" sx={{ color: '#78716C', display: 'block' }}>
                {isDraft
                  ? 'Hanya dapat dilihat oleh pengelola CMS'
                  : 'Ditampilkan langsung di website publik desa'}
              </Typography>
            </Box>
            <FormControlLabel
              control={
                <Switch
                  checked={!isDraft}
                  onChange={(e) => onDraftChange(!e.target.checked)}
                  sx={{
                    '& .MuiSwitch-switchBase.Mui-checked': {
                      color: '#16A34A',
                      '&:hover': { bgcolor: 'rgba(22, 163, 74, 0.08)' },
                    },
                    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                      backgroundColor: '#16A34A',
                    },
                  }}
                />
              }
              label=""
              sx={{ m: 0 }}
            />
          </Box>
        </Box>

        {/* Category Selection (MANDATORY) */}
        <Box>
          <Typography
            variant="body2"
            sx={{ fontWeight: 700, color: '#1E1B4B', mb: 0.8, fontSize: '0.85rem' }}
          >
            Kategori Artikel <span style={{ color: '#EF4444' }}>*</span>
          </Typography>
          <FormControl fullWidth size="small">
            <Select
              value={categoryId}
              onChange={(e) => onCategoryChange(e.target.value)}
              displayEmpty
              sx={{
                borderRadius: '14px',
                bgcolor: '#FAFAF9',
                fontSize: '0.9rem',
                '& fieldset': { borderColor: '#E7E5E4' },
                '&:hover fieldset': { borderColor: '#CA8A04' },
              }}
            >
              {categories.length === 0 ? (
                <MenuItem value="" disabled>
                  Tidak ada kategori tersedia
                </MenuItem>
              ) : (
                categories.map((cat) => (
                  <MenuItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </MenuItem>
                ))
              )}
            </Select>
          </FormControl>
        </Box>

        {/* Author */}
        <Box>
          <Typography
            variant="body2"
            sx={{ fontWeight: 700, color: '#1E1B4B', mb: 0.8, fontSize: '0.85rem' }}
          >
            Nama Penulis / Redaksi
          </Typography>
          <TextField
            fullWidth
            size="small"
            placeholder="Pemerintah Desa"
            value={author}
            onChange={(e) => onAuthorChange(e.target.value)}
            slotProps={{
              input: {
                sx: {
                  borderRadius: '14px',
                  bgcolor: '#FAFAF9',
                  fontSize: '0.85rem',
                },
              },
            }}
          />
        </Box>

        {/* Automatic Read Time Preview Card */}
        <Box>
          <Typography
            variant="body2"
            sx={{ fontWeight: 700, color: '#1E1B4B', mb: 0.8, fontSize: '0.85rem' }}
          >
            Estimasi Waktu Baca
          </Typography>
          <Card
            sx={{
              p: 2,
              borderRadius: '16px',
              bgcolor: '#FAFAF9',
              border: '1px solid #F0EFEA',
              boxShadow: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Box
                sx={{
                  width: 38,
                  height: 38,
                  borderRadius: '10px',
                  bgcolor: 'rgba(202, 138, 4, 0.12)',
                  color: '#A16207',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Clock size={20} />
              </Box>
              <Box>
                <Typography variant="caption" sx={{ color: '#78716C', display: 'block' }}>
                  Estimated read time
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 800, color: '#1E1B4B', lineHeight: 1.1 }}>
                  {readTime} min
                </Typography>
              </Box>
            </Box>
            <Chip
              label="Otomatis"
              size="small"
              sx={{
                bgcolor: '#E7E5E4',
                color: '#57534E',
                fontWeight: 700,
                fontSize: '0.72rem',
                borderRadius: '8px',
              }}
            />
          </Card>
        </Box>
      </Box>
    </Drawer>
  );
};
