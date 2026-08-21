import { Image } from 'expo-image';
import { StyleSheet, View } from 'react-native';

import { Text } from '@/components/ui/Text';
import type { ProductPreview } from '@/types/product';
import { formatCurrency } from '@/utils/formatCurrency';

interface TrackingProductCardProps {
  color: string;
  product: ProductPreview;
  quantity: number;
  size: string;
}

const styles = StyleSheet.create({
  productImage: {
    borderRadius: 6,
    height: 80,
    width: 64,
  },
});

export function TrackingProductCard({ color, product, quantity, size }: TrackingProductCardProps) {
  return (
    <View className="flex-row items-center gap-4 rounded-md border border-border bg-surface p-3">
      <Image
        accessibilityLabel={product.imageAccessibilityLabel}
        className="bg-subtle-surface"
        contentFit="cover"
        source={product.image}
        style={styles.productImage}
      />
      <View className="min-w-0 flex-1 gap-1">
        <Text numberOfLines={1} variant="label">
          {product.name}
        </Text>
        <Text numberOfLines={1} tone="muted" variant="caption">
          Size: {size} · Color: {color} · Qty: {quantity}
        </Text>
        <Text tone="orderAction" variant="label">
          {formatCurrency(product.price)}
        </Text>
      </View>
    </View>
  );
}
