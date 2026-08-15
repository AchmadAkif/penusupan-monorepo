import React from 'react';
import Link from 'next/link';
import { cva } from 'class-variance-authority';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { CTAButtonProps } from '@/types/ui';

export const buttonVariants = cva(
  'group inline-flex items-center justify-center gap-2 rounded-xl font-heading font-semibold transition-all duration-200 active:scale-[0.98] select-none cursor-pointer disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        primary:
          'bg-gold hover:bg-gold-light text-navy font-bold shadow-md shadow-gold/20 hover:shadow-lg hover:shadow-gold/30 hover:scale-[1.02]',
        navy:
          'bg-navy hover:bg-navy-light text-white shadow-md shadow-navy/10 hover:shadow-lg hover:shadow-navy/20 hover:scale-[1.02]',
        outline:
          'bg-transparent hover:bg-navy/5 text-navy border border-stone-300 hover:border-navy',
        glass:
          'bg-white/10 hover:bg-white/15 text-white border border-white/20 hover:border-white/30 backdrop-blur-md hover:scale-[1.02]',
        ghost:
          'bg-transparent hover:bg-stone-100 text-stone-700 hover:text-navy',
        link:
          'bg-transparent p-0 text-navy hover:text-gold font-semibold underline-offset-4 hover:underline shadow-none rounded-none',
      },
      size: {
        sm: 'px-4 py-2 text-xs',
        md: 'px-6 py-3 text-sm',
        lg: 'px-7 py-3.5 text-base',
      },
    },
    defaultVariants: {
      variant: 'navy',
      size: 'md',
    },
  },
);

export function CTAButton({
  href,
  label,
  children,
  className,
  variant,
  size,
  icon: Icon = ArrowRight,
  iconPosition = 'right',
  showIcon = true,
  target,
  rel,
  ...props
}: CTAButtonProps) {
  const content = (
    <>
      {showIcon && iconPosition === 'left' && (
        <Icon
          size={size === 'sm' ? 14 : size === 'lg' ? 18 : 16}
          className="shrink-0 transition-transform duration-200 group-hover:-translate-x-1"
        />
      )}
      <span>{label || children || 'Lihat Selengkapnya'}</span>
      {showIcon && iconPosition === 'right' && (
        <Icon
          size={size === 'sm' ? 14 : size === 'lg' ? 18 : 16}
          className={cn(
            'shrink-0 transition-transform duration-200 group-hover:translate-x-1',
            variant === 'navy' && 'text-gold',
          )}
        />
      )}
    </>
  );

  const combinedClassName = cn(buttonVariants({ variant, size }), className);

  if (href) {
    return (
      <Link
        href={href}
        className={combinedClassName}
        target={target}
        rel={target === '_blank' ? 'noopener noreferrer' : rel}
      >
        {content}
      </Link>
    );
  }

  return (
    <button className={combinedClassName} {...props}>
      {content}
    </button>
  );
}
