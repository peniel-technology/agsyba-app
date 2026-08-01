import { Image } from 'expo-image';
import { Heart } from 'lucide-react-native';
import { memo } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { ProductAddToCartButton } from '@/components/product/ProductAddToCartButton';
import { Text } from '@/components/ui/Text';
import { ProductStarRating } from '@/features/products/components/detail/ProductStarRating';
import type { ProductRating } from '@/features/products/types/productDetail';
import { colors, iconSizes, iconStrokeWidths, layout, motion, spacing } from '@/theme';
import type { ProductPreview } from '@/types/product';
import { formatCurrency } from '@/utils/formatCurrency';

interface ProductRecommendationCardProps {
  isFavorite: boolean;
  isInBag: boolean;
  onAddToCartPress: (product: ProductPreview) => void;
  onFavoritePress: (product: ProductPreview) => void;
  onGoToBagPress: () => void;
  onProductPress: (product: ProductPreview) => void;
  product: ProductPreview;
}

const styles = StyleSheet.create({
  card: { width: layout.productCardWidth },
  image: { height: layout.productCardImageHeight },
});

function normalizeRating(rating: number): ProductRating {
  return Math.min(5, Math.max(1, Math.round(rating))) as ProductRating;
}

export const ProductRecommendationCard = memo(function ProductRecommendationCard({
  isFavorite,
  isInBag,
  onAddToCartPress,
  onFavoritePress,
  onGoToBagPress,
  onProductPress,
  product,
}: ProductRecommendationCardProps) {
  return (
    <View
      className="overflow-hidden rounded-xl border border-subtle-border bg-surface shadow-sm"
      style={styles.card}
    >
      <Pressable
        accessibilityLabel={`Open ${product.brand} ${product.name}`}
        accessibilityRole="button"
        className="active:opacity-80"
        onPress={() => onProductPress(product)}
      >
        <Image
          accessibilityLabel={product.imageAccessibilityLabel}
          className="w-full bg-subtle-surface"
          contentFit={product.imageFit ?? 'cover'}
          source={product.image}
          style={styles.image}
          transition={motion.imageTransitionMs}
        />

        <View className="gap-1.5 p-3">
          <Text numberOfLines={1} variant="label">
            {product.name}
          </Text>
          <Text tone="brand" variant="bodyStrong">
            {formatCurrency(product.price)}
          </Text>
          <View className="flex-row items-center gap-1.5">
            <ProductStarRating rating={normalizeRating(product.rating)} />
            <Text tone="muted" variant="caption">
              ({product.reviewCount})
            </Text>
          </View>
        </View>
      </Pressable>

      <View className="px-3 pb-3">
        <ProductAddToCartButton
          accessibilityLabel={
            isInBag ? `Go to shopping bag for ${product.name}` : `Add ${product.name} to bag`
          }
          label={isInBag ? 'Go to Bag' : 'Add to Bag'}
          onPress={isInBag ? onGoToBagPress : () => onAddToCartPress(product)}
        />
      </View>

      <Pressable
        accessibilityLabel={`${isFavorite ? 'Remove' : 'Add'} ${product.name} ${
          isFavorite ? 'from' : 'to'
        } wishlist`}
        accessibilityRole="button"
        accessibilityState={{ selected: isFavorite }}
        className="absolute right-3 top-3 size-9 items-center justify-center rounded-full bg-surface/90 shadow-md active:opacity-70"
        hitSlop={spacing[2]}
        onPress={() => onFavoritePress(product)}
      >
        <Heart
          accessible={false}
          color={colors.brand}
          fill={isFavorite ? colors.brand : 'none'}
          size={iconSizes.small}
          strokeWidth={iconStrokeWidths.regular}
        />
      </Pressable>
    </View>
  );
});
