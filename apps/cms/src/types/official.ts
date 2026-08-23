export type OfficialCategory = 'pimpinan' | 'sekretariat' | 'teknis' | 'kewilayahan';

export interface VillageOfficial {
  id: string;
  name: string;
  role: string;
  category: OfficialCategory;
  image_url: string | null;
  hierarchy_level: number;
  order_index: number;
  created_at: string;
  updated_at: string;
}

export interface CreateOfficialInput {
  name: string;
  role: string;
  category: OfficialCategory;
  image_url?: string | null;
  hierarchy_level: number;
  order_index?: number;
}

export interface UpdateOfficialInput extends Partial<CreateOfficialInput> {
  id: string;
}

export const OFFICIAL_CATEGORIES: { value: OfficialCategory; label: string; description: string }[] = [
  { value: 'pimpinan', label: 'Pimpinan', description: 'Kepala Desa' },
  { value: 'sekretariat', label: 'Sekretariat', description: 'Sekretaris Desa & Kepala Urusan (Kaur)' },
  { value: 'teknis', label: 'Pelaksana Teknis', description: 'Kepala Seksi (Kasi)' },
  { value: 'kewilayahan', label: 'Pelaksana Kewilayahan', description: 'Kepala Dusun (Kadus I - V)' },
];

export const HIERARCHY_LEVELS: { value: number; label: string }[] = [
  { value: 1, label: 'Tingkat 1 - Kepala Desa' },
  { value: 2, label: 'Tingkat 2 - Sekretaris Desa' },
  { value: 3, label: 'Tingkat 3 - Kaur / Kasi (Pelaksana Teknis & Sekretariat)' },
  { value: 4, label: 'Tingkat 4 - Kepala Dusun (Kadus)' },
];
