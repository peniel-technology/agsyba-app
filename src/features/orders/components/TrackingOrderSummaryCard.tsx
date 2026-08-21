import { StyleSheet, View } from 'react-native';

import { Text } from '@/components/ui/Text';

interface TrackingOrderSummaryCardProps {
  estimatedDelivery: string;
  orderNumber: string;
  shipmentType: string;
}

const styles = StyleSheet.create({
  shipmentBadge: {
    borderRadius: 2,
  },
});

export function TrackingOrderSummaryCard({
  estimatedDelivery,
  orderNumber,
  shipmentType,
}: TrackingOrderSummaryCardProps) {
  return (
    <View className="gap-3 rounded-md border border-border bg-surface p-4">
      <View className="flex-row items-center justify-between gap-3">
        <Text variant="label">Order #{orderNumber}</Text>
        <View className="bg-order-action/10 px-2.5 py-1" style={styles.shipmentBadge}>
          <Text className="uppercase" tone="orderAction" variant="captionStrong">
            {shipmentType}
          </Text>
        </View>
      </View>
      <View className="h-px bg-subtle-border" />
      <View className="gap-1.5">
        <Text tone="muted" variant="caption">
          Estimated Delivery
        </Text>
        <Text variant="bodyStrong">{estimatedDelivery}</Text>
      </View>
    </View>
  );
}
