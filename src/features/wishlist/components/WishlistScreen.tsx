import { useLocalSearchParams, useRouter } from 'expo-router';
import { useCallback, useMemo, useState } from 'react';
import { ScrollView, View } from 'react-native';

import { Screen } from '@/components/layouts';
import { ProductGrid } from '@/components/product/ProductGrid';
import { Text } from '@/components/ui/Text';
import { routes } from '@/constants/routes';
import { WishlistEmptyState } from '@/features/wishlist/components/WishlistEmptyState';
import { WishlistFilterBar } from '@/features/wishlist/components/WishlistFilterBar';
import { WishlistHeader } from '@/features/wishlist/components/WishlistHeader';
import { wishlistTrendingProducts } from '@/features/wishlist/constants/wishlistTrendingProducts';
import { useWishlist } from '@/features/wishlist/hooks/useWishlist';
import { useProductBagNavigation } from '@/hooks/useProductBagNavigation';
import { useCartStore } from '@/stores/useCartStore';
import { layout } from '@/theme';
import type { ProductPreview } from '@/types/product';

export function WishlistScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [isPriceAscending, setIsPriceAscending] = useState(false);
  const addCartItem = useCartStore((state) => state.addItem);
  const cartItemCount = useCartStore((state) => state.itemCount);
  const { bagProductIds, openBag } = useProductBagNavigation();
  const { itemCount, items, productIds, toggleItem } = useWishlist();
  const sortedItems = useMemo(
    () =>
      [...items].sort((firstProduct, secondProduct) => {
        const difference = firstProduct.price.amount - secondProduct.price.amount;
        return isPriceAscending ? difference : -difference;
      }),
    [isPriceAscending, items],
  );
  const openSearch = useCallback(() => {
    router.push({ params: { returnTo: routes.wishlist }, pathname: routes.search });
  }, [router]);
  const openProductDetail = useCallback(
    (product: ProductPreview) => {
      router.push({
        params: { productId: product.id },
        pathname: routes.productDetail,
      });
    },
    [router],
  );
  const handleBackPress = useCallback(() => {
    const returnToProfile = Array.isArray(params.returnTo)
      ? params.returnTo[0] === routes.profile
      : params.returnTo === routes.profile;

    router.replace(returnToProfile ? routes.profile : routes.home);
  }, [params.returnTo, router]);
  const toggleSort = useCallback(() => {
    setIsPriceAscending((currentValue) => !currentValue);
  }, []);
  const openCollections = useCallback(() => {
    router.push(routes.category);
  }, [router]);
  const openNewArrivals = useCallback(() => {
    router.push(routes.home);
  }, [router]);

  return (
    <Screen className="bg-surface" includeBottomInset={false} padded={false}>
      <WishlistHeader
        cartItemCount={cartItemCount}
        itemCount={itemCount}
        onBackPress={handleBackPress}
        onCartPress={openBag}
        onSearchPress={openSearch}
      />
      <ScrollView
        className="flex-1 bg-surface"
        contentContainerClassName={items.length === 0 ? 'pb-8' : 'gap-5 pb-8 pt-5'}
        keyboardShouldPersistTaps="handled"
      >
        {items.length > 0 ? (
          <>
            <View className="flex-row items-baseline gap-2 px-4">
              <Text variant="title">My Wishlist</Text>
              <Text tone="muted" variant="captionMedium">
                ({itemCount} items)
              </Text>
            </View>

            <WishlistFilterBar isPriceAscending={isPriceAscending} onSortPress={toggleSort} />

            <ProductGrid
              addToCartLabel="Add to Cart"
              bagProductIds={bagProductIds}
              cardWidth={layout.cartRecommendationCardWidth}
              onAddToCartPress={addCartItem}
              onFavoritePress={toggleItem}
              onGoToBagPress={openBag}
              onProductPress={openProductDetail}
              products={sortedItems}
              productsContainerClassName="pl-4 pr-0"
              showHeader={false}
              showReviewCount
              title="Wishlist Products"
              wishlistProductIds={productIds}
            />
          </>
        ) : (
          <WishlistEmptyState
            onExploreCollectionsPress={openCollections}
            onFavoritePress={toggleItem}
            onProductPress={openProductDetail}
            onViewNewArrivalsPress={openNewArrivals}
            trendingProducts={wishlistTrendingProducts}
          />
        )}
      </ScrollView>
    </Screen>
  );
}
