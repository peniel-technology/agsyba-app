import { CircularCategorySection } from '@/components/common/CircularCategorySection';
import type { ShopCategory } from '@/features/home/types/shopCategory';

interface ShopByCategoryProps {
  categories: readonly ShopCategory[];
  onCategoryPress?: (category: ShopCategory) => void;
  onViewAllPress?: () => void;
}

export function ShopByCategory({
  categories,
  onCategoryPress,
  onViewAllPress,
}: ShopByCategoryProps) {
  return (
    <CircularCategorySection
      itemAccessibilityPrefix="Shop"
      items={categories}
      listAccessibilityLabel="Shopping categories"
      onItemPress={onCategoryPress}
      onViewAllPress={onViewAllPress}
      title="Shop by Category"
      viewAllAccessibilityLabel="View all categories"
      viewAllText="View All"
    />
  );
}
