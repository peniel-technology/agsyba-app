import { Check } from 'lucide-react-native';
import { useController, useFormContext } from 'react-hook-form';
import { Pressable, View } from 'react-native';

import { Text } from '@/components/ui/Text';
import type { DeliveryAddressValues } from '@/features/checkout/schemas/deliveryAddressSchema';
import { colors, iconSizes, iconStrokeWidths } from '@/theme';

export function DefaultAddressToggle() {
  const { control } = useFormContext<DeliveryAddressValues>();
  const { field } = useController({ control, name: 'isDefault' });

  return (
    <Pressable
      accessibilityLabel="Make this my default address"
      accessibilityRole="checkbox"
      accessibilityState={{ checked: field.value }}
      className="flex-row items-center gap-2.5 active:opacity-70"
      onPress={() => field.onChange(!field.value)}
    >
      <View
        className={`size-5 items-center justify-center rounded-sm border ${
          field.value ? 'border-brand bg-brand' : 'border-border bg-surface'
        }`}
      >
        {field.value ? (
          <Check
            color={colors.brandForeground}
            size={iconSizes.small}
            strokeWidth={iconStrokeWidths.emphasized}
          />
        ) : null}
      </View>
      <Text className="flex-1" variant="label">
        Make this my default address
      </Text>
    </Pressable>
  );
}
