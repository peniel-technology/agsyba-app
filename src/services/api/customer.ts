import type { ImagePickerAsset } from 'expo-image-picker';

import { authSession } from '@/services/auth/authSession';
import { apiClient } from '@/services/api/client';
import type { Customer } from '@/types/customer';

export interface UpdateCustomerInput {
  first_name: string;
  last_name: string;
  metadata: Record<string, unknown>;
  phone: string | null;
}

interface UpdateCustomerResponse {
  customer: Customer;
}

export interface AvatarUploadResponse {
  url: string;
}

function getAssetExtension(asset: ImagePickerAsset): string {
  const fileName = asset.fileName?.trim();
  const fileExtension = fileName?.split('.').pop()?.toLowerCase();

  if (fileExtension && /^[a-z0-9]+$/.test(fileExtension)) {
    return fileExtension;
  }

  if (asset.mimeType === 'image/png') {
    return 'png';
  }

  if (asset.mimeType === 'image/gif') {
    return 'gif';
  }

  return 'jpg';
}

async function getSessionHeaders(): Promise<Record<string, string>> {
  const token = await authSession.getToken();

  return token ? { Authorization: `Bearer ${token}` } : {};
}

export const customerApi = {
  updateProfile: async (input: UpdateCustomerInput): Promise<UpdateCustomerResponse> =>
    apiClient<UpdateCustomerResponse>('/api/auth/customer/update', {
      body: JSON.stringify(input),
      headers: await getSessionHeaders(),
      method: 'POST',
    }),

  uploadAvatar: async (asset: ImagePickerAsset): Promise<AvatarUploadResponse> => {
    const formData = new FormData();
    const extension = getAssetExtension(asset);
    const fileName = asset.fileName?.trim() || `profile-photo.${extension}`;

    formData.append('file', {
      name: fileName,
      type: asset.mimeType || 'image/jpeg',
      uri: asset.uri,
    } as unknown as Blob);

    return apiClient<AvatarUploadResponse>('/api/account/avatar', {
      body: formData,
      headers: await getSessionHeaders(),
      method: 'POST',
    });
  },
};
