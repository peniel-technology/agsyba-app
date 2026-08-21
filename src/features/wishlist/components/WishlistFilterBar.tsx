import { ChevronDown, Filter } from 'lucide-react-native';
import { Pressable, ScrollView } from 'react-native';

import { Text } from '@/components/ui/Text';
import { colors, iconSizes, iconStrokeWidths, spacing } from '@/theme';

interface WishlistFilterBarProps {
  isPriceAscending: boolean;
  onSortPress: () => void;
}

interface FilterChipProps {
  children: string;
  disabled?: boolean;
  onPress?: () => void;
  variant?: 'outline' | 'solid';
}

function FilterChip({ children, disabled = false, onPress, variant = 'outline' }: FilterChipProps) {
  return (
    <Pressable
      accessibilityLabel={children}
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      className={`h-9 flex-row items-center gap-1.5 rounded-full px-3 active:opacity-70 ${
        variant === 'solid' ? 'bg-brand' : 'border border-border bg-surface'
      }`}
      disabled={disabled}
      onPress={onPress}
    >
      <Text
        className="whitespace-nowrap"
        tone={variant === 'solid' ? 'brandForeground' : 'default'}
        variant="captionMedium"
      >
        {children}
      </Text>
      {variant === 'solid' ? (
        <Filter
          color={colors.brandForeground}
          size={iconSizes.small}
          strokeWidth={iconStrokeWidths.regular}
        />
      ) : (
        <ChevronDown
          color={colors.text}
          size={iconSizes.small}
          strokeWidth={iconStrokeWidths.regular}
        />
      )}
    </Pressable>
  );
}

export function WishlistFilterBar({ isPriceAscending, onSortPress }: WishlistFilterBarProps) {
  return (
    <ScrollView
      accessibilityLabel="Wishlist filters"
      contentContainerStyle={{ gap: spacing[2], paddingHorizontal: spacing[4] }}
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      <FilterChip disabled variant="solid">
        Filter
      </FilterChip>
      <FilterChip onPress={onSortPress}>
        {isPriceAscending ? 'Sort: Low to High' : 'Sort: High to Low'}
      </FilterChip>
      <FilterChip disabled>Category</FilterChip>
      <FilterChip disabled>Size</FilterChip>
      <FilterChip disabled>Color</FilterChip>
    </ScrollView>
  );
}
