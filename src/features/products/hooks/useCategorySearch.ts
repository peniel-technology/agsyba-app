import { useMemo, useState } from 'react';

import type { BrowseCategory } from '@/features/products/types/browseCategory';

export function useCategorySearch(categories: readonly BrowseCategory[]) {
  const [query, setQuery] = useState('');
  const filteredCategories = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase();

    if (!normalizedQuery) {
      return categories;
    }

    return categories.filter((category) =>
      category.name.toLocaleLowerCase().includes(normalizedQuery),
    );
  }, [categories, query]);

  return { filteredCategories, query, setQuery };
}
