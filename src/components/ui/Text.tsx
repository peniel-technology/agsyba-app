import type { ComponentProps } from 'react';
import { Text as NativeText } from 'react-native';

interface TextProps extends ComponentProps<typeof NativeText> {
  variant?:
    | 'display'
    | 'sectionHeading'
    | 'brand'
    | 'heading'
    | 'title'
    | 'body'
    | 'label'
    | 'caption'
    | 'captionMedium'
    | 'captionStrong'
    | 'micro';
  tone?: 'default' | 'muted' | 'brand' | 'brandForeground' | 'error';
}

export function Text({ variant = 'body', tone = 'default', className = '', ...props }: TextProps) {
  const variantClassName = {
    display: 'text-4xl font-instrument-serif leading-10',
    sectionHeading: 'text-xl font-instrument-serif leading-6',
    brand: 'text-xl font-manrope-medium',
    heading: 'text-3xl font-manrope-bold',
    title: 'text-xl font-manrope-bold',
    body: 'text-base font-manrope',
    label: 'text-sm font-manrope-semibold',
    caption: 'text-xs font-manrope',
    captionMedium: 'text-xs font-manrope-medium',
    captionStrong: 'text-xs font-manrope-bold',
    micro: 'text-micro font-manrope',
  }[variant];
  const toneClassName = {
    default: 'text-foreground',
    muted: 'text-muted',
    brand: 'text-brand',
    brandForeground: 'text-brand-foreground',
    error: 'text-error',
  }[tone];

  return <NativeText className={`${toneClassName} ${variantClassName} ${className}`} {...props} />;
}
