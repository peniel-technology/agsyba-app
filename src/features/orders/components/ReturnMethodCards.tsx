import { Pressable, View } from 'react-native';

import { Text } from '@/components/ui/Text';
import {
  returnMethodOptions,
  type ReturnMethod,
} from '@/features/orders/constants/returnExchangeMethodData';
import { colors, iconSizes, iconStrokeWidths } from '@/theme';

interface ReturnMethodCardsProps {
  onChange: (value: ReturnMethod) => void;
  value: ReturnMethod;
}

export function ReturnMethodCards({ onChange, value }: ReturnMethodCardsProps) {
  return (
    <View className="gap-2.5">
      {returnMethodOptions.map((option) => {
        const isSelected = option.value === value;
        const Icon = option.icon;

        return (
          <Pressable
            accessibilityLabel={`Return method: ${option.label}`}
            accessibilityRole="radio"
            accessibilityState={{ checked: isSelected }}
            className={`flex-row items-center gap-3 rounded-lg border p-3 active:opacity-70 ${
              isSelected ? 'border-order-action bg-sale-surface' : 'border-border bg-surface'
            }`}
            key={option.value}
            onPress={() => onChange(option.value)}
          >
            <View
              className={`size-4 items-center justify-center rounded-full border-4 ${
                isSelected ? 'border-order-action' : 'border-muted border-2'
              }`}
            />
            <View className="min-w-0 flex-1 gap-0.5">
              <Text variant="label">{option.label}</Text>
              <Text tone="muted" variant="caption">
                {option.description}
              </Text>
            </View>
            <Icon
              color={isSelected ? colors.orderAction : colors.text}
              size={iconSizes.medium}
              strokeWidth={iconStrokeWidths.regular}
            />
          </Pressable>
        );
      })}
    </View>
  );
}
