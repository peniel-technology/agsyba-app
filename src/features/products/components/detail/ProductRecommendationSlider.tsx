import { useCallback, useState } from 'react';
import type { ListRenderItem } from 'react-native';
import { FlatList, Pressable, View } from 'react-native';

import { Text } from '@/components/ui/Text';
import { ProductRecommendationCard } from '@/features/products/components/detail/ProductRecommendationCard';
import { layout, spacing } from '@/theme';
import type { ProductPreview } from '@/types/product';

interface ProductRecommendationSliderProps {
  onAddToCartPress: (product: ProductPreview) => void;
  onProductPress: (product: ProductPreview) => void;
  onViewAllPress: () => void;
  products: readonly ProductPreview[];
  title: string;
}

const productInterval = layout.productCardWidth + spacing[3.5];
const productListContentStyle = {
  gap: spacing[3.5],
  paddingHorizontal: spacing[4],
} as const;

function getProductLayout(_data: ArrayLike<ProductPreview> | null | undefined, index: number) {
  return {
    index,
    length: productInterval,
    offset: productInterval * index,
  };
}

export function ProductRecommendationSlider({
  onAddToCartPress,
  onProductPress,
  onViewAllPress,
  products,
  title,
}: ProductRecommendationSliderProps) {
  const [favoriteProductIds, setFavoriteProductIds] = useState<ReadonlySet<string>>(
    () => new Set(),
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
    ({ item }) => (
      <ProductRecommendationCard
        isFavorite={favoriteProductIds.has(item.id)}
        onAddToCartPress={onAddToCartPress}
        onFavoritePress={toggleFavorite}
        onProductPress={onProductPress}
        product={item}
      />
    ),
    [favoriteProductIds, onAddToCartPress, onProductPress, toggleFavorite],
  );

  if (products.length === 0) {
    return null;
  }

  return (
    <View className="gap-4">
      <View className="flex-row items-center justify-between gap-4 px-4">
        <Text className="flex-1 text-2xl leading-7" variant="sectionHeading">
          {title}
        </Text>
        <Pressable
          accessibilityLabel={`View all ${title}`}
          accessibilityRole="button"
          className="rounded-md border border-brand px-4 py-2.5 active:opacity-70"
          onPress={onViewAllPress}
        >
          <Text className="uppercase" tone="brand" variant="captionStrong">
            View All
          </Text>
        </Pressable>
      </View>

      <FlatList
        accessibilityLabel={`${title} products`}
        contentContainerStyle={productListContentStyle}
        data={products}
        decelerationRate="normal"
        getItemLayout={getProductLayout}
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
