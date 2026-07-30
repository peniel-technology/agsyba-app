import { createEmptyProductFilterSelections } from '@/features/products/constants/productFilterSections';
import { useProductFilterStore } from '@/stores/useProductFilterStore';

describe('useProductFilterStore', () => {
  beforeEach(() => {
    useProductFilterStore.setState({
      appliedSelections: createEmptyProductFilterSelections(),
      draftSelections: createEmptyProductFilterSelections(),
    });
  });

  it('applies selected draft options', () => {
    useProductFilterStore.getState().toggleDraftOption('quickFilters', 'top-rated');
    useProductFilterStore.getState().applyDraft();

    expect(useProductFilterStore.getState().appliedSelections.quickFilters).toEqual(['top-rated']);
  });

  it('discards draft changes without changing applied filters', () => {
    useProductFilterStore.getState().toggleDraftOption('brand', 'zara');
    useProductFilterStore.getState().applyDraft();
    useProductFilterStore.getState().toggleDraftOption('brand', 'cos');
    useProductFilterStore.getState().discardDraft();

    expect(useProductFilterStore.getState().draftSelections.brand).toEqual(['zara']);
    expect(useProductFilterStore.getState().appliedSelections.brand).toEqual(['zara']);
  });

  it('clears only the current draft until filters are applied', () => {
    useProductFilterStore.getState().toggleDraftOption('size', 'm');
    useProductFilterStore.getState().applyDraft();
    useProductFilterStore.getState().clearDraft();

    expect(useProductFilterStore.getState().draftSelections.size).toEqual([]);
    expect(useProductFilterStore.getState().appliedSelections.size).toEqual(['m']);
  });
});
