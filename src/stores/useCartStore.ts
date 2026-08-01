import { create } from 'zustand';

import type { ProductPreview } from '@/types/product';

export interface CartLine {
  isSelected: boolean;
  product: ProductPreview;
  quantity: number;
}

interface CartState {
  addItem: (product: ProductPreview, quantity?: number) => void;
  itemCount: number;
  items: Readonly<Record<string, CartLine>>;
  removeItem: (productId: string) => void;
  setAllItemsSelected: (isSelected: boolean) => void;
  setItemQuantity: (productId: string, quantity: number) => void;
  toggleItemSelection: (productId: string) => void;
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
            isSelected: existingLine?.isSelected ?? true,
            product,
            quantity: (existingLine?.quantity ?? 0) + addedQuantity,
          },
        },
      };
    }),
  itemCount: 0,
  items: {},
  removeItem: (productId) =>
    set((state) => {
      const existingLine = state.items[productId];

      if (!existingLine) {
        return state;
      }

      const nextItems = { ...state.items };
      delete nextItems[productId];

      return {
        itemCount: Math.max(0, state.itemCount - existingLine.quantity),
        items: nextItems,
      };
    }),
  setAllItemsSelected: (isSelected) =>
    set((state) => {
      let didChange = false;
      const nextItems: Record<string, CartLine> = {};

      for (const [productId, line] of Object.entries(state.items)) {
        didChange = didChange || line.isSelected !== isSelected;
        nextItems[productId] = line.isSelected === isSelected ? line : { ...line, isSelected };
      }

      return didChange ? { items: nextItems } : state;
    }),
  setItemQuantity: (productId, quantity) =>
    set((state) => {
      const existingLine = state.items[productId];

      if (!existingLine) {
        return state;
      }

      const nextQuantity = Math.max(1, Math.floor(quantity));

      return {
        itemCount: Math.max(0, state.itemCount + nextQuantity - existingLine.quantity),
        items: {
          ...state.items,
          [productId]: {
            ...existingLine,
            quantity: nextQuantity,
          },
        },
      };
    }),
  toggleItemSelection: (productId) =>
    set((state) => {
      const existingLine = state.items[productId];

      if (!existingLine) {
        return state;
      }

      return {
        items: {
          ...state.items,
          [productId]: {
            ...existingLine,
            isSelected: !existingLine.isSelected,
          },
        },
      };
    }),
}));
