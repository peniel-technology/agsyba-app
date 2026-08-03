import { Briefcase, House, MapPin, type LucideIcon } from 'lucide-react-native';
import { useController, useFormContext } from 'react-hook-form';
import { Pressable, View } from 'react-native';

import { Text } from '@/components/ui/Text';
import type { DeliveryAddressValues } from '@/features/checkout/schemas/deliveryAddressSchema';
import { colors, iconSizes, iconStrokeWidths } from '@/theme';

interface AddressTypeOption {
  icon: LucideIcon;
  label: string;
  value: DeliveryAddressValues['addressType'];
}

const addressTypeOptions = [
  { icon: House, label: 'Home', value: 'home' },
  { icon: Briefcase, label: 'Work', value: 'work' },
  { icon: MapPin, label: 'Other', value: 'other' },
] as const satisfies readonly AddressTypeOption[];

export function AddressTypeSelector() {
  const { control } = useFormContext<DeliveryAddressValues>();
  const { field } = useController({ control, name: 'addressType' });

  return (
    <View className="gap-3">
      <Text className="uppercase" tone="muted" variant="captionStrong">
        Save Address As
      </Text>
      <View accessibilityRole="radiogroup" className="flex-row flex-wrap gap-2.5">
        {addressTypeOptions.map((option) => {
          const isSelected = field.value === option.value;
          const Icon = option.icon;

          return (
            <Pressable
              accessibilityLabel={`Save address as ${option.label}`}
              accessibilityRole="radio"
              accessibilityState={{ checked: isSelected }}
              className={`flex-row items-center gap-1.5 rounded-full border px-4 py-2 active:opacity-70 ${
                isSelected ? 'border-brand bg-brand' : 'border-border bg-surface'
              }`}
              key={option.value}
              onPress={() => field.onChange(option.value)}
            >
              <Icon
                color={isSelected ? colors.brandForeground : colors.muted}
                size={iconSizes.small}
                strokeWidth={iconStrokeWidths.emphasized}
              />
              <Text tone={isSelected ? 'brandForeground' : 'muted'} variant="captionStrong">
                {option.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
