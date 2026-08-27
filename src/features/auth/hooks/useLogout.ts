import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { useCallback } from 'react';

import type { ThemedModalOptions } from '@/components/modals/ThemedModal';
import { routes } from '@/constants/routes';
import { getErrorMessage } from '@/features/auth/utils/getErrorMessage';
import { authQueryKeys } from '@/queries/useCurrentCustomer';
import { authApi } from '@/services/api/auth';
import { useToastStore } from '@/stores/useToastStore';

export function useLogout(openModal: (options: ThemedModalOptions) => void): () => void {
  const router = useRouter();
  const queryClient = useQueryClient();
  const showToast = useToastStore((state) => state.showToast);
  const { mutateAsync: logout } = useMutation({ mutationFn: authApi.logout });

  const executeLogout = useCallback(() => {
    void logout()
      .then((response) => {
        showToast({ message: response.message, title: 'Logged out', tone: 'success' });
      })
      .catch((error: unknown) => {
        showToast({
          message: getErrorMessage(
            error,
            'You were logged out on this device, but the server could not be reached.',
          ),
          title: 'Logout incomplete',
          tone: 'error',
        });
      })
      .finally(() => {
        queryClient.removeQueries({ queryKey: authQueryKeys.customer });
        router.replace(routes.login);
      });
  }, [logout, queryClient, router, showToast]);

  return useCallback(() => {
    openModal({
      actions: [
        { label: 'Cancel', variant: 'secondary' },
        { label: 'Log Out', onPress: executeLogout, variant: 'destructive' },
      ],
      message: 'You can sign back in anytime to continue shopping.',
      title: 'Log out of AGSYBA?',
      tone: 'warning',
    });
  }, [executeLogout, openModal]);
}
