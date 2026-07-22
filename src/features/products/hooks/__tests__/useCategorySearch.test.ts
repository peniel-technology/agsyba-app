import { act, renderHook } from '@testing-library/react-native';

import { useCategorySearch } from '@/features/products/hooks/useCategorySearch';
import type { BrowseCategory } from '@/features/products/types/browseCategory';

const categories: readonly BrowseCategory[] = [
  {
    id: 'men',
    image: 1,
    imageAccessibilityLabel: 'Menswear',
    name: "Men's Dressing",
  },
  {
    id: 'footwear',
    image: 2,
    imageAccessibilityLabel: 'Footwear',
    name: 'Footwear Collection',
  },
];

describe('useCategorySearch', () => {
  it('filters categories without case sensitivity', () => {
    const { result } = renderHook(() => useCategorySearch(categories));

    act(() => result.current.setQuery('FOOT'));

    expect(result.current.filteredCategories).toEqual([categories[1]]);
  });
});
