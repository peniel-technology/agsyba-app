import { Pressable, View } from 'react-native';

import { Text } from '@/components/ui/Text';

export type AuthTab = 'login' | 'register';

interface AuthTabsProps {
  activeTab: AuthTab;
  onLoginPress: () => void;
  onRegisterPress: () => void;
}

export function AuthTabs({ activeTab, onLoginPress, onRegisterPress }: AuthTabsProps) {
  return (
    <View className="flex-row items-start gap-10">
      <Pressable
        accessibilityLabel="Login tab"
        accessibilityRole="tab"
        accessibilityState={{ selected: activeTab === 'login' }}
        className={`${activeTab === 'login' ? 'border-b-2 border-order-action' : ''} pb-2 active:opacity-70`}
        onPress={onLoginPress}
      >
        <Text
          className="uppercase"
          tone={activeTab === 'login' ? 'orderAction' : 'muted'}
          variant="label"
        >
          Login
        </Text>
      </Pressable>
      <Pressable
        accessibilityLabel="Register tab"
        accessibilityRole="tab"
        accessibilityState={{ selected: activeTab === 'register' }}
        className={`${activeTab === 'register' ? 'border-b-2 border-order-action' : ''} pb-2 active:opacity-70`}
        onPress={onRegisterPress}
      >
        <Text
          className="uppercase"
          tone={activeTab === 'register' ? 'orderAction' : 'muted'}
          variant="label"
        >
          Register
        </Text>
      </Pressable>
    </View>
  );
}
