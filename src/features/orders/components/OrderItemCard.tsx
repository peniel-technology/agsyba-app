import { Image } from 'expo-image';
import { Truck } from 'lucide-react-native';
import { memo } from 'react';
import { StyleSheet, View } from 'react-native';

import { Text } from '@/components/ui/Text';
import { OrderActionButton } from '@/features/orders/components/OrderActionButton';
import type { OrderItem, OrderItemAction } from '@/features/orders/constants/ordersReturnsData';
import { colors, iconSizes, iconStrokeWidths } from '@/theme';
import { formatCurrency } from '@/utils/formatCurrency';

interface OrderItemCardProps {
  item: OrderItem;
  onActionPress: (action: OrderItemAction, item: OrderItem) => void;
}

const styles = StyleSheet.create({
  productImage: {
    height: 96,
    width: 64,
  },
  statusBadge: {
    borderRadius: 4,
  },
});

const actionVariants: Record<OrderItemAction, 'neutral-outline' | 'outline' | 'primary' | 'text'> =
  {
    'buy-again': 'text',
    'rate-review': 'primary',
    return: 'outline',
    track: 'primary',
  };

function OrderStatusBadge({ label }: { label: string }) {
  const isShipped = label.toLowerCase() === 'shipped';

  return (
    <View
      className={`self-start px-2.5 py-1 ${isShipped ? 'bg-order-shipped' : 'bg-order-delivered'}`}
      style={styles.statusBadge}
    >
      <Text tone="brandForeground" variant="microStrong">
        {label}
      </Text>
    </View>
  );
}

export const OrderItemCard = memo(function OrderItemCard({
  item,
  onActionPress,
}: OrderItemCardProps) {
  return (
    <View className="gap-3 rounded-lg border border-border bg-surface p-4">
      <View className="flex-row items-start gap-4">
        <Image
          accessibilityLabel={item.product.imageAccessibilityLabel}
          className="rounded-sm bg-subtle-surface"
          contentFit="cover"
          source={item.product.image}
          style={styles.productImage}
        />
        <View className="min-w-0 flex-1 gap-1">
          <Text numberOfLines={1} variant="label">
            {item.product.name}
          </Text>
          <Text numberOfLines={2} tone="muted" variant="caption">
            Color: {item.color} · Size: {item.size} · Qty: {item.quantity}
          </Text>
        </View>
        <Text className="shrink-0" variant="label">
          {formatCurrency(item.product.price)}
        </Text>
      </View>

      {item.statusLabel ? <OrderStatusBadge label={item.statusLabel} /> : null}

      <View className="flex-row flex-wrap items-center gap-3">
        {item.actions.map((action) => (
          <OrderActionButton
            action={action}
            key={action}
            onPress={() => onActionPress(action, item)}
            variant={actionVariants[action]}
          />
        ))}
      </View>

      <View className="flex-row items-center gap-2">
        <Truck
          color={colors.orderAction}
          size={iconSizes.small}
          strokeWidth={iconStrokeWidths.subtle}
        />
        <Text className="flex-1" tone="muted" variant="caption">
          {item.detail}
        </Text>
      </View>
    </View>
  );
});
