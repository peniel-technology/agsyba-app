import { Image } from 'expo-image';
import { memo, useCallback } from 'react';
import type { ListRenderItem } from 'react-native';
import { FlatList, Pressable, View } from 'react-native';

import { Text } from '@/components/ui/Text';
import { layout, motion, spacing } from '@/theme';
import type { CircularCategoryItem } from '@/types/circularCategory';

interface CircularCategoryItemViewProps {
  accessibilityPrefix: string;
  item: CircularCategoryItem;
  onPress?: (item: CircularCategoryItem) => void;
}

const CircularCategoryItemView = memo(function CircularCategoryItemView({
  accessibilityPrefix,
  item,
  onPress,
}: CircularCategoryItemViewProps) {
  return (
    <Pressable
      accessibilityLabel={`${accessibilityPrefix} ${item.name}`}
      accessibilityRole={onPress ? 'button' : undefined}
      accessibilityState={{ disabled: !onPress }}
      className="items-center gap-2 active:opacity-70"
      disabled={!onPress}
      onPress={onPress ? () => onPress(item) : undefined}
      style={{ width: layout.categoryCircleSize }}
    >
      <Image
        accessibilityLabel={item.imageAccessibilityLabel}
        accessible
        className="rounded-full bg-subtle-surface"
        contentFit="cover"
        source={item.image}
        style={{ height: layout.categoryCircleSize, width: layout.categoryCircleSize }}
        transition={motion.imageTransitionMs}
      />
      <Text className="text-center" numberOfLines={1} variant="captionMedium">
        {item.name}
      </Text>
    </Pressable>
  );
});

interface CircularCategorySectionProps {
  itemAccessibilityPrefix: string;
  items: readonly CircularCategoryItem[];
  listAccessibilityLabel: string;
  onItemPress?: (item: CircularCategoryItem) => void;
  onViewAllPress?: () => void;
  title: string;
  viewAllAccessibilityLabel: string;
  viewAllText: string;
}

export function CircularCategorySection({
  itemAccessibilityPrefix,
  items,
  listAccessibilityLabel,
  onItemPress,
  onViewAllPress,
  title,
  viewAllAccessibilityLabel,
  viewAllText,
}: CircularCategorySectionProps) {
  const itemInterval = layout.categoryCircleSize + spacing[4];
  const renderItem = useCallback<ListRenderItem<CircularCategoryItem>>(
    ({ item }) => (
      <CircularCategoryItemView
        accessibilityPrefix={itemAccessibilityPrefix}
        item={item}
        onPress={onItemPress}
      />
    ),
    [itemAccessibilityPrefix, onItemPress],
  );
  const getItemLayout = useCallback(
    (_data: ArrayLike<CircularCategoryItem> | null | undefined, index: number) => ({
      index,
      length: itemInterval,
      offset: itemInterval * index,
    }),
    [itemInterval],
  );

  return (
    <View className="gap-4">
      <View className="flex-row items-center justify-between px-4">
        <Text variant="sectionHeading">{title}</Text>
        <Pressable
          accessibilityLabel={viewAllAccessibilityLabel}
          accessibilityRole={onViewAllPress ? 'button' : undefined}
          accessibilityState={{ disabled: !onViewAllPress }}
          className="min-h-10 justify-center active:opacity-70"
          disabled={!onViewAllPress}
          hitSlop={spacing[1]}
          onPress={onViewAllPress}
        >
          <Text className="uppercase" tone="brand" variant="captionStrong">
            {viewAllText}
          </Text>
        </Pressable>
      </View>

      <FlatList
        accessibilityLabel={listAccessibilityLabel}
        contentContainerStyle={{
          gap: spacing[4],
          paddingLeft: spacing[4],
          paddingRight: spacing[4],
        }}
        data={items}
        decelerationRate="normal"
        getItemLayout={getItemLayout}
        horizontal
        initialNumToRender={items.length}
        keyExtractor={(item) => item.id}
        maxToRenderPerBatch={items.length}
        removeClippedSubviews={false}
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}
