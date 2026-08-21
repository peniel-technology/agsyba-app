import { Pressable } from 'react-native';

import { Text } from '@/components/ui/Text';
import { SocialProviderIcon } from '@/features/auth/components/SocialProviderIcon';

export type SocialProvider = 'apple' | 'facebook' | 'google';

interface AuthProviderButtonProps {
  label: string;
  onPress: () => void;
  provider: SocialProvider;
}

export function AuthProviderButton({ label, onPress, provider }: AuthProviderButtonProps) {
  return (
    <Pressable
      accessibilityLabel={label}
      accessibilityRole="button"
      className="min-h-12 flex-row items-center justify-center gap-3 rounded-lg border border-border bg-surface px-5 active:bg-subtle-surface"
      onPress={onPress}
    >
      <SocialProviderIcon provider={provider} />
      <Text className="text-sm" variant="label">
        {label}
      </Text>
    </Pressable>
  );
}
