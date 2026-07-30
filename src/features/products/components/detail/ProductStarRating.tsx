import { Star } from 'lucide-react-native';
import { View } from 'react-native';

import { colors, iconStrokeWidths, spacing } from '@/theme';
import type { ProductRating } from '@/features/products/types/productDetail';

interface ProductStarRatingProps {
  rating: ProductRating;
}

const starValues = [1, 2, 3, 4, 5] as const;

export function ProductStarRating({ rating }: ProductStarRatingProps) {
  return (
    <View
      accessibilityLabel={`${rating} out of 5 stars`}
      accessibilityRole="image"
      className="flex-row items-center gap-0.5"
    >
      {starValues.map((starValue) => {
        const isActive = starValue <= rating;

        return (
          <Star
            accessible={false}
            color={isActive ? colors.rating : colors.border}
            fill={isActive ? colors.rating : colors.border}
            key={starValue}
            size={spacing[3]}
            strokeWidth={iconStrokeWidths.subtle}
          />
        );
      })}
    </View>
  );
}
