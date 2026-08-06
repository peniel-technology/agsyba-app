import { memo } from 'react';
import { View } from 'react-native';

import { Text } from '@/components/ui/Text';

export const CashOnDelivery = memo(function CashOnDelivery() {
  return (
    <View className="gap-1">
      <Text tone="muted" variant="captionStrong">
        Cash on Delivery
      </Text>
      <Text tone="muted" variant="caption">
        Pay when your order reaches your home.
      </Text>
    </View>
  );
});
