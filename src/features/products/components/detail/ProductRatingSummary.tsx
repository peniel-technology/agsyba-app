import { Star } from 'lucide-react-native';
import { View } from 'react-native';

import { Text } from '@/components/ui/Text';
import type {
  ProductRatingDistribution,
  ProductRatingSummary as ProductRatingSummaryData,
} from '@/features/products/types/productDetail';
import { colors, iconSizes, iconStrokeWidths } from '@/theme';

interface ProductRatingSummaryProps {
  summary: ProductRatingSummaryData;
}

function RatingDistributionRow({ percentage, stars }: ProductRatingDistribution) {
  const normalizedPercentage = Math.min(Math.max(percentage, 0), 100);

  return (
    <View
      accessibilityLabel={`${stars} star ratings: ${normalizedPercentage}%`}
      className="gap-1.5"
    >
      <View className="flex-row items-center justify-between">
        <Text tone="muted" variant="caption">
          {stars} star
        </Text>
        <Text variant="captionStrong">{normalizedPercentage}%</Text>
      </View>
      <View className="h-1.5 overflow-hidden rounded-full bg-subtle-border">
        <View
          className="h-full rounded-full bg-brand"
          style={{ width: `${normalizedPercentage}%` }}
        />
      </View>
    </View>
  );
}

export function ProductRatingSummary({ summary }: ProductRatingSummaryProps) {
  return (
    <View className="gap-3 rounded-xl border border-subtle-border bg-surface p-4">
      <View className="flex-row items-center gap-3">
        <View className="gap-0.5">
          <Text className="text-4xl text-zinc-800" variant="heading">
            {summary.average.toFixed(1)}
          </Text>
          <Star
            accessibilityLabel={`${summary.average.toFixed(1)} out of 5 stars`}
            color={colors.rating}
            fill={colors.rating}
            size={iconSizes.medium}
            strokeWidth={iconStrokeWidths.subtle}
          />
        </View>
        <View className="gap-1">
          <Text variant="captionStrong">{summary.totalLabel}</Text>
          <Text tone="muted" variant="caption">
            {summary.subtitle}
          </Text>
        </View>
      </View>

      <View className="gap-2.5">
        {summary.distribution.map((item) => (
          <RatingDistributionRow key={item.stars} percentage={item.percentage} stars={item.stars} />
        ))}
      </View>
    </View>
  );
}
