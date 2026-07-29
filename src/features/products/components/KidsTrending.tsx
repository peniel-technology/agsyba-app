import { CircularCategorySection } from '@/components/common/CircularCategorySection';
import type { CircularCategoryItem } from '@/types/circularCategory';

interface KidsTrendingProps {
  categories: readonly CircularCategoryItem[];
  onCategoryPress?: (category: CircularCategoryItem) => void;
  onViewAllPress?: () => void;
}

export function KidsTrending({ categories, onCategoryPress, onViewAllPress }: KidsTrendingProps) {
  return (
    <CircularCategorySection
      itemAccessibilityPrefix="Browse"
      items={categories}
      listAccessibilityLabel="Trending kids' categories"
      onItemPress={onCategoryPress}
      onViewAllPress={onViewAllPress}
      title="Trending in Kids'"
      viewAllAccessibilityLabel="View all trending kids' categories"
      viewAllText="See All"
    />
  );
}
