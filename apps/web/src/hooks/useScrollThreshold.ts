'use client';

import { useState, useEffect } from 'react';

/**
 * Hook to detect whether the window has been scrolled past a given threshold.
 * @param threshold Scroll threshold in pixels (default: 20)
 * @returns boolean indicating if window.scrollY > threshold
 */
export function useScrollThreshold(threshold: number = 20): boolean {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > threshold);
    };

    // Check initial position on mount
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return isScrolled;
}
