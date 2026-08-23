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
import { Edit3, Trash2, FolderPlus, Tags } from 'lucide-react';
import type { ArticleCategory } from '../../types/category';

interface CategoryTableProps {
  categories: ArticleCategory[];
  isLoading: boolean;
  onEdit: (category: ArticleCategory) => void;
  onDelete: (category: ArticleCategory) => void;
  onAddClick: () => void;
}

export const CategoryTable: React.FC<CategoryTableProps> = ({
  categories,
  isLoading,
  onEdit,
  onDelete,
  onAddClick,
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Ensure page resets to 0 if data changes and current page is out of bounds
  useEffect(() => {
    if (page > 0 && page * rowsPerPage >= categories.length) {
      setPage(0);
    }
  }, [categories.length, page, rowsPerPage]);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Slice paginated items
  const paginatedCategories = useMemo(() => {
    return categories.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  }, [categories, page, rowsPerPage]);

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
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow sx={{ bgcolor: '#FAFAF9' }}>
              <TableCell sx={{ py: 2, px: 3, fontWeight: 700, fontSize: '0.75rem', color: '#78716C', letterSpacing: '0.05em' }}>
                NAMA KATEGORI
              </TableCell>
              <TableCell sx={{ py: 2, px: 3, fontWeight: 700, fontSize: '0.75rem', color: '#78716C', letterSpacing: '0.05em' }}>
                SLUG URL
              </TableCell>
              <TableCell sx={{ py: 2, px: 3, fontWeight: 700, fontSize: '0.75rem', color: '#78716C', letterSpacing: '0.05em' }}>
                DESKRIPSI
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
              Array.from({ length: rowsPerPage }).map((_, index) => (
                <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell sx={{ px: 3, py: 2.5 }}>
                    <Skeleton variant="text" width={140} height={24} />
                  </TableCell>
                  <TableCell sx={{ px: 3, py: 2.5 }}>
                    <Skeleton variant="rectangular" width={100} height={24} sx={{ borderRadius: '6px' }} />
                  </TableCell>
                  <TableCell sx={{ px: 3, py: 2.5 }}>
                    <Skeleton variant="text" width="80%" height={24} />
                  </TableCell>
                  <TableCell align="right" sx={{ px: 3, py: 2.5 }}>
                    <Box sx={{ display: 'inline-flex', gap: 1 }}>
                      <Skeleton variant="circular" width={32} height={32} />
                      <Skeleton variant="circular" width={32} height={32} />
                    </Box>
                  </TableCell>
                </TableRow>
              ))
            ) : categories.length === 0 ? (
              // Empty State
              <TableRow>
                <TableCell colSpan={4} sx={{ py: 8, textAlign: 'center' }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1.5 }}>
                    <Box
                      sx={{
                        width: 56,
                        height: 56,
                        borderRadius: '16px',
                        bgcolor: 'rgba(30, 27, 75, 0.05)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#1E1B4B',
                        mb: 0.5,
                      }}
                    >
                      <Tags size={28} />
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: '#1E1B4B' }}>
                      Belum Ada Kategori
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#78716C', maxWidth: 360 }}>
                      Kategori berita belum dibuat. Klik tombol di bawah untuk menambahkan kategori pertama Anda.
                    </Typography>
                    <Box
                      component="button"
                      onClick={onAddClick}
                      sx={{
                        mt: 1,
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 1,
                        bgcolor: '#CA8A04',
                        color: '#1E1B4B',
                        fontWeight: 700,
                        fontSize: '0.85rem',
                        px: 2.5,
                        py: 1,
                        borderRadius: '12px',
                        border: 'none',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        '&:hover': { bgcolor: '#EAB308', transform: 'translateY(-1px)' },
                      }}
                    >
                      <FolderPlus size={16} />
                      Tambah Kategori Sekarang
                    </Box>
                  </Box>
                </TableCell>
              </TableRow>
            ) : (
              // Paginated Categories List
              paginatedCategories.map((category) => (
                <TableRow
                  key={category.id}
                  sx={{
                    transition: 'background-color 0.15s ease',
                    '&:hover': { bgcolor: 'rgba(30, 27, 75, 0.02)' },
                    '&:last-child td, &:last-child th': { border: 0 },
                  }}
                >
                  {/* Name */}
                  <TableCell sx={{ px: 3, py: 2.5 }}>
                    <Typography variant="body2" sx={{ fontWeight: 700, color: '#1E1B4B' }}>
                      {category.name}
                    </Typography>
                  </TableCell>

                  {/* Slug */}
                  <TableCell sx={{ px: 3, py: 2.5 }}>
                    <Chip
                      label={category.slug}
                      size="small"
                      sx={{
                        bgcolor: '#F5F5F4',
                        color: '#44403C',
                        fontWeight: 600,
                        fontSize: '0.75rem',
                        fontFamily: 'monospace',
                        borderRadius: '8px',
                        border: '1px solid #E7E5E4',
                      }}
                    />
                  </TableCell>

                  {/* Description */}
                  <TableCell sx={{ px: 3, py: 2.5 }}>
                    <Typography
                      variant="body2"
                      sx={{
                        color: category.description ? '#78716C' : '#A8A29E',
                        fontStyle: category.description ? 'normal' : 'italic',
                        fontSize: '0.85rem',
                        maxWidth: 400,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {category.description || 'Tidak ada deskripsi'}
                    </Typography>
                  </TableCell>

                  {/* Actions */}
                  <TableCell align="right" sx={{ px: 3, py: 2.5 }}>
                    <Box sx={{ display: 'inline-flex', gap: 0.5 }}>
                      <Tooltip title="Edit Kategori">
                        <IconButton
                          size="small"
                          onClick={() => onEdit(category)}
                          sx={{
                            color: '#78716C',
                            '&:hover': { color: '#CA8A04', bgcolor: 'rgba(202, 138, 4, 0.1)' },
                          }}
                        >
                          <Edit3 size={17} />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Hapus Kategori">
                        <IconButton
                          size="small"
                          onClick={() => onDelete(category)}
                          sx={{
                            color: '#78716C',
                            '&:hover': { color: '#EF4444', bgcolor: 'rgba(239, 68, 68, 0.1)' },
                          }}
                        >
                          <Trash2 size={17} />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination Footer */}
      {!isLoading && categories.length > 0 && (
        <>
          <Divider sx={{ borderColor: '#F0EFEA' }} />
          <TablePagination
            component="div"
            count={categories.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[5, 10, 25]}
            labelRowsPerPage="Baris per halaman:"
            labelDisplayedRows={({ from, to, count }) =>
              `${from}–${to} dari ${count !== -1 ? count : `lebih dari ${to}`}`
            }
            sx={{
              px: 2,
              py: 0.5,
              color: '#78716C',
              '& .MuiTablePagination-select': {
                fontWeight: 600,
                fontSize: '0.85rem',
              },
              '& .MuiTablePagination-displayedRows': {
                fontWeight: 600,
                fontSize: '0.85rem',
              },
            }}
          />
        </>
      )}
    </Card>
  );
};
