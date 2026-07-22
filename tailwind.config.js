/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require('nativewind/preset')],
  content: [
    './src/app/**/*.{js,jsx,ts,tsx}',
    './src/components/**/*.{js,jsx,ts,tsx}',
    './src/features/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'rgb(var(--color-background) / <alpha-value>)',
        surface: 'rgb(var(--color-surface) / <alpha-value>)',
        'subtle-surface': 'rgb(var(--color-subtle-surface) / <alpha-value>)',
        foreground: 'rgb(var(--color-text) / <alpha-value>)',
        muted: 'rgb(var(--color-muted) / <alpha-value>)',
        border: 'rgb(var(--color-border) / <alpha-value>)',
        'subtle-border': 'rgb(var(--color-subtle-border) / <alpha-value>)',
        primary: 'rgb(var(--color-primary) / <alpha-value>)',
        'primary-foreground': 'rgb(var(--color-primary-foreground) / <alpha-value>)',
        brand: 'rgb(var(--color-brand) / <alpha-value>)',
        'brand-foreground': 'rgb(var(--color-brand-foreground) / <alpha-value>)',
        'drawer-backdrop': 'rgb(var(--color-drawer-backdrop) / <alpha-value>)',
        'drawer-promotion': 'rgb(var(--color-drawer-promotion) / <alpha-value>)',
        sale: 'rgb(var(--color-sale) / <alpha-value>)',
        'sale-surface': 'rgb(var(--color-sale-surface) / <alpha-value>)',
        'sale-badge': 'rgb(var(--color-sale-badge) / <alpha-value>)',
        'sale-divider': 'rgb(var(--color-sale-divider) / <alpha-value>)',
        success: 'rgb(var(--color-success) / <alpha-value>)',
        error: 'rgb(var(--color-error) / <alpha-value>)',
      },
      fontFamily: {
        manrope: ['Manrope_400Regular'],
        'manrope-medium': ['Manrope_500Medium'],
        'manrope-semibold': ['Manrope_600SemiBold'],
        'manrope-bold': ['Manrope_700Bold'],
        'manrope-extrabold': ['Manrope_800ExtraBold'],
        'instrument-serif': ['InstrumentSerif_400Regular'],
      },
      fontSize: {
        badge: ['8px', { lineHeight: '10px' }],
        detail: ['10px', { lineHeight: '12px' }],
        micro: ['9px', { lineHeight: '12px' }],
        overline: ['10px', { lineHeight: '12px' }],
      },
    },
  },
  plugins: [],
};
