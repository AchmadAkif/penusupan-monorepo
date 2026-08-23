import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider, CssBaseline, Box, Typography } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { store } from './store/store';
import { cmsTheme } from './theme/theme';
import { AuthListener } from './components/auth/AuthListener';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { CmsLayout } from './components/layout/CmsLayout';
import { DashboardPage } from './pages/Dashboard';
import { LoginPage } from './pages/Login';
import { CategoriesManagerPage } from './pages/CategoriesManager';
import { ArticlesManagerPage } from './pages/ArticlesManager';
import { ArticleEditorPage } from './pages/ArticleEditor';
import { UmkmManagerPage } from './pages/UmkmManager';
import { UmkmEditorPage } from './pages/UmkmEditor';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

// Placeholder for yet-to-be-built pages to ensure seamless navigation
const PlaceholderPage: React.FC<{ title: string }> = ({ title }) => (
  <Box sx={{ p: 4 }}>
    <Typography variant="h4" sx={{ fontWeight: 800, color: '#1E1B4B', mb: 1 }}>
      {title}
    </Typography>
    <Typography variant="body1" sx={{ color: '#78716C' }}>
      Modul manajemen {title} sedang dalam pengembangan.
    </Typography>
  </Box>
);

export default function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={cmsTheme}>
          <CssBaseline />
          <AuthListener>
            <BrowserRouter>
              <Routes>
                {/* Public Authentication Route */}
                <Route path="/login" element={<LoginPage />} />

                {/* Protected CMS Routes */}
                <Route
                  path="/*"
                  element={
                    <ProtectedRoute>
                      <CmsLayout>
                        <Routes>
                          <Route path="/" element={<DashboardPage />} />
                          <Route path="/articles" element={<ArticlesManagerPage />} />
                          <Route path="/articles/new" element={<ArticleEditorPage />} />
                          <Route path="/articles/edit/:id" element={<ArticleEditorPage />} />
                          <Route path="/categories" element={<CategoriesManagerPage />} />
                          <Route path="/businesses" element={<UmkmManagerPage />} />
                          <Route path="/businesses/new" element={<UmkmEditorPage />} />
                          <Route path="/businesses/edit/:id" element={<UmkmEditorPage />} />
                          <Route path="/umkm" element={<Navigate to="/businesses" replace />} />
                          <Route path="/umkm/new" element={<Navigate to="/businesses/new" replace />} />
                          <Route path="/umkm/edit/:id" element={<UmkmEditorPage />} />
                          <Route path="/announcements" element={<PlaceholderPage title="Pengumuman" />} />
                          <Route path="/profile" element={<PlaceholderPage title="Profil Desa" />} />
                          <Route path="/officials" element={<PlaceholderPage title="Perangkat Desa" />} />
                          <Route path="*" element={<Navigate to="/" replace />} />
                        </Routes>
                      </CmsLayout>
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </BrowserRouter>
          </AuthListener>
        </ThemeProvider>
      </QueryClientProvider>
    </Provider>
  );
}