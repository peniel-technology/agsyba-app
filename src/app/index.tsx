import { View } from 'react-native';

import { Screen } from '@/components/layouts/Screen';
import { Text } from '@/components/ui/Text';

export default function HomeScreen() {
  return (
    <Screen>
      <View className="flex-1 justify-center gap-3">
        <Text variant="heading">Welcome</Text>
        <Text className="text-muted">
          Your production-ready foundation is ready for feature development.
        </Text>
      </View>
    </Screen>
  );
}
