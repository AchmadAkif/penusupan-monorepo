export interface ProfileHeroProps {
  title?: string;
  subtitle?: string;
  eyebrow?: string;
  className?: string;
}

export type OfficialCategory =
  | 'pimpinan'
  | 'sekretariat'
  | 'teknis'
  | 'kewilayahan';

export interface OfficialItem {
  id: string;
  name: string;
  role: string;
  category: OfficialCategory;
  photoUrl?: string;
  hierarchyLevel?: number;
}

export interface VillageOrgStructure {
  head: OfficialItem;
  secretary: OfficialItem;
  kaurs: OfficialItem[];
  kasis: OfficialItem[];
  kaduses: OfficialItem[];
}

export interface OrgChartSectionProps {
  data?: VillageOrgStructure;
  className?: string;
}

export interface OfficialCardProps {
  official: OfficialItem;
  size?: 'sm' | 'md' | 'lg';
  highlight?: boolean;
  className?: string;
}

export interface VillageHistoryData {
  title: string;
  subtitle: string;
  paragraphs: string[];
  imageUrl: string;
  imageCaption: string;
  quote?: string;
}

export interface VillageHistorySectionProps {
  history?: VillageHistoryData;
  className?: string;
}

