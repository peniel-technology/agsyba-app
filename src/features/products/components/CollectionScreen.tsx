import { useRouter } from 'expo-router';
import { useCallback } from 'react';
import { RefreshControl, ScrollView, View } from 'react-native';

import { CollectionPageHeader, Screen } from '@/components/layouts';
import { CollectionRefreshLoader } from '@/components/loaders/CollectionRefreshLoader';
import { ProductResultsLoader } from '@/components/loaders/ProductResultsLoader';
import { ProductGrid } from '@/components/product/ProductGrid';
import { routes } from '@/constants/routes';
import { CollectionFilters } from '@/features/products/components/CollectionFilters';
import type { CollectionDefinition } from '@/features/products/types/collection';
import { useCollection } from '@/features/products/hooks/useCollection';
import { useProductBagNavigation } from '@/hooks/useProductBagNavigation';
import { useCartStore } from '@/stores/useCartStore';
import { useProductFilterStore } from '@/stores/useProductFilterStore';
import { useWishlist } from '@/features/wishlist/hooks/useWishlist';
import { colors } from '@/theme';

interface CollectionScreenProps {
  collection: CollectionDefinition;
}

export function CollectionScreen({ collection }: CollectionScreenProps) {
  const router = useRouter();
  const addCartItem = useCartStore((state) => state.addItem);
  const cartItemCount = useCartStore((state) => state.itemCount);
  const beginEditingFilters = useProductFilterStore((state) => state.beginEditing);
  const { bagProductIds, openBag } = useProductBagNavigation();
  const { productIds: wishlistProductIds, toggleItem: toggleWishlistItem } = useWishlist();
  const { isRefreshing, refresh, selectedCategory, setSelectedCategory, visibleProducts } =
    useCollection({ collection });

  const handleBackPress = useCallback(() => {
    router.replace(routes.category);
  }, [router]);
  const openSearch = useCallback(() => {
    router.push({ params: { returnTo: collection.route }, pathname: routes.search });
  }, [collection.route, router]);
  const openProductDetail = useCallback(() => {
    router.push(routes.productDetail);
  }, [router]);
  const openFilters = useCallback(() => {
    beginEditingFilters();
    router.push({
      params: { returnTo: collection.route },
      pathname: routes.productFilters,
    });
  }, [beginEditingFilters, collection.route, router]);

  const CollectionHero = collection.hero;
  const CollectionTrending = collection.trending;

  return (
    <Screen includeBottomInset={false} padded={false}>
      <CollectionPageHeader
        cartItemCount={cartItemCount}
        onBackPress={handleBackPress}
        onCartPress={openBag}
        onSearchPress={openSearch}
        title={collection.title}
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
          <CollectionHero />
          <View className="mt-6">
            <CollectionFilters
              categories={collection.categories}
              onCategoryChange={setSelectedCategory}
              onFilterPress={openFilters}
              selectedCategory={selectedCategory}
            />
          </View>
          <View className="mt-1">
            <ProductGrid
              bagProductIds={bagProductIds}
              onAddToCartPress={addCartItem}
              onFavoritePress={toggleWishlistItem}
              onGoToBagPress={openBag}
              onProductPress={openProductDetail}
              products={visibleProducts}
              showHeader={false}
              title={collection.productTitle}
              wishlistProductIds={wishlistProductIds}
            />
          </View>
          <View className="mt-8 bg-surface pt-2">
            <ProductResultsLoader
              displayedCount={visibleProducts.length}
              totalCount={collection.totalCount}
            />
          </View>
          <View className="bg-surface pb-8 pt-8">
            <CollectionTrending categories={collection.trendingCategories} />
          </View>
        </ScrollView>
        <CollectionRefreshLoader isVisible={isRefreshing} label={collection.refreshLabel} />
      </View>
    </Screen>
  );
}
