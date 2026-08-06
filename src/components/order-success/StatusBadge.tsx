import { memo } from 'react';
import { View } from 'react-native';

import { Text } from '@/components/ui/Text';

interface StatusBadgeProps {
  label: string;
}

export const StatusBadge = memo(function StatusBadge({ label }: StatusBadgeProps) {
  return (
    <View className="rounded-sm bg-success-surface px-2 py-0.5">
      <Text className="text-xs" tone="success" variant="captionStrong">
        {label}
      </Text>
    </View>
  );
});
