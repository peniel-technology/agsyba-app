import { Pressable, View } from 'react-native';

import { Text } from '@/components/ui/Text';
import { spacing } from '@/theme';

interface ProductFilterHeaderProps {
  onClearPress: () => void;
}

export function ProductFilterHeader({ onClearPress }: ProductFilterHeaderProps) {
  return (
    <View className="h-14 flex-row items-center justify-between border-b border-border bg-surface px-4">
      <Text variant="bodyStrong">Filters</Text>
      <Pressable
        accessibilityLabel="Clear all product filters"
        accessibilityRole="button"
        className="min-h-11 justify-center active:opacity-70"
        hitSlop={spacing[2]}
        onPress={onClearPress}
      >
        <Text tone="brand" variant="captionStrong">
          CLEAR ALL
        </Text>
      </Pressable>
    </View>
  );
}
