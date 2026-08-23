export interface LocalBusiness {
  id: string;
  name: string;
  owner_name: string;
  category: string;
  description: string;
  products_sold: string[];
  phone: string | null;
  whatsapp_number: string | null;
  address: string | null;
  dusun: string;
  maps_url: string | null;
  image_urls: string[];
  created_at: string;
  updated_at: string;
}

export type CreateLocalBusinessInput = {
  name: string;
  owner_name: string;
  category: string;
  description: string;
  products_sold: string[];
  phone?: string | null;
  whatsapp_number?: string | null;
  address?: string | null;
  dusun: string;
  maps_url?: string | null;
  image_urls: string[];
};

export type UpdateLocalBusinessInput = {
  id: string;
  name: string;
  owner_name: string;
  category: string;
  description: string;
  products_sold: string[];
  phone?: string | null;
  whatsapp_number?: string | null;
  address?: string | null;
  dusun: string;
  maps_url?: string | null;
  image_urls: string[];
};
