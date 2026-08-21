import { useLocalSearchParams, useRouter } from 'expo-router';
import { useCallback, useMemo, useState } from 'react';
import { ScrollView, View } from 'react-native';

import { Screen } from '@/components/layouts';
import { ProductCard } from '@/components/product/ProductCard';
import { ProductGrid } from '@/components/product/ProductGrid';
import { Text } from '@/components/ui/Text';
import { routes } from '@/constants/routes';
import { homeSearchProducts } from '@/features/home/constants/homeSearchProducts';
import { SearchNoResults } from '@/features/search/components/SearchNoResults';
import { SearchPageHeader } from '@/features/search/components/SearchPageHeader';
import { searchRecommendations } from '@/features/search/constants/searchRecommendations';
import { useWishlist } from '@/features/wishlist/hooks/useWishlist';
import { layout } from '@/theme';
import type { ProductPreview } from '@/types/product';

const defaultSearchQuery = 'FlowSynapse';

function getParamValue(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export function SearchScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ query?: string | string[] }>();
  const initialQuery = getParamValue(params.query) ?? defaultSearchQuery;
  const [query, setQuery] = useState(initialQuery);
  const { productIds: wishlistProductIds, toggleItem: toggleWishlistItem } = useWishlist();
  const normalizedQuery = query.trim().toLocaleLowerCase();
  const filteredProducts = useMemo(
    () =>
      normalizedQuery.length === 0
        ? homeSearchProducts
        : homeSearchProducts.filter((product) =>
            `${product.brand} ${product.name}`.toLocaleLowerCase().includes(normalizedQuery),
          ),
    [normalizedQuery],
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
  const goBack = useCallback(() => {
    if (router.canGoBack()) {
      router.back();
      return;
    }

    router.replace(routes.category);
  }, [router]);
  const browseAllProducts = useCallback(() => {
    router.replace(routes.category);
  }, [router]);
  const clearSearch = useCallback(() => {
    setQuery('');
  }, []);
  const hasNoResults = normalizedQuery.length > 0 && filteredProducts.length === 0;

  return (
    <Screen className="bg-surface" includeBottomInset={false} padded={false}>
      <SearchPageHeader onBackPress={goBack} onQueryChange={setQuery} query={query} />
      <ScrollView
        className="flex-1 bg-surface"
        contentContainerClassName="pb-8"
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps="handled"
      >
        <View className="bg-subtle-surface px-6 py-3.5">
          <Text className="text-xs" tone="muted" variant="caption">
            Showing {filteredProducts.length} results for{' '}
            <Text className="text-xs" variant="captionStrong">
              &quot;{query}&quot;
            </Text>
          </Text>
        </View>

        <View className="border-b border-subtle-border px-6 py-3">
          <View className="self-start border-b-2 border-brand pb-2">
            <Text tone="brand" variant="label">
              All Results ({filteredProducts.length})
            </Text>
          </View>
        </View>

        {hasNoResults ? (
          <SearchNoResults
            onBrowseProductsPress={browseAllProducts}
            onClearSearchPress={clearSearch}
            onPopularSearchPress={setQuery}
            query={query}
          />
        ) : filteredProducts.length > 0 ? (
          <ProductGrid
            onFavoritePress={toggleWishlistItem}
            onProductPress={openProductDetail}
            products={filteredProducts}
            showAddToCartButton={false}
            showHeader={false}
            showReviewCount
            title="Search Results"
            wishlistProductIds={wishlistProductIds}
          />
        ) : (
          <View className="items-center gap-3 px-6 py-12">
            <Text className="text-center" variant="promotionalTitle">
              Start exploring
            </Text>
            <Text className="text-center" tone="muted" variant="body">
              Search for products, brands, or categories.
            </Text>
          </View>
        )}

        <View className="gap-4 px-6 pb-10">
          <Text className="text-lg" variant="title">
            You May Also Like
          </Text>
          <ScrollView
            accessibilityLabel="Recommended products"
            contentContainerClassName="gap-4"
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            {searchRecommendations.map((product) => (
              <ProductCard
                cardWidth={layout.productCardWidth}
                key={product.id}
                onFavoritePress={toggleWishlistItem}
                onPress={openProductDetail}
                product={
                  wishlistProductIds.has(product.id) ? { ...product, isFavorite: true } : product
                }
                showAddToCartButton={false}
                showReviewCount
              />
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </Screen>
  );
}
