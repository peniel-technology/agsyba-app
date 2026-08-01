import { useMemo } from 'react';
import { View } from 'react-native';

import { Text } from '@/components/ui/Text';
import type { Money } from '@/types/product';
import { formatCurrency } from '@/utils/formatCurrency';

interface FreeShippingProgressProps {
  currency: string;
  subtotal: number;
  threshold: number;
}

export function FreeShippingProgress({ currency, subtotal, threshold }: FreeShippingProgressProps) {
  const normalizedThreshold = Math.max(1, threshold);
  const normalizedSubtotal = Math.max(0, subtotal);
  const remainingAmount = Math.max(0, normalizedThreshold - normalizedSubtotal);
  const progressPercentage = Math.min(100, (normalizedSubtotal / normalizedThreshold) * 100);
  const progressStyle = useMemo(
    () => ({ width: `${progressPercentage}%` as `${number}%` }),
    [progressPercentage],
  );
  const remainingMoney: Money = { amount: remainingAmount, currency };
  const message =
    remainingAmount > 0
      ? `Add ${formatCurrency(remainingMoney)} more to enjoy FREE Shipping`
      : 'You unlocked FREE Shipping';

  return (
    <View className="gap-2 bg-sale-surface p-4">
      <Text tone="brand" variant="captionStrong">
        {message}
      </Text>
      <View
        accessibilityLabel={`Free shipping progress, ${Math.round(progressPercentage)} percent`}
        accessibilityRole="progressbar"
        accessibilityValue={{ max: 100, min: 0, now: Math.round(progressPercentage) }}
        className="h-1.5 overflow-hidden rounded-full bg-surface"
      >
        <View className="h-full rounded-full bg-brand" style={progressStyle} />
      </View>
    </View>
  );
}
