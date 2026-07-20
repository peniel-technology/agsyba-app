import type { ComponentProps } from 'react';
import { ActivityIndicator, Pressable, Text } from 'react-native';

import { colors } from '@/theme/colors';

interface ButtonProps extends ComponentProps<typeof Pressable> {
  label: string;
  loading?: boolean;
  variant?: 'primary' | 'secondary' | 'outline';
}

export function Button({
  label,
  loading = false,
  variant = 'primary',
  disabled,
  ...props
}: ButtonProps) {
  const containerClassName =
    variant === 'primary'
      ? 'bg-primary'
      : variant === 'secondary'
        ? 'bg-slate-200'
        : 'border border-border bg-transparent';
  const textClassName = variant === 'primary' ? 'text-primary-foreground' : 'text-foreground';
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled: disabled || loading, busy: loading }}
      className={`min-h-12 items-center justify-center rounded-xl px-6 ${containerClassName} ${disabled || loading ? 'opacity-50' : ''}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === 'primary' ? colors.primaryForeground : colors.primary}
        />
      ) : (
        <Text className={`text-base font-manrope-semibold ${textClassName}`}>{label}</Text>
      )}
    </Pressable>
  );
}
