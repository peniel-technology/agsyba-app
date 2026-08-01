import { create } from 'zustand';

import type { ProductPreview } from '@/types/product';

interface WishlistState {
  addItem: (product: ProductPreview) => void;
  items: Readonly<Record<string, ProductPreview>>;
  removeItem: (productId: string) => void;
}

export const useWishlistStore = create<WishlistState>((set) => ({
  addItem: (product) =>
    set((state) => ({
      items: {
        ...state.items,
        [product.id]: product,
      },
    })),
  items: {},
  removeItem: (productId) =>
    set((state) => {
      if (!state.items[productId]) {
        return state;
      }

      const nextItems = { ...state.items };
      delete nextItems[productId];

      return { items: nextItems };
    }),
}));
