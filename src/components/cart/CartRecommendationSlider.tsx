import { useCallback, useState } from 'react';
import type { ListRenderItem } from 'react-native';
import { FlatList, View } from 'react-native';

import { ProductCard } from '@/components/product/ProductCard';
import { Text } from '@/components/ui/Text';
import { layout } from '@/theme';
import type { ProductPreview } from '@/types/product';

interface CartRecommendationSliderProps {
  onProductPress: (product: ProductPreview) => void;
  products: readonly ProductPreview[];
  title?: string;
}

export function CartRecommendationSlider({
  onProductPress,
  products,
  title = 'You Might Also Like',
}: CartRecommendationSliderProps) {
  const [favoriteProductIds, setFavoriteProductIds] = useState<ReadonlySet<string>>(
    () => new Set(products.filter((product) => product.isFavorite).map((product) => product.id)),
  );
  const toggleFavorite = useCallback((product: ProductPreview) => {
    setFavoriteProductIds((currentIds) => {
      const nextIds = new Set(currentIds);

      if (nextIds.has(product.id)) {
        nextIds.delete(product.id);
      } else {
        nextIds.add(product.id);
      }

      return nextIds;
    });
  }, []);
  const renderProduct = useCallback<ListRenderItem<ProductPreview>>(
    ({ item }) => {
      const visibleProduct = {
        ...item,
        isFavorite: favoriteProductIds.has(item.id),
      };

      return (
        <ProductCard
          cardWidth={layout.cartRecommendationCardWidth}
          onFavoritePress={toggleFavorite}
          onPress={onProductPress}
          product={visibleProduct}
          showAddToCartButton={false}
        />
      );
    },
    [favoriteProductIds, onProductPress, toggleFavorite],
  );

  if (products.length === 0) {
    return null;
  }

  return (
    <View className="gap-4">
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
