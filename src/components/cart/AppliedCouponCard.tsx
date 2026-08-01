import { Check } from 'lucide-react-native';
import { Pressable, View } from 'react-native';

import { Text } from '@/components/ui/Text';
import { colors, iconSizes, iconStrokeWidths } from '@/theme';
import type { Money } from '@/types/product';
import { formatCurrency } from '@/utils/formatCurrency';

interface AppliedCouponCardProps {
  code: string;
  onEditPress: () => void;
  savings: Money;
}

export function AppliedCouponCard({ code, onEditPress, savings }: AppliedCouponCardProps) {
  return (
    <View
      accessibilityLabel={`${code} coupon applied, ${formatCurrency(savings)} saved`}
      className="flex-row items-center gap-2.5 rounded-md bg-success-surface p-3"
    >
      <View className="size-4 items-center justify-center rounded-full bg-success">
        <Check
          color={colors.brandForeground}
          size={iconSizes.small}
          strokeWidth={iconStrokeWidths.emphasized}
        />
      </View>
      <View className="flex-1 gap-0.5">
        <Text tone="success" variant="captionStrong">
          {code} applied
        </Text>
        <Text tone="success" variant="detailMedium">
          {formatCurrency(savings)} savings with this coupon
        </Text>
      </View>
      <Pressable
        accessibilityLabel={`Edit ${code} coupon`}
        accessibilityRole="button"
        className="min-h-10 justify-center active:opacity-70"
        onPress={onEditPress}
      >
        <Text className="uppercase" tone="brand" variant="captionStrong">
          Edit
        </Text>
      </Pressable>
    </View>
  );
}
