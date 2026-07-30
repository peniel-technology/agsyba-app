import { Check } from 'lucide-react-native';
import { Pressable, ScrollView, View } from 'react-native';

import { Text } from '@/components/ui/Text';
import type {
  ProductFilterSection,
  ProductFilterSectionId,
  ProductFilterSelections,
} from '@/features/products/types/productFilters';
import { colors, iconSizes, iconStrokeWidths } from '@/theme';

interface ProductFilterPanelProps {
  activeSectionId: ProductFilterSectionId;
  onOptionPress: (sectionId: ProductFilterSectionId, optionId: string) => void;
  onSectionPress: (sectionId: ProductFilterSectionId) => void;
  sections: readonly ProductFilterSection[];
  selections: ProductFilterSelections;
}

export function ProductFilterPanel({
  activeSectionId,
  onOptionPress,
  onSectionPress,
  sections,
  selections,
}: ProductFilterPanelProps) {
  const activeSection = sections.find((section) => section.id === activeSectionId) ?? sections[0];

  return (
    <View className="flex-1 flex-row">
      <View className="w-36 border-r border-border bg-subtle-surface">
        <ScrollView
          accessibilityLabel="Filter categories"
          className="flex-1"
          showsVerticalScrollIndicator={false}
        >
          {sections.map((section) => {
            const isActive = section.id === activeSection.id;
            const selectedCount = selections[section.id].length;

            return (
              <Pressable
                accessibilityLabel={`Show ${section.label} filters`}
                accessibilityRole="tab"
                accessibilityState={{ selected: isActive }}
                className={`min-h-12 flex-row items-center justify-between py-4 pl-4 pr-2 active:opacity-70 ${
                  isActive ? 'border-l-4 border-brand bg-sale-surface pl-3' : 'bg-subtle-surface'
                }`}
                key={section.id}
                onPress={() => onSectionPress(section.id)}
              >
                <Text
                  className="flex-1"
                  numberOfLines={1}
                  tone={isActive ? 'brand' : 'default'}
                  variant={isActive ? 'captionStrong' : 'captionMedium'}
                >
                  {section.label}
                </Text>
                {selectedCount > 0 ? (
                  <View className="ml-1 min-w-5 items-center rounded-full bg-border px-1.5 py-0.5">
                    <Text variant="badge">{selectedCount}</Text>
                  </View>
                ) : null}
              </Pressable>
            );
          })}
        </ScrollView>
      </View>

      <View className="flex-1 bg-surface">
        <ScrollView
          accessibilityLabel={`${activeSection.label} filter options`}
          className="flex-1"
          showsVerticalScrollIndicator={false}
        >
          {activeSection.options.map((option) => {
            const isSelected = selections[activeSection.id].includes(option.id);

            return (
              <Pressable
                accessibilityLabel={`${isSelected ? 'Remove' : 'Select'} ${option.label} filter`}
                accessibilityRole="checkbox"
                accessibilityState={{ checked: isSelected }}
                className="min-h-14 flex-row items-center gap-4 border-b border-border px-5 py-4 active:bg-subtle-surface"
                key={option.id}
                onPress={() => onOptionPress(activeSection.id, option.id)}
              >
                <View
                  className={`size-4 items-center justify-center rounded-sm ${
                    isSelected ? 'bg-sale-surface' : 'border border-border bg-surface'
                  }`}
                >
                  {isSelected ? (
                    <Check
                      color={colors.brand}
                      size={iconSizes.small}
                      strokeWidth={iconStrokeWidths.emphasized}
                    />
                  ) : null}
                </View>
                <Text className="flex-1" variant="label">
                  {option.label}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
}
