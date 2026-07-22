import { useWindowDimensions, View } from 'react-native';

import { EmptyState } from '@/components/common/EmptyState';
import { Text } from '@/components/ui/Text';
import { CategoryCard } from '@/features/products/components/CategoryCard';
import type { BrowseCategory } from '@/features/products/types/browseCategory';
import { layout, spacing } from '@/theme';

interface BrowseCategoriesProps {
  categories: readonly BrowseCategory[];
  onCategoryPress?: (category: BrowseCategory) => void;
}

export function BrowseCategories({ categories, onCategoryPress }: BrowseCategoriesProps) {
  const { width: windowWidth } = useWindowDimensions();
  const columnCount =
    windowWidth >= layout.tabletBreakpoint
      ? layout.categoryGridTabletColumns
      : layout.categoryGridPhoneColumns;
  const contentWidth = windowWidth - spacing[8];
  const cardWidth = (contentWidth - spacing[4] * (columnCount - 1)) / columnCount;
  const cardHeight = cardWidth / layout.categoryCardAspectRatio;

  return (
    <View className="gap-4 px-4">
      <Text variant="sectionHeading">Browse Categories</Text>
      {categories.length > 0 ? (
        <View className="flex-row flex-wrap gap-4">
          {categories.map((category) => (
            <CategoryCard
              category={category}
              height={cardHeight}
              key={category.id}
              onPress={onCategoryPress}
              width={cardWidth}
            />
          ))}
        </View>
      ) : (
        <EmptyState
          description="Try another product type or category name."
          title="No categories found"
        />
      )}
    </View>
  );
}
