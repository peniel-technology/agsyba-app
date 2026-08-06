import { Check } from 'lucide-react-native';
import { memo } from 'react';
import { Pressable, View } from 'react-native';

import { Text } from '@/components/ui/Text';
import { colors, iconSizes, iconStrokeWidths } from '@/theme';

interface SaveCardCheckboxProps {
  checked: boolean;
  onToggle: () => void;
}

export const SaveCardCheckbox = memo(function SaveCardCheckbox({
  checked,
  onToggle,
}: SaveCardCheckboxProps) {
  return (
    <Pressable
      accessibilityLabel="Save card for faster checkout"
      accessibilityRole="checkbox"
      accessibilityState={{ checked }}
      className="flex-row items-center gap-2"
      onPress={onToggle}
    >
      <View
        accessibilityElementsHidden
        className={`size-4 items-center justify-center rounded border ${
          checked ? 'border-brand bg-brand' : 'border-border bg-surface'
        }`}
      >
        {checked ? (
          <Check
            color={colors.brandForeground}
            size={iconSizes.small}
            strokeWidth={iconStrokeWidths.emphasized}
          />
        ) : null}
      </View>
      <Text tone="muted" variant="caption">
        Save card details securely for future payments
      </Text>
    </Pressable>
  );
});
