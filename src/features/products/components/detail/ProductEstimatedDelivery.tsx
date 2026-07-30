import { Truck } from 'lucide-react-native';
import { View } from 'react-native';

import { Text } from '@/components/ui/Text';
import { colors, iconSizes, iconStrokeWidths } from '@/theme';

interface ProductEstimatedDeliveryProps {
  deliveryWindow: string;
  shippingLabel: string;
}

export function ProductEstimatedDelivery({
  deliveryWindow,
  shippingLabel,
}: ProductEstimatedDeliveryProps) {
  return (
    <View className="flex-row flex-wrap items-center gap-3 px-4">
      <View className="flex-row items-center gap-2">
        <Truck
          accessible={false}
          color={colors.brand}
          size={iconSizes.compact}
          strokeWidth={iconStrokeWidths.subtle}
        />
        <Text tone="muted" variant="caption">
          Estimated delivery: {deliveryWindow}
        </Text>
      </View>
      <View className="rounded-sm bg-sale-surface px-2 py-1">
        <Text className="uppercase" tone="brand" variant="detailStrong">
          {shippingLabel}
        </Text>
      </View>
    </View>
  );
}
