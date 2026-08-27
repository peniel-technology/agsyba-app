import * as Linking from 'expo-linking';
import Constants, { AppOwnership } from 'expo-constants';
import * as WebBrowser from 'expo-web-browser';

import { config } from '@/constants/config';
import { authSession } from '@/services/auth/authSession';
import { apiClient, medusaApiClient } from '@/services/api/client';
import type { Customer } from '@/types/customer';

WebBrowser.maybeCompleteAuthSession();

export interface LoginInput {
  email: string;
  password: string;
}

export interface RegisterInput {
  acceptedTerms: boolean;
  confirmPassword: string;
  email: string;
  fullName: string;
  password: string;
  phone: string;
  phoneCountry: string;
}

export interface ForgotPasswordInput {
  countryCode?: string;
  email: string;
}

export interface ResetPasswordInput {
  confirmPassword: string;
  password: string;
  token: string;
}

export interface AuthResponse {
  customer: Customer;
  message: string;
}

export interface MessageResponse {
  message: string;
}

export interface CurrentCustomerResponse {
  customer: Customer | null;
}

interface MedusaCustomerResponse {
  customer: Customer;
}

const mobileGoogleRedirectUri = 'agsybaapp://oauth/google';
const expoGoGoogleRedirectPath = '/--/oauth/google';
const currentCustomerPath = `/store/customers/me?fields=${encodeURIComponent('*orders,+metadata')}`;

function isExpoGoDevelopmentEnvironment() {
  return (
    Constants.debugMode &&
    (Constants.appOwnership === AppOwnership.Expo || Constants.expoGoConfig !== null)
  );
}

function isExpoGoGoogleRedirectUri(value: string) {
  try {
    const uri = new URL(value);

    return (
      uri.protocol === 'exp:' &&
      uri.pathname === expoGoGoogleRedirectPath &&
      !uri.username &&
      !uri.password &&
      !uri.search &&
      !uri.hash
    );
  } catch {
    return false;
  }
}

function getGoogleRedirectUri() {
  const redirectUri = Linking.createURL('oauth/google');

  if (redirectUri === mobileGoogleRedirectUri) {
    return redirectUri;
  }

  if (isExpoGoDevelopmentEnvironment() && isExpoGoGoogleRedirectUri(redirectUri)) {
    return redirectUri;
  }

  throw new Error('Google sign-in requires an installed AGSYBA app build.');
}

function getGoogleCallbackToken(callbackUrl: string) {
  const url = new URL(callbackUrl);
  const status = url.searchParams.get('social_auth');

  if (status === 'cancelled') {
    throw new Error('Google sign-in was cancelled.');
  }

  if (status !== 'success') {
    throw new Error('Google sign-in could not be completed.');
  }

  const token = new URLSearchParams(url.hash.replace(/^#/, '')).get('token');

  if (!token) {
    throw new Error('Google sign-in did not return a valid session.');
  }

  return token;
}

export const authApi = {
  getCurrentCustomer: async (): Promise<CurrentCustomerResponse> => {
    const token = await authSession.getToken();

    if (token) {
      const response = await medusaApiClient<MedusaCustomerResponse>(currentCustomerPath, {
        method: 'GET',
      });

      return response;
    }

    return apiClient<CurrentCustomerResponse>('/api/auth/customer', {
      method: 'GET',
    });
  },

  login: (input: LoginInput): Promise<AuthResponse> =>
    apiClient<AuthResponse>('/api/auth/login', {
      body: JSON.stringify(input),
      method: 'POST',
    }),

  register: (input: RegisterInput): Promise<AuthResponse> =>
    apiClient<AuthResponse>('/api/auth/register', {
      body: JSON.stringify(input),
      method: 'POST',
    }),

  forgotPassword: (input: ForgotPasswordInput): Promise<MessageResponse> =>
    apiClient<MessageResponse>('/api/auth/forgot-password', {
      body: JSON.stringify(input),
      method: 'POST',
    }),

  resetPassword: (input: ResetPasswordInput): Promise<MessageResponse> =>
    apiClient<MessageResponse>('/api/auth/reset-password', {
      body: JSON.stringify(input),
      method: 'POST',
    }),

  loginWithGoogle: async (): Promise<AuthResponse> => {
    const redirectUri = getGoogleRedirectUri();
    const startUrl = `${config.apiUrl.replace(/\/+$/, '')}/api/auth/social/google/start?next=${encodeURIComponent(redirectUri)}`;
    const startResponse = await WebBrowser.openAuthSessionAsync(startUrl, redirectUri);

    if (startResponse.type !== 'success') {
      throw new Error('Google sign-in was cancelled.');
    }

    const token = getGoogleCallbackToken(startResponse.url);

    try {
      await authSession.setToken(token);
      const response = await medusaApiClient<MedusaCustomerResponse>(currentCustomerPath, {
        method: 'GET',
      });

      return {
        customer: response.customer,
        message: 'Welcome to AGSYBA.',
      };
    } catch (error) {
      await authSession.clearToken();
      throw error;
    }
  },

  logout: async (): Promise<MessageResponse> => {
    const token = await authSession.getToken();

    try {
      if (token) {
        await medusaApiClient<{ success: boolean }>('/auth/session', {
          method: 'DELETE',
        });
      } else {
        await apiClient<MessageResponse>('/api/auth/logout', {
          body: JSON.stringify({}),
          method: 'POST',
        });
      }
    } finally {
      await authSession.clearToken();
    }

    return { message: 'You have been logged out.' };
  },
};
