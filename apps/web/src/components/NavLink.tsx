'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export interface NavLinkProps {
  href: string;
  label: string;
  variant?: 'desktop' | 'mobile';
  scrolled?: boolean;
  onClick?: () => void;
  className?: string;
}

export function NavLink({
  href,
  label,
  variant = 'desktop',
  scrolled = false,
  onClick,
  className,
}: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href || (href !== '/' && pathname.startsWith(href));

  if (variant === 'mobile') {
    return (
      <Link
        href={href}
        onClick={onClick}
        className={cn(
          'flex items-center px-4 py-3 rounded-xl font-medium font-body text-sm transition-all duration-150',
          isActive
            ? 'bg-navy/10 text-navy font-semibold'
            : 'text-stone-700 hover:bg-navy/5 hover:text-navy',
          className,
        )}
      >
        {label}
      </Link>
    );
  }

  // Desktop variant
  return (
    <Link
      href={href}
      className={cn(
        'relative px-4 py-2 rounded-md text-sm font-medium font-body transition-all duration-200 group',
        scrolled
          ? isActive
            ? 'text-navy font-semibold'
            : 'text-stone-700 hover:text-navy hover:bg-navy/5'
          : isActive
          ? 'text-white font-semibold'
          : 'text-white/90 hover:text-white hover:bg-white/10',
        className,
      )}
    >
      {label}
      {/* Animated hover & active underline indicator */}
      <span
        className={cn(
          'absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 rounded-full transition-all duration-300',
          isActive ? 'w-4/5' : 'w-0 group-hover:w-4/5',
          scrolled ? 'bg-gold' : 'bg-white',
        )}
      />
    </Link>
  );
}
