import type { ComponentProps } from 'react';
import { Text, TextInput, View } from 'react-native';

import { colors } from '@/theme/colors';

interface InputProps extends ComponentProps<typeof TextInput> {
  label: string;
  error?: string;
}

export function Input({ label, error, ...props }: InputProps) {
  return (
    <View className="gap-2">
      <Text className="text-sm font-manrope-semibold text-foreground">{label}</Text>
      <TextInput
        accessibilityLabel={label}
        className="min-h-12 rounded-xl border border-border bg-surface px-4 text-base font-manrope text-foreground"
        placeholderTextColor={colors.muted}
        {...props}
      />
      {error ? (
        <Text accessibilityRole="alert" className="text-sm font-manrope text-error">
          {error}
        </Text>
      ) : null}
    </View>
  );
}
