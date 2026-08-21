import { Image } from 'expo-image';
import { Pressable, StyleSheet, View } from 'react-native';

import { Text } from '@/components/ui/Text';
import type { ShopCategory } from '@/features/shop/types/shopCategory';
import { motion } from '@/theme';

interface ShopCategoryRowProps {
  categories: readonly ShopCategory[];
  onCategoryPress: (category: ShopCategory) => void;
}

const styles = StyleSheet.create({
  image: {
    aspectRatio: 1,
    width: '100%',
  },
});

export function ShopCategoryRow({ categories, onCategoryPress }: ShopCategoryRowProps) {
  return (
    <View className="flex-row gap-3 px-4">
      {categories.map((category) => (
        <Pressable
          accessibilityLabel={`Browse ${category.name}`}
          accessibilityRole="button"
          className="min-w-0 flex-1 items-center gap-2 active:opacity-70"
          key={category.id}
          onPress={() => onCategoryPress(category)}
        >
          <Image
            accessibilityLabel={category.imageAccessibilityLabel}
            className="rounded-lg bg-subtle-surface"
            contentFit="cover"
            source={category.image}
            style={styles.image}
            transition={motion.imageTransitionMs}
          />
          <Text className="text-center" variant="captionStrong">
            {category.name}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}
