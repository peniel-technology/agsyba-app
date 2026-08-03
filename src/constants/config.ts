import Constants from 'expo-constants';

const extra = Constants.expoConfig?.extra;

function readExtraString(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

export const config = {
  apiUrl: readExtraString(extra?.apiUrl),
  reverseGeocodingUrl: readExtraString(extra?.reverseGeocodingUrl),
  reverseGeocodingUserAgent: readExtraString(extra?.reverseGeocodingUserAgent),
} as const;
