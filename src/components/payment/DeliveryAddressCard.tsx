import { memo } from 'react';
import { Pressable, View } from 'react-native';

import { Text } from '@/components/ui/Text';

interface DeliveryAddressCardProps {
  addressLine1: string;
  addressLine2?: string;
  city?: string;
  fullName?: string;
  mobileLabel?: string;
  onChangePress: () => void;
}

export const DeliveryAddressCard = memo(function DeliveryAddressCard({
  addressLine1,
  addressLine2,
  city,
  fullName,
  mobileLabel,
  onChangePress,
}: DeliveryAddressCardProps) {
  return (
    <View className="border border-[#EBEBEB] rounded-lg p-4 mx-4 mt-4 bg-[#F9F9F9] shadow-sm">
      <View className="flex-row items-center justify-between">
        <Text className="uppercase" tone="muted" variant="captionStrong">
          Deliver To
        </Text>
        <Pressable
          accessibilityLabel="Change delivery address"
          accessibilityRole="button"
          onPress={onChangePress}
          className="border border-[#C9504B] rounded-md px-2 py-1 active:opacity-70"
        >
          <Text variant="captionStrong" tone="brand">
            CHANGE
          </Text>
        </Pressable>
      </View>

      <View className="mt-2.5 gap-1s">
        <Text tone="default" variant="label">
          {fullName || 'No name provided'}
        </Text>
        <Text tone="muted" variant="caption">
          {addressLine1 || 'No address provided'}
        </Text>
        {addressLine2 ? (
          <Text tone="muted" variant="caption">
            {addressLine2}
          </Text>
        ) : null}
        {city ? (
          <Text tone="muted" variant="caption">
            {city}
          </Text>
        ) : null}
      </View>

      {mobileLabel ? (
        <Text className="mt-1 text-xs" tone="muted">
          {mobileLabel}
        </Text>
      ) : null}
    </View>
  );
});
