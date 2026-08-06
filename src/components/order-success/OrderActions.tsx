import { memo } from 'react';
import { Pressable, View } from 'react-native';

import { Text } from '@/components/ui/Text';

interface OrderActionsProps {
  onContinueShoppingPress: () => void;
  onTrackOrderPress: () => void;
  primaryLabel: string;
  secondaryLabel: string;
}

export const OrderActions = memo(function OrderActions({
  onContinueShoppingPress,
  onTrackOrderPress,
  primaryLabel,
  secondaryLabel,
}: OrderActionsProps) {
  return (
    <View className="gap-3">
      <Pressable
        accessibilityLabel={primaryLabel}
        accessibilityRole="button"
        className="h-12 items-center justify-center rounded-sm bg-brand"
        onPress={onTrackOrderPress}
      >
        <Text className="text-sm uppercase" tone="brandForeground" variant="captionStrong">
          {primaryLabel}
        </Text>
      </Pressable>
      <Pressable
        accessibilityLabel={secondaryLabel}
        accessibilityRole="button"
        className="h-12 items-center justify-center rounded-sm border border-brand bg-surface"
        onPress={onContinueShoppingPress}
      >
        <Text className="text-sm uppercase" tone="brand" variant="captionStrong">
          {secondaryLabel}
        </Text>
      </Pressable>
    </View>
  );
});
