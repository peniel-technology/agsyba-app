import { ChevronRight, Ticket } from 'lucide-react-native';
import { Pressable } from 'react-native';

import { Text } from '@/components/ui/Text';
import { colors, iconSizes, iconStrokeWidths } from '@/theme';

interface ApplyCouponCardProps {
  onPress: () => void;
}

export function ApplyCouponCard({ onPress }: ApplyCouponCardProps) {
  return (
    <Pressable
      accessibilityLabel="Apply coupon"
      accessibilityRole="button"
      className="flex-row items-center gap-2.5 rounded-md border border-dashed border-brand bg-surface p-3.5 active:bg-sale-surface"
      onPress={onPress}
    >
      <Ticket
        color={colors.brand}
        size={iconSizes.compact}
        strokeWidth={iconStrokeWidths.regular}
      />
      <Text className="flex-1" tone="brand" variant="captionStrong">
        Apply Coupon
      </Text>
      <ChevronRight
        color={colors.brand}
        size={iconSizes.small}
        strokeWidth={iconStrokeWidths.regular}
      />
    </Pressable>
  );
}
