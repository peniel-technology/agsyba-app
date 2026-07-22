import { useCallback } from 'react';
import type { ListRenderItem } from 'react-native';
import { FlatList, StyleSheet, View } from 'react-native';

import { Text } from '@/components/ui/Text';
import { StyleCard } from '@/features/home/components/StyleCard';
import type { StyleCategory } from '@/features/home/types/styleCategory';
import { layout, spacing } from '@/theme';

interface ShopByStyleProps {
  categories: readonly StyleCategory[];
  onCategoryPress?: (category: StyleCategory) => void;
}

const styleCardInterval = layout.styleCardWidth + spacing[2.5];

const styles = StyleSheet.create({
  content: {
    gap: spacing[2.5],
    paddingHorizontal: spacing[4],
  },
});

function getItemLayout(_data: ArrayLike<StyleCategory> | null | undefined, index: number) {
  return {
    index,
    length: styleCardInterval,
    offset: styleCardInterval * index,
  };
}

export function ShopByStyle({ categories, onCategoryPress }: ShopByStyleProps) {
  const renderCategory = useCallback<ListRenderItem<StyleCategory>>(
    ({ item }) => <StyleCard category={item} onPress={onCategoryPress} />,
    [onCategoryPress],
  );

  if (categories.length === 0) {
    return null;
  }

  return (
    <View className="gap-3.5 py-4">
      <View className="px-4">
        <Text variant="sectionHeading">Shop by Style</Text>
      </View>
      <FlatList
        accessibilityLabel="Shop by style"
        contentContainerStyle={styles.content}
        data={categories}
        decelerationRate="normal"
        getItemLayout={getItemLayout}
        horizontal
        initialNumToRender={categories.length}
        keyExtractor={(category) => category.id}
        maxToRenderPerBatch={categories.length}
        removeClippedSubviews={false}
        renderItem={renderCategory}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}
