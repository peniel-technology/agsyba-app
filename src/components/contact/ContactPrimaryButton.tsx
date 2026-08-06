import { ActivityIndicator, Pressable } from 'react-native';

import { Text } from '@/components/ui/Text';

export interface ContactPrimaryButtonProps {
  title: string;
  onPress: () => void;
  loading?: boolean;
}

export function ContactPrimaryButton({
  title,
  onPress,
  loading = false,
}: ContactPrimaryButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      className={`h-12 w-full items-center justify-center rounded-sm bg-stone-900 ${loading ? 'opacity-70' : ''}`}
      disabled={loading}
      onPress={onPress}
    >
      {loading ? (
        <ActivityIndicator color="#ffffff" />
      ) : (
        <Text className="text-sm font-bold uppercase tracking-wide text-white">{title}</Text>
      )}
    </Pressable>
  );
}
