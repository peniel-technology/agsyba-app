import { Image } from 'expo-image';
import { StyleSheet, View } from 'react-native';

import { Text } from '@/components/ui/Text';
import type { CartLine } from '@/stores/useCartStore';
import type { Money } from '@/types/product';
import { formatCurrency } from '@/utils/formatCurrency';

interface OrderSummaryProps {
  discount: Money;
  itemCount: number;
  lines: readonly CartLine[];
  subtotal: Money;
  total: Money;
}

interface SummaryRowProps {
  label: string;
  tone?: 'default' | 'success';
  value: string;
}

const styles = StyleSheet.create({
  thumbnail: StyleSheet.absoluteFillObject,
});

function SummaryRow({ label, tone = 'default', value }: SummaryRowProps) {
  return (
    <View className="flex-row items-center justify-between gap-4">
      <Text className="flex-1" tone="muted" variant="label">
        {label}
      </Text>
      <Text tone={tone} variant="captionStrong">
        {value}
      </Text>
    </View>
  );
}

export function OrderSummary({ discount, itemCount, lines, subtotal, total }: OrderSummaryProps) {
  return (
    <View className="gap-3 border-y border-border bg-surface p-4">
      <Text className="uppercase" variant="captionStrong">
        Order Summary
      </Text>

      {lines.length > 0 ? (
        <View className="flex-row gap-2">
          {lines.slice(0, 4).map((line) => (
            <View
              className="size-12 overflow-hidden rounded-lg border border-border bg-subtle-surface"
              key={line.product.id}
            >
              <Image
                accessibilityLabel={line.product.imageAccessibilityLabel}
                contentFit={line.product.imageFit ?? 'cover'}
                source={line.product.image}
                style={styles.thumbnail}
              />
            </View>
          ))}
          {lines.length > 4 ? (
            <View className="size-12 items-center justify-center rounded-lg border border-border bg-subtle-surface">
              <Text tone="muted" variant="captionStrong">
                +{lines.length - 4}
              </Text>
            </View>
          ) : null}
        </View>
      ) : (
        <Text tone="muted" variant="caption">
          No products selected
        </Text>
      )}

      <View className="gap-2">
        <SummaryRow
          label={`Subtotal (${itemCount} ${itemCount === 1 ? 'item' : 'items'})`}
          value={formatCurrency(subtotal)}
        />
        <SummaryRow label="Discount" tone="success" value={`-${formatCurrency(discount)}`} />
        <SummaryRow label="Delivery Charges" tone="success" value="FREE" />
        <View className="mt-0.5 flex-row items-center justify-between gap-4 border-t border-border pt-2.5">
          <Text className="flex-1" variant="label">
            Total Amount
          </Text>
          <Text variant="label">{formatCurrency(total)}</Text>
        </View>
      </View>
    </View>
  );
}
