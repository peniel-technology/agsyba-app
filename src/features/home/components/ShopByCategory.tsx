import { Image } from 'expo-image';
import { memo, useCallback } from 'react';
import type { ListRenderItem } from 'react-native';
import { FlatList, Pressable, View } from 'react-native';

import { Text } from '@/components/ui/Text';
import type { ShopCategory } from '@/features/home/types/shopCategory';
import { layout, motion, spacing } from '@/theme';

interface CategoryItemProps {
  category: ShopCategory;
  onPress?: (category: ShopCategory) => void;
}

const CategoryItem = memo(function CategoryItem({ category, onPress }: CategoryItemProps) {
  return (
    <Pressable
      accessibilityLabel={`Shop ${category.name}`}
      accessibilityRole={onPress ? 'button' : undefined}
      accessibilityState={{ disabled: !onPress }}
      className="items-center gap-2 active:opacity-70"
      disabled={!onPress}
      onPress={onPress ? () => onPress(category) : undefined}
      style={{ width: layout.categoryCircleSize }}
    >
      <Image
        accessibilityLabel={category.imageAccessibilityLabel}
        accessible
        className="rounded-full bg-subtle-surface"
        contentFit="cover"
        source={category.image}
        style={{ height: layout.categoryCircleSize, width: layout.categoryCircleSize }}
        transition={motion.imageTransitionMs}
      />
      <Text className="text-center" numberOfLines={1} variant="captionMedium">
        {category.name}
      </Text>
    </Pressable>
  );
});

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
  const categoryItemInterval = layout.categoryCircleSize + spacing[4];
  const renderCategory = useCallback<ListRenderItem<ShopCategory>>(
    ({ item }) => <CategoryItem category={item} onPress={onCategoryPress} />,
    [onCategoryPress],
  );
  const getItemLayout = useCallback(
    (_data: ArrayLike<ShopCategory> | null | undefined, index: number) => ({
      index,
      length: categoryItemInterval,
      offset: categoryItemInterval * index,
    }),
    [categoryItemInterval],
  );

  return (
    <View className="gap-4">
      <View className="flex-row items-center justify-between px-4">
        <Text variant="sectionHeading">Shop by Category</Text>
        <Pressable
          accessibilityLabel="View all categories"
          accessibilityRole={onViewAllPress ? 'button' : undefined}
          accessibilityState={{ disabled: !onViewAllPress }}
          className="min-h-10 justify-center active:opacity-70"
          disabled={!onViewAllPress}
          hitSlop={spacing[1]}
          onPress={onViewAllPress}
        >
          <Text className="uppercase" tone="brand" variant="captionStrong">
            View All
          </Text>
        </Pressable>
      </View>

      <FlatList
        accessibilityLabel="Shopping categories"
        className="self-start"
        contentContainerStyle={{
          gap: spacing[4],
          paddingLeft: spacing[4],
          paddingRight: spacing[4],
        }}
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
        style={{ maxWidth: layout.categoryCarouselMaxWidth }}
      />
    </View>
  );
}
