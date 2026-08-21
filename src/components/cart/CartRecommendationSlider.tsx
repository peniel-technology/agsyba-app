import { useCallback } from 'react';
import type { ListRenderItem } from 'react-native';
import { FlatList, View } from 'react-native';

import { ProductCard } from '@/components/product/ProductCard';
import { Text } from '@/components/ui/Text';
import { layout } from '@/theme';
import type { ProductPreview } from '@/types/product';

interface CartRecommendationSliderProps {
  onFavoritePress?: (product: ProductPreview) => void;
  onProductPress: (product: ProductPreview) => void;
  products: readonly ProductPreview[];
  title?: string;
  wishlistProductIds?: ReadonlySet<string>;
}

export function CartRecommendationSlider({
  onFavoritePress,
  onProductPress,
  products,
  title = 'You Might Also Like',
  wishlistProductIds,
}: CartRecommendationSliderProps) {
  const renderProduct = useCallback<ListRenderItem<ProductPreview>>(
    ({ item }) => {
      const visibleProduct = {
        ...item,
        isFavorite: wishlistProductIds?.has(item.id) ?? item.isFavorite,
      };

      return (
        <ProductCard
          cardWidth={layout.productCardWidth}
          onFavoritePress={onFavoritePress}
          onPress={onProductPress}
          product={visibleProduct}
          showAddToCartButton={false}
        />
      );
    },
    [onFavoritePress, onProductPress, wishlistProductIds],
  );

  if (products.length === 0) {
    return null;
  }

  return (
    <View className="gap-4 pb-10">
      <Text className="px-6 text-lg leading-6" variant="bodyStrong">
        {title}
      </Text>
      <FlatList
        accessibilityLabel={`${title} products`}
        contentContainerClassName="gap-3 px-6"
        data={products}
        horizontal
        initialNumToRender={2}
        keyExtractor={(product) => product.id}
        maxToRenderPerBatch={3}
        removeClippedSubviews={false}
        renderItem={renderProduct}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}
