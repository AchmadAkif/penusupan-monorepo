'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import { navbarAnimation } from '@/constants/animation';
import { NAV_LINKS, DEFAULT_CTA_LINK, NavLinkItem } from '@/constants/navigation';
import { useScrollThreshold } from '@/hooks/useScrollThreshold';
import { BrandLogo } from '@/components/BrandLogo';
import { NavLink } from '@/components/NavLink';
import { MobileNavDrawer } from '@/components/MobileNavDrawer';

export interface NavbarProps {
  links?: NavLinkItem[];
  cta?: NavLinkItem;
  className?: string;
  threshold?: number;
}

export default function Navbar({
  links = NAV_LINKS,
  className,
  threshold = 20,
}: NavbarProps) {
  const scrolled = useScrollThreshold(threshold);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* ── Sticky Header with Slide-Down Mount Animation ── */}
      <motion.header
        variants={navbarAnimation}
        initial="hidden"
        animate="visible"
        className={cn(
          'fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300 ease-in-out',
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm border-stone-100/80'
            : 'bg-transparent border-transparent',
          className,
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">

            {/* ── Brand Logo ── */}
            <BrandLogo scrolled={scrolled} onClick={() => setMenuOpen(false)} />

            {/* ── Desktop Navigation Links ── */}
            <nav className="hidden lg:flex items-center gap-1" aria-label="Main Navigation">
              {links.map((link) => (
                <NavLink
                  key={link.href}
                  href={link.href}
                  label={link.label}
                  scrolled={scrolled}
                  variant="desktop"
                />
              ))}
            </nav>

            {/* ── Mobile Hamburger Toggle ── */}
            <button
              type="button"
              className={cn(
                'lg:hidden p-2 rounded-lg transition-all duration-200',
                scrolled
                  ? 'text-navy hover:bg-navy/5'
                  : 'text-white hover:bg-white/10',
              )}
              onClick={() => setMenuOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={menuOpen}
            >
              <Menu size={22} />
            </button>

          </div>
        </div>
      </motion.header>

      {/* ── Reusable Mobile Navigation Drawer ── */}
      <MobileNavDrawer
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        links={links}
      />
    </>
  );
}
