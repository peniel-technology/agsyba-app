import { Pressable, View } from 'react-native';

import { Text } from '@/components/ui/Text';

interface ProductFilterFooterProps {
  onApplyPress: () => void;
  onClosePress: () => void;
}

export function ProductFilterFooter({ onApplyPress, onClosePress }: ProductFilterFooterProps) {
  return (
    <View className="h-16 flex-row border-t border-border bg-surface">
      <Pressable
        accessibilityLabel="Close product filters"
        accessibilityRole="button"
        className="flex-1 items-center justify-center active:bg-subtle-surface"
        onPress={onClosePress}
      >
        <Text variant="label">CLOSE</Text>
      </Pressable>
      <View className="w-px bg-border" />
      <Pressable
        accessibilityLabel="Apply product filters"
        accessibilityRole="button"
        className="flex-1 items-center justify-center active:bg-sale-surface"
        onPress={onApplyPress}
      >
        <Text tone="brand" variant="label">
          APPLY
        </Text>
      </Pressable>
    </View>
  );
}
