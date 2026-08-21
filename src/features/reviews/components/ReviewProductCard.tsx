import { Image } from 'expo-image';
import { StyleSheet, View } from 'react-native';

import { Text } from '@/components/ui/Text';
import { reviewProduct } from '@/features/reviews/constants/ratingReviewData';

const styles = StyleSheet.create({
  image: {
    height: 80,
    width: 64,
  },
});

export function ReviewProductCard() {
  return (
    <View className="flex-row items-center gap-4 rounded-lg border border-border bg-surface p-3">
      <Image
        accessibilityLabel={reviewProduct.accessibilityLabel}
        className="rounded-sm bg-subtle-surface"
        contentFit="contain"
        source={reviewProduct.image}
        style={styles.image}
      />
      <View className="min-w-0 flex-1 gap-1">
        <Text numberOfLines={1} variant="bodyStrong">
          {reviewProduct.name}
        </Text>
        <Text tone="muted" variant="caption">
          {reviewProduct.orderNumber}
        </Text>
        <Text tone="success" variant="captionMedium">
          {reviewProduct.purchasedOn}
        </Text>
      </View>
    </View>
  );
}
