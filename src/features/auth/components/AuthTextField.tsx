import type { ComponentProps } from 'react';
import { TextInput, View } from 'react-native';

import { Text } from '@/components/ui/Text';
import { colors } from '@/theme';

interface AuthTextFieldProps extends ComponentProps<typeof TextInput> {
  error?: string;
  label: string;
}

export function AuthTextField({ error, label, ...props }: AuthTextFieldProps) {
  return (
    <View className="gap-2">
      <Text variant="captionStrong">{label}</Text>
      <TextInput
        accessibilityLabel={label}
        className={`min-h-12 rounded-sm border bg-surface px-4 py-3 font-manrope text-sm text-foreground ${error ? 'border-error' : 'border-border'}`}
        placeholderTextColor={colors.muted}
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
