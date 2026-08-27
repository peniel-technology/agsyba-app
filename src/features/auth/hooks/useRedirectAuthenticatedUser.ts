import { useRouter } from 'expo-router';
import { useEffect } from 'react';

import { routes } from '@/constants/routes';
import { useCurrentCustomer } from '@/queries/useCurrentCustomer';

export function useRedirectAuthenticatedUser(): boolean {
  const router = useRouter();
  const { data: customer } = useCurrentCustomer();

  useEffect(() => {
    if (customer) {
      router.replace(routes.home);
    }
  }, [customer, router]);

  return Boolean(customer);
}
