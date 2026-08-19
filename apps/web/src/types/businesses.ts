export interface BusinessItem {
  id: string;
  name: string;
  ownerName: string;
  category: string;
  description: string;
  productsSold: string[];
  phone: string;
  whatsappNumber?: string;
  address: string;
  dusun: string;
  mapsUrl?: string;
  imageUrls: string[];
}

export interface BusinessesPageData {
  title?: string;
  subtitle?: string;
  businesses: BusinessItem[];
  categories: string[];
}

export interface BusinessCardProps {
  business: BusinessItem;
  className?: string;
}

export interface BusinessFilterBarProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  categoryCounts?: Record<string, number>;
  className?: string;
}

export interface BusinessesGridProps {
  businesses?: BusinessItem[];
  categories?: string[];
  searchQuery?: string;
  className?: string;
}
