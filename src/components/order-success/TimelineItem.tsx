import { memo } from 'react';
import { View } from 'react-native';
import { Text } from '@/components/ui/Text';

import { TimelineConnector } from '@/components/order-success/TimelineConnector';
import { TimelineDot } from '@/components/order-success/TimelineDot';

interface TimelineItemProps {
  date: string;
  isCompleted: boolean;
  isLast: boolean;
  label: string;
}

export const TimelineItem = memo(function TimelineItem({
  date,
  isCompleted,
  isLast,
  label,
}: TimelineItemProps) {
  return (
    <View className="flex-row justify-start items-stretch gap-3">
      <View className="w-3 flex-col items-center">
        <View className="mt-1">
          <TimelineDot isCompleted={isCompleted} />
        </View>
        {!isLast ? <TimelineConnector /> : null}
      </View>
      <View className="flex-1 gap-1">
        {isCompleted ? (
          <Text className="text-sm text-neutral-800" variant="captionStrong">
            {label}
          </Text>
        ) : (
          <Text className="text-sm text-neutral-500" variant="captionStrong">
            {label}
          </Text>
        )}
        <Text className="text-xs text-neutral-400" variant="caption">
          {date}
        </Text>
      </View>
    </View>
  );
});
