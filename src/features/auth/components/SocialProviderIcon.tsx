import Svg, { Path, Rect } from 'react-native-svg';

import { colors } from '@/theme';

type SocialProvider = 'apple' | 'facebook' | 'google';

interface SocialProviderIconProps {
  provider: SocialProvider;
}

export function SocialProviderIcon({ provider }: SocialProviderIconProps) {
  if (provider === 'google') {
    return (
      <Svg
        accessibilityLabel="Google logo"
        accessibilityRole="image"
        height={20}
        viewBox="0 0 20 20"
        width={20}
      >
        <Path
          d="M19.6 10.23c0-.66-.06-1.3-.17-1.9H10v3.6h5.38a4.6 4.6 0 0 1-1.99 3.02v2.51h3.22c1.89-1.74 2.99-4.3 2.99-7.23Z"
          fill={colors.socialGoogleBlue}
        />
        <Path
          d="M10 20c2.7 0 4.96-.9 6.61-2.44l-3.22-2.51c-.9.6-2.05.95-3.39.95-2.61 0-4.82-1.76-5.61-4.13H1.06v2.59A9.98 9.98 0 0 0 10 20Z"
          fill={colors.socialGoogleGreen}
        />
        <Path
          d="M4.39 11.87A6 6 0 0 1 4.08 10c0-.65.11-1.28.31-1.87V5.54H1.06A10 10 0 0 0 0 10c0 1.61.39 3.13 1.06 4.46l3.33-2.59Z"
          fill={colors.socialGoogleYellow}
        />
        <Path
          d="M10 3.99c1.47 0 2.79.51 3.83 1.51l2.87-2.87C14.95.99 12.7 0 10 0a9.98 9.98 0 0 0-8.94 5.54l3.33 2.59C5.18 5.75 7.39 3.99 10 3.99Z"
          fill={colors.socialGoogleRed}
        />
      </Svg>
    );
  }

  if (provider === 'facebook') {
    return (
      <Svg
        accessibilityLabel="Facebook logo"
        accessibilityRole="image"
        height={20}
        viewBox="0 0 20 20"
        width={20}
      >
        <Rect fill={colors.socialFacebook} height={20} rx={4} width={20} />
        <Path
          d="M11.7 17v-6h2l.3-2h-2.3V7.8c0-.58.17-.98 1-.98H14V5.03c-.23-.03-.86-.08-1.62-.08-1.6 0-2.7.98-2.7 2.78V9H8v2h1.68v6h2.02Z"
          fill={colors.surface}
        />
      </Svg>
    );
  }

  return (
    <Svg
      accessibilityLabel="Apple logo"
      accessibilityRole="image"
      height={20}
      viewBox="0 0 20 20"
      width={20}
    >
      <Path
        d="M16.75 10.15c-.03-1.74 1.42-2.58 1.48-2.62-.81-1.18-2.08-1.34-2.53-1.36-1.07-.11-2.1.64-2.64.64-.55 0-1.4-.63-2.3-.61-1.18.02-2.28.69-2.9 1.74-1.24 2.15-.32 5.31.87 7.05.58.85 1.28 1.8 2.2 1.77.88-.03 1.21-.57 2.28-.57 1.06 0 1.36.57 2.29.55.95-.02 1.55-.85 2.12-1.7.67-.98.95-1.93.96-1.98-.02-.01-1.81-.7-1.83-2.71ZM15.01 5.83c.48-.58.8-1.39.71-2.2-.69.03-1.53.46-2.03 1.04-.45.5-.84 1.32-.74 2.1.77.06 1.56-.39 2.06-.94Z"
        fill={colors.text}
      />
    </Svg>
  );
}
