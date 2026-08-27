import { config } from '@/constants/config';
import { authSession } from '@/services/auth/authSession';
import type { ApiErrorPayload } from '@/types/api';

async function requestJson<TResponse>(
  baseUrl: string,
  path: string,
  options: RequestInit = {},
  credentials: RequestCredentials = 'include',
): Promise<TResponse> {
  if (!baseUrl) {
    throw new Error('The AGSYBA API URL is not configured.');
  }

  const headers = new Headers(options.headers);
  headers.set('Accept', 'application/json');
  const isMultipartRequest = typeof FormData !== 'undefined' && options.body instanceof FormData;
  if (!headers.has('Content-Type') && !isMultipartRequest) {
    headers.set('Content-Type', 'application/json');
  }

  const response = await fetch(`${baseUrl.replace(/\/+$/, '')}${path}`, {
    ...options,
    credentials,
    headers,
  });

  if (!response.ok) {
    let message = 'Something went wrong. Please try again.';
    try {
      const payload = (await response.json()) as Partial<ApiErrorPayload>;
      if (typeof payload.error === 'string') {
        message = payload.error;
      } else if (typeof payload.message === 'string') {
        message = payload.message;
      }
    } catch {
      // The server returned no JSON error payload.
    }
    throw new Error(message);
  }

  if (response.status === 204) {
    return undefined as TResponse;
  }

  return (await response.json()) as TResponse;
}

export function apiClient<TResponse>(path: string, options: RequestInit = {}) {
  return requestJson<TResponse>(config.apiUrl, path, options);
}

export async function medusaApiClient<TResponse>(
  path: string,
  options: RequestInit = {},
): Promise<TResponse> {
  const headers = new Headers(options.headers);
  const token = await authSession.getToken();

  if (token && !headers.has('Authorization')) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  return requestJson<TResponse>(config.medusaApiUrl, path, { ...options, headers }, 'omit');
}
