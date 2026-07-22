import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { ChevronRight } from 'lucide-react-native';
import { memo } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { Text } from '@/components/ui/Text';
import type { BrowseCategory } from '@/features/products/types/browseCategory';
import { colors, gradientLocations, gradients, iconSizes, iconStrokeWidths, motion } from '@/theme';

interface CategoryCardProps {
  category: BrowseCategory;
  height: number;
  onPress?: (category: BrowseCategory) => void;
  width: number;
}

export const CategoryCard = memo(function CategoryCard({
  category,
  height,
  onPress,
  width,
}: CategoryCardProps) {
  return (
    <Pressable
      accessibilityLabel={`Browse ${category.name}`}
      accessibilityRole="button"
      accessibilityState={{ disabled: !onPress }}
      className="overflow-hidden rounded-2xl bg-subtle-surface active:opacity-80"
      disabled={!onPress}
      onPress={onPress ? () => onPress(category) : undefined}
      style={{ height, width }}
    >
      <Image
        accessibilityLabel={category.imageAccessibilityLabel}
        accessible
        contentFit="cover"
        source={category.image}
        style={StyleSheet.absoluteFillObject}
        transition={motion.imageTransitionMs}
      />
      <LinearGradient
        colors={gradients.styleCard}
        locations={gradientLocations.styleCard}
        pointerEvents="none"
        style={StyleSheet.absoluteFillObject}
      />
      <View className="flex-1 flex-row items-end justify-between gap-2 px-4 pb-4">
        <Text className="flex-1" numberOfLines={1} tone="brandForeground" variant="sectionHeading">
          {category.name}
        </Text>
        <View className="size-10 items-center justify-center rounded-full bg-surface/15">
          <ChevronRight
            accessible={false}
            color={colors.brandForeground}
            size={iconSizes.small}
            strokeWidth={iconStrokeWidths.subtle}
          />
        </View>
      </View>
    </Pressable>
  );
});
