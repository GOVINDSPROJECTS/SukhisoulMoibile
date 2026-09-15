import { useQuery } from '@tanstack/react-query';
import {
  fetchTherapistDashboardSummary,
  type TherapistDashboardSummary,
} from '@/api/therapistDashboard';

export const THERAPIST_DASHBOARD_QUERY_KEYS = {
  summary: ['therapist-dashboard', 'summary'] as const,
};

export const useTherapistDashboard = () => {
  return useQuery<TherapistDashboardSummary>({
    queryKey: THERAPIST_DASHBOARD_QUERY_KEYS.summary,
    queryFn: fetchTherapistDashboardSummary,
    staleTime: 0,
    refetchOnMount: 'always',
    refetchOnWindowFocus: true,
    refetchInterval: 3000,
  });
};
