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
import { MensCollectionFilters } from '@/features/products/components/MensCollectionFilters';
import { MensCollectionHero } from '@/features/products/components/MensCollectionHero';
import { MensTrending } from '@/features/products/components/MensTrending';
import type { MensCollectionCategory } from '@/features/products/constants/mensCollectionFilters';
import {
  mensCollectionProducts,
  mensCollectionTotalCount,
} from '@/features/products/constants/mensCollectionProducts';
import { mensTrendingCategories } from '@/features/products/constants/mensTrendingCategories';
import { usePullToRefresh } from '@/hooks/usePullToRefresh';
import { useCartStore } from '@/stores/useCartStore';
import { useProductFilterStore } from '@/stores/useProductFilterStore';
import { colors } from '@/theme';

export default function MensCollectionScreen() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const addCartItem = useCartStore((state) => state.addItem);
  const cartItemCount = useCartStore((state) => state.itemCount);
  const beginEditingFilters = useProductFilterStore((state) => state.beginEditing);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<MensCollectionCategory>('All');
  const closeSearch = useCallback(() => {
    setIsSearchVisible(false);
  }, []);
  const handleBackPress = useCallback(() => {
    router.replace(routes.category);
  }, [router]);
  const openSearch = useCallback(() => {
    setIsSearchVisible(true);
  }, []);
  const openProductDetail = useCallback(() => {
    closeSearch();
    router.push(routes.productDetail);
  }, [closeSearch, router]);
  const openCart = useCallback(() => {
    router.push(routes.shoppingBag);
  }, [router]);
  const openFilters = useCallback(() => {
    beginEditingFilters();
    router.push({
      params: { returnTo: routes.mensCollection },
      pathname: routes.productFilters,
    });
  }, [beginEditingFilters, router]);
  const refreshCollection = useCallback(async () => {
    setSelectedCategory('All');
    await queryClient.refetchQueries({ type: 'active' });
  }, [queryClient]);
  const { isRefreshing, refresh } = usePullToRefresh(refreshCollection);
  const visibleProducts = useMemo(
    () =>
      selectedCategory === 'All'
        ? mensCollectionProducts
        : mensCollectionProducts.filter((product) =>
            product.categories.some((category) => category === selectedCategory),
          ),
    [selectedCategory],
  );

  return (
    <Screen includeBottomInset={false} padded={false}>
      <CollectionPageHeader
        cartItemCount={cartItemCount}
        onBackPress={handleBackPress}
        onCartPress={openCart}
        onSearchPress={openSearch}
        title="Men's Collection"
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
          <MensCollectionHero />
          <View className="mt-6">
            <MensCollectionFilters
              onCategoryChange={setSelectedCategory}
              onFilterPress={openFilters}
              selectedCategory={selectedCategory}
            />
          </View>
          <View className="mt-1">
            <ProductGrid
              onAddToCartPress={addCartItem}
              onProductPress={openProductDetail}
              products={visibleProducts}
              showHeader={false}
              title="Men's Products"
            />
          </View>
          <View className="mt-8 bg-surface pt-2">
            <ProductResultsLoader
              displayedCount={visibleProducts.length}
              totalCount={mensCollectionTotalCount}
            />
          </View>
          <View className="bg-surface pb-8 pt-8">
            <MensTrending categories={mensTrendingCategories} />
          </View>
        </ScrollView>
        <CollectionRefreshLoader isVisible={isRefreshing} label="Refreshing men's products" />
      </View>
      <ProductSearchModal
        isVisible={isSearchVisible}
        onAddToCartPress={addCartItem}
        onClose={closeSearch}
        onProductPress={openProductDetail}
        products={mensCollectionProducts}
      />
    </Screen>
  );
}
