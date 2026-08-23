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
  Avatar,
  Divider,
} from '@mui/material';
import { Edit3, Trash2, UserPlus, Users, ShieldCheck } from 'lucide-react';
import type { VillageOfficial, OfficialCategory } from '../../types/official';

interface OfficialTableProps {
  officials: VillageOfficial[];
  isLoading: boolean;
  onEdit: (official: VillageOfficial) => void;
  onDelete: (official: VillageOfficial) => void;
  onAddClick: () => void;
}

const getCategoryChipConfig = (category: OfficialCategory) => {
  switch (category) {
    case 'pimpinan':
      return {
        label: 'Pimpinan',
        bgcolor: 'rgba(202, 138, 4, 0.12)',
        color: '#CA8A04',
        border: '1px solid rgba(202, 138, 4, 0.25)',
      };
    case 'sekretariat':
      return {
        label: 'Sekretariat',
        bgcolor: 'rgba(59, 130, 246, 0.1)',
        color: '#2563EB',
        border: '1px solid rgba(59, 130, 246, 0.25)',
      };
    case 'teknis':
      return {
        label: 'Pelaksana Teknis',
        bgcolor: 'rgba(147, 51, 234, 0.1)',
        color: '#7C3AED',
        border: '1px solid rgba(147, 51, 234, 0.25)',
      };
    case 'kewilayahan':
      return {
        label: 'Kewilayahan',
        bgcolor: 'rgba(22, 163, 74, 0.1)',
        color: '#16A34A',
        border: '1px solid rgba(22, 163, 74, 0.25)',
      };
    default:
      return {
        label: category,
        bgcolor: '#F5F5F4',
        color: '#78716C',
        border: '1px solid #E7E5E4',
      };
  }
};

