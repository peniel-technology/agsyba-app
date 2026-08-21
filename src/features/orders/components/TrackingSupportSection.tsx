import { Pressable, StyleSheet, View } from 'react-native';

import { Text } from '@/components/ui/Text';

interface TrackingSupportSectionProps {
  onContactPress: () => void;
}

const styles = StyleSheet.create({
  contactButton: {
    borderRadius: 4,
    borderWidth: 1.5,
  },
});

export function TrackingSupportSection({ onContactPress }: TrackingSupportSectionProps) {
  return (
    <View className="items-center gap-3 py-3">
      <Text className="underline" tone="muted" variant="label">
        Need Help?
      </Text>
      <Pressable
        accessibilityLabel="Contact support"
        accessibilityRole="button"
        className="w-full items-center border-order-action px-6 py-3 active:opacity-70"
        onPress={onContactPress}
        style={styles.contactButton}
      >
        <Text tone="orderAction" variant="label">
          Contact Support
        </Text>
      </Pressable>
    </View>
  );
}
