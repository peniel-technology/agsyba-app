import { Image } from 'expo-image';
import { Heart, Star } from 'lucide-react-native';
import { memo, useMemo } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { Text } from '@/components/ui/Text';
import { colors, iconSizes, iconStrokeWidths, layout, motion, spacing } from '@/theme';
import type { ProductPreview } from '@/types/product';
import { formatCurrency } from '@/utils/formatCurrency';

interface ProductCardProps {
  cardWidth?: number;
  onFavoritePress?: (product: ProductPreview) => void;
  onPress?: (product: ProductPreview) => void;
  product: ProductPreview;
}

function formatDiscount(discountPercentage: number): string {
  const normalizedDiscount = Math.max(0, Math.round(discountPercentage));
  return `${normalizedDiscount}% OFF`;
}

const styles = StyleSheet.create({
  card: { width: layout.productCardWidth },
  imageContainer: { height: layout.productCardImageHeight },
});

export const ProductCard = memo(function ProductCard({
  cardWidth,
  onFavoritePress,
  onPress,
  product,
}: ProductCardProps) {
  const productAccessibilityLabel = `Open ${product.brand} ${product.name}`;
  const cardStyle = useMemo(
    () => (cardWidth === undefined ? styles.card : [styles.card, { width: cardWidth }]),
    [cardWidth],
  );

  return (
    <View
      className="overflow-hidden rounded-md border border-subtle-border bg-surface shadow-sm"
      style={cardStyle}
    >
      <Pressable
        accessibilityLabel={productAccessibilityLabel}
        accessibilityRole={onPress ? 'button' : undefined}
        accessibilityState={{ disabled: !onPress }}
        className="active:opacity-80"
        disabled={!onPress}
        onPress={onPress ? () => onPress(product) : undefined}
      >
        <View className="relative" style={styles.imageContainer}>
          <Image
            accessibilityLabel={product.imageAccessibilityLabel}
            accessible
            className="bg-surface"
            contentFit={product.imageFit ?? 'contain'}
            source={product.image}
            style={StyleSheet.absoluteFillObject}
            transition={motion.imageTransitionMs}
          />

          <View className="absolute left-2 top-2 rounded-sm bg-brand px-1.5 py-1">
            <Text tone="brandForeground" variant="badge">
              {formatDiscount(product.discountPercentage)}
            </Text>
          </View>

          <View className="absolute bottom-2 left-2 flex-row items-center gap-0.5 rounded-full bg-surface px-2 py-1">
            <Text variant="detailStrong">{product.rating.toFixed(1)}</Text>
            <Star
              accessible={false}
              color={colors.rating}
              fill={colors.rating}
              size={spacing[2]}
              strokeWidth={iconStrokeWidths.subtle}
            />
          </View>
        </View>

        <View className="gap-1.5 px-2.5 pb-2.5 pt-2">
          <View className="gap-0.5">
            <Text className="font-manrope-extrabold" numberOfLines={1} variant="captionStrong">
              {product.brand}
            </Text>
            <Text numberOfLines={1} tone="muted" variant="detail">
              {product.name}
            </Text>
          </View>

          <Text className="leading-5" variant="captionStrong">
            {formatCurrency(product.price)}
          </Text>

          <Text numberOfLines={1} variant="micro">
            <Text tone="success" variant="micro">
              Best Price {formatCurrency(product.bestPrice)}{' '}
            </Text>
            <Text tone="muted" variant="micro">
              with coupon
            </Text>
          </Text>

          <Text numberOfLines={1} tone="muted" variant="detailMedium">
            {product.deliveryLabel}
          </Text>
        </View>
      </Pressable>

      <Pressable
        accessibilityLabel={`${product.isFavorite ? 'Remove' : 'Add'} ${product.name} ${
          product.isFavorite ? 'from' : 'to'
        } wishlist`}
        accessibilityRole={onFavoritePress ? 'button' : undefined}
        accessibilityState={{ disabled: !onFavoritePress, selected: product.isFavorite }}
        className="absolute right-2 top-2 size-7 items-center justify-center rounded-full bg-surface/90 shadow-md active:opacity-70"
        disabled={!onFavoritePress}
        hitSlop={spacing[2]}
        onPress={onFavoritePress ? () => onFavoritePress(product) : undefined}
      >
        <Heart
          accessible={false}
          color={colors.brand}
          fill={product.isFavorite ? colors.brand : 'none'}
          size={iconSizes.small}
          strokeWidth={iconStrokeWidths.regular}
        />
      </Pressable>
    </View>
  );
});
