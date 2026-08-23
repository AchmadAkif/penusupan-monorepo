export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category_id: string;
  cover_image_url: string;
  author: string;
  read_time: number;
  view_count: number;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface ArticleListItem extends Article {
  article_categories?: {
    id: string;
    name: string;
    slug: string;
  } | null;
}

export type CreateArticleInput = {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category_id: string;
  cover_image_url: string;
  author?: string;
  read_time?: number;
  published_at: string | null;
};

export type UpdateArticleInput = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category_id: string;
  cover_image_url: string;
  author?: string;
  read_time?: number;
  published_at: string | null;
};
