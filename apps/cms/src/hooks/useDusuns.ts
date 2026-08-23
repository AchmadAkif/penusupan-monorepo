import { useQuery } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import type { Dusun } from '../types/dusun';

export const DEFAULT_DUSUN_NAMES = [
  'Dusun I',
  'Dusun II',
  'Dusun III',
  'Dusun IV',
  'Dusun V',
];

export const useDusuns = () => {
  return useQuery<Dusun[]>({
    queryKey: ['dusuns'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('dusuns')
        .select('*')
        .order('order_index', { ascending: true });

      if (error) {
        // If table does not exist or fetch fails, log warning and return fallback
        console.warn('Failed to fetch from dusuns table, using default dusuns fallback:', error.message);
        return DEFAULT_DUSUN_NAMES.map((name, index) => ({
          id: `default-${index + 1}`,
          name,
          slug: `dusun-${index + 1}`,
          dusun_number: index + 1,
          head_official_id: null,
          description: `Wilayah ${name} Desa Penusupan`,
          order_index: index + 1,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }));
      }

      if (!data || data.length === 0) {
        return DEFAULT_DUSUN_NAMES.map((name, index) => ({
          id: `default-${index + 1}`,
          name,
          slug: `dusun-${index + 1}`,
          dusun_number: index + 1,
          head_official_id: null,
          description: `Wilayah ${name} Desa Penusupan`,
          order_index: index + 1,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }));
      }

      return data as Dusun[];
    },
  });
};
