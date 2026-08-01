import { View } from 'react-native';

import { Text } from '@/components/ui/Text';
import type { Money } from '@/types/product';
import { formatCurrency } from '@/utils/formatCurrency';

interface CartPriceDetailsProps {
  discount: Money;
  itemCount: number;
  price: Money;
  total: Money;
}

interface PriceRowProps {
  label: string;
  tone?: 'default' | 'success';
  value: string;
  valueStrong?: boolean;
}

function PriceRow({ label, tone = 'default', value, valueStrong = false }: PriceRowProps) {
  return (
    <View className="flex-row items-start justify-between gap-4">
      <Text className="flex-1" tone="muted" variant="caption">
        {label}
      </Text>
      <Text tone={tone} variant={valueStrong ? 'captionStrong' : 'captionMedium'}>
        {value}
      </Text>
    </View>
  );
}

export function CartPriceDetails({ discount, itemCount, price, total }: CartPriceDetailsProps) {
  return (
    <View className="gap-3.5 rounded-lg border border-subtle-border bg-surface p-4">
      <Text className="uppercase" variant="captionStrong">
        Price Details ({itemCount} {itemCount === 1 ? 'item' : 'items'})
      </Text>

      <View className="gap-2.5">
        <PriceRow
          label={`Price (${itemCount} ${itemCount === 1 ? 'item' : 'items'})`}
          value={formatCurrency(price)}
        />
        <PriceRow label="Discount" tone="success" value={`- ${formatCurrency(discount)}`} />
        <PriceRow label="Delivery Charges" tone="success" value="FREE" valueStrong />
        <PriceRow label="Platform Fee" tone="success" value="FREE" valueStrong />
      </View>

      <View className="h-px bg-subtle-border" />

      <View className="flex-row items-start justify-between gap-4">
        <Text className="text-sm" variant="captionStrong">
          Total Amount
        </Text>
        <Text className="text-sm" variant="captionStrong">
          {formatCurrency(total)}
        </Text>
      </View>
    </View>
  );
}
