import { useCallback, useMemo } from 'react';

import { useWishlistStore } from '@/stores/useWishlistStore';
import type { ProductPreview } from '@/types/product';

interface UseWishlistResult {
  addItem: (product: ProductPreview) => void;
  itemCount: number;
  items: readonly ProductPreview[];
  productIds: ReadonlySet<string>;
  removeItem: (productId: string) => void;
  toggleItem: (product: ProductPreview) => void;
}

export function useWishlist(): UseWishlistResult {
  const wishlistItems = useWishlistStore((state) => state.items);
  const addItem = useWishlistStore((state) => state.addItem);
  const removeItem = useWishlistStore((state) => state.removeItem);
  const items = useMemo(() => Object.values(wishlistItems), [wishlistItems]);
  const productIds = useMemo(() => new Set(Object.keys(wishlistItems)), [wishlistItems]);
  const toggleItem = useCallback(
    (product: ProductPreview) => {
      if (productIds.has(product.id)) {
        removeItem(product.id);
        return;
      }

      addItem({ ...product, isFavorite: true });
    },
    [addItem, productIds, removeItem],
  );

  return {
    addItem,
    itemCount: items.length,
    items,
    productIds,
    removeItem,
    toggleItem,
  };
}
