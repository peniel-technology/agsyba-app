import { View } from 'react-native';

import { Button } from '@/components/ui/Button';
import { Text } from '@/components/ui/Text';

interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
}

export function ErrorState({
  title = 'Something went wrong',
  description = 'Please try again.',
  onRetry,
}: ErrorStateProps) {
  return (
    <View className="items-center gap-3 rounded-xl border border-red-200 bg-surface p-6">
      <Text variant="title" className="text-center text-error">
        {title}
      </Text>
      <Text className="text-center text-muted">{description}</Text>
      {onRetry ? <Button label="Try again" onPress={onRetry} variant="outline" /> : null}
    </View>
  );
}
