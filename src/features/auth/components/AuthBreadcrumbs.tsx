import { Pressable, View } from 'react-native';

import { Text } from '@/components/ui/Text';

interface AuthBreadcrumbsProps {
  currentLabel: string;
  onLoginPress: () => void;
}

export function AuthBreadcrumbs({ currentLabel, onLoginPress }: AuthBreadcrumbsProps) {
  return (
    <View className="flex-row items-center gap-1">
      <Pressable
        accessibilityLabel="Login"
        accessibilityRole="link"
        className="active:opacity-70"
        onPress={onLoginPress}
      >
        <Text tone="muted" variant="captionMedium">
          Login
        </Text>
      </Pressable>
      <Text accessible={false} tone="muted" variant="captionMedium">
        &gt;
      </Text>
      <Text tone="orderAction" variant="captionStrong">
        {currentLabel}
      </Text>
    </View>
  );
}
