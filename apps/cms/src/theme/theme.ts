import { createTheme } from '@mui/material/styles';

export const cmsTheme = createTheme({
  palette: {
    primary: {
      main: '#1E1B4B', // Navy
      light: '#2D2A6A',
      dark: '#16133A',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#CA8A04', // Gold
      light: '#EAB308',
      dark: '#A16207',
      contrastText: '#1E1B4B',
    },
    background: {
      default: '#FAFAF9', // Linen
      paper: '#FFFFFF',
    },
    text: {
      primary: '#1E1B4B', // Navy for primary headings and text
      secondary: '#78716C', // Stone for subtitles
    },
    divider: '#E7E5E4',
  },
  typography: {
    fontFamily: "'Inter', sans-serif",
    h1: {
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      fontWeight: 800,
    },
    h2: {
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      fontWeight: 800,
    },
    h3: {
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      fontWeight: 700,
    },
    h4: {
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      fontWeight: 700,
    },
    h5: {
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      fontWeight: 700,
    },
    h6: {
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      fontWeight: 600,
    },
    subtitle1: {
      fontFamily: "'Inter', sans-serif",
      fontWeight: 500,
    },
    subtitle2: {
      fontFamily: "'Inter', sans-serif",
      fontWeight: 600,
      letterSpacing: '0.05em',
      textTransform: 'uppercase',
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 24,
          border: '1px solid #F5F5F4',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.04), 0 1px 2px -1px rgba(0, 0, 0, 0.04)',
          transition: 'all 0.2s ease-in-out',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: '8px 16px',
        },
      },
    },
  },
});
