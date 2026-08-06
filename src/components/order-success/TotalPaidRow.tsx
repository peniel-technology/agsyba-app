import { memo } from 'react';
import { View } from 'react-native';

import { Text } from '@/components/ui/Text';

interface TotalPaidRowProps {
  amount: string;
}

export const TotalPaidRow = memo(function TotalPaidRow({ amount }: TotalPaidRowProps) {
  return (
    <View className="flex-row items-center justify-between">
      <Text className="text-sm" tone="muted" variant="bodyStrong">
        Total Paid
      </Text>
      <Text className="text-lg" variant="bodyStrong">
        {amount}
      </Text>
    </View>
  );
});
