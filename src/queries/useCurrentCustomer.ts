import { useQuery } from '@tanstack/react-query';

import { authApi } from '@/services/api/auth';

export const authQueryKeys = {
  customer: ['auth', 'customer'] as const,
};

export function useCurrentCustomer() {
  return useQuery({
    queryFn: async () => (await authApi.getCurrentCustomer()).customer,
    queryKey: authQueryKeys.customer,
    refetchOnMount: true,
    refetchOnReconnect: true,
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: 60_000,
  });
}
