import React, { useState } from 'react';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Alert,
  InputAdornment,
  IconButton,
  CircularProgress,
} from '@mui/material';
import { Mail, Lock, Eye, EyeOff, LogIn } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAppSelector } from '../store/hooks';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isLoading: isAuthLoading } = useAppSelector((state) => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // If user is already authenticated, redirect to destination or dashboard
  if (!isAuthLoading && user) {
    const from = (location.state as { from?: { pathname?: string } })?.from?.pathname || '/';
    return <Navigate to={from} replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMsg('Harap masukkan email dan kata sandi.');
      return;
    }

    try {
      setIsSubmitting(true);
      setErrorMsg(null);

      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) {
        setErrorMsg(
          error.message === 'Invalid login credentials'
            ? 'Email atau kata sandi yang Anda masukkan salah.'
            : error.message
        );
        return;
      }

      // Redux state will be automatically updated by AuthListener
      const destination =
        (location.state as { from?: { pathname?: string } })?.from?.pathname || '/';
      navigate(destination, { replace: true });
    } catch (err: unknown) {
      const error = err as Error;
      setErrorMsg(error?.message || 'Terjadi kesalahan saat masuk. Silakan coba lagi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: '#1E1B4B', // Navy
        backgroundImage: 'radial-gradient(circle at 50% 20%, rgba(202, 138, 4, 0.15) 0%, transparent 60%)',
        p: 2.5,
      }}
    >
      <Card
        sx={{
          maxWidth: 440,
          width: '100%',
          bgcolor: '#FFFFFF',
          borderRadius: '28px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          overflow: 'hidden',
          p: { xs: 2.5, sm: 4 },
        }}
      >
        <CardContent sx={{ p: 0 }}>
          {/* Header Brand */}
          <Box sx={{ textAlign: 'center', mb: 3.5 }}>
            <Box
              component="img"
              src="/logo.png"
              alt="Logo Desa Penusupan"
              sx={{
                width: 64,
                height: 64,
                objectFit: 'contain',
                mx: 'auto',
                mb: 2,
              }}
            />
            <Typography
              variant="caption"
              sx={{
                color: '#CA8A04', // Gold
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                fontSize: '0.75rem',
                display: 'block',
                mb: 0.5,
              }}
            >
              Portal Administrasi
            </Typography>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 800,
                color: '#1E1B4B',
                letterSpacing: '-0.02em',
                mb: 0.8,
              }}
            >
              CMS Desa Penusupan
            </Typography>
            <Typography variant="body2" sx={{ color: '#78716C', fontSize: '0.85rem' }}>
              Silakan masuk dengan akun terdaftar untuk mengelola data website desa.
            </Typography>
          </Box>

          {/* Error Alert */}
          {errorMsg && (
            <Alert
              severity="error"
              sx={{
                mb: 3,
                borderRadius: '12px',
                fontSize: '0.85rem',
              }}
            >
              {errorMsg}
            </Alert>
          )}

          {/* Login Form */}
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <Box sx={{ mb: 2.5 }}>
              <Typography
                variant="body2"
                sx={{ fontWeight: 600, color: '#1E1B4B', mb: 0.8, fontSize: '0.85rem' }}
              >
                Alamat Email
              </Typography>
              <TextField
                fullWidth
                placeholder="admin@penusupan.desa.id"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubmitting}
                autoComplete="email"
                autoFocus
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <Mail size={18} color="#78716C" />
                      </InputAdornment>
                    ),
                    sx: {
                      borderRadius: '14px',
                      bgcolor: '#FAFAF9',
                      fontSize: '0.9rem',
                      '& fieldset': { borderColor: '#E7E5E4' },
                      '&:hover fieldset': { borderColor: '#CA8A04' },
                    },
                  },
                }}
              />
            </Box>

            <Box sx={{ mb: 3.5 }}>
              <Typography
                variant="body2"
                sx={{ fontWeight: 600, color: '#1E1B4B', mb: 0.8, fontSize: '0.85rem' }}
              >
                Kata Sandi
              </Typography>
              <TextField
                fullWidth
                placeholder="••••••••"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isSubmitting}
                autoComplete="current-password"
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock size={18} color="#78716C" />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                          size="small"
                          sx={{ color: '#78716C' }}
                        >
                          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </IconButton>
                      </InputAdornment>
                    ),
                    sx: {
                      borderRadius: '14px',
                      bgcolor: '#FAFAF9',
                      fontSize: '0.9rem',
                      '& fieldset': { borderColor: '#E7E5E4' },
                      '&:hover fieldset': { borderColor: '#CA8A04' },
                    },
                  },
                }}
              />
            </Box>

            <Button
              type="submit"
              fullWidth
              disabled={isSubmitting}
              startIcon={!isSubmitting && <LogIn size={18} />}
              sx={{
                py: 1.5,
                bgcolor: '#CA8A04', // Gold
                color: '#1E1B4B', // Navy
                fontWeight: 700,
                fontSize: '0.95rem',
                borderRadius: '14px',
                boxShadow: '0 4px 12px rgba(202, 138, 4, 0.25)',
                transition: 'all 0.2s ease',
                '&:hover': {
                  bgcolor: '#EAB308',
                  transform: 'translateY(-1px)',
                  boxShadow: '0 6px 16px rgba(202, 138, 4, 0.35)',
                },
              }}
            >
              {isSubmitting ? (
                <CircularProgress size={24} sx={{ color: '#1E1B4B' }} />
              ) : (
                'Masuk ke Panel'
              )}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};
