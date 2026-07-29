import {
  CollectionFilters,
  type CollectionDropdownFilterId,
} from '@/features/products/components/CollectionFilters';
import {
  mensCollectionCategories,
  type MensCollectionCategory,
} from '@/features/products/constants/mensCollectionFilters';

interface MensCollectionFiltersProps {
  onCategoryChange: (category: MensCollectionCategory) => void;
  onDropdownPress?: (filter: CollectionDropdownFilterId) => void;
  onFilterPress?: () => void;
  selectedCategory: MensCollectionCategory;
}

export function MensCollectionFilters({
  onCategoryChange,
  onDropdownPress,
  onFilterPress,
  selectedCategory,
}: MensCollectionFiltersProps) {
  return (
    <CollectionFilters
      categories={mensCollectionCategories}
      onCategoryChange={onCategoryChange}
      onDropdownPress={onDropdownPress}
      onFilterPress={onFilterPress}
      selectedCategory={selectedCategory}
    />
  );
}
