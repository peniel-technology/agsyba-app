import { memo } from 'react';
import { View } from 'react-native';

import { Text } from '@/components/ui/Text';

const cardLogos = ['VISA', 'MC', 'AMEX', 'RUPAY'];

export const CardLogosRow = memo(function CardLogosRow() {
  return (
    <View className="flex-row items-center gap-2">
      <Text variant="captionStrong" tone="muted">
        Cards:
      </Text>
      {cardLogos.map((logo) => (
        <View
          accessibilityLabel={`${logo} accepted`}
          className="rounded-sm border border-subtle-border bg-surface px-2 py-1"
          key={logo}
        >
          <Text variant="captionStrong">{logo}</Text>
        </View>
      ))}
    </View>
  );
});
