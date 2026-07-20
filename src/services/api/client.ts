import { config } from '@/constants/config';
import type { ApiErrorPayload } from '@/types/api';

export async function apiClient<TResponse>(
  path: string,
  options: RequestInit = {},
): Promise<TResponse> {
  const response = await fetch(`${config.apiUrl}${path}`, {
    ...options,
    headers: { Accept: 'application/json', 'Content-Type': 'application/json', ...options.headers },
  });

  if (!response.ok) {
    let message = 'Something went wrong. Please try again.';
    try {
      const payload = (await response.json()) as Partial<ApiErrorPayload>;
      if (typeof payload.message === 'string') message = payload.message;
    } catch {
      // The server returned no JSON error payload.
    }
    throw new Error(message);
  }

  return (await response.json()) as TResponse;
}
