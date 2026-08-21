import { View } from 'react-native';

import { Text } from '@/components/ui/Text';
import { returnExchangeReviewData } from '@/features/orders/constants/returnExchangeReviewData';

interface ReturnReviewRequestCardProps {
  pickupAddress: string;
  pickupDate: string;
  pickupMethod: string;
  pickupTime: string;
}

const reviewRows = [
  ['Return Reason', returnExchangeReviewData.reason],
  ['Action Requested', returnExchangeReviewData.actionRequested],
] as const;

export function ReturnReviewRequestCard({
  pickupAddress,
  pickupDate,
  pickupMethod,
  pickupTime,
}: ReturnReviewRequestCardProps) {
  const rows = [
    ...reviewRows,
    ['Return Method', pickupMethod],
    ['Pickup Date', pickupDate],
    ['Pickup Time', pickupTime],
    ['Pickup Address', pickupAddress],
  ] as const;

  return (
    <View className="gap-4 rounded-lg border border-border bg-surface p-4">
      <Text variant="title">Review Your Request</Text>
      <View className="gap-2.5">
        {rows.map(([label, value]) => (
          <View className="flex-row items-start gap-3" key={label}>
            <Text className="w-28 shrink-0" tone="muted" variant="caption">
              {label}
            </Text>
            <Text className="flex-1" variant="captionMedium">
              {value}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}
