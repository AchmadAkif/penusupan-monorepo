import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import type {
  VillageOfficial,
  CreateOfficialInput,
  UpdateOfficialInput,
} from '../types/official';

export const useOfficials = (categoryFilter?: string) => {
  return useQuery<VillageOfficial[]>({
    queryKey: ['village-officials', categoryFilter || 'all'],
    queryFn: async () => {
      let query = supabase
        .from('village_officials')
        .select('*')
        .order('hierarchy_level', { ascending: true })
        .order('order_index', { ascending: true })
        .order('created_at', { ascending: true });

      if (categoryFilter && categoryFilter !== 'all' && categoryFilter !== 'Semua Kategori') {
        query = query.eq('category', categoryFilter);
      }

      const { data, error } = await query;
      if (error) {
        throw new Error(error.message);
      }
      return (data || []) as VillageOfficial[];
    },
  });
};

export const useCreateOfficial = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: CreateOfficialInput) => {
      const { data, error } = await supabase
        .from('village_officials')
        .insert([
          {
            name: input.name,
            role: input.role,
            category: input.category,
            image_url: input.image_url || null,
            hierarchy_level: input.hierarchy_level,
            order_index: input.order_index ?? 0,
          },
        ])
        .select()
        .single();

      if (error) throw new Error(error.message);
      return data as VillageOfficial;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['village-officials'] });
      queryClient.invalidateQueries({ queryKey: ['dusuns'] });
    },
  });
};

export const useUpdateOfficial = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: UpdateOfficialInput) => {
      const { id, ...updates } = input;
      const { data, error } = await supabase
        .from('village_officials')
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw new Error(error.message);
      return data as VillageOfficial;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['village-officials'] });
      queryClient.invalidateQueries({ queryKey: ['dusuns'] });
    },
  });
};

export const useDeleteOfficial = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('village_officials')
        .delete()
        .eq('id', id);

      if (error) throw new Error(error.message);
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['village-officials'] });
      queryClient.invalidateQueries({ queryKey: ['dusuns'] });
    },
  });
};
