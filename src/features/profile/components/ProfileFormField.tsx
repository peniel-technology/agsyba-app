import type { ComponentProps, ReactNode } from 'react';
import { TextInput, View } from 'react-native';

import { Text } from '@/components/ui/Text';
import { colors } from '@/theme';

interface ProfileFormFieldProps extends Omit<
  ComponentProps<typeof TextInput>,
  'onChangeText' | 'value'
> {
  label: string;
  onChangeText?: (value: string) => void;
  trailing?: ReactNode;
  value: string;
}

export function ProfileFormField({
  editable = true,
  label,
  onChangeText,
  placeholder,
  trailing,
  value,
  ...inputProps
}: ProfileFormFieldProps) {
  return (
    <View className="gap-2">
      <Text variant="captionStrong">{label}</Text>
      <View className="min-h-12 flex-row items-center gap-2 rounded-sm border border-border bg-surface px-4 py-3">
        <TextInput
          accessibilityLabel={label}
          className={`min-h-6 flex-1 py-0 font-manrope text-sm ${editable ? 'text-foreground' : 'text-muted'}`}
          editable={editable}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.muted}
          value={value}
          {...inputProps}
        />
        {trailing}
      </View>
    </View>
  );
}
