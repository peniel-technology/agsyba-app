import { CircularCategorySection } from '@/components/common/CircularCategorySection';
import type { CircularCategoryItem } from '@/types/circularCategory';

interface MensTrendingProps {
  categories: readonly CircularCategoryItem[];
  onCategoryPress?: (category: CircularCategoryItem) => void;
  onViewAllPress?: () => void;
}

export function MensTrending({ categories, onCategoryPress, onViewAllPress }: MensTrendingProps) {
  return (
    <CircularCategorySection
      itemAccessibilityPrefix="Browse"
      items={categories}
      listAccessibilityLabel="Trending men's categories"
      onItemPress={onCategoryPress}
      onViewAllPress={onViewAllPress}
      title="Trending in Men's"
      viewAllAccessibilityLabel="View all trending men's categories"
      viewAllText="See All"
    />
  );
}
