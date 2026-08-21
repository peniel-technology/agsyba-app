import { Check } from 'lucide-react-native';
import { Pressable, View } from 'react-native';

import { Text } from '@/components/ui/Text';
import { colors, iconSizes, iconStrokeWidths } from '@/theme';

interface SavedCardCheckboxProps {
  checked: boolean;
  onToggle: () => void;
}

export function SavedCardCheckbox({ checked, onToggle }: SavedCardCheckboxProps) {
  return (
    <Pressable
      accessibilityLabel="Save this card for future purchases"
      accessibilityRole="checkbox"
      accessibilityState={{ checked }}
      className="flex-row items-center gap-2 pt-1 active:opacity-70"
      onPress={onToggle}
    >
      <View
        className={`size-4 items-center justify-center rounded-sm border ${
          checked ? 'border-order-action bg-surface' : 'border-border bg-surface'
        }`}
      >
        {checked ? (
          <Check
            color={colors.orderAction}
            size={iconSizes.small}
            strokeWidth={iconStrokeWidths.emphasized}
          />
        ) : null}
      </View>
      <Text variant="caption">Save this card for future purchases</Text>
    </Pressable>
  );
}
