import { ChevronDown, Funnel } from 'lucide-react-native';
import { Pressable, ScrollView } from 'react-native';

import { Text } from '@/components/ui/Text';
import { colors, iconSizes, iconStrokeWidths, spacing } from '@/theme';

const dropdownFilters = [
  { id: 'sort', label: 'Sort by' },
  { id: 'category', label: 'Category' },
  { id: 'size', label: 'Size' },
] as const;

export type CollectionDropdownFilterId = (typeof dropdownFilters)[number]['id'];

interface CollectionFiltersProps<TCategory extends string> {
  categories: readonly TCategory[];
  onCategoryChange: (category: TCategory) => void;
  onDropdownPress?: (filter: CollectionDropdownFilterId) => void;
  onFilterPress?: () => void;
  selectedCategory: TCategory;
}

export function CollectionFilters<TCategory extends string>({
  categories,
  onCategoryChange,
  onDropdownPress,
  onFilterPress,
  selectedCategory,
}: CollectionFiltersProps<TCategory>) {
  return (
    <>
      <ScrollView
        accessibilityLabel="Product categories"
        contentContainerClassName="gap-2.5 px-4"
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {categories.map((category) => {
          const isSelected = category === selectedCategory;

          return (
            <Pressable
              accessibilityLabel={`Show ${category} products`}
              accessibilityRole="button"
              accessibilityState={{ selected: isSelected }}
              className={`min-h-10 items-center justify-center rounded-full px-5 py-2.5 active:opacity-70 ${
                isSelected ? 'bg-foreground' : 'border border-border bg-surface'
              }`}
              key={category}
              onPress={() => onCategoryChange(category)}
            >
              <Text
                tone={isSelected ? 'brandForeground' : 'muted'}
                variant={isSelected ? 'captionStrong' : 'captionMedium'}
              >
                {category}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>

      <ScrollView
        accessibilityLabel="Product filter controls"
        className="mt-2"
        contentContainerClassName="gap-2 px-4 py-3"
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        <Pressable
          accessibilityLabel="Open product filters"
          accessibilityRole="button"
          accessibilityState={{ disabled: !onFilterPress }}
          className="flex-row items-center gap-1.5 rounded-full bg-brand py-1.5 pl-3 pr-3.5 active:opacity-70"
          disabled={!onFilterPress}
          hitSlop={spacing[2]}
          onPress={onFilterPress}
        >
          <Funnel
            accessible={false}
            color={colors.brandForeground}
            size={iconSizes.small}
            strokeWidth={iconStrokeWidths.regular}
          />
          <Text tone="brandForeground" variant="detailStrong">
            Filter
          </Text>
        </Pressable>

        {dropdownFilters.map((filter) => (
          <Pressable
            accessibilityLabel={`Open ${filter.label.toLowerCase()} options`}
            accessibilityRole="button"
            accessibilityState={{ disabled: !onDropdownPress }}
            className="flex-row items-center gap-1 rounded-full border border-border bg-surface py-1.5 pl-3.5 pr-2.5 active:opacity-70"
            disabled={!onDropdownPress}
            hitSlop={spacing[2]}
            key={filter.id}
            onPress={onDropdownPress ? () => onDropdownPress(filter.id) : undefined}
          >
            <Text variant="detailMedium">{filter.label}</Text>
            <ChevronDown
              accessible={false}
              color={colors.text}
              size={iconSizes.small}
              strokeWidth={iconStrokeWidths.regular}
            />
          </Pressable>
        ))}
      </ScrollView>
    </>
  );
}
