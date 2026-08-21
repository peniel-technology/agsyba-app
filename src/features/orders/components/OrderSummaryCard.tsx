import { ChevronRight } from 'lucide-react-native';
import { Pressable, View } from 'react-native';

import { Text } from '@/components/ui/Text';
import { colors, iconSizes, iconStrokeWidths } from '@/theme';

interface OrderSummaryCardProps {
  itemCount: number;
  onTrackPress: () => void;
  orderDate: string;
  orderNumber: string;
  shippingMethod: string;
  total: string;
}

export function OrderSummaryCard({
  itemCount,
  onTrackPress,
  orderDate,
  orderNumber,
  shippingMethod,
  total,
}: OrderSummaryCardProps) {
  return (
    <View className="rounded-lg border border-border bg-surface p-4">
      <View className="flex-row items-start justify-between gap-3">
        <View className="min-w-0 flex-1 gap-0.5">
          <Text numberOfLines={1} variant="bodyStrong">
            Order #{orderNumber}
          </Text>
          <Text className="leading-4" tone="muted" variant="caption">
            Placed on {orderDate} · {itemCount} items · {shippingMethod} · Total: {total}
          </Text>
        </View>
        <Pressable
          accessibilityLabel="Track order"
          accessibilityRole="button"
          className="flex-row items-center gap-1 active:opacity-70"
          onPress={onTrackPress}
        >
          <Text tone="brand" variant="label">
            Track Order
          </Text>
          <ChevronRight
            color={colors.brand}
            size={iconSizes.small}
            strokeWidth={iconStrokeWidths.emphasized}
          />
        </Pressable>
      </View>
    </View>
  );
}
