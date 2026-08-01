import { Check, Minus } from 'lucide-react-native';
import { Pressable, View } from 'react-native';

import { Text } from '@/components/ui/Text';
import { colors, iconSizes, iconStrokeWidths } from '@/theme';

interface SelectAllCartItemsProps {
  isAllSelected: boolean;
  isPartiallySelected: boolean;
  onSelectionChange: () => void;
  productCount: number;
}

export function SelectAllCartItems({
  isAllSelected,
  isPartiallySelected,
  onSelectionChange,
  productCount,
}: SelectAllCartItemsProps) {
  const isChecked = isAllSelected || isPartiallySelected;
  const accessibilityChecked = isPartiallySelected ? 'mixed' : isAllSelected;
  const actionLabel = isAllSelected ? 'Deselect all cart products' : 'Select all cart products';

  return (
    <Pressable
      accessibilityLabel={actionLabel}
      accessibilityRole="checkbox"
      accessibilityState={{ checked: accessibilityChecked }}
      className="flex-row items-center gap-3 rounded-md border border-subtle-border bg-surface px-3 py-3 active:bg-subtle-surface"
      onPress={onSelectionChange}
    >
      <View
        className={`size-5 items-center justify-center rounded-sm border ${
          isChecked ? 'border-brand bg-brand' : 'border-brand bg-surface'
        }`}
        pointerEvents="none"
      >
        {isAllSelected ? (
          <Check
            color={colors.brandForeground}
            size={iconSizes.small}
            strokeWidth={iconStrokeWidths.emphasized}
          />
        ) : null}
        {isPartiallySelected ? (
          <Minus
            color={colors.brandForeground}
            size={iconSizes.small}
            strokeWidth={iconStrokeWidths.emphasized}
          />
        ) : null}
      </View>

      <Text className="flex-1" variant="captionStrong">
        Select All ({productCount} {productCount === 1 ? 'product' : 'products'})
      </Text>
      <Text tone="muted" variant="detailMedium">
        {isAllSelected ? 'Deselect All' : 'Select All'}
      </Text>
    </Pressable>
  );
}
