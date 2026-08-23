import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Box, Typography, IconButton, Chip } from '@mui/material';
import { UploadCloud, Trash2, Image as ImageIcon } from 'lucide-react';

export interface ImageItem {
  id: string;
  url: string;
  file?: File;
  isExisting?: boolean;
}

interface ImageDropzoneProps {
  images: ImageItem[];
  onImagesChange: (images: ImageItem[]) => void;
  maxFiles?: number;
}

export const ImageDropzone: React.FC<ImageDropzoneProps> = ({
  images,
  onImagesChange,
  maxFiles = 8,
}) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const remainingSlots = maxFiles - images.length;
      const filesToAdd = acceptedFiles.slice(0, remainingSlots);

      const newItems: ImageItem[] = filesToAdd.map((file) => ({
        id: `${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        url: URL.createObjectURL(file),
        file,
        isExisting: false,
      }));

      onImagesChange([...images, ...newItems]);
    },
    [images, maxFiles, onImagesChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp'],
    },
    disabled: images.length >= maxFiles,
  });

  const handleRemoveImage = (idToRemove: string) => {
    const itemToRemove = images.find((img) => img.id === idToRemove);
    if (itemToRemove && !itemToRemove.isExisting && itemToRemove.url.startsWith('blob:')) {
      URL.revokeObjectURL(itemToRemove.url);
    }
    onImagesChange(images.filter((img) => img.id !== idToRemove));
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {/* Drop Area */}
      {images.length < maxFiles && (
        <Box
          {...getRootProps()}
          sx={{
            border: '2px dashed',
            borderColor: isDragActive ? '#CA8A04' : '#E7E5E4',
            bgcolor: isDragActive ? 'rgba(202, 138, 4, 0.04)' : '#FAFAF9',
            borderRadius: '16px',
            p: 3,
            textAlign: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
              borderColor: '#CA8A04',
              bgcolor: 'rgba(202, 138, 4, 0.04)',
            },
          }}
        >
          <input {...getInputProps()} />
          <Box
            sx={{
              display: 'inline-flex',
              p: 1.5,
              borderRadius: '50%',
              bgcolor: isDragActive ? 'rgba(202, 138, 4, 0.15)' : '#F5F5F4',
              color: isDragActive ? '#CA8A04' : '#78716C',
              mb: 1.5,
            }}
          >
            <UploadCloud size={24} />
          </Box>
          <Typography sx={{ fontWeight: 700, fontSize: '0.9rem', color: '#1E1B4B' }}>
            {isDragActive
              ? 'Lepaskan foto di sini...'
              : 'Tarik & lepas foto UMKM atau klik untuk memilih'}
          </Typography>
          <Typography sx={{ fontSize: '0.75rem', color: '#A8A29E', mt: 0.5 }}>
            Format: JPG, PNG, WEBP (Maksimal {maxFiles} foto • Tersisa {maxFiles - images.length})
          </Typography>
        </Box>
      )}

      {/* Grid of Preview Thumbnails */}
      {images.length > 0 && (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))',
            gap: 1.5,
            mt: 0.5,
          }}
        >
          {images.map((item, index) => (
            <Box
              key={item.id}
              sx={{
                position: 'relative',
                borderRadius: '14px',
                overflow: 'hidden',
                aspectRatio: '1/1',
                bgcolor: '#F5F5F4',
                border: '1px solid #E7E5E4',
                boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
                '&:hover .delete-btn': {
                  opacity: 1,
                },
              }}
            >
              <Box
                component="img"
                src={item.url}
                alt={`Preview ${index + 1}`}
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />

              {/* Main Photo Badge (first image) */}
              {index === 0 && (
                <Chip
                  label="Foto Utama"
                  size="small"
                  sx={{
                    position: 'absolute',
                    top: 6,
                    left: 6,
                    height: 20,
                    fontSize: '0.65rem',
                    fontWeight: 800,
                    bgcolor: 'rgba(30, 27, 75, 0.85)',
                    color: '#CA8A04',
                    backdropFilter: 'blur(4px)',
                  }}
                />
              )}

              {/* Delete Overlay Button */}
              <IconButton
                className="delete-btn"
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveImage(item.id);
                }}
                sx={{
                  position: 'absolute',
                  top: 6,
                  right: 6,
                  bgcolor: 'rgba(239, 68, 68, 0.9)',
                  color: '#FFFFFF',
                  p: 0.6,
                  opacity: { xs: 1, sm: 0 },
                  transition: 'opacity 0.2s ease',
                  backdropFilter: 'blur(4px)',
                  '&:hover': {
                    bgcolor: '#DC2626',
                  },
                }}
              >
                <Trash2 size={13} />
              </IconButton>
            </Box>
          ))}
        </Box>
      )}

      {images.length === 0 && (
        <Box
          sx={{
            py: 3,
            px: 2,
            bgcolor: '#FAFAF9',
            borderRadius: '16px',
            border: '1px solid #F0EFEA',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 1,
            color: '#A8A29E',
          }}
        >
          <ImageIcon size={18} />
          <Typography sx={{ fontSize: '0.85rem', fontWeight: 600 }}>
            Belum ada foto yang diunggah
          </Typography>
        </Box>
      )}
    </Box>
  );
};
