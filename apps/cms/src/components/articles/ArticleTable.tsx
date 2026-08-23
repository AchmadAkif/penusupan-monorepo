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
import { Edit3, Trash2, PlusCircle, Newspaper, Image as ImageIcon } from 'lucide-react';
import type { ArticleListItem } from '../../types/article';

interface ArticleTableProps {
  articles: ArticleListItem[];
  isLoading: boolean;
  onEdit: (article: ArticleListItem) => void;
  onDelete: (article: ArticleListItem) => void;
  onAddClick: () => void;
}

export const ArticleTable: React.FC<ArticleTableProps> = ({
  articles,
  isLoading,
  onEdit,
  onDelete,
  onAddClick,
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    if (page > 0 && page * rowsPerPage >= articles.length) {
      setPage(0);
    }
  }, [articles.length, page, rowsPerPage]);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedArticles = useMemo(() => {
    return articles.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  }, [articles, page, rowsPerPage]);

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return '-';
    return new Date(dateStr).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

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
        <Table sx={{ minWidth: 700 }}>
          <TableHead>
            <TableRow sx={{ bgcolor: '#FAFAF9' }}>
              <TableCell sx={{ py: 2, px: 3, fontWeight: 700, fontSize: '0.75rem', color: '#78716C', letterSpacing: '0.05em' }}>
                JUDUL BERITA
              </TableCell>
              <TableCell sx={{ py: 2, px: 3, fontWeight: 700, fontSize: '0.75rem', color: '#78716C', letterSpacing: '0.05em' }}>
                KATEGORI
              </TableCell>
              <TableCell sx={{ py: 2, px: 3, fontWeight: 700, fontSize: '0.75rem', color: '#78716C', letterSpacing: '0.05em' }}>
                STATUS
              </TableCell>
              <TableCell sx={{ py: 2, px: 3, fontWeight: 700, fontSize: '0.75rem', color: '#78716C', letterSpacing: '0.05em' }}>
                TANGGAL
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
              Array.from({ length: rowsPerPage }).map((_, index) => (
                <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell sx={{ px: 3, py: 2.5 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Skeleton variant="rectangular" width={48} height={48} sx={{ borderRadius: '10px' }} />
                      <Box sx={{ flexGrow: 1 }}>
                        <Skeleton variant="text" width="70%" height={22} />
                        <Skeleton variant="text" width="40%" height={18} />
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell sx={{ px: 3, py: 2.5 }}>
                    <Skeleton variant="rectangular" width={80} height={24} sx={{ borderRadius: '6px' }} />
                  </TableCell>
                  <TableCell sx={{ px: 3, py: 2.5 }}>
                    <Skeleton variant="rectangular" width={70} height={24} sx={{ borderRadius: '12px' }} />
                  </TableCell>
                  <TableCell sx={{ px: 3, py: 2.5 }}>
                    <Skeleton variant="text" width={80} height={20} />
                  </TableCell>
                  <TableCell align="right" sx={{ px: 3, py: 2.5 }}>
                    <Box sx={{ display: 'inline-flex', gap: 1 }}>
                      <Skeleton variant="circular" width={32} height={32} />
                      <Skeleton variant="circular" width={32} height={32} />
                    </Box>
                  </TableCell>
                </TableRow>
              ))
            ) : articles.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} sx={{ py: 8, textAlign: 'center' }}>
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
                      <Newspaper size={28} />
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: '#1E1B4B' }}>
                      Belum Ada Artikel Berita
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#78716C', maxWidth: 360 }}>
                      Mulai publikasikan berita dan informasi terkini desa Penusupan sekarang.
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
                      <PlusCircle size={16} />
                      Tulis Berita Baru
                    </Box>
                  </Box>
                </TableCell>
              </TableRow>
            ) : (
              paginatedArticles.map((article) => {
                const isPublished = Boolean(article.published_at);
                const categoryName = article.article_categories?.name || 'Umum';

                return (
                  <TableRow
                    key={article.id}
                    sx={{
                      transition: 'background-color 0.15s ease',
                      '&:hover': { bgcolor: 'rgba(30, 27, 75, 0.02)' },
                      '&:last-child td, &:last-child th': { border: 0 },
                    }}
                  >
                    {/* Title + Thumbnail + Author */}
                    <TableCell sx={{ px: 3, py: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        {article.cover_image_url ? (
                          <Box
                            component="img"
                            src={article.cover_image_url}
                            alt={article.title}
                            sx={{
                              width: 52,
                              height: 52,
                              borderRadius: '10px',
                              objectFit: 'cover',
                              bgcolor: '#FAFAF9',
                              border: '1px solid #E7E5E4',
                              flexShrink: 0,
                            }}
                          />
                        ) : (
                          <Box
                            sx={{
                              width: 52,
                              height: 52,
                              borderRadius: '10px',
                              bgcolor: '#F5F5F4',
                              color: '#A8A29E',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexShrink: 0,
                            }}
                          >
                            <ImageIcon size={22} />
                          </Box>
                        )}
                        <Box sx={{ minWidth: 0 }}>
                          <Typography
                            variant="body2"
                            sx={{
                              fontWeight: 700,
                              color: '#1E1B4B',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                              maxWidth: { xs: 220, md: 340 },
                            }}
                          >
                            {article.title}
                          </Typography>
                          <Typography
                            variant="caption"
                            sx={{ color: '#78716C', display: 'block', mt: 0.2 }}
                          >
                            {article.author || 'Pemerintah Desa'} • {article.read_time || 3} mnt baca
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>

                    {/* Category */}
                    <TableCell sx={{ px: 3, py: 2 }}>
                      <Chip
                        label={categoryName}
                        size="small"
                        sx={{
                          bgcolor: 'rgba(202, 138, 4, 0.12)',
                          color: '#A16207',
                          fontWeight: 700,
                          fontSize: '0.75rem',
                          borderRadius: '8px',
                        }}
                      />
                    </TableCell>

                    {/* Status */}
                    <TableCell sx={{ px: 3, py: 2 }}>
                      <Chip
                        label={isPublished ? 'Terbit' : 'Draft'}
                        size="small"
                        sx={{
                          bgcolor: isPublished ? 'rgba(22, 163, 74, 0.1)' : 'rgba(120, 113, 108, 0.12)',
                          color: isPublished ? '#16A34A' : '#78716C',
                          fontWeight: 700,
                          fontSize: '0.72rem',
                          borderRadius: '12px',
                        }}
                      />
                    </TableCell>

                    {/* Date */}
                    <TableCell sx={{ px: 3, py: 2 }}>
                      <Typography variant="body2" sx={{ color: '#78716C', fontSize: '0.85rem' }}>
                        {formatDate(article.published_at || article.created_at)}
                      </Typography>
                    </TableCell>

                    {/* Actions */}
                    <TableCell align="right" sx={{ px: 3, py: 2 }}>
                      <Box sx={{ display: 'inline-flex', gap: 0.5 }}>
                        <Tooltip title="Edit Artikel">
                          <IconButton
                            size="small"
                            onClick={() => onEdit(article)}
                            sx={{
                              color: '#78716C',
                              '&:hover': { color: '#CA8A04', bgcolor: 'rgba(202, 138, 4, 0.1)' },
                            }}
                          >
                            <Edit3 size={17} />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Hapus Artikel">
                          <IconButton
                            size="small"
                            onClick={() => onDelete(article)}
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
                );
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      {!isLoading && articles.length > 0 && (
        <>
          <Divider sx={{ borderColor: '#F0EFEA' }} />
          <TablePagination
            component="div"
            count={articles.length}
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
