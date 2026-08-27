import { config } from '@/constants/config';
import type { Customer } from '@/types/customer';

const avatarMetadataKeys = [
  'uploaded_avatar_url',
  'avatar_url',
  'avatar',
  'profile_image_url',
  'profileImage',
  'social_profile_image',
] as const;

function getMetadata(customer: Customer): Record<string, unknown> {
  const metadata = customer.metadata;

  return metadata && typeof metadata === 'object' && !Array.isArray(metadata) ? metadata : {};
}

function getAbsoluteAvatarUrl(value: string): string {
  if (/^(https?:|data:)/i.test(value)) {
    return value;
  }

  if (value.startsWith('//')) {
    return `https:${value}`;
  }

  const baseUrl = config.apiUrl.replace(/\/+$/, '');
  const relativePath = value.replace(/^\/+/, '');

  return baseUrl ? `${baseUrl}/${relativePath}` : value;
}

export function getCustomerAvatarUrl(customer: Customer): string | null {
  const metadata = getMetadata(customer);

  for (const key of avatarMetadataKeys) {
    const value = metadata[key];

    if (typeof value === 'string' && value.trim()) {
      return getAbsoluteAvatarUrl(value.trim());
    }
  }

  return null;
}
