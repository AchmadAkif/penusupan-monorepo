'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
  { href: '/',            label: 'Beranda' },
  { href: '/profile',    label: 'Profil Desa' },
  { href: '/businesses', label: 'UMKM' },
  { href: '/news',       label: 'Berita' },
];

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out',
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-stone-100'
            : 'bg-transparent',
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">

            {/* ── Logo / Brand ── */}
            <Link
              href="/"
              className="flex items-center gap-3 group"
              onClick={() => setMenuOpen(false)}
            >
              {/* Emblem badge */}
              <div
                className={cn(
                  'w-9 h-9 rounded-lg flex items-center justify-center font-heading font-bold text-sm transition-all duration-300',
                  scrolled
                    ? 'bg-navy text-white'
                    : 'bg-white/15 text-white border border-white/30',
                )}
              >
                DP
              </div>

              {/* Text */}
              <div className="flex flex-col leading-none">
                <span
                  className={cn(
                    'font-heading font-bold text-sm transition-colors duration-300',
                    scrolled ? 'text-navy' : 'text-white',
                  )}
                >
                  Desa Penusupan
                </span>
                <span
                  className={cn(
                    'text-xs font-body transition-colors duration-300',
                    scrolled ? 'text-stone-500' : 'text-white/70',
                  )}
                >
                  Kab. Tegal, Jawa Tengah
                </span>
              </div>
            </Link>

            {/* ── Desktop Nav Links ── */}
            <nav className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    'relative px-4 py-2 rounded-md text-sm font-medium font-body transition-all duration-200',
                    'group hover:bg-white/10',
                    scrolled
                      ? 'text-stone-700 hover:text-navy hover:bg-navy/5'
                      : 'text-white/90 hover:text-white',
                  )}
                >
                  {label}
                  <span
                    className={cn(
                      'absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-0 rounded-full transition-all duration-300 group-hover:w-4/5',
                      scrolled ? 'bg-gold' : 'bg-white',
                    )}
                  />
                </Link>
              ))}
            </nav>

            {/* ── CTA Button (desktop) ── */}
            <div className="hidden lg:flex items-center gap-3">
              <Link
                href="/news"
                className={cn(
                  'px-5 py-2.5 rounded-lg text-sm font-semibold font-body transition-all duration-200',
                  'bg-gold text-white hover:bg-gold-light shadow-sm hover:shadow-md',
                  'active:scale-95',
                )}
              >
                Lihat Berita
              </Link>
            </div>

            {/* ── Mobile Hamburger ── */}
            <button
              className={cn(
                'lg:hidden p-2 rounded-lg transition-all duration-200',
                scrolled
                  ? 'text-navy hover:bg-navy/5'
                  : 'text-white hover:bg-white/10',
              )}
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle navigation menu"
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

          </div>
        </div>
      </header>

      {/* ── Mobile Drawer Overlay ── */}
      <div
        className={cn(
          'fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300 lg:hidden',
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
        )}
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
      />

      {/* ── Mobile Drawer Panel ── */}
      <aside
        className={cn(
          'fixed top-0 right-0 z-50 h-full w-72 bg-white shadow-2xl transition-transform duration-300 ease-in-out lg:hidden',
          menuOpen ? 'translate-x-0' : 'translate-x-full',
        )}
        aria-label="Mobile navigation"
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-5 h-16 border-b border-stone-100">
          <span className="font-heading font-bold text-navy text-sm">Menu</span>
          <button
            className="p-2 rounded-lg text-stone-500 hover:bg-stone-100 transition-colors"
            onClick={() => setMenuOpen(false)}
            aria-label="Close navigation menu"
          >
            <X size={20} />
          </button>
        </div>

        {/* Drawer Links */}
        <nav className="flex flex-col p-4 gap-1">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className="flex items-center px-4 py-3 rounded-xl text-stone-700 font-medium font-body text-sm hover:bg-navy/5 hover:text-navy transition-all duration-150"
            >
              {label}
            </Link>
          ))}

          <div className="mt-4 pt-4 border-t border-stone-100">
            <Link
              href="/news"
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-center w-full px-4 py-3 rounded-xl bg-gold text-white font-semibold text-sm hover:bg-gold-light transition-all duration-200 active:scale-95"
            >
              Lihat Berita
            </Link>
          </div>
        </nav>
      </aside>
    </>
  );
}
