import React from 'react';
import { Box } from '@mui/material';
import { CmsSidebar } from './CmsSidebar';

interface CmsLayoutProps {
  children: React.ReactNode;
}

export const CmsLayout: React.FC<CmsLayoutProps> = ({ children }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100vh',
        bgcolor: '#FAFAF9', // Linen
      }}
    >
      <CmsSidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2.5, sm: 4, md: 5 },
          maxWidth: '1600px',
          width: '100%',
          boxSizing: 'border-box',
          overflowX: 'hidden',
        }}
      >
        {children}
      </Box>
    </Box>
  );
};
