import { useMutation, useQueryClient } from '@tanstack/react-query';

import { authQueryKeys } from '@/queries/useCurrentCustomer';
import { customerApi } from '@/services/api/customer';

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: customerApi.updateProfile,
    onSuccess: ({ customer }) => {
      queryClient.setQueryData(authQueryKeys.customer, customer);
    },
  });
}

export function useUploadProfileAvatar() {
  return useMutation({ mutationFn: customerApi.uploadAvatar });
}
