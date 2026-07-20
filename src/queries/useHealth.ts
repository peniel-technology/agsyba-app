import { useQuery } from '@tanstack/react-query';

import { healthApi } from '@/services/api/health';

export const healthQueryKeys = { status: ['health', 'status'] as const };

export function useHealth() {
  return useQuery({
    queryKey: healthQueryKeys.status,
    queryFn: healthApi.getStatus,
    staleTime: 60_000,
    gcTime: 5 * 60_000,
    retry: 1,
  });
}
