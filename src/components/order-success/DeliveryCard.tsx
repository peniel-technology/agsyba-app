import { Truck } from 'lucide-react-native';
import { memo } from 'react';
import { View } from 'react-native';

import { ShippingAddress } from '@/components/order-success/ShippingAddress';
import { Text } from '@/components/ui/Text';
import { colors, iconSizes, iconStrokeWidths } from '@/theme';

interface DeliveryCardProps {
  addressLine: string;
  customerName: string;
  deliveryDate: string;
  shippingMethod: string;
}

export const DeliveryCard = memo(function DeliveryCard({
  addressLine,
  customerName,
  deliveryDate,
  shippingMethod,
}: DeliveryCardProps) {
  return (
    <View className="rounded-md border border-border bg-surface p-4 shadow-sm">
      <View className="flex-row items-center gap-3">
        <View className="rounded-lg bg-red-50 p-2">
          <Truck
            color={colors.brand}
            size={iconSizes.medium}
            strokeWidth={iconStrokeWidths.regular}
          />
        </View>
        <View className="flex-1 gap-0.5">
          <Text className="text-sm" tone="brand" variant="captionStrong">
            Expected Delivery: {deliveryDate}
          </Text>
          <Text className="text-xs" tone="muted" variant="caption">
            {shippingMethod}
          </Text>
        </View>
      </View>
      <View className="h-px border border-border mt-3" />
      <View className="pt-3">
        <ShippingAddress addressLine={addressLine} customerName={customerName} />
      </View>
    </View>
  );
});
