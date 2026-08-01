import { Image } from 'expo-image';
import { Check, Minus, Plus } from 'lucide-react-native';
import { Pressable, StyleSheet, View } from 'react-native';

import { Text } from '@/components/ui/Text';
import { colors, iconSizes, iconStrokeWidths, layout, spacing } from '@/theme';
import type { Money, ProductPreview } from '@/types/product';
import { formatCurrency } from '@/utils/formatCurrency';

interface CartProductItemProps {
  color: string;
  isSelected: boolean;
  onDecreasePress: () => void;
  onIncreasePress: () => void;
  onMoveToWishlistPress: () => void;
  onRemovePress: () => void;
  onSelectionChange: () => void;
  product: ProductPreview;
  quantity: number;
  size: string;
}

const styles = StyleSheet.create({
  productImage: {
    height: layout.cartItemImageHeight,
    width: layout.cartItemImageWidth,
  },
});

function calculateOriginalPrice(product: ProductPreview): Money | null {
  if (product.discountPercentage <= 0 || product.discountPercentage >= 100) {
    return null;
  }

  const discountMultiplier = 1 - product.discountPercentage / 100;

  return {
    amount: Math.round((product.price.amount / discountMultiplier) * 100) / 100,
    currency: product.price.currency,
  };
}

export function CartProductItem({
  color,
  isSelected,
  onDecreasePress,
  onIncreasePress,
  onMoveToWishlistPress,
  onRemovePress,
  onSelectionChange,
  product,
  quantity,
  size,
}: CartProductItemProps) {
  const canDecrease = quantity > 1;
  const originalPrice = calculateOriginalPrice(product);
  const discountLabel = `(${Math.round(product.discountPercentage)}% OFF)`;

  return (
    <View className="overflow-hidden rounded-md border border-subtle-border bg-surface">
      <View className="flex-row items-start gap-3.5 p-3">
        <Pressable
          accessibilityLabel={`${isSelected ? 'Deselect' : 'Select'} ${product.name}`}
          accessibilityRole="checkbox"
          accessibilityState={{ checked: isSelected }}
          className={`size-5 items-center justify-center rounded-sm border ${
            isSelected ? 'border-brand bg-brand' : 'border-brand bg-surface'
          } active:opacity-70`}
          hitSlop={spacing[1]}
          onPress={onSelectionChange}
        >
          {isSelected ? (
            <Check
              color={colors.brandForeground}
              size={iconSizes.small}
              strokeWidth={iconStrokeWidths.emphasized}
            />
          ) : null}
        </Pressable>

        <Image
          accessibilityLabel={product.imageAccessibilityLabel}
          className="rounded-sm bg-subtle-surface"
          contentFit={product.imageFit ?? 'contain'}
          source={product.image}
          style={styles.productImage}
        />

        <View className="flex-1 items-start gap-1.5">
          <Text className="w-full" numberOfLines={1} variant="captionStrong">
            {product.brand}
          </Text>
          <Text className="w-full" numberOfLines={1} tone="muted" variant="caption">
            {product.name}
          </Text>
          <Text className="w-full" tone="muted" variant="detailMedium">
            Size: {size} | Color: {color}
          </Text>

          <View className="w-full flex-row flex-wrap items-baseline gap-2">
            <Text className="text-sm" variant="captionStrong">
              {formatCurrency(product.price)}
            </Text>
            {originalPrice ? (
              <>
                <Text className="line-through" tone="muted" variant="caption">
                  {formatCurrency(originalPrice)}
                </Text>
                <Text tone="brand" variant="detailStrong">
                  {discountLabel}
                </Text>
              </>
            ) : null}
          </View>

          <View className="w-full flex-row items-center gap-2">
            <Text tone="muted" variant="captionStrong">
              Qty:
            </Text>
            <View className="h-7 flex-row items-center overflow-hidden rounded-sm border border-border">
              <Pressable
                accessibilityLabel={`Decrease ${product.name} quantity`}
                accessibilityRole="button"
                accessibilityState={{ disabled: !canDecrease }}
                className="size-7 items-center justify-center border-r border-border active:bg-subtle-surface disabled:opacity-40"
                disabled={!canDecrease}
                hitSlop={spacing[1]}
                onPress={onDecreasePress}
              >
                <Minus
                  color={colors.muted}
                  size={iconSizes.small}
                  strokeWidth={iconStrokeWidths.emphasized}
                />
              </Pressable>
              <View className="h-full w-8 items-center justify-center">
                <Text variant="captionStrong">{quantity}</Text>
              </View>
              <Pressable
                accessibilityLabel={`Increase ${product.name} quantity`}
                accessibilityRole="button"
                className="size-7 items-center justify-center border-l border-border active:bg-subtle-surface"
                hitSlop={spacing[1]}
                onPress={onIncreasePress}
              >
                <Plus
                  color={colors.muted}
                  size={iconSizes.small}
                  strokeWidth={iconStrokeWidths.emphasized}
                />
              </Pressable>
            </View>
          </View>
        </View>
      </View>

      <View className="min-h-11 flex-row border-t border-subtle-border">
        <Pressable
          accessibilityLabel={`Remove ${product.name} from shopping bag`}
          accessibilityRole="button"
          className="flex-1 items-center justify-center border-r border-subtle-border active:bg-subtle-surface"
          onPress={onRemovePress}
        >
          <Text tone="muted" variant="captionStrong">
            Remove
          </Text>
        </Pressable>
        <Pressable
          accessibilityLabel={`Move ${product.name} to wishlist`}
          accessibilityRole="button"
          className="flex-1 items-center justify-center active:bg-sale-surface"
          onPress={onMoveToWishlistPress}
        >
          <Text tone="brand" variant="captionStrong">
            Move to Wishlist
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
