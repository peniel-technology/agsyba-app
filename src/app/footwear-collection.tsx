import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { useCallback, useMemo, useState } from 'react';
import { Alert, RefreshControl, ScrollView, View } from 'react-native';

import { CollectionPageHeader, Screen } from '@/components/layouts';
import { CollectionRefreshLoader } from '@/components/loaders/CollectionRefreshLoader';
import { ProductResultsLoader } from '@/components/loaders/ProductResultsLoader';
import { ProductSearchModal } from '@/components/modals/ProductSearchModal';
import { ProductGrid } from '@/components/product/ProductGrid';
import { routes } from '@/constants/routes';
import { CollectionFilters } from '@/features/products/components/CollectionFilters';
import { FootwearCollectionHero } from '@/features/products/components/FootwearCollectionHero';
import { FootwearTrending } from '@/features/products/components/FootwearTrending';
import {
  footwearCollectionCategories,
  type FootwearCollectionCategory,
} from '@/features/products/constants/footwearCollectionFilters';
import {
  footwearCollectionProducts,
  footwearCollectionTotalCount,
} from '@/features/products/constants/footwearCollectionProducts';
import { footwearTrendingCategories } from '@/features/products/constants/footwearTrendingCategories';
import { usePullToRefresh } from '@/hooks/usePullToRefresh';
import { useCartStore } from '@/stores/useCartStore';
import { colors } from '@/theme';

export default function FootwearCollectionScreen() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const addCartItem = useCartStore((state) => state.addItem);
  const cartItemCount = useCartStore((state) => state.itemCount);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<FootwearCollectionCategory>('All');
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
    Alert.alert('Shopping Bag', `${cartItemCount} items in your bag.`);
  }, [cartItemCount]);
  const refreshCollection = useCallback(async () => {
    setSelectedCategory('All');
    await queryClient.refetchQueries({ type: 'active' });
  }, [queryClient]);
  const { isRefreshing, refresh } = usePullToRefresh(refreshCollection);
  const visibleProducts = useMemo(
    () =>
      selectedCategory === 'All'
        ? footwearCollectionProducts
        : footwearCollectionProducts.filter((product) =>
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
        title="Footwear"
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
          <FootwearCollectionHero />
          <View className="mt-6">
            <CollectionFilters
              categories={footwearCollectionCategories}
              onCategoryChange={setSelectedCategory}
              selectedCategory={selectedCategory}
            />
          </View>
          <View className="mt-1">
            <ProductGrid
              onAddToCartPress={addCartItem}
              onProductPress={openProductDetail}
              products={visibleProducts}
              showHeader={false}
              title="Footwear Products"
            />
          </View>
          <View className="mt-8 bg-surface pt-2">
            <ProductResultsLoader
              displayedCount={visibleProducts.length}
              totalCount={footwearCollectionTotalCount}
            />
          </View>
          <View className="bg-surface pb-8 pt-8">
            <FootwearTrending categories={footwearTrendingCategories} />
          </View>
        </ScrollView>
        <CollectionRefreshLoader isVisible={isRefreshing} label="Refreshing footwear products" />
      </View>
      <ProductSearchModal
        isVisible={isSearchVisible}
        onAddToCartPress={addCartItem}
        onClose={closeSearch}
        onProductPress={openProductDetail}
        products={footwearCollectionProducts}
      />
    </Screen>
  );
}
