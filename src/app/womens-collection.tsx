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
import { WomensCollectionHero } from '@/features/products/components/WomensCollectionHero';
import { WomensTrending } from '@/features/products/components/WomensTrending';
import {
  womensCollectionCategories,
  type WomensCollectionCategory,
} from '@/features/products/constants/womensCollectionFilters';
import {
  womensCollectionProducts,
  womensCollectionTotalCount,
} from '@/features/products/constants/womensCollectionProducts';
import { womensTrendingCategories } from '@/features/products/constants/womensTrendingCategories';
import { usePullToRefresh } from '@/hooks/usePullToRefresh';
import { useCartStore } from '@/stores/useCartStore';
import { useProductFilterStore } from '@/stores/useProductFilterStore';
import { colors } from '@/theme';

export default function WomensCollectionScreen() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const addCartItem = useCartStore((state) => state.addItem);
  const cartItemCount = useCartStore((state) => state.itemCount);
  const beginEditingFilters = useProductFilterStore((state) => state.beginEditing);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<WomensCollectionCategory>('All');
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
      params: { returnTo: routes.womensCollection },
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
        ? womensCollectionProducts
        : womensCollectionProducts.filter((product) =>
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
        title="Women's Collection"
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
          <WomensCollectionHero />
          <View className="mt-6">
            <CollectionFilters
              categories={womensCollectionCategories}
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
              title="Women's Products"
            />
          </View>
          <View className="mt-8 bg-surface pt-2">
            <ProductResultsLoader
              displayedCount={visibleProducts.length}
              totalCount={womensCollectionTotalCount}
            />
          </View>
          <View className="bg-surface pb-8 pt-8">
            <WomensTrending categories={womensTrendingCategories} />
          </View>
        </ScrollView>
        <CollectionRefreshLoader isVisible={isRefreshing} label="Refreshing women's products" />
      </View>
      <ProductSearchModal
        isVisible={isSearchVisible}
        onAddToCartPress={addCartItem}
        onClose={closeSearch}
        onProductPress={openProductDetail}
        products={womensCollectionProducts}
      />
    </Screen>
  );
}
