import { memo } from 'react';
import { Pressable, View } from 'react-native';

import { Text } from '@/components/ui/Text';

interface GiftCardSectionProps {
  onApplyPress: () => void;
}

export const GiftCardSection = memo(function GiftCardSection({
  onApplyPress,
}: GiftCardSectionProps) {
  return (
    <View className="flex-row items-center justify-between border-b border-border bg-surface px-4 py-4">
      <View className="flex-row items-center gap-3">
        <View className="relative h-4 w-5 overflow-hidden">
          <View className="absolute left-0.5 top-0.5 size-3.5 border-2 border-neutral-700" />
        </View>
        <Text variant="label">Have a Gift Card?</Text>
      </View>
      <Pressable
        accessibilityLabel="Apply gift card"
        accessibilityRole="button"
        onPress={onApplyPress}
      >
        <Text variant="captionStrong" tone="brand" className="capitalize">
          Apply Gift Card
        </Text>
      </Pressable>
    </View>
  );
});
