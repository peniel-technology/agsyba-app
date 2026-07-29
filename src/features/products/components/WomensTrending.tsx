import { CircularCategorySection } from '@/components/common/CircularCategorySection';
import type { CircularCategoryItem } from '@/types/circularCategory';

interface WomensTrendingProps {
  categories: readonly CircularCategoryItem[];
  onCategoryPress?: (category: CircularCategoryItem) => void;
  onViewAllPress?: () => void;
}

export function WomensTrending({
  categories,
  onCategoryPress,
  onViewAllPress,
}: WomensTrendingProps) {
  return (
    <CircularCategorySection
      itemAccessibilityPrefix="Browse"
      items={categories}
      listAccessibilityLabel="Trending women's categories"
      onItemPress={onCategoryPress}
      onViewAllPress={onViewAllPress}
      title="Trending in Women's"
      viewAllAccessibilityLabel="View all trending women's categories"
      viewAllText="See All"
    />
  );
}
