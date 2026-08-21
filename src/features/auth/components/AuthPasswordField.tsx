import { Eye, EyeOff } from 'lucide-react-native';
import type { ComponentProps } from 'react';
import { Pressable, TextInput, View } from 'react-native';

import { Text } from '@/components/ui/Text';
import { colors, iconSizes, iconStrokeWidths } from '@/theme';

interface AuthPasswordFieldProps extends Omit<
  ComponentProps<typeof TextInput>,
  'onChangeText' | 'value'
> {
  error?: string;
  isVisible: boolean;
  label: string;
  onChangeText: (value: string) => void;
  onToggleVisibility: () => void;
  value: string;
}

export function AuthPasswordField({
  error,
  isVisible,
  label,
  onChangeText,
  onToggleVisibility,
  value,
  ...props
}: AuthPasswordFieldProps) {
  return (
    <View className="gap-2">
      <Text variant="captionStrong">{label}</Text>
      <View
        className={`min-h-12 flex-row items-center gap-3 rounded-sm border bg-surface px-4 py-3 ${error ? 'border-error' : 'border-border'}`}
      >
        <TextInput
          accessibilityLabel={label}
          autoCapitalize="none"
          className="min-h-6 flex-1 py-0 font-manrope text-sm text-foreground"
          onChangeText={onChangeText}
          placeholder={label === 'Password' ? 'Enter your password' : 'Confirm your password'}
          placeholderTextColor={colors.muted}
          secureTextEntry={!isVisible}
          value={value}
          {...props}
        />
        <Pressable
          accessibilityLabel={
            isVisible ? `Hide ${label.toLowerCase()}` : `Show ${label.toLowerCase()}`
          }
          accessibilityRole="button"
          className="size-5 items-center justify-center active:opacity-70"
          onPress={onToggleVisibility}
        >
          {isVisible ? (
            <EyeOff
              accessible={false}
              color={colors.muted}
              size={iconSizes.compact}
              strokeWidth={iconStrokeWidths.emphasized}
            />
          ) : (
            <Eye
              accessible={false}
              color={colors.muted}
              size={iconSizes.compact}
              strokeWidth={iconStrokeWidths.emphasized}
            />
          )}
        </Pressable>
      </View>
      {error ? (
        <Text accessibilityRole="alert" tone="error" variant="detail">
          {error}
        </Text>
      ) : null}
    </View>
  );
}
