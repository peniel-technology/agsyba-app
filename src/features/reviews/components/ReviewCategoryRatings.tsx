import { View } from 'react-native';

import { Text } from '@/components/ui/Text';
import { StarRating } from '@/features/reviews/components/StarRating';
import type { ReviewCategoryRating } from '@/features/reviews/constants/ratingReviewData';

interface ReviewCategoryRatingsProps {
  categories: readonly ReviewCategoryRating[];
  onChange: (id: string, value: number) => void;
}

export function ReviewCategoryRatings({ categories, onChange }: ReviewCategoryRatingsProps) {
  return (
    <View className="gap-4">
      <Text variant="title">Rate by Category</Text>
      <View className="gap-3">
        {categories.map((category) => (
          <View className="flex-row items-center justify-between gap-3" key={category.id}>
            <Text className="flex-1" variant="label">
              {category.label}
            </Text>
            <StarRating
              accessibilityLabel={category.label}
              onChange={(value) => onChange(category.id, value)}
              value={category.value}
            />
          </View>
        ))}
      </View>
    </View>
  );
}
