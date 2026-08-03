import { Pressable, View } from 'react-native';

import { Text } from '@/components/ui/Text';

interface DeliverHereBarProps {
  disabled?: boolean;
  isSubmitting?: boolean;
  onPress: () => void;
}

export function DeliverHereBar({
  disabled = false,
  isSubmitting = false,
  onPress,
}: DeliverHereBarProps) {
  const isDisabled = disabled || isSubmitting;

  return (
    <View className="border-t border-border bg-surface p-4">
      <Pressable
        accessibilityLabel="Deliver here"
        accessibilityRole="button"
        accessibilityState={{ busy: isSubmitting, disabled: isDisabled }}
        className="h-12 items-center justify-center rounded-sm bg-brand active:opacity-80 disabled:opacity-50"
        disabled={isDisabled}
        onPress={onPress}
      >
        <Text className="uppercase" tone="brandForeground" variant="captionStrong">
          {isSubmitting ? 'Saving Address…' : 'Deliver Here'}
        </Text>
      </Pressable>
    </View>
  );
}
