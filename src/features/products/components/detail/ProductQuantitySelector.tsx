import { Minus, Plus } from 'lucide-react-native';
import { Pressable, View } from 'react-native';

import { Text } from '@/components/ui/Text';
import { colors, iconSizes, iconStrokeWidths, spacing } from '@/theme';

interface ProductQuantitySelectorProps {
  onQuantityChange: (quantity: number) => void;
  quantity: number;
}

const minimumQuantity = 1;

export function ProductQuantitySelector({
  onQuantityChange,
  quantity,
}: ProductQuantitySelectorProps) {
  const normalizedQuantity = Math.max(minimumQuantity, Math.trunc(quantity));
  const canDecrease = normalizedQuantity > minimumQuantity;

  return (
    <View className="gap-3 px-4">
      <Text className="uppercase" variant="captionStrong">
        Quantity
      </Text>
      <View className="flex-row items-center gap-3">
        <Pressable
          accessibilityLabel="Decrease quantity"
          accessibilityRole="button"
          accessibilityState={{ disabled: !canDecrease }}
          className="size-8 items-center justify-center rounded-md border border-subtle-border bg-subtle-surface active:opacity-70 disabled:opacity-40"
          disabled={!canDecrease}
          hitSlop={spacing[1]}
          onPress={() => onQuantityChange(normalizedQuantity - 1)}
        >
          <Minus
            accessible={false}
            color={colors.text}
            size={iconSizes.small}
            strokeWidth={iconStrokeWidths.emphasized}
          />
        </Pressable>
        <Text accessibilityLabel={`Quantity ${normalizedQuantity}`} variant="bodyStrong">
          {normalizedQuantity}
        </Text>
        <Pressable
          accessibilityLabel="Increase quantity"
          accessibilityRole="button"
          className="size-8 items-center justify-center rounded-md border border-subtle-border bg-subtle-surface active:opacity-70"
          hitSlop={spacing[1]}
          onPress={() => onQuantityChange(normalizedQuantity + 1)}
        >
          <Plus
            accessible={false}
            color={colors.text}
            size={iconSizes.small}
            strokeWidth={iconStrokeWidths.emphasized}
          />
        </Pressable>
      </View>
    </View>
  );
}
