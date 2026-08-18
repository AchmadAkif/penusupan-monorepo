export interface NewsItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content?: string[];
  category: string;
  publishedAt: string;
  author: string;
  readTime: string;
  imageUrl: string;
  viewCount?: number;
  isFeatured?: boolean;
  tags?: string[];
}

export interface NewsPageData {
  title?: string;
  subtitle?: string;
  articles: NewsItem[];
  categories: string[];
}

export interface PopularNewsItem {
  id: string;
  title: string;
  slug: string;
  publishedAt: string;
  imageUrl: string;
  viewCount: number;
  category: string;
}

export interface NewsSidebarProps {
  categories: string[];
  selectedCategory?: string;
  onSelectCategory?: (category: string) => void;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  popularArticles: NewsItem[];
  className?: string;
}

export interface NewsFeedProps {
  articles: NewsItem[];
  categories: string[];
  className?: string;
}