export const OfficialTable: React.FC<OfficialTableProps> = ({
  officials,
  isLoading,
  onEdit,
  onDelete,
  onAddClick,
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    if (page > 0 && page * rowsPerPage >= officials.length) {
      setPage(0);
    }
  }, [officials.length, page, rowsPerPage]);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedOfficials = useMemo(() => {
    return officials.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  }, [officials, page, rowsPerPage]);

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
                PERANGKAT DESA
              </TableCell>
              <TableCell sx={{ py: 2, px: 3, fontWeight: 700, fontSize: '0.75rem', color: '#78716C', letterSpacing: '0.05em' }}>
                JABATAN (ROLE)
              </TableCell>
              <TableCell sx={{ py: 2, px: 3, fontWeight: 700, fontSize: '0.75rem', color: '#78716C', letterSpacing: '0.05em' }}>
                KATEGORI
              </TableCell>
              <TableCell sx={{ py: 2, px: 3, fontWeight: 700, fontSize: '0.75rem', color: '#78716C', letterSpacing: '0.05em' }}>
                TINGKAT & URUTAN
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
                      <Skeleton variant="circular" width={44} height={44} />
                      <Box sx={{ flex: 1 }}>
                        <Skeleton variant="text" width={160} height={24} />
                        <Skeleton variant="text" width={100} height={18} />
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell sx={{ px: 3, py: 2.5 }}>
                    <Skeleton variant="text" width={140} height={24} />
                  </TableCell>
                  <TableCell sx={{ px: 3, py: 2.5 }}>
                    <Skeleton variant="rounded" width={90} height={28} sx={{ borderRadius: '8px' }} />
                  </TableCell>
                  <TableCell sx={{ px: 3, py: 2.5 }}>
                    <Skeleton variant="text" width={100} height={20} />
                  </TableCell>
                  <TableCell align="right" sx={{ px: 3, py: 2.5 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                      <Skeleton variant="circular" width={32} height={32} />
                      <Skeleton variant="circular" width={32} height={32} />
                    </Box>
                  </TableCell>
                </TableRow>
              ))
            ) : paginatedOfficials.length > 0 ? (
              paginatedOfficials.map((official) => {
                const chipConfig = getCategoryChipConfig(official.category);
                const initials = official.name
                  .split(' ')
                  .map((w) => w[0])
                  .filter(Boolean)
                  .slice(0, 2)
                  .join('')
                  .toUpperCase();

                return (
                  <TableRow
                    key={official.id}
                    sx={{
                      transition: 'background-color 0.15s ease',
                      '&:hover': { bgcolor: 'rgba(30, 27, 75, 0.02)' },
                      '&:last-child td, &:last-child th': { border: 0 },
                    }}
                  >
                    {/* Photo + Name */}
                    <TableCell sx={{ px: 3, py: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        {official.image_url ? (
                          <Avatar
                            src={official.image_url}
                            alt={official.name}
                            sx={{
                              width: 44,
                              height: 44,
                              borderRadius: '14px',
                              border: '1px solid #E7E5E4',
                              boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
                            }}
                          />
                        ) : (
                          <Avatar
                            sx={{
                              width: 44,
                              height: 44,
                              borderRadius: '14px',
                              bgcolor: 'rgba(202, 138, 4, 0.12)',
                              color: '#CA8A04',
                              fontWeight: 800,
                              fontSize: '0.9rem',
                              border: '1px solid rgba(202, 138, 4, 0.25)',
                            }}
                          >
                            {initials || <Users size={20} />}
                          </Avatar>
                        )}
                        <Box>
                          <Typography
                            variant="subtitle2"
                            sx={{
                              fontWeight: 700,
                              color: '#1E1B4B',
                              fontSize: '0.95rem',
                              lineHeight: 1.3,
                            }}
                          >
                            {official.name}
                          </Typography>
                          <Typography
                            variant="caption"
                            sx={{
                              color: '#A8A29E',
                              fontSize: '0.75rem',
                              display: 'flex',
                              alignItems: 'center',
                              gap: 0.5,
                            }}
                          >
                            <ShieldCheck size={13} color="#CA8A04" />
                            Hierarki Tk. {official.hierarchy_level}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>

                    {/* Role */}
                    <TableCell sx={{ px: 3, py: 2 }}>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 600,
                          color: '#1E1B4B',
                          fontSize: '0.88rem',
                        }}
                      >
                        {official.role}
                      </Typography>
                    </TableCell>

                    {/* Category Chip */}
                    <TableCell sx={{ px: 3, py: 2 }}>
                      <Chip
                        label={chipConfig.label}
                        size="small"
                        sx={{
                          bgcolor: chipConfig.bgcolor,
                          color: chipConfig.color,
                          border: chipConfig.border,
                          fontWeight: 700,
                          fontSize: '0.75rem',
                          borderRadius: '8px',
                          height: 26,
                        }}
                      />
                    </TableCell>

                    {/* Level & Order */}
                    <TableCell sx={{ px: 3, py: 2 }}>
                      <Box>
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: 600,
                            color: '#44403C',
                            fontSize: '0.84rem',
                          }}
                        >
                          Tingkat {official.hierarchy_level}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{
                            color: '#78716C',
                            fontSize: '0.75rem',
                          }}
                        >
                          Urutan: {official.order_index}
                        </Typography>
                      </Box>
                    </TableCell>

                    {/* Action Buttons */}
                    <TableCell align="right" sx={{ px: 3, py: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                        <Tooltip title="Edit Perangkat Desa" arrow>
                          <IconButton
                            size="small"
                            onClick={() => onEdit(official)}
                            sx={{
                              color: '#78716C',
                              borderRadius: '10px',
                              bgcolor: 'rgba(120, 113, 108, 0.06)',
                              transition: 'all 0.2s',
                              '&:hover': {
                                color: '#CA8A04',
                                bgcolor: 'rgba(202, 138, 4, 0.12)',
                                transform: 'translateY(-1px)',
                              },
                            }}
                          >
                            <Edit3 size={16} />
                          </IconButton>
                        </Tooltip>

                        <Tooltip title="Hapus Perangkat Desa" arrow>
                          <IconButton
                            size="small"
                            onClick={() => onDelete(official)}
                            sx={{
                              color: '#78716C',
                              borderRadius: '10px',
                              bgcolor: 'rgba(120, 113, 108, 0.06)',
                              transition: 'all 0.2s',
                              '&:hover': {
                                color: '#EF4444',
                                bgcolor: 'rgba(239, 68, 68, 0.12)',
                                transform: 'translateY(-1px)',
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
            ) : (
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
                        width: 56,
                        height: 56,
                        borderRadius: '18px',
                        bgcolor: 'rgba(202, 138, 4, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#CA8A04',
                      }}
                    >
                      <Users size={28} />
                    </Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#1E1B4B' }}>
                      Belum ada data Perangkat Desa
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#78716C', maxWidth: 360 }}>
                      Data perangkat desa yang ditambahkan akan muncul di sini dan ditampilkan pada bagan struktur organisasi web publik.
                    </Typography>
                    <Box
                      component="button"
                      onClick={onAddClick}
                      sx={{
                        mt: 1,
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 1,
                        px: 2.5,
                        py: 1,
                        borderRadius: '12px',
                        border: 'none',
                        bgcolor: '#CA8A04',
                        color: '#1E1B4B',
                        fontWeight: 700,
                        fontSize: '0.85rem',
                        cursor: 'pointer',
                        boxShadow: '0 2px 8px rgba(202, 138, 4, 0.25)',
                        transition: 'all 0.2s',
                        '&:hover': {
                          bgcolor: '#EAB308',
                          transform: 'translateY(-1px)',
                        },
                      }}
                    >
                      <UserPlus size={16} />
                      Tambah Perangkat Desa Sekarang
                    </Box>
                  </Box>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination Divider & Component */}
      {officials.length > 0 && <Divider sx={{ borderColor: '#F0EFEA' }} />}
      {officials.length > 0 && (
        <TablePagination
          component="div"
          count={officials.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 20]}
          labelRowsPerPage="Baris per halaman:"
          labelDisplayedRows={({ from, to, count }) => `${from}–${to} dari ${count}`}
          sx={{
            px: 3,
            py: 1,
            color: '#78716C',
            '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': {
              fontSize: '0.85rem',
              fontWeight: 500,
            },
            '& .MuiTablePagination-actions button': {
              color: '#1E1B4B',
            },
          }}
        />
      )}
    </Card>
  );
};
