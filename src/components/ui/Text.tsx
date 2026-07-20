import type { ComponentProps } from 'react';
import { Text as NativeText } from 'react-native';

interface TextProps extends ComponentProps<typeof NativeText> {
  variant?: 'heading' | 'title' | 'body' | 'label' | 'caption';
}

export function Text({ variant = 'body', className = '', ...props }: TextProps) {
  const variantClassName = {
    heading: 'text-3xl font-manrope-bold',
    title: 'text-xl font-manrope-bold',
    body: 'text-base font-manrope',
    label: 'text-sm font-manrope-semibold',
    caption: 'text-xs font-manrope',
  }[variant];
  return <NativeText className={`text-foreground ${variantClassName} ${className}`} {...props} />;
}
