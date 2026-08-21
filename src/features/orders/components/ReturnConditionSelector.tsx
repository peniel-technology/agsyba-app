import { Pressable, View } from 'react-native';

import { Text } from '@/components/ui/Text';
import type { ReturnCondition } from '@/features/orders/constants/returnExchangeData';
import { returnConditionOptions } from '@/features/orders/constants/returnExchangeData';

interface ReturnConditionSelectorProps {
  onChange: (value: ReturnCondition) => void;
  value: ReturnCondition;
}

export function ReturnConditionSelector({ onChange, value }: ReturnConditionSelectorProps) {
  return (
    <View accessibilityRole="radiogroup" className="flex-row flex-wrap gap-4">
      {returnConditionOptions.map((option) => {
        const isSelected = option.value === value;

        return (
          <Pressable
            accessibilityLabel={`Item condition: ${option.label}`}
            accessibilityRole="radio"
            accessibilityState={{ checked: isSelected }}
            className="flex-row items-center gap-2 active:opacity-70"
            key={option.value}
            onPress={() => onChange(option.value)}
          >
            <View
              className={`size-4 items-center justify-center rounded-full border ${
                isSelected ? 'border-order-action' : 'border-muted'
              }`}
            >
              {isSelected ? (
                <View className="size-2.5 rounded-full bg-order-action" accessible={false} />
              ) : null}
            </View>
            <Text variant="label">{option.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}
