export interface ArticleCategory {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  created_at: string;
  updated_at: string;
}

export type CreateCategoryInput = {
  name: string;
  slug: string;
  description?: string | null;
};

export type UpdateCategoryInput = {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
};
