import { apiClient } from '@/services/api/client';

export interface HealthStatus {
  status: 'ok';
}

export const healthApi = {
  getStatus: (): Promise<HealthStatus> => apiClient<HealthStatus>('/health'),
};
