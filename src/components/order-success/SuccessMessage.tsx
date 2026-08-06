import { memo } from 'react';
import { View } from 'react-native';

import { Text } from '@/components/ui/Text';

interface SuccessMessageProps {
  subtitle: string;
  title: string;
}

export const SuccessMessage = memo(function SuccessMessage({
  subtitle,
  title,
}: SuccessMessageProps) {
  return (
    <View className="self-stretch items-center gap-2">
      <Text className="text-center text-2xl leading-8" tone="default" variant="sectionHeading">
        {title}
      </Text>
      <Text className="text-center text-sm leading-5" tone="muted" variant="body">
        {subtitle}
      </Text>
    </View>
  );
});
