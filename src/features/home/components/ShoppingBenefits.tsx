import { View } from 'react-native';

import { Text } from '@/components/ui/Text';
import type { ShoppingBenefit } from '@/features/home/types/shoppingBenefit';
import { colors, iconSizes, iconStrokeWidths } from '@/theme';

interface ShoppingBenefitsProps {
  benefits: readonly ShoppingBenefit[];
}

export function ShoppingBenefits({ benefits }: ShoppingBenefitsProps) {
  return (
    <View className="flex-row gap-2 px-4">
      {benefits.map((benefit) => {
        const Icon = benefit.icon;

        return (
          <View
            accessibilityLabel={`${benefit.title}. ${benefit.description}`}
            accessible
            className="flex-1 items-center gap-2 rounded-xl border border-subtle-border bg-subtle-surface p-3 shadow-md"
            key={benefit.id}
          >
            <Icon
              accessible={false}
              color={colors.brand}
              size={iconSizes.compact}
              strokeWidth={iconStrokeWidths.subtle}
            />

            <View className="items-center gap-1">
              <Text className="text-center" numberOfLines={1} variant="captionStrong">
                {benefit.title}
              </Text>
              <Text className="text-center" numberOfLines={1} tone="muted" variant="micro">
                {benefit.description}
              </Text>
            </View>
          </View>
        );
      })}
    </View>
  );
}
