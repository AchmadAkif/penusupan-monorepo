import React from 'react';
import { Card, CardContent, Box, Typography, Skeleton } from '@mui/material';
import type { LucideIcon } from 'lucide-react';
import { ArrowUpRight } from 'lucide-react';

export interface SummaryCardProps {
  title: string;
  value?: number | string | null;
  description?: string;
  icon: LucideIcon;
  watermarkIcon?: LucideIcon;
  iconBgColor?: string;
  iconColor?: string;
  isLoading?: boolean;
  onClick?: () => void;
}

export const SummaryCard: React.FC<SummaryCardProps> = ({
  title,
  value,
  description,
  icon: Icon,
  watermarkIcon: WatermarkIcon,
  iconBgColor = 'rgba(30, 27, 75, 0.06)', // subtle navy tint
  iconColor = '#1E1B4B',
  isLoading = false,
  onClick,
}) => {
  const Watermark = WatermarkIcon || Icon;

  return (
    <Card
      onClick={onClick}
      sx={{
        position: 'relative',
        overflow: 'hidden',
        cursor: onClick ? 'pointer' : 'default',
        bgcolor: '#FFFFFF',
        border: '1px solid #F0EFEA',
        borderRadius: '24px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.02)',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease',
        '&:hover': {
          transform: onClick ? 'translateY(-3px)' : 'translateY(-1px)',
          boxShadow: '0 8px 24px rgba(30, 27, 75, 0.06)',
          borderColor: '#E2E0D8',
        },
      }}
    >
      {/* Background Watermark Icon */}
      {Watermark && (
        <Box
          sx={{
            position: 'absolute',
            right: -16,
            bottom: -16,
            pointerEvents: 'none',
            opacity: 0.04,
            color: '#1E1B4B',
            transform: 'rotate(-10deg)',
          }}
        >
          <Watermark size={140} strokeWidth={1.5} />
        </Box>
      )}

      <CardContent sx={{ p: { xs: 2.5, sm: 3 }, '&:last-child': { pb: { xs: 2.5, sm: 3 } } }}>
        {/* Top Action / Icon Row */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Box
            sx={{
              width: 44,
              height: 44,
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: iconBgColor,
              color: iconColor,
            }}
          >
            <Icon size={22} strokeWidth={2.2} />
          </Box>
          <Box
            sx={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#A8A29E',
              transition: 'color 0.2s, transform 0.2s',
              '&:hover': { color: '#1E1B4B', transform: 'translate(2px, -2px)' },
            }}
          >
            <ArrowUpRight size={18} />
          </Box>
        </Box>

        {/* Value / Metric */}
        <Box sx={{ mb: 0.5 }}>
          {isLoading ? (
            <Skeleton variant="rectangular" width={100} height={44} sx={{ borderRadius: '8px' }} />
          ) : (
            <Typography
              variant="h3"
              sx={{
                fontSize: { xs: '2rem', sm: '2.5rem' },
                fontWeight: 800,
                color: '#1E1B4B',
                lineHeight: 1.1,
                letterSpacing: '-0.03em',
              }}
            >
              {typeof value === 'number' ? value.toLocaleString('id-ID') : (value ?? 0)}
            </Typography>
          )}
        </Box>

        {/* Title / Label */}
        <Typography
          variant="subtitle2"
          sx={{
            fontSize: '0.75rem',
            fontWeight: 700,
            color: '#78716C',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            mt: 1,
          }}
        >
          {title}
        </Typography>

        {/* Description helper text */}
        {description && (
          <Typography
            variant="body2"
            sx={{
              fontSize: '0.8rem',
              color: '#A8A29E',
              mt: 0.5,
            }}
          >
            {description}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};
