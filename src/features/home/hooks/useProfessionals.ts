import { useQuery } from '@tanstack/react-query';
import {
  fetchProfessionals,
  fetchProfessionalById,
  type Professional,
  type ProfessionalPaginatedResponse,
} from '@api/professionals';

// ─── Query Keys ───────────────────────────────────────────────────────────────

export const PROFESSIONALS_QUERY_KEYS = {
  all: ['professionals'] as const,
  list: (params?: object) => ['professionals', 'list', params] as const,
  featured: () => ['professionals', 'featured'] as const,
  detail: (uuid: string) => ['professionals', 'detail', uuid] as const,
};

// ─── Hook: all professionals (paginated, filterable) ─────────────────────────

export const useProfessionals = (
  params?: {
    per_page?: number;
    sort?: string;
    filter?: {
      specialization?: string;
      gender?: string;
      city?: string;
      is_featured?: boolean;
    };
  },
) => {
  return useQuery<ProfessionalPaginatedResponse>({
    queryKey: PROFESSIONALS_QUERY_KEYS.list(params),
    queryFn: () => fetchProfessionals(params),
    staleTime: 1000 * 60 * 5,
  });
};

// ─── Hook: featured / recommended professionals ───────────────────────────────

export const useFeaturedProfessionals = (limit: number = 5) => {
  return useQuery<ProfessionalPaginatedResponse>({
    queryKey: PROFESSIONALS_QUERY_KEYS.featured(),
    queryFn: () =>
      fetchProfessionals({
        per_page: limit,
        filter: { is_featured: true },
        sort: '-rating',
      }),
    staleTime: 1000 * 60 * 5,
  });
};

// ─── Hook: all professionals sorted by rating (for home list) ─────────────────

export const useTopRatedProfessionals = (limit: number = 10) => {
  return useQuery<ProfessionalPaginatedResponse>({
    queryKey: PROFESSIONALS_QUERY_KEYS.list({ per_page: limit, sort: '-rating' }),
    queryFn: () =>
      fetchProfessionals({
        per_page: limit,
        sort: '-rating',
      }),
    staleTime: 1000 * 60 * 5,
  });
};

// ─── Hook: single professional detail ────────────────────────────────────────

export const useProfessional = (uuid: string | null) => {
  return useQuery<{ data: Professional }>({
    queryKey: PROFESSIONALS_QUERY_KEYS.detail(uuid ?? ''),
    queryFn: () => fetchProfessionalById(uuid!),
    enabled: !!uuid,
    staleTime: 1000 * 60 * 10,
  });
};
