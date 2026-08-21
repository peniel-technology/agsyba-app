import { View } from 'react-native';

import { Text } from '@/components/ui/Text';
import { returnExchangeSuccessData } from '@/features/orders/constants/returnExchangeSuccessData';

export function ReturnSuccessTimeline() {
  return (
    <View className="gap-4">
      <Text variant="title">What Happens Next?</Text>
      <View>
        {returnExchangeSuccessData.timeline.map((item, index) => (
          <View className="flex-row items-start gap-4" key={item.title}>
            <View className="w-5 items-center">
              <View
                className={`size-3 rounded-full ${item.isActive ? 'bg-order-action' : 'bg-border'}`}
              />
              {index < returnExchangeSuccessData.timeline.length - 1 ? (
                <View className="h-10 w-px bg-border" />
              ) : null}
            </View>
            <View className="flex-1 gap-0.5 pb-4">
              <Text tone={item.isActive ? 'orderAction' : 'default'} variant="captionStrong">
                {item.title}
              </Text>
              <Text tone="muted" variant="caption">
                {item.description}
              </Text>
              <Text tone="muted" variant="captionStrong">
                {item.date}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}
