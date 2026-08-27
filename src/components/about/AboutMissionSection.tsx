import { View } from 'react-native';

import { Text } from '@/components/ui/Text';

export interface AboutMissionSectionProps {
  label: string;
  quote: string;
}

export function AboutMissionSection({ label, quote }: AboutMissionSectionProps) {
  return (
    <View className="self-stretch items-center bg-brand px-6 py-12">
      <View className="gap-4 self-stretch">
        <Text
          className="text-center text-xs font-extrabold uppercase text-white"
          tone="brandForeground"
          variant="overline"
        >
          {label}
        </Text>
        <Text className="text-center text-3xl leading-9 text-white" variant="promotionalTitle">
          {quote}
        </Text>
      </View>
    </View>
  );
}
