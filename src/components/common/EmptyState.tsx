import { View } from 'react-native';

import { Text } from '@/components/ui/Text';

interface EmptyStateProps {
  title: string;
  description?: string;
}

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <View className="items-center gap-2 rounded-xl border border-border bg-surface p-6">
      <Text variant="title" className="text-center">
        {title}
      </Text>
      {description ? <Text className="text-center text-muted">{description}</Text> : null}
    </View>
  );
}
