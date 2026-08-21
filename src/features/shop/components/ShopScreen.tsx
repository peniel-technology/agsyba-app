import { useRouter } from 'expo-router';
import { useCallback, useMemo, useState } from 'react';
import { Pressable, ScrollView, useWindowDimensions, View } from 'react-native';

import { SearchForm } from '@/components/forms/SearchForm';
import { CatalogHeader, Screen } from '@/components/layouts';
import { ProductCard } from '@/components/product/ProductCard';
import { ProductGrid } from '@/components/product/ProductGrid';
import { Text } from '@/components/ui/Text';
import { routes } from '@/constants/routes';
import { ShopCategoryRow } from '@/features/shop/components/ShopCategoryRow';
import { ShopToolbar } from '@/features/shop/components/ShopToolbar';
import { shopCategories } from '@/features/shop/constants/shopCategories';
import { shopProducts } from '@/features/shop/constants/shopProducts';
import type { ShopCategory } from '@/features/shop/types/shopCategory';
import { useWishlist } from '@/features/wishlist/hooks/useWishlist';
import { useProductBagNavigation } from '@/hooks/useProductBagNavigation';
import { useCartStore } from '@/stores/useCartStore';
import { spacing } from '@/theme';
import type { ProductPreview } from '@/types/product';

export function ShopScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const [isGridView, setIsGridView] = useState(true);
  const [query, setQuery] = useState('');
  const cartItemCount = useCartStore((state) => state.itemCount);
  const { openBag } = useProductBagNavigation();
  const { productIds: wishlistProductIds, toggleItem: toggleWishlistItem } = useWishlist();
  const normalizedQuery = query.trim().toLocaleLowerCase();
  const filteredProducts = useMemo(
    () =>
      normalizedQuery.length === 0
        ? shopProducts
        : shopProducts.filter((product) =>
            `${product.brand} ${product.name}`.toLocaleLowerCase().includes(normalizedQuery),
          ),
    [normalizedQuery],
  );
  const listCardWidth = width - spacing[8];
  const openSearch = useCallback(() => {
    router.push({ params: { returnTo: routes.shop }, pathname: routes.search });
  }, [router]);
  const handleBackPress = useCallback(() => {
    if (router.canGoBack()) {
      router.back();
      return;
    }

    router.replace(routes.home);
  }, [router]);
  const handleCategoryPress = useCallback(
    (category: ShopCategory) => {
      router.push(category.href);
    },
    [router],
  );
  const openProductDetail = useCallback(
    (product: ProductPreview) => {
      router.push({
        params: { productId: product.id },
        pathname: routes.productDetail,
      });
    },
    [router],
  );
  const openFilters = useCallback(() => {
    router.push({
      params: { returnTo: routes.shop },
      pathname: routes.productFilters,
    });
  }, [router]);

  return (
    <Screen includeBottomInset={false} padded={false}>
      <CatalogHeader
        cartItemCount={cartItemCount}
        onBackPress={handleBackPress}
        onCartPress={openBag}
        onSearchPress={openSearch}
      />
      <ScrollView
        className="flex-1 bg-surface"
        contentContainerClassName="gap-5 pb-8 pt-3"
        keyboardShouldPersistTaps="handled"
      >
        <View className="px-4">
          <SearchForm
            onQueryChange={setQuery}
            onSubmit={setQuery}
            placeholder="Search for products, categories..."
          />
        </View>

        <View className="gap-4">
          <View className="flex-row items-center justify-between px-4">
            <Text variant="bodyStrong">Browse Categories</Text>
            <Pressable
              accessibilityLabel="View all categories"
              accessibilityRole="button"
              className="active:opacity-70"
              onPress={() => router.push(routes.category)}
            >
              <Text tone="brand" variant="captionStrong">
                View all
              </Text>
            </Pressable>
          </View>
          <ShopCategoryRow categories={shopCategories} onCategoryPress={handleCategoryPress} />
        </View>

        <ShopToolbar
          isGridView={isGridView}
          onFilterPress={openFilters}
          onGridPress={() => setIsGridView(true)}
          onListPress={() => setIsGridView(false)}
        />

        {isGridView ? (
          <ProductGrid
            onFavoritePress={toggleWishlistItem}
            onProductPress={openProductDetail}
            products={filteredProducts}
            showAddToCartButton={false}
            showHeader={false}
            showReviewCount
            title="Shop Products"
            wishlistProductIds={wishlistProductIds}
          />
        ) : (
          <View className="gap-4 px-4">
            {filteredProducts.map((product) => (
              <ProductCard
                cardWidth={listCardWidth}
                key={product.id}
                onFavoritePress={toggleWishlistItem}
                onPress={openProductDetail}
                product={{
                  ...product,
                  imageFit: 'contain',
                  isFavorite: wishlistProductIds.has(product.id) || product.isFavorite,
                }}
                showAddToCartButton={false}
                showReviewCount
              />
            ))}
          </View>
        )}
      </ScrollView>
    </Screen>
  );
}
