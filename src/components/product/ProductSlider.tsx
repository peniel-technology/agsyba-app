import { useCallback } from 'react';
import type { ListRenderItem } from 'react-native';
import { FlatList, View } from 'react-native';

import { ProductCard } from '@/components/product/ProductCard';
import { ProductSectionHeader } from '@/components/product/ProductSectionHeader';
import { layout, spacing } from '@/theme';
import type { ProductPreview } from '@/types/product';

interface ProductSliderProps {
  bagProductIds?: ReadonlySet<string>;
  onAddToCartPress?: (product: ProductPreview) => void;
  onFavoritePress?: (product: ProductPreview) => void;
  onGoToBagPress?: () => void;
  onProductPress?: (product: ProductPreview) => void;
  onSeeMorePress?: () => void;
  products: readonly ProductPreview[];
  seeMoreLabel?: string;
  title: string;
  wishlistProductIds?: ReadonlySet<string>;
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
  bagProductIds,
  onAddToCartPress,
  onFavoritePress,
  onGoToBagPress,
  onProductPress,
  onSeeMorePress,
  products,
  seeMoreLabel = 'See More',
  title,
  wishlistProductIds,
}: ProductSliderProps) {
  const renderProduct = useCallback<ListRenderItem<ProductPreview>>(
    ({ item }) => (
      <ProductCard
        isInBag={bagProductIds?.has(item.id) ?? false}
        onAddToCartPress={onAddToCartPress}
        onFavoritePress={onFavoritePress}
        onGoToBagPress={onGoToBagPress}
        onPress={onProductPress}
        product={wishlistProductIds?.has(item.id) ? { ...item, isFavorite: true } : item}
      />
    ),
    [
      bagProductIds,
      onAddToCartPress,
      onFavoritePress,
      onGoToBagPress,
      onProductPress,
      wishlistProductIds,
    ],
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
