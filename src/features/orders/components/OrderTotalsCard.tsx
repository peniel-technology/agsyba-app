import { View } from 'react-native';

import { Text } from '@/components/ui/Text';
import type { Money } from '@/types/product';
import { formatCurrency } from '@/utils/formatCurrency';

interface OrderTotalsCardProps {
  discount: Money;
  itemCount: number;
  paymentDetail: string;
  shippingDetail: string;
  subtotal: Money;
  taxDetail: string;
  total: Money;
}

function SummaryRow({
  label,
  value,
  valueTone,
}: {
  label: string;
  value: string;
  valueTone?: 'success';
}) {
  return (
    <View className="flex-row items-start justify-between gap-4">
      <Text className="flex-1" tone="muted" variant="label">
        {label}
      </Text>
      <Text tone={valueTone ?? 'default'} variant="label">
        {value}
      </Text>
    </View>
  );
}

export function OrderTotalsCard({
  discount,
  itemCount,
  paymentDetail,
  shippingDetail,
  subtotal,
  taxDetail,
  total,
}: OrderTotalsCardProps) {
  return (
    <View className="gap-4 rounded-lg border border-border bg-subtle-surface p-4">
      <View className="gap-3">
        <SummaryRow label={`Subtotal (${itemCount} items)`} value={formatCurrency(subtotal)} />
        <SummaryRow
          label="Discount (WELCOME10)"
          value={`-${formatCurrency(discount)}`}
          valueTone="success"
        />
        <SummaryRow label="Shipping" value="FREE" valueTone="success" />
      </View>

      <View className="h-px bg-border" />

      <View className="flex-row items-start justify-between gap-4">
        <Text variant="bodyStrong">Total</Text>
        <Text variant="bodyStrong">{formatCurrency(total)}</Text>
      </View>

      <View className="gap-1.5">
        <Text tone="muted" variant="caption">
          {taxDetail}
        </Text>
        <Text tone="muted" variant="caption">
          {shippingDetail}
        </Text>
        <Text tone="muted" variant="caption">
          {paymentDetail}
        </Text>
      </View>
    </View>
  );
}
