import { create } from 'zustand';

import type { ProductPreview } from '@/types/product';

interface CartLine {
  product: ProductPreview;
  quantity: number;
}

interface CartState {
  addItem: (product: ProductPreview, quantity?: number) => void;
  itemCount: number;
  items: Readonly<Record<string, CartLine>>;
}

function normalizeQuantity(quantity: number): number {
  return Math.max(1, Math.floor(quantity));
}

export const useCartStore = create<CartState>((set) => ({
  addItem: (product, quantity = 1) =>
    set((state) => {
      const addedQuantity = normalizeQuantity(quantity);
      const existingLine = state.items[product.id];

      return {
        itemCount: state.itemCount + addedQuantity,
        items: {
          ...state.items,
          [product.id]: {
            product,
            quantity: (existingLine?.quantity ?? 0) + addedQuantity,
          },
        },
      };
    }),
  itemCount: 0,
  items: {},
}));
