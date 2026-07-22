import { useCallback } from 'react';
import type { ListRenderItem } from 'react-native';
import { FlatList, View } from 'react-native';

import { ProductCard } from '@/components/product/ProductCard';
import { ProductSectionHeader } from '@/components/product/ProductSectionHeader';
import { layout, spacing } from '@/theme';
import type { ProductPreview } from '@/types/product';

interface ProductSliderProps {
  onFavoritePress?: (product: ProductPreview) => void;
  onProductPress?: (product: ProductPreview) => void;
  onSeeMorePress?: () => void;
  products: readonly ProductPreview[];
  seeMoreLabel?: string;
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

export function ProductSlider({
  onFavoritePress,
  onProductPress,
  onSeeMorePress,
  products,
  seeMoreLabel = 'See More',
  title,
}: ProductSliderProps) {
  const renderProduct = useCallback<ListRenderItem<ProductPreview>>(
    ({ item }) => (
      <ProductCard onFavoritePress={onFavoritePress} onPress={onProductPress} product={item} />
    ),
    [onFavoritePress, onProductPress],
  );

  if (products.length === 0) {
    return null;
  }

  return (
    <View className="gap-4">
      <ProductSectionHeader
        onSeeMorePress={onSeeMorePress}
        seeMoreLabel={seeMoreLabel}
        title={title}
      />

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
