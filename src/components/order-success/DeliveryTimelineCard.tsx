import { Text } from '@/components/ui/Text';
import { memo, type ReactNode } from 'react';
import { View } from 'react-native';

interface DeliveryTimelineCardProps {
  children: ReactNode;
  title: string;
}

export const DeliveryTimelineCard = memo(function DeliveryTimelineCard({
  children,
  title,
}: DeliveryTimelineCardProps) {
  return (
    <View className="gap-4 rounded-md border border-zinc-200 bg-white p-4 shadow-sm">
      <Text className="text-sm leading-5 text-stone-900 uppercase" variant="captionStrong">
        {title}
      </Text>
      {children}
    </View>
  );
});
