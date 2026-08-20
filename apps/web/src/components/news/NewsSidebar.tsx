'use client';

import {
  NewsSearchWidget,
  NewsCategoryWidget,
  PopularNewsWidget,
} from './widgets';
import type { NewsSidebarProps } from '@/types/news';

export function NewsSidebar({
  categories,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  popularArticles,
  className,
}: NewsSidebarProps) {
  return (
    <aside className={`space-y-6 lg:sticky lg:top-28 ${className || ''}`}>
      {/* ── 1. Search Bar Widget ── */}
      <NewsSearchWidget
        value={searchQuery}
        onChange={onSearchChange}
      />

      {/* ── 2. Category Filter Widget ── */}
      <NewsCategoryWidget
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={onSelectCategory}
      />

      {/* ── 3. Popular Articles Widget ── */}
      <PopularNewsWidget
        articles={popularArticles}
        limit={3}
      />
    </aside>
  );
}

export default NewsSidebar;
