export interface ProfileHeroProps {
  title?: string;
  subtitle?: string;
  eyebrow?: string;
  className?: string;
}

export interface VillageOfficial {
  id: string;
  name: string;
  role: string;
  category: 'pimpinan' | 'perangkat' | 'kewilayahan';
  photoUrl?: string;
  hierarchyLevel: number;
}
