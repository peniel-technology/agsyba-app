import { CircularCategorySection } from '@/components/common/CircularCategorySection';
import type { CircularCategoryItem } from '@/types/circularCategory';

interface TrendingNowProps {
  categories: readonly CircularCategoryItem[];
  onCategoryPress?: (category: CircularCategoryItem) => void;
  onViewAllPress?: () => void;
}

export function TrendingNow({ categories, onCategoryPress, onViewAllPress }: TrendingNowProps) {
  return (
    <CircularCategorySection
      itemAccessibilityPrefix="Browse"
      items={categories}
      listAccessibilityLabel="Trending categories"
      onItemPress={onCategoryPress}
      onViewAllPress={onViewAllPress}
      title="Trending Now"
      viewAllAccessibilityLabel="View all trending categories"
      viewAllText="See All"
    />
  );
}
