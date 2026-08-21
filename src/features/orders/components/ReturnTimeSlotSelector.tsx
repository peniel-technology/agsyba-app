import { Pressable, View } from 'react-native';

import { Text } from '@/components/ui/Text';
import {
  returnTimeSlotOptions,
  type PickupTimeSlot,
} from '@/features/orders/constants/returnExchangeMethodData';

interface ReturnTimeSlotSelectorProps {
  onChange: (value: PickupTimeSlot) => void;
  value: PickupTimeSlot;
}

export function ReturnTimeSlotSelector({ onChange, value }: ReturnTimeSlotSelectorProps) {
  return (
    <View className="gap-1.5">
      <Text tone="muted" variant="caption">
        Preferred Time Slot
      </Text>
      <View className="flex-row gap-2">
        {returnTimeSlotOptions.map((option) => {
          const isSelected = option.value === value;

          return (
            <Pressable
              accessibilityLabel={`Pickup time: ${option.label}`}
              accessibilityRole="radio"
              accessibilityState={{ checked: isSelected }}
              className={`min-w-0 flex-1 items-center rounded-full border py-2 active:opacity-70 ${
                isSelected ? 'border-order-action bg-order-action' : 'border-border bg-surface'
              }`}
              key={option.value}
              onPress={() => onChange(option.value)}
            >
              <Text tone={isSelected ? 'brandForeground' : 'muted'} variant="captionMedium">
                {option.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
