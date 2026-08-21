import type { Ref } from 'react';
import { TextInput, View, type TextInputProps } from 'react-native';

import { Text } from '@/components/ui/Text';
import { colors } from '@/theme';

interface SavedCardFieldProps extends Omit<TextInputProps, 'onChangeText' | 'value'> {
  error?: string;
  inputRef?: Ref<TextInput>;
  label: string;
  onChangeText: (value: string) => void;
  value: string;
}

export function SavedCardField({
  error,
  inputRef,
  label,
  onChangeText,
  value,
  ...props
}: SavedCardFieldProps) {
  return (
    <View className="gap-2">
      <Text variant="captionStrong">{label}</Text>
      <TextInput
        accessibilityLabel={label}
        className={`h-11 rounded-sm border bg-surface px-4 font-manrope text-sm text-foreground ${
          error ? 'border-error' : 'border-border'
        }`}
        onChangeText={onChangeText}
        placeholderTextColor={colors.muted}
        ref={inputRef}
        value={value}
        {...props}
      />
      {error ? (
        <Text accessibilityRole="alert" tone="error" variant="detail">
          {error}
        </Text>
      ) : null}
    </View>
  );
}
