import { useRouter } from 'expo-router';
import { useCallback, useMemo } from 'react';

import { routes } from '@/constants/routes';
import { useCartStore } from '@/stores/useCartStore';

interface ProductBagNavigation {
  bagProductIds: ReadonlySet<string>;
  openBag: () => void;
}

export function useProductBagNavigation(): ProductBagNavigation {
  const router = useRouter();
  const cartItems = useCartStore((state) => state.items);
  const bagProductIds = useMemo(() => new Set(Object.keys(cartItems)), [cartItems]);
  const openBag = useCallback(() => {
    router.push(routes.shoppingBag);
  }, [router]);

  return { bagProductIds, openBag };
}
