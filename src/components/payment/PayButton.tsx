import { memo } from 'react';
import { Pressable } from 'react-native';

import { Text } from '@/components/ui/Text';

interface PayButtonProps {
  disabled: boolean;
  label: string;
  onPress: () => void;
}

export const PayButton = memo(function PayButton({ disabled, label, onPress }: PayButtonProps) {
  return (
    <Pressable
      accessibilityLabel="Pay now"
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      className="mt-3 h-12 items-center justify-center rounded-sm bg-brand active:opacity-80 disabled:opacity-50"
      disabled={disabled}
      onPress={onPress}
    >
      <Text className="uppercase" tone="brandForeground" variant="label">
        {label}
      </Text>
    </Pressable>
  );
});
