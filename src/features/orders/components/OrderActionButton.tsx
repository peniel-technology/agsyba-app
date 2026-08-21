import { Pressable, StyleSheet } from 'react-native';

import { Text } from '@/components/ui/Text';
import type { OrderItemAction } from '@/features/orders/constants/ordersReturnsData';

type OrderActionButtonVariant = 'neutral-outline' | 'outline' | 'primary' | 'text';

interface OrderActionButtonProps {
  action: OrderItemAction;
  onPress: () => void;
  variant: OrderActionButtonVariant;
}

const actionLabels: Record<OrderItemAction, string> = {
  'buy-again': 'Buy Again',
  'rate-review': 'Rate & Review',
  return: 'Return / Exchange',
  track: 'Track Order',
};

const variantClassNames: Record<OrderActionButtonVariant, string> = {
  'neutral-outline': 'border border-border',
  outline: 'border border-order-action',
  primary: 'bg-order-action',
  text: 'px-0',
};

const textTones: Record<OrderActionButtonVariant, 'brandForeground' | 'muted' | 'orderAction'> = {
  'neutral-outline': 'muted',
  outline: 'orderAction',
  primary: 'brandForeground',
  text: 'orderAction',
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 2,
  },
});

export function OrderActionButton({ action, onPress, variant }: OrderActionButtonProps) {
  return (
    <Pressable
      accessibilityLabel={actionLabels[action]}
      accessibilityRole="button"
      className={`min-h-9 justify-center px-4 py-2 active:opacity-70 ${variantClassNames[variant]}`}
      onPress={onPress}
      style={styles.button}
    >
      <Text numberOfLines={1} tone={textTones[variant]} variant="captionStrong">
        {actionLabels[action]}
      </Text>
    </Pressable>
  );
}
