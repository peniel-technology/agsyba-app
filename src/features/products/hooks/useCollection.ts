import { useQueryClient } from '@tanstack/react-query';
import { useCallback, useMemo, useState } from 'react';

import { usePullToRefresh } from '@/hooks/usePullToRefresh';
import type { CollectionDefinition, CollectionProduct } from '@/features/products/types/collection';

interface UseCollectionOptions {
  collection: CollectionDefinition;
}

interface UseCollectionResult {
  isRefreshing: boolean;
  refresh: () => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  visibleProducts: readonly CollectionProduct[];
}

export function filterCollectionProducts(
  products: readonly CollectionProduct[],
  selectedCategory: string,
): readonly CollectionProduct[] {
  if (selectedCategory === 'All') {
    return products;
  }

  return products.filter((product) => product.categories.includes(selectedCategory));
}

export function useCollection({ collection }: UseCollectionOptions): UseCollectionResult {
  const queryClient = useQueryClient();
  const [selectedCategory, setSelectedCategory] = useState('All');

  const refreshCollection = useCallback(async () => {
    setSelectedCategory('All');
    await queryClient.refetchQueries({ type: 'active' });
  }, [queryClient]);
  const { isRefreshing, refresh } = usePullToRefresh(refreshCollection);
  const visibleProducts = useMemo(
    () => filterCollectionProducts(collection.products, selectedCategory),
    [collection.products, selectedCategory],
  );

  return {
    isRefreshing,
    refresh,
    selectedCategory,
    setSelectedCategory,
    visibleProducts,
  };
}
