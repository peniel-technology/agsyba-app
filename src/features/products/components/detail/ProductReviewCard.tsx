import { View } from 'react-native';

import { Text } from '@/components/ui/Text';
import { ProductReviewGallery } from '@/features/products/components/detail/ProductReviewGallery';
import { ProductStarRating } from '@/features/products/components/detail/ProductStarRating';
import type { ProductReview } from '@/features/products/types/productDetail';

interface ProductReviewCardProps {
  review: ProductReview;
}

export function ProductReviewCard({ review }: ProductReviewCardProps) {
  return (
    <View className="gap-2.5 rounded-xl border border-subtle-border bg-surface p-3">
      <View className="flex-row items-start justify-between gap-3">
        <View className="flex-1 flex-row items-center gap-2.5">
          <View className="size-8 items-center justify-center rounded-full bg-sale-surface">
            <Text tone="brand" variant="detailStrong">
              {review.initials}
            </Text>
          </View>
          <View className="gap-0.5">
            <Text variant="captionStrong">{review.author}</Text>
            <View className="flex-row items-center gap-2">
              <ProductStarRating rating={review.rating} />
              {review.verifiedPurchase ? (
                <Text tone="success" variant="detailMedium">
                  Verified Purchase
                </Text>
              ) : null}
            </View>
          </View>
        </View>
        <Text tone="muted" variant="caption">
          {review.date}
        </Text>
      </View>

      <Text className="text-sm leading-5" tone="muted" variant="body">
        {review.text}
      </Text>

      <ProductReviewGallery review={review} />
    </View>
  );
}
