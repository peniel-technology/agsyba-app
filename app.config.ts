import type { ExpoConfig } from 'expo/config';

const config: ExpoConfig = {
  name: 'agsyba-app',
  slug: 'agsyba-app',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/images/icon.png',
  scheme: 'agsybaapp',
  userInterfaceStyle: 'automatic',
  ios: { icon: './assets/expo.icon' },
  android: {
    adaptiveIcon: {
      backgroundColor: '#E6F4FE',
      foregroundImage: './assets/images/android-icon-foreground.png',
      backgroundImage: './assets/images/android-icon-background.png',
      monochromeImage: './assets/images/android-icon-monochrome.png',
    },
    predictiveBackGestureEnabled: false,
  },
  web: { output: 'static', favicon: './assets/images/favicon.png' },
  plugins: [
    'expo-router',
    [
      'expo-splash-screen',
      { backgroundColor: '#208AEF', image: './assets/images/splash-icon.png', imageWidth: 76 },
    ],
    'expo-secure-store',
    ['expo-image-picker', { photosPermission: 'Allow AGSYBA to choose a profile photo.' }],
    [
      'expo-location',
      {
        locationWhenInUsePermission:
          'Allow AGSYBA to use your location to fill in your delivery address.',
      },
    ],
  ],
  experiments: { typedRoutes: true, reactCompiler: true },
  extra: {
    apiUrl: process.env.EXPO_PUBLIC_API_URL ?? 'https://agsyba.com',
    medusaApiUrl: process.env.EXPO_PUBLIC_MEDUSA_API_URL ?? 'https://admin.agsyba.com',
    defaultCountryCode: process.env.EXPO_PUBLIC_DEFAULT_REGION ?? 'ae',
    reverseGeocodingUrl: process.env.EXPO_PUBLIC_REVERSE_GEOCODING_URL ?? '',
    reverseGeocodingUserAgent: process.env.EXPO_PUBLIC_GEOCODING_USER_AGENT ?? '',
  },
};

export default config;
