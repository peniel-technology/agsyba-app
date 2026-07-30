import { Star } from 'lucide-react-native';
import { View } from 'react-native';

import { Text } from '@/components/ui/Text';
import { colors, iconSizes, iconStrokeWidths } from '@/theme';
import type { ProductDetail } from '@/features/products/types/productDetail';
import { formatCurrency } from '@/utils/formatCurrency';

interface ProductDetailSummaryProps {
  product: ProductDetail;
}

const ratingPositions = [0, 1, 2, 3, 4] as const;

export function ProductDetailSummary({ product }: ProductDetailSummaryProps) {
  const filledStarCount = Math.floor(product.rating);

  return (
    <View className="gap-4 px-4">
      <View className="gap-1">
        <Text className="uppercase" tone="muted" variant="label">
          {product.brand}
        </Text>
        <Text className="text-3xl leading-9" variant="promotionalTitle">
          {product.name}
        </Text>
      </View>

      <View className="flex-row flex-wrap items-center gap-3">
        <Text tone="brand" variant="title">
          {formatCurrency(product.price)}
        </Text>
        <Text className="line-through" tone="muted" variant="body">
          {formatCurrency(product.originalPrice)}
        </Text>
        <View className="rounded-sm bg-brand px-2 py-1">
          <Text tone="brandForeground" variant="detailStrong">
            {product.discountPercentage}% OFF
          </Text>
        </View>
      </View>

      <View className="flex-row items-center gap-2">
        <View className="flex-row items-center gap-0.5">
          {ratingPositions.map((position) => {
            const isFilled = position < filledStarCount;
            const starColor = isFilled ? colors.rating : colors.border;

            return (
              <Star
                accessible={false}
                color={starColor}
                fill={starColor}
                key={position}
                size={iconSizes.small}
                strokeWidth={iconStrokeWidths.subtle}
              />
            );
          })}
        </View>
        <Text variant="captionStrong">{product.rating.toFixed(1)}</Text>
        <Text tone="muted" variant="caption">
          •
        </Text>
        <Text className="underline" tone="brand" variant="caption">
          {product.reviewCount} Reviews
        </Text>
      </View>
    </View>
  );
}
