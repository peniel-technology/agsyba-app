import { Pressable, View } from 'react-native';

import { Text } from '@/components/ui/Text';
import { SocialProviderIcon } from '@/features/auth/components/SocialProviderIcon';

export type SocialProvider = 'apple' | 'facebook' | 'google';

interface AuthProviderButtonProps {
  disabled?: boolean;
  label: string;
  onPress: () => void;
  provider: SocialProvider;
}

export function AuthProviderButton({
  disabled = false,
  label,
  onPress,
  provider,
}: AuthProviderButtonProps) {
  return (
    <Pressable
      accessibilityLabel={label}
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      className="min-h-12 items-center justify-center rounded-lg border border-border bg-surface px-5 active:bg-subtle-surface disabled:opacity-50"
      disabled={disabled}
      onPress={onPress}
    >
      <View className="flex-row items-center justify-center gap-3">
        <SocialProviderIcon provider={provider} />
        <Text className="text-sm" variant="label">
          {label}
        </Text>
      </View>
    </Pressable>
  );
}
