import { secureStorage } from '@/lib/secureStorage';
import { secureStorageKeys } from '@/constants/storage';

export const authSession = {
  clearToken: (): Promise<void> => secureStorage.remove(secureStorageKeys.customerAuthToken),
  getToken: (): Promise<string | null> => secureStorage.get(secureStorageKeys.customerAuthToken),
  setToken: (token: string): Promise<void> =>
    secureStorage.set(secureStorageKeys.customerAuthToken, token),
};
