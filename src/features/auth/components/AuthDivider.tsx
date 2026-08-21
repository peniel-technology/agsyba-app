import { View } from 'react-native';

import { Text } from '@/components/ui/Text';

export function AuthDivider() {
  return (
    <View className="flex-row items-center gap-4">
      <View className="h-px flex-1 bg-border" />
      <Text className="uppercase" tone="muted" variant="captionStrong">
        Or continue with
      </Text>
      <View className="h-px flex-1 bg-border" />
    </View>
  );
}
