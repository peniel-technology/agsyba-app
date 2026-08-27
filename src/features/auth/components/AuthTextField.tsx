import type { ComponentProps } from 'react';
import { TextInput, View } from 'react-native';

import { Text } from '@/components/ui/Text';
import { colors } from '@/theme';

interface AuthTextFieldProps extends ComponentProps<typeof TextInput> {
  error?: string;
  label: string;
  showErrorBorder?: boolean;
}

export function AuthTextField({
  error,
  label,
  showErrorBorder = false,
  ...props
}: AuthTextFieldProps) {
  return (
    <View className="gap-2">
      <Text variant="captionStrong">{label}</Text>
      <TextInput
        accessibilityHint={error}
        accessibilityLabel={label}
        className={`min-h-12 rounded-sm border bg-surface px-4 py-3 font-manrope text-sm text-foreground ${error && showErrorBorder ? 'border-error' : 'border-border'}`}
        placeholderTextColor={colors.muted}
        {...props}
      />
    </View>
  );
}
