import { Check } from 'lucide-react-native';
import { Pressable, View } from 'react-native';

import { Text } from '@/components/ui/Text';
import { colors } from '@/theme/colors';

export interface ContactCheckboxProps {
  checked: boolean;
  label: string;
  onToggle: () => void;
}

export function ContactCheckbox({ checked, label, onToggle }: ContactCheckboxProps) {
  return (
    <Pressable
      accessibilityRole="checkbox"
      accessibilityState={{ checked }}
      className="inline-flex flex-row items-center gap-2.5"
      onPress={onToggle}
    >
      <View className="size-4 items-center justify-center rounded-[3px] border-2 border-red-500 bg-white">
        {checked ? <Check color={colors.brand} size={11} strokeWidth={3} /> : null}
      </View>
      <Text className="flex-1 text-sm font-manrope text-neutral-500">{label}</Text>
    </Pressable>
  );
}
