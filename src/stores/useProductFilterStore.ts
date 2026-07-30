import { create } from 'zustand';

import { createEmptyProductFilterSelections } from '@/features/products/constants/productFilterSections';
import type {
  ProductFilterSectionId,
  ProductFilterSelections,
} from '@/features/products/types/productFilters';

interface ProductFilterState {
  appliedSelections: ProductFilterSelections;
  applyDraft: () => void;
  beginEditing: () => void;
  clearDraft: () => void;
  discardDraft: () => void;
  draftSelections: ProductFilterSelections;
  toggleDraftOption: (sectionId: ProductFilterSectionId, optionId: string) => void;
}

function cloneSelections(selections: ProductFilterSelections): ProductFilterSelections {
  return {
    brand: [...selections.brand],
    categories: [...selections.categories],
    color: [...selections.color],
    deliveryTime: [...selections.deliveryTime],
    discount: [...selections.discount],
    fabrics: [...selections.fabrics],
    fashionTrends: [...selections.fashionTrends],
    occasions: [...selections.occasions],
    patterns: [...selections.patterns],
    priceRange: [...selections.priceRange],
    printOrPattern: [...selections.printOrPattern],
    quickFilters: [...selections.quickFilters],
    rating: [...selections.rating],
    size: [...selections.size],
    tshirts: [...selections.tshirts],
  };
}

const emptySelections = createEmptyProductFilterSelections();

export const useProductFilterStore = create<ProductFilterState>((set) => ({
  appliedSelections: emptySelections,
  applyDraft: () =>
    set((state) => ({
      appliedSelections: cloneSelections(state.draftSelections),
    })),
  beginEditing: () =>
    set((state) => ({
      draftSelections: cloneSelections(state.appliedSelections),
    })),
  clearDraft: () =>
    set({
      draftSelections: createEmptyProductFilterSelections(),
    }),
  discardDraft: () =>
    set((state) => ({
      draftSelections: cloneSelections(state.appliedSelections),
    })),
  draftSelections: emptySelections,
  toggleDraftOption: (sectionId, optionId) =>
    set((state) => {
      const selectedOptionIds = state.draftSelections[sectionId];
      const isSelected = selectedOptionIds.includes(optionId);
      const nextOptionIds = isSelected
        ? selectedOptionIds.filter((selectedId) => selectedId !== optionId)
        : [...selectedOptionIds, optionId];

      return {
        draftSelections: {
          ...state.draftSelections,
          [sectionId]: nextOptionIds,
        },
      };
    }),
}));
