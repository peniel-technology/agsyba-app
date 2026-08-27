import { Check } from 'lucide-react-native';
import { Pressable, View } from 'react-native';

import { Text } from '@/components/ui/Text';
import { colors } from '@/theme/colors';

export interface ContactCheckboxProps {
  checked: boolean;
  label: string;
  onToggle: () => void;
  error?: string;
}

export function ContactCheckbox({ checked, error, label, onToggle }: ContactCheckboxProps) {
  return (
    <View className="w-full gap-1.5">
      <Pressable
        accessibilityLabel={label}
        accessibilityRole="checkbox"
        accessibilityState={{ checked }}
        className="flex-row items-center gap-2.5"
        onPress={onToggle}
      >
        <View
          className={`size-4 items-center justify-center rounded-[3px] border-2 bg-white ${error ? 'border-error' : 'border-red-500'}`}
        >
          {checked ? <Check color={colors.brand} size={11} strokeWidth={3} /> : null}
        </View>
        <Text className="flex-1 text-sm font-manrope text-neutral-500">{label}</Text>
      </Pressable>
      {error ? (
        <Text accessibilityRole="alert" tone="error" variant="detail">
          {error}
        </Text>
      ) : null}
    </View>
  );
}
