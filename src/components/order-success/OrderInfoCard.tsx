import { memo } from 'react';
import { View } from 'react-native';

import { StatusBadge } from '@/components/order-success/StatusBadge';
import { Text } from '@/components/ui/Text';

interface OrderInfoCardProps {
  orderDate: string;
  orderNumber: string;
  status: string;
}

export const OrderInfoCard = memo(function OrderInfoCard({
  orderDate,
  orderNumber,
  status,
}: OrderInfoCardProps) {
  return (
    <View className="rounded-md border border-[#EBEBEB] bg-[#F9F9F9] shadow-sm p-4">
      <View className="flex-row items-center justify-between">
        <Text className="text-sm font-manrope-semibold">{`Order #${orderNumber}`}</Text>
        <StatusBadge label={status} />
      </View>
      <Text className="mt-1 text-xs" tone="muted" variant="caption">
        {orderDate}
      </Text>
    </View>
  );
});
