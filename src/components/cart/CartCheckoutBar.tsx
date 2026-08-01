import { Pressable, View } from 'react-native';

import { Text } from '@/components/ui/Text';
import type { Money } from '@/types/product';
import { formatCurrency } from '@/utils/formatCurrency';

interface CartCheckoutBarProps {
  disabled?: boolean;
  onCheckoutPress: () => void;
  total: Money;
}

export function CartCheckoutBar({
  disabled = false,
  onCheckoutPress,
  total,
}: CartCheckoutBarProps) {
  return (
    <View className="flex-row items-center justify-between gap-4 border-t border-subtle-border bg-surface px-4 py-3 shadow-lg">
      <View className="items-start">
        <Text variant="bodyStrong">{formatCurrency(total)}</Text>
      </View>

      <Pressable
        accessibilityLabel="Proceed to checkout"
        accessibilityRole="button"
        accessibilityState={{ disabled }}
        className="items-center justify-center rounded-sm bg-brand px-8 py-3 active:opacity-80 disabled:opacity-50"
        disabled={disabled}
        onPress={onCheckoutPress}
      >
        <Text className="uppercase" tone="brandForeground" variant="captionStrong">
          Proceed to Checkout
        </Text>
      </Pressable>
    </View>
  );
}
