import React, { useState, useMemo, useEffect } from 'react';
import {
  Card,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
  Typography,
  IconButton,
  Tooltip,
  Box,
  Skeleton,
  Chip,
  Divider,
} from '@mui/material';
import { Edit3, Trash2, PlusCircle, Store, MapPin, Phone, MessageSquare, Image as ImageIcon } from 'lucide-react';
import type { LocalBusiness } from '../../types/umkm';

interface UmkmTableProps {
  businesses: LocalBusiness[];
  isLoading: boolean;
  onEdit: (business: LocalBusiness) => void;
  onDelete: (business: LocalBusiness) => void;
  onAddClick: () => void;
}

export const UmkmTable: React.FC<UmkmTableProps> = ({
  businesses,
  isLoading,
  onEdit,
  onDelete,
  onAddClick,
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    if (page > 0 && page * rowsPerPage >= businesses.length) {
      setPage(0);
    }
  }, [businesses.length, page, rowsPerPage]);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedBusinesses = useMemo(() => {
    return businesses.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  }, [businesses, page, rowsPerPage]);

  return (
    <Card
      sx={{
        borderRadius: '24px',
        bgcolor: '#FFFFFF',
        border: '1px solid #F0EFEA',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.02)',
        overflow: 'hidden',
      }}
    >
      <TableContainer>
        <Table sx={{ minWidth: 750 }}>
          <TableHead>
            <TableRow sx={{ bgcolor: '#FAFAF9' }}>
              <TableCell sx={{ py: 2, px: 3, fontWeight: 700, fontSize: '0.75rem', color: '#78716C', letterSpacing: '0.05em' }}>
                UMKM / BISNIS
              </TableCell>
              <TableCell sx={{ py: 2, px: 3, fontWeight: 700, fontSize: '0.75rem', color: '#78716C', letterSpacing: '0.05em' }}>
                KATEGORI
              </TableCell>
              <TableCell sx={{ py: 2, px: 3, fontWeight: 700, fontSize: '0.75rem', color: '#78716C', letterSpacing: '0.05em' }}>
                LOKASI (DUSUN)
              </TableCell>
              <TableCell sx={{ py: 2, px: 3, fontWeight: 700, fontSize: '0.75rem', color: '#78716C', letterSpacing: '0.05em' }}>
                KONTAK
              </TableCell>
              <TableCell
                align="right"
                sx={{ py: 2, px: 3, fontWeight: 700, fontSize: '0.75rem', color: '#78716C', letterSpacing: '0.05em' }}
              >
                AKSI
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              // Loading Skeleton Rows
              Array.from(new Array(5)).map((_, index) => (
                <TableRow key={index}>
                  <TableCell sx={{ py: 2.5, px: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Skeleton variant="rounded" width={52} height={52} sx={{ borderRadius: '12px' }} />
                      <Box sx={{ flex: 1 }}>
                        <Skeleton variant="text" width="65%" height={22} />
                        <Skeleton variant="text" width="40%" height={16} />
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell sx={{ py: 2.5, px: 3 }}>
                    <Skeleton variant="rounded" width={80} height={26} sx={{ borderRadius: '8px' }} />
                  </TableCell>
                  <TableCell sx={{ py: 2.5, px: 3 }}>
                    <Skeleton variant="text" width={100} height={20} />
                  </TableCell>
                  <TableCell sx={{ py: 2.5, px: 3 }}>
                    <Skeleton variant="text" width={110} height={20} />
                  </TableCell>
                  <TableCell align="right" sx={{ py: 2.5, px: 3 }}>
                    <Skeleton variant="circular" width={32} height={32} sx={{ display: 'inline-block', mr: 1 }} />
                    <Skeleton variant="circular" width={32} height={32} sx={{ display: 'inline-block' }} />
                  </TableCell>
                </TableRow>
              ))
            ) : paginatedBusinesses.length === 0 ? (
              // Empty State
              <TableRow>
                <TableCell colSpan={5} sx={{ py: 8, textAlign: 'center' }}>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 1.5,
                    }}
                  >
                    <Box
                      sx={{
                        p: 2,
                        borderRadius: '50%',
                        bgcolor: 'rgba(202, 138, 4, 0.08)',
                        color: '#CA8A04',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Store size={32} />
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: '#1E1B4B' }}>
                      Belum Ada UMKM Terdaftar
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#78716C', maxWidth: 400 }}>
                      Mulai data dan promosikan produk usaha lokal desa dengan menambahkan UMKM pertama.
                    </Typography>
                    <IconButton
                      onClick={onAddClick}
                      sx={{
                        mt: 1,
                        bgcolor: '#1E1B4B',
                        color: '#FFFFFF',
                        px: 2.5,
                        py: 1,
                        borderRadius: '12px',
                        fontSize: '0.875rem',
                        fontWeight: 600,
                        gap: 1,
                        '&:hover': { bgcolor: '#2E2A72' },
                      }}
                    >
                      <PlusCircle size={18} />
                      Tambah UMKM
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
            ) : (
              // Render Businesses
              paginatedBusinesses.map((biz) => {
                const firstImage = biz.image_urls?.[0];
                return (
                  <TableRow
                    key={biz.id}
                    hover
                    sx={{
                      '&:hover': { bgcolor: 'rgba(245, 245, 244, 0.5)' },
                      transition: 'background-color 0.15s ease',
                    }}
                  >
                    {/* UMKM Info & Image */}
                    <TableCell sx={{ py: 2, px: 3 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        {firstImage ? (
                          <Box
                            component="img"
                            src={firstImage}
                            alt={biz.name}
                            sx={{
                              width: 52,
                              height: 52,
                              borderRadius: '14px',
                              objectFit: 'cover',
                              bgcolor: '#F5F5F4',
                              border: '1px solid #E7E5E4',
                              flexShrink: 0,
                            }}
                          />
                        ) : (
                          <Box
                            sx={{
                              width: 52,
                              height: 52,
                              borderRadius: '14px',
                              bgcolor: 'rgba(30, 27, 75, 0.05)',
                              color: '#78716C',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              border: '1px solid #E7E5E4',
                              flexShrink: 0,
                            }}
                          >
                            <ImageIcon size={22} />
                          </Box>
                        )}
                        <Box sx={{ minWidth: 0 }}>
                          <Typography
                            variant="subtitle2"
                            sx={{
                              fontWeight: 700,
                              color: '#1E1B4B',
                              fontSize: '0.95rem',
                              lineHeight: 1.3,
                            }}
                          >
                            {biz.name}
                          </Typography>
                          <Typography
                            variant="caption"
                            sx={{
                              color: '#78716C',
                              display: 'block',
                              mt: 0.2,
                              fontWeight: 500,
                            }}
                          >
                            Pemilik: {biz.owner_name}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>

                    {/* Category */}
                    <TableCell sx={{ py: 2, px: 3 }}>
                      <Chip
                        label={biz.category}
                        size="small"
                        sx={{
                          bgcolor: 'rgba(202, 138, 4, 0.1)',
                          color: '#B45309',
                          fontWeight: 700,
                          fontSize: '0.75rem',
                          borderRadius: '8px',
                        }}
                      />
                    </TableCell>

                    {/* Dusun */}
                    <TableCell sx={{ py: 2, px: 3 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8, color: '#57534E' }}>
                        <MapPin size={15} color="#A8A29E" />
                        <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '0.85rem' }}>
                          {biz.dusun}
                        </Typography>
                      </Box>
                    </TableCell>

                    {/* Contact */}
                    <TableCell sx={{ py: 2, px: 3 }}>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.4 }}>
                        {biz.whatsapp_number ? (
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8, color: '#16A34A' }}>
                            <MessageSquare size={14} />
                            <Typography variant="caption" sx={{ fontWeight: 600, fontSize: '0.8rem' }}>
                              {biz.whatsapp_number}
                            </Typography>
                          </Box>
                        ) : biz.phone ? (
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8, color: '#57534E' }}>
                            <Phone size={14} />
                            <Typography variant="caption" sx={{ fontWeight: 600, fontSize: '0.8rem' }}>
                              {biz.phone}
                            </Typography>
                          </Box>
                        ) : (
                          <Typography variant="caption" sx={{ color: '#A8A29E' }}>
                            Tidak ada kontak
                          </Typography>
                        )}
                      </Box>
                    </TableCell>

                    {/* Actions */}
                    <TableCell align="right" sx={{ py: 2, px: 3 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 1 }}>
                        <Tooltip title="Edit UMKM">
                          <IconButton
                            size="small"
                            onClick={() => onEdit(biz)}
                            sx={{
                              color: '#57534E',
                              bgcolor: '#F5F5F4',
                              borderRadius: '10px',
                              p: 1,
                              '&:hover': {
                                bgcolor: '#1E1B4B',
                                color: '#FFFFFF',
                              },
                            }}
                          >
                            <Edit3 size={16} />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Hapus UMKM">
                          <IconButton
                            size="small"
                            onClick={() => onDelete(biz)}
                            sx={{
                              color: '#EF4444',
                              bgcolor: 'rgba(239, 68, 68, 0.08)',
                              borderRadius: '10px',
                              p: 1,
                              '&:hover': {
                                bgcolor: '#EF4444',
                                color: '#FFFFFF',
                              },
                            }}
                          >
                            <Trash2 size={16} />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination Divider & Controller */}
      {businesses.length > 0 && (
        <>
          <Divider sx={{ borderColor: '#F0EFEA' }} />
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={businesses.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage="Baris per halaman:"
            labelDisplayedRows={({ from, to, count }) => `${from}–${to} dari ${count}`}
            sx={{
              px: 2,
              py: 1,
              color: '#57534E',
              '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': {
                fontSize: '0.85rem',
                fontWeight: 500,
              },
            }}
          />
        </>
      )}
    </Card>
  );
};
