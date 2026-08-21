import { Check } from 'lucide-react-native';
import { Pressable, View } from 'react-native';

import { Text } from '@/components/ui/Text';
import { colors, iconSizes, iconStrokeWidths } from '@/theme';

interface ReturnConfirmationCheckboxProps {
  checked: boolean;
  error?: string;
  onToggle: () => void;
}

export function ReturnConfirmationCheckbox({
  checked,
  error,
  onToggle,
}: ReturnConfirmationCheckboxProps) {
  return (
    <View className="gap-1.5">
      <Pressable
        accessibilityLabel="Confirm original item condition"
        accessibilityRole="checkbox"
        accessibilityState={{ checked }}
        className="flex-row items-start gap-2.5 active:opacity-70"
        onPress={onToggle}
      >
        <View
          className={`mt-0.5 size-4 items-center justify-center rounded-sm border ${
            checked ? 'border-order-action bg-order-action' : 'border-border bg-surface'
          }`}
        >
          {checked ? (
            <Check
              accessible={false}
              color={colors.brandForeground}
              size={iconSizes.small}
              strokeWidth={iconStrokeWidths.emphasized}
            />
          ) : null}
        </View>
        <Text className="flex-1" variant="caption">
          I confirm that the item is unused, unwashed &amp; in original condition with all tags
          attached
        </Text>
      </Pressable>
      {error ? (
        <Text accessibilityRole="alert" className="pl-6" tone="error" variant="detail">
          {error}
        </Text>
      ) : null}
    </View>
  );
}
