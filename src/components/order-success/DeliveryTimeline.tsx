import { memo } from 'react';
import { View } from 'react-native';

import { DeliveryTimelineCard } from '@/components/order-success/DeliveryTimelineCard';
import { TimelineItem } from '@/components/order-success/TimelineItem';
import type { OrderSuccessTimelineStep } from '@/data/orderSuccess';

interface DeliveryTimelineProps {
  steps: readonly OrderSuccessTimelineStep[];
}

export const DeliveryTimeline = memo(function DeliveryTimeline({ steps }: DeliveryTimelineProps) {
  return (
    <DeliveryTimelineCard title="Delivery Timeline">
      <View className="gap-4">
        {steps.map((step, index) => (
          <TimelineItem
            date={step.date}
            isCompleted={step.completed}
            isLast={index === steps.length - 1}
            key={step.id}
            label={step.label}
          />
        ))}
      </View>
    </DeliveryTimelineCard>
  );
});
