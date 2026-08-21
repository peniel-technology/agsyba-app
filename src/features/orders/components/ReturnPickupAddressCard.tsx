import { MapPin } from 'lucide-react-native';
import { Pressable, View } from 'react-native';

import { Text } from '@/components/ui/Text';
import { colors, iconSizes, iconStrokeWidths } from '@/theme';

interface ReturnPickupAddressCardProps {
  onAddAddressPress: () => void;
  onEditPress: () => void;
}

export function ReturnPickupAddressCard({
  onAddAddressPress,
  onEditPress,
}: ReturnPickupAddressCardProps) {
  return (
    <View className="gap-2.5">
      <Text variant="label">Pickup Address</Text>
      <View className="flex-row items-center gap-3 rounded-lg border border-border bg-surface p-3">
        <View className="size-4 items-center justify-center rounded-full border-4 border-order-action" />
        <View className="min-w-0 flex-1 gap-0.5">
          <View className="flex-row items-center gap-1.5">
            <Text variant="captionStrong">Home</Text>
            <View className="rounded-sm bg-subtle-surface px-1.5 py-0.5">
              <Text tone="muted" variant="microStrong">
                Default
              </Text>
            </View>
          </View>
          <Text variant="caption">123 Green Park Colony, Dubai, UAE</Text>
        </View>
        <Pressable
          accessibilityLabel="Edit pickup address"
          accessibilityRole="button"
          className="active:opacity-70"
          onPress={onEditPress}
        >
          <Text className="underline" tone="orderAction" variant="captionStrong">
            Edit
          </Text>
        </Pressable>
      </View>
      <Pressable
        accessibilityLabel="Add new pickup address"
        accessibilityRole="button"
        className="flex-row items-center gap-1.5 pt-1 active:opacity-70"
        onPress={onAddAddressPress}
      >
        <MapPin
          accessible={false}
          color={colors.orderAction}
          size={iconSizes.small}
          strokeWidth={iconStrokeWidths.emphasized}
        />
        <Text tone="orderAction" variant="captionStrong">
          Add New Address
        </Text>
      </Pressable>
    </View>
  );
}
