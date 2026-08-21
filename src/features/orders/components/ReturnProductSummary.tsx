import { Image } from 'expo-image';
import { StyleSheet, View } from 'react-native';

import { Text } from '@/components/ui/Text';
import { returnExchangeProduct } from '@/features/orders/constants/returnExchangeData';

const styles = StyleSheet.create({
  image: {
    height: 80,
    width: 64,
  },
});

export function ReturnProductSummary() {
  return (
    <View className="flex-row items-center gap-3 rounded-lg border border-border bg-surface p-3">
      <Image
        accessibilityLabel={returnExchangeProduct.imageAccessibilityLabel}
        className="rounded-sm bg-subtle-surface"
        contentFit="contain"
        source={returnExchangeProduct.image}
        style={styles.image}
      />
      <View className="min-w-0 flex-1 gap-1">
        <Text numberOfLines={1} variant="bodyStrong">
          {returnExchangeProduct.name}
        </Text>
        <Text tone="muted" variant="captionMedium">
          {returnExchangeProduct.orderNumber}
        </Text>
        <Text tone="muted" variant="caption">
          {returnExchangeProduct.detail}
        </Text>
        <Text tone="success" variant="captionMedium">
          {returnExchangeProduct.purchasedDetail}
        </Text>
      </View>
    </View>
  );
}
