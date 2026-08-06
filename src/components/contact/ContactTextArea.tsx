import { TextInput, View } from 'react-native';

import { Text } from '@/components/ui/Text';
import { colors } from '@/theme/colors';

export interface ContactTextAreaProps {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
}

export function ContactTextArea({ label, placeholder, value, onChangeText }: ContactTextAreaProps) {
  return (
    <View className="w-full flex-col gap-1.5">
      <Text className="text-xs font-manrope-bold text-neutral-900">{label}</Text>
      <TextInput
        accessibilityLabel={label}
        className="min-h-28 rounded-sm border border-zinc-100 bg-white px-4 py-4 text-sm font-manrope text-neutral-900"
        multiline
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.muted}
        textAlignVertical="top"
        value={value}
      />
    </View>
  );
}
