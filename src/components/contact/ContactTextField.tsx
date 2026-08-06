import type { KeyboardTypeOptions } from 'react-native';
import { TextInput, View } from 'react-native';

import { Text } from '@/components/ui/Text';
import { colors } from '@/theme/colors';

export interface ContactTextFieldProps {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  keyboardType?: KeyboardTypeOptions;
}

export function ContactTextField({
  label,
  placeholder,
  value,
  onChangeText,
  keyboardType = 'default',
}: ContactTextFieldProps) {
  return (
    <View className="w-full flex-col gap-1.5">
      <Text className="text-xs font-manrope-bold text-neutral-900">{label}</Text>
      <TextInput
        accessibilityLabel={label}
        className="h-11 rounded-sm border border-zinc-100 bg-white px-4 text-sm font-manrope text-neutral-900"
        keyboardType={keyboardType}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.muted}
        value={value}
      />
    </View>
  );
}
