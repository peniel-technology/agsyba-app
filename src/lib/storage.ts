import { createMMKV } from 'react-native-mmkv';

export const storage = createMMKV({ id: 'agsyba-app-storage' });

export const storageKeys = {
  theme: 'theme',
  onboardingComplete: 'onboardingComplete',
} as const;
