import { Pressable, View } from 'react-native';

import { Text } from '@/components/ui/Text';
import {
  returnReasonOptions,
  type ReturnReason,
} from '@/features/orders/constants/returnExchangeData';

interface ReturnReasonChipsProps {
  onChange: (value: ReturnReason) => void;
  value: ReturnReason;
}

export function ReturnReasonChips({ onChange, value }: ReturnReasonChipsProps) {
  return (
    <View className="flex-row flex-wrap gap-2">
      {returnReasonOptions.map((option) => {
        const isSelected = option.value === value;

        return (
          <Pressable
            accessibilityLabel={`Return reason: ${option.label}`}
            accessibilityRole="radio"
            accessibilityState={{ checked: isSelected }}
            className={`rounded-full border px-3 py-2 active:opacity-70 ${
              isSelected ? 'border-order-action bg-sale-surface' : 'border-border bg-surface'
            }`}
            key={option.value}
            onPress={() => onChange(option.value)}
          >
            <Text tone={isSelected ? 'orderAction' : 'default'} variant="captionStrong">
              {option.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
