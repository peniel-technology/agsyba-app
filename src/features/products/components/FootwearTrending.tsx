import { CircularCategorySection } from '@/components/common/CircularCategorySection';
import type { CircularCategoryItem } from '@/types/circularCategory';

interface FootwearTrendingProps {
  categories: readonly CircularCategoryItem[];
  onCategoryPress?: (category: CircularCategoryItem) => void;
  onViewAllPress?: () => void;
}

export function FootwearTrending({
  categories,
  onCategoryPress,
  onViewAllPress,
}: FootwearTrendingProps) {
  return (
    <CircularCategorySection
      itemAccessibilityPrefix="Browse"
      items={categories}
      listAccessibilityLabel="Trending footwear categories"
      onItemPress={onCategoryPress}
      onViewAllPress={onViewAllPress}
      title="Trending in Footwear"
      viewAllAccessibilityLabel="View all trending footwear categories"
      viewAllText="See All"
    />
  );
}
