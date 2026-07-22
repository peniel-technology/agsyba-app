import type { ComponentProps } from 'react';
import { Text as NativeText } from 'react-native';

interface TextProps extends ComponentProps<typeof NativeText> {
  variant?:
    | 'display'
    | 'sectionHeading'
    | 'brand'
    | 'heading'
    | 'promotionalTitle'
    | 'title'
    | 'body'
    | 'bodyStrong'
    | 'label'
    | 'caption'
    | 'captionMedium'
    | 'captionStrong'
    | 'detail'
    | 'detailMedium'
    | 'detailStrong'
    | 'badge'
    | 'micro'
    | 'microStrong'
    | 'overline';
  tone?: 'default' | 'muted' | 'brand' | 'brandForeground' | 'error' | 'sale' | 'success';
}

export function Text({ variant = 'body', tone = 'default', className = '', ...props }: TextProps) {
  const variantClassName = {
    display: 'text-4xl font-instrument-serif leading-10',
    sectionHeading: 'text-xl font-instrument-serif leading-6',
    brand: 'text-xl font-manrope-medium',
    heading: 'text-3xl font-manrope-bold',
    promotionalTitle: 'text-3xl font-instrument-serif',
    title: 'text-xl font-manrope-bold',
    body: 'text-base font-manrope',
    bodyStrong: 'text-base font-manrope-bold',
    label: 'text-sm font-manrope-semibold',
    caption: 'text-xs font-manrope',
    captionMedium: 'text-xs font-manrope-medium',
    captionStrong: 'text-xs font-manrope-bold',
    detail: 'text-detail font-manrope',
    detailMedium: 'text-detail font-manrope-medium',
    detailStrong: 'text-detail font-manrope-bold',
    badge: 'text-badge font-manrope-bold',
    micro: 'text-micro font-manrope',
    microStrong: 'text-micro font-manrope-semibold uppercase tracking-wide',
    overline: 'text-overline font-manrope-extrabold uppercase tracking-wide',
  }[variant];
  const toneClassName = {
    default: 'text-foreground',
    muted: 'text-muted',
    brand: 'text-brand',
    brandForeground: 'text-brand-foreground',
    error: 'text-error',
    sale: 'text-sale',
    success: 'text-success',
  }[tone];

  return <NativeText className={`${toneClassName} ${variantClassName} ${className}`} {...props} />;
}
