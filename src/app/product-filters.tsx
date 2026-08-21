import { useLocalSearchParams, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';

import { Screen } from '@/components/layouts';
import { routes } from '@/constants/routes';
import { ProductFilterFooter } from '@/features/products/components/filters/ProductFilterFooter';
import { ProductFilterHeader } from '@/features/products/components/filters/ProductFilterHeader';
import { ProductFilterPanel } from '@/features/products/components/filters/ProductFilterPanel';
import { productFilterSections } from '@/features/products/constants/productFilterSections';
import type { ProductFilterSectionId } from '@/features/products/types/productFilters';
import { useProductFilterStore } from '@/stores/useProductFilterStore';

const collectionReturnRoutes = [
  routes.footwearCollection,
  routes.kidsCollection,
  routes.mensCollection,
  routes.shop,
  routes.womensCollection,
] as const;

type CollectionReturnRoute = (typeof collectionReturnRoutes)[number];

function isCollectionReturnRoute(value: string): value is CollectionReturnRoute {
  return collectionReturnRoutes.some((route) => route === value);
}

export default function ProductFiltersScreen() {
  const router = useRouter();
  const { returnTo } = useLocalSearchParams<{ returnTo?: string }>();
  const applyDraft = useProductFilterStore((state) => state.applyDraft);
  const clearDraft = useProductFilterStore((state) => state.clearDraft);
  const discardDraft = useProductFilterStore((state) => state.discardDraft);
  const draftSelections = useProductFilterStore((state) => state.draftSelections);
  const toggleDraftOption = useProductFilterStore((state) => state.toggleDraftOption);
  const [activeSectionId, setActiveSectionId] = useState<ProductFilterSectionId>('quickFilters');

  const leaveFilterPage = useCallback(() => {
    const destination =
      typeof returnTo === 'string' && isCollectionReturnRoute(returnTo)
        ? returnTo
        : routes.category;
    router.replace(destination);
  }, [returnTo, router]);
  const handleApplyPress = useCallback(() => {
    applyDraft();
    leaveFilterPage();
  }, [applyDraft, leaveFilterPage]);
  const handleClosePress = useCallback(() => {
    discardDraft();
    leaveFilterPage();
  }, [discardDraft, leaveFilterPage]);

  return (
    <Screen includeBottomInset padded={false}>
      <ProductFilterHeader onClearPress={clearDraft} />
      <ProductFilterPanel
        activeSectionId={activeSectionId}
        onOptionPress={toggleDraftOption}
        onSectionPress={setActiveSectionId}
        sections={productFilterSections}
        selections={draftSelections}
      />
      <ProductFilterFooter onApplyPress={handleApplyPress} onClosePress={handleClosePress} />
    </Screen>
  );
}
