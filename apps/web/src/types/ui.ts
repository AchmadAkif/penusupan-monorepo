import type React from 'react';
import type { VariantProps } from 'class-variance-authority';
import type { LucideIcon } from 'lucide-react';
import type { buttonVariants } from '@/components/CTAButton';
import type { eyebrowVariants } from '@/components/Eyebrow';

export interface CTAButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  href?: string;
  label?: string;
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  showIcon?: boolean;
  target?: string;
  rel?: string;
  children?: React.ReactNode;
}

export interface BrandLogoProps {
  href?: string;
  theme?: 'dark' | 'light' | 'auto';
  scrolled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  showSubtext?: boolean;
  className?: string;
  onClick?: () => void;
}

export interface EyebrowProps
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof eyebrowVariants> {
  label?: string;
  icon?: LucideIcon;
  showIcon?: boolean;
  children?: React.ReactNode;
}
