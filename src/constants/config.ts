import Constants from 'expo-constants';

const extra = Constants.expoConfig?.extra;

export const config = {
  apiUrl: typeof extra?.apiUrl === 'string' ? extra.apiUrl : 'https://api.example.com',
} as const;
