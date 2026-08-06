import { memo } from 'react';
import { Image } from 'expo-image';
import { StyleSheet, View } from 'react-native';

import fallbackOrderItemImage from '@/assets/images/home/drawer-promo-bag.webp';
import { Text } from '@/components/ui/Text';
import type { OrderSuccessProduct } from '@/data/orderSuccess';
import { formatCurrency } from '@/utils/formatCurrency';

interface PurchasedItemProps {
  item: OrderSuccessProduct;
}

export const PurchasedItem = memo(function PurchasedItem({ item }: PurchasedItemProps) {
  return (
    <View className="flex-row items-center gap-3">
      <Image
        accessibilityLabel={item.title}
        className="bg-subtle-surface"
        contentFit="cover"
        source={item.image ?? fallbackOrderItemImage}
        style={styles.productImage}
      />
      <View className="flex-1 gap-1">
        <Text className="text-xs" variant="captionStrong">
          {item.title}
        </Text>
        <Text className="text-xs" tone="muted" variant="caption">
          {item.variant}
        </Text>
      </View>
      <Text className="text-sm" variant="captionStrong">
        {formatCurrency(item.price)}
      </Text>
    </View>
  );
});

const styles = StyleSheet.create({
  productImage: {
    borderRadius: 8,
    height: 56,
    width: 56,
  },
});
