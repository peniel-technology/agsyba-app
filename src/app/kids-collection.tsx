import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { useCallback, useMemo, useState } from 'react';
import { RefreshControl, ScrollView, View } from 'react-native';

import { CollectionPageHeader, Screen } from '@/components/layouts';
import { CollectionRefreshLoader } from '@/components/loaders/CollectionRefreshLoader';
import { ProductResultsLoader } from '@/components/loaders/ProductResultsLoader';
import { ProductSearchModal } from '@/components/modals/ProductSearchModal';
import { ProductGrid } from '@/components/product/ProductGrid';
import { routes } from '@/constants/routes';
import { CollectionFilters } from '@/features/products/components/CollectionFilters';
import { KidsCollectionHero } from '@/features/products/components/KidsCollectionHero';
import { KidsTrending } from '@/features/products/components/KidsTrending';
import {
  kidsCollectionCategories,
  type KidsCollectionCategory,
} from '@/features/products/constants/kidsCollectionFilters';
import {
  kidsCollectionProducts,
  kidsCollectionTotalCount,
} from '@/features/products/constants/kidsCollectionProducts';
import { kidsTrendingCategories } from '@/features/products/constants/kidsTrendingCategories';
import { usePullToRefresh } from '@/hooks/usePullToRefresh';
import { colors } from '@/theme';

export default function KidsCollectionScreen() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<KidsCollectionCategory>('All');
  const closeSearch = useCallback(() => {
    setIsSearchVisible(false);
  }, []);
  const handleBackPress = useCallback(() => {
    router.replace(routes.category);
  }, [router]);
  const openSearch = useCallback(() => {
    setIsSearchVisible(true);
  }, []);
  const refreshCollection = useCallback(async () => {
    setSelectedCategory('All');
    await queryClient.refetchQueries({ type: 'active' });
  }, [queryClient]);
  const { isRefreshing, refresh } = usePullToRefresh(refreshCollection);
  const visibleProducts = useMemo(
    () =>
      selectedCategory === 'All'
        ? kidsCollectionProducts
        : kidsCollectionProducts.filter((product) =>
            product.categories.some((category) => category === selectedCategory),
          ),
    [selectedCategory],
  );

  return (
    <Screen includeBottomInset={false} padded={false}>
      <CollectionPageHeader
        onBackPress={handleBackPress}
        onSearchPress={openSearch}
        title="Kids' Collection"
      />
      <View className="flex-1">
        <ScrollView
          alwaysBounceVertical
          className="flex-1"
          contentContainerClassName="pt-4"
          refreshControl={
            <RefreshControl
              colors={[colors.brand]}
              onRefresh={refresh}
              progressBackgroundColor={colors.surface}
              refreshing={isRefreshing}
              tintColor={colors.brand}
            />
          }
        >
          <KidsCollectionHero />
          <View className="mt-6">
            <CollectionFilters
              categories={kidsCollectionCategories}
              onCategoryChange={setSelectedCategory}
              selectedCategory={selectedCategory}
            />
          </View>
          <View className="mt-1">
            <ProductGrid products={visibleProducts} showHeader={false} title="Kids' Products" />
          </View>
          <View className="mt-8 bg-surface pt-2">
            <ProductResultsLoader
              displayedCount={visibleProducts.length}
              totalCount={kidsCollectionTotalCount}
            />
          </View>
          <View className="bg-surface pb-8 pt-8">
            <KidsTrending categories={kidsTrendingCategories} />
          </View>
        </ScrollView>
        <CollectionRefreshLoader isVisible={isRefreshing} label="Refreshing kids' products" />
      </View>
      <ProductSearchModal
        isVisible={isSearchVisible}
        onClose={closeSearch}
        products={kidsCollectionProducts}
      />
    </Screen>
  );
}
