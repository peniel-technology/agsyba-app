import { View } from 'react-native';

import { Text } from '@/components/ui/Text';
import { returnExchangeReviewData } from '@/features/orders/constants/returnExchangeReviewData';

export function ReturnRefundDetails() {
  return (
    <View className="gap-3 rounded-lg border border-border bg-surface p-4">
      <Text variant="title">Refund Details</Text>
      <View className="gap-2">
        <View className="flex-row items-center justify-between gap-3">
          <Text tone="muted" variant="caption">
            Item Price
          </Text>
          <Text variant="captionMedium">{returnExchangeReviewData.itemPrice}</Text>
        </View>
        <View className="flex-row items-center justify-between gap-3">
          <Text tone="muted" variant="caption">
            Shipping Fee
          </Text>
          <Text tone="success" variant="captionStrong">
            {returnExchangeReviewData.shippingFee}
          </Text>
        </View>
        <View className="h-px bg-border" />
        <View className="flex-row items-center justify-between gap-3 pt-1">
          <Text variant="bodyStrong">Estimated Refund</Text>
          <Text tone="orderAction" variant="title">
            {returnExchangeReviewData.itemPrice}
          </Text>
        </View>
      </View>
      <View className="rounded-sm bg-subtle-surface p-2.5">
        <Text tone="muted" variant="caption">
          {returnExchangeReviewData.originalPaymentMethod}
        </Text>
      </View>
    </View>
  );
}
