import React from 'react';
import { cva } from 'class-variance-authority';
import { Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { EyebrowProps } from '@/types/ui';

export const eyebrowVariants = cva(
  'inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full font-body text-xs sm:text-sm font-semibold border transition-colors select-none',
  {
    variants: {
      variant: {
        gold: 'bg-gold/10 border-gold/20 text-gold-dark',
        navy: 'bg-navy/5 border-navy/10 text-navy',
        glass:
          'bg-white/10 backdrop-blur-md border-white/15 text-gold-light shadow-xs',
        white:
          'bg-white/90 backdrop-blur-md border-stone-200/80 text-navy shadow-xs',
      },
    },
    defaultVariants: {
      variant: 'gold',
    },
  },
);

export function Eyebrow({
  label,
  children,
  icon: Icon = Sparkles,
  showIcon = true,
  variant,
  className,
  ...props
}: EyebrowProps) {
  const iconColor =
    variant === 'navy'
      ? 'text-gold'
      : variant === 'glass'
      ? 'text-gold'
      : 'text-gold';

  return (
    <div
      className={cn(eyebrowVariants({ variant }), className)}
      {...props}
    >
      {showIcon && (
        <Icon size={14} className={cn('shrink-0', iconColor)} />
      )}
      <span>{label || children}</span>
    </div>
  );
}
