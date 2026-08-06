import { memo } from 'react';
import { View } from 'react-native';

import { Text } from '@/components/ui/Text';

interface PaymentSummaryProps {
  payableAmount: string;
}

export const PaymentSummary = memo(function PaymentSummary({ payableAmount }: PaymentSummaryProps) {
  return (
    <View className="border-t border-border py-2.5">
      <View className="flex-row items-center justify-between px-4">
        <Text tone="muted" variant="label" className="font-semibold">
          Total Amount Payable
        </Text>
        <Text variant="label">{payableAmount}</Text>
      </View>
    </View>
  );
});
