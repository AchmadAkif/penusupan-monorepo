import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Divider,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  LayoutDashboard,
  Newspaper,
  Tags,
  Store,
  Megaphone,
  Landmark,
  Users,
  LogOut,
} from 'lucide-react';
import { useAppSelector } from '../../store/hooks';
import { supabase } from '../../lib/supabase';

interface NavItem {
  label: string;
  path: string;
  icon: React.ElementType;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard', path: '/', icon: LayoutDashboard },
  { label: 'Berita & Artikel', path: '/articles', icon: Newspaper },
  { label: 'Kategori Berita', path: '/categories', icon: Tags },
  { label: 'UMKM Desa', path: '/businesses', icon: Store },
  { label: 'Pengumuman', path: '/announcements', icon: Megaphone },
  { label: 'Profil Desa', path: '/profile', icon: Landmark },
  { label: 'Perangkat Desa', path: '/officials', icon: Users },
];

export const CmsSidebar: React.FC = () => {
  const location = useLocation();
  const { user } = useAppSelector((state) => state.auth);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  // Derive display initials from user email
  const userEmail = user?.email || 'admin@penusupan.desa.id';
  const userInitials = userEmail.substring(0, 2).toUpperCase();

  return (
    <Box
      component="aside"
      sx={{
        width: { xs: '100%', md: 280 },
        minWidth: 280,
        bgcolor: '#1E1B4B', // Navy
        color: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        position: { xs: 'relative', md: 'sticky' },
        top: 0,
        p: 2.5,
        boxSizing: 'border-box',
        borderRight: '1px solid rgba(255, 255, 255, 0.08)',
        zIndex: 100,
      }}
    >
      {/* Brand Header */}
      <Box sx={{ mb: 4, px: 1.5, pt: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 0.5 }}>
          <Box
            component="img"
            src="/logo.png"
            alt="Logo Desa Penusupan"
            sx={{
              width: 38,
              height: 38,
              objectFit: 'contain',
              flexShrink: 0,
            }}
          />
          <Box>
            <Typography
              variant="caption"
              sx={{
                color: '#EAB308',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                display: 'block',
                lineHeight: 1,
                fontSize: '0.68rem',
              }}
            >
              Desa Penusupan
            </Typography>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 800,
                color: '#FFFFFF',
                lineHeight: 1.2,
                fontSize: '1.05rem',
                letterSpacing: '-0.02em',
              }}
            >
              CMS Dashboard
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Navigation Menu */}
      <Box sx={{ flexGrow: 1, overflowY: 'auto', pr: 0.5 }}>
        <Typography
          variant="caption"
          sx={{
            px: 1.5,
            mb: 1,
            display: 'block',
            color: 'rgba(255, 255, 255, 0.45)',
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            fontSize: '0.65rem',
          }}
        >
          Menu Navigasi
        </Typography>
        <List disablePadding sx={{ display: 'flex', flexDirection: 'column', gap: 0.8 }}>
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <ListItem key={item.path} disablePadding>
                <ListItemButton
                  component={NavLink}
                  to={item.path}
                  sx={{
                    borderRadius: '14px',
                    py: 1.2,
                    px: 2,
                    bgcolor: isActive ? '#CA8A04' : 'transparent', // Active Gold
                    color: isActive ? '#1E1B4B' : '#E2E8F0',
                    fontWeight: isActive ? 700 : 500,
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      bgcolor: isActive ? '#EAB308' : 'rgba(255, 255, 255, 0.08)',
                      color: isActive ? '#1E1B4B' : '#FFFFFF',
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 36,
                      color: isActive ? '#1E1B4B' : '#94A3B8',
                    }}
                  >
                    <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                  </ListItemIcon>
                  <ListItemText
                    primary={item.label}
                    slotProps={{
                      primary: {
                        sx: {
                          fontSize: '0.88rem',
                          fontWeight: isActive ? 700 : 500,
                          letterSpacing: '-0.01em',
                        },
                      },
                    }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>

      <Divider sx={{ my: 2, borderColor: 'rgba(255, 255, 255, 0.1)' }} />

      {/* Admin User Profile Snippet & Logout */}
      <Box
        sx={{
          p: 1.5,
          borderRadius: '14px',
          bgcolor: 'rgba(255, 255, 255, 0.05)',
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
        }}
      >
        <Avatar
          sx={{
            width: 38,
            height: 38,
            bgcolor: '#CA8A04',
            color: '#1E1B4B',
            fontWeight: 800,
            fontSize: '0.85rem',
          }}
        >
          {userInitials}
        </Avatar>
        <Box sx={{ overflow: 'hidden', flexGrow: 1 }}>
          <Typography
            variant="body2"
            sx={{
              fontWeight: 700,
              color: '#FFFFFF',
              lineHeight: 1.2,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              fontSize: '0.82rem',
            }}
          >
            {user?.email?.split('@')[0] || 'Admin Desa'}
          </Typography>
          <Typography
            variant="caption"
            sx={{
              color: '#94A3B8',
              fontSize: '0.7rem',
              display: 'block',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {userEmail}
          </Typography>
        </Box>
        <Tooltip title="Keluar dari Panel">
          <IconButton
            size="small"
            onClick={handleLogout}
            sx={{
              color: '#94A3B8',
              '&:hover': {
                color: '#EF4444',
                bgcolor: 'rgba(239, 68, 68, 0.1)',
              },
            }}
          >
            <LogOut size={18} />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
};
