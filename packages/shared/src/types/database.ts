export interface Article {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  cover_image_url: string;
  published_at: string | null;
  created_at: string;
}

export interface VillageInfo {
  id: number;
  name: string;
  description: string;
  head_of_village_greeting: string;
  head_of_village_photo_url: string;
  vision: string;
  mission: string;
  history_content: string;
  demographics_summary: string;
  geographical_attributes: Record<string, any>;
  map_embed_url: string;
  contact_email: string;
  contact_phone: string;
  address: string;
}

export interface VillageOfficial {
  id: string;
  name: string;
  role: string;
  image_url: string;
  hierarchy_level: number;
}

export interface LocalBusiness {
  id: string;
  name: string;
  description: string;
  contact_info: string;
  address: string;
  image_url: string;
}

export interface Dusun {
  id: string;
  name: string;
  slug: string;
  dusun_number: number;
  head_official_id: string | null;
  description: string | null;
  order_index: number;
  created_at: string;
  updated_at: string;
}

