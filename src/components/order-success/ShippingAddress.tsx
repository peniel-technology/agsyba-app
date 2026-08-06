import { memo } from 'react';
import { View } from 'react-native';

import { Text } from '@/components/ui/Text';

interface ShippingAddressProps {
  addressLine: string;
  customerName: string;
}

export const ShippingAddress = memo(function ShippingAddress({
  addressLine,
  customerName,
}: ShippingAddressProps) {
  return (
    <View className="gap-1">
      <Text className="text-xs" tone="muted" variant="captionStrong">
        Shipping Address
      </Text>
      <Text className="text-sm" variant="bodyStrong">
        {customerName}
      </Text>
      <Text className="text-sm" tone="muted" variant="body">
        {addressLine}
      </Text>
    </View>
  );
});
