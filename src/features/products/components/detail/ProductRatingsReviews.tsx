import { useState } from 'react';
import { Pressable, View } from 'react-native';

import { Text } from '@/components/ui/Text';
import { ProductRatingSummary } from '@/features/products/components/detail/ProductRatingSummary';
import { ProductReviewCard } from '@/features/products/components/detail/ProductReviewCard';
import type {
  ProductRatingSummary as ProductRatingSummaryData,
  ProductReview,
} from '@/features/products/types/productDetail';

interface ProductRatingsReviewsProps {
  reviews: readonly ProductReview[];
  summary: ProductRatingSummaryData;
}

const initialReviewCount = 2;

export function ProductRatingsReviews({ reviews, summary }: ProductRatingsReviewsProps) {
  const [showAllReviews, setShowAllReviews] = useState(false);
  const visibleReviews = showAllReviews ? reviews : reviews.slice(0, initialReviewCount);
  const hasAdditionalReviews = reviews.length > initialReviewCount;
  const toggleLabel = showAllReviews ? 'Show Fewer Reviews' : 'View All Reviews';

  return (
    <View className="gap-4 px-4">
      <Text className="uppercase" variant="bodyStrong">
        Ratings & Reviews
      </Text>

      <ProductRatingSummary summary={summary} />

      <View className="gap-3">
        {visibleReviews.map((review) => (
          <ProductReviewCard key={review.id} review={review} />
        ))}
      </View>

      {hasAdditionalReviews ? (
        <Pressable
          accessibilityLabel={toggleLabel}
          accessibilityRole="button"
          className="self-start active:opacity-70"
          onPress={() => setShowAllReviews((currentValue) => !currentValue)}
        >
          <Text className="underline" tone="brand" variant="caption">
            {toggleLabel}
          </Text>
        </Pressable>
      ) : null}
    </View>
  );
}
