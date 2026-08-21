import { ShoppingBag } from 'lucide-react-native';
import { Pressable } from 'react-native';

import { Text } from '@/components/ui/Text';
import { colors, iconSizes, iconStrokeWidths } from '@/theme';

interface ProductAddToCartButtonProps {
  accessibilityLabel: string;
  disabled?: boolean;
  label?: 'Add to Bag' | 'Add to Cart' | 'Go to Bag';
  onPress?: () => void;
}

export function ProductAddToCartButton({
  accessibilityLabel,
  disabled = false,
  label = 'Add to Bag',
  onPress,
}: ProductAddToCartButtonProps) {
  const isDisabled = disabled || onPress === undefined;

  return (
    <Pressable
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled }}
      className="min-h-8 flex-row items-center justify-center gap-1.5 rounded-sm border border-brand bg-surface px-3 py-2 active:bg-sale-surface disabled:opacity-50"
      disabled={isDisabled}
      onPress={onPress}
    >
      <ShoppingBag
        accessible={false}
        color={colors.brand}
        size={iconSizes.small}
        strokeWidth={iconStrokeWidths.regular}
      />
      <Text tone="brand" variant="badge">
        {label}
      </Text>
    </Pressable>
  );
}
