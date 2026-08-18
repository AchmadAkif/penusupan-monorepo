'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { NavLink } from '@/components/NavLink';
import { BrandLogo } from '@/components/BrandLogo';
import { backdropAnimation, sidebarAnimation } from '@/constants/animation';
import type { MobileNavDrawerProps } from '@/types/navigation';

export function MobileNavDrawer({
  isOpen,
  onClose,
  links,
  cta,
}: MobileNavDrawerProps) {
  // Prevent body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="drawer-backdrop"
            variants={backdropAnimation}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Drawer Panel */}
          <motion.aside
            key="drawer-panel"
            variants={sidebarAnimation}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed top-0 right-0 z-50 h-full w-72 bg-white shadow-2xl flex flex-col lg:hidden"
            aria-label="Mobile navigation"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 h-16 border-b border-stone-100">
              <BrandLogo size="sm" theme="light" showSubtext={false} onClick={onClose} />
              <button
                type="button"
                className="p-2 rounded-lg text-stone-500 hover:bg-stone-100 transition-colors"
                onClick={onClose}
                aria-label="Close navigation menu"
              >
                <X size={20} />
              </button>
            </div>

            {/* Links */}
            <nav className="flex flex-col p-4 gap-1 flex-1 overflow-y-auto">
              {links.map((link) => (
                <NavLink
                  key={link.href}
                  href={link.href}
                  label={link.label}
                  variant="mobile"
                  onClick={onClose}
                />
              ))}
            </nav>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
