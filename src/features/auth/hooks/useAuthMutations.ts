import { useMutation, useQueryClient } from '@tanstack/react-query';

import { authApi } from '@/services/api/auth';
import { authQueryKeys } from '@/queries/useCurrentCustomer';

export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authApi.login,
    onSuccess: ({ customer }) => {
      queryClient.setQueryData(authQueryKeys.customer, customer);
    },
  });
}

export function useRegister() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authApi.register,
    onSuccess: ({ customer }) => {
      queryClient.setQueryData(authQueryKeys.customer, customer);
    },
  });
}

export function useGoogleLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authApi.loginWithGoogle,
    onSuccess: ({ customer }) => {
      queryClient.setQueryData(authQueryKeys.customer, customer);
    },
  });
}

export function useForgotPassword() {
  return useMutation({ mutationFn: authApi.forgotPassword });
}

export function useResetPassword() {
  return useMutation({ mutationFn: authApi.resetPassword });
}
