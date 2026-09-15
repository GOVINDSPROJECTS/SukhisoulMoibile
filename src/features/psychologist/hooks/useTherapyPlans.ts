import { useQuery } from '@tanstack/react-query';
import {
  fetchProfessionalTherapyPlans,
  type TherapyPlanItem,
} from '@api/professionals';

export const THERAPY_PLANS_QUERY_KEYS = {
  byProfessional: (doctorId: string, doctorName?: string) =>
    ['therapy-plans', doctorId, doctorName] as const,
};

export const useTherapyPlans = (
  doctorId: string = '365b31ac-0448-4928-8492-0b5e8949c831',
  doctorName?: string,
) => {
  return useQuery<TherapyPlanItem[]>({
    queryKey: THERAPY_PLANS_QUERY_KEYS.byProfessional(doctorId, doctorName),
    queryFn: () => fetchProfessionalTherapyPlans(doctorId, doctorName),
    staleTime: 0,
    refetchOnMount: 'always',
    refetchOnWindowFocus: true,
    refetchInterval: 3000,
  });
};
