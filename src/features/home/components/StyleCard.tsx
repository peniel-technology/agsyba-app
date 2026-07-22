import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { memo } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { Text } from '@/components/ui/Text';
import type { StyleCategory } from '@/features/home/types/styleCategory';
import { gradientLocations, gradients, layout, motion } from '@/theme';

interface StyleCardProps {
  category: StyleCategory;
  onPress?: (category: StyleCategory) => void;
}

const styles = StyleSheet.create({
  card: {
    height: layout.styleCardHeight,
    width: layout.styleCardWidth,
  },
});

export const StyleCard = memo(function StyleCard({ category, onPress }: StyleCardProps) {
  return (
    <Pressable
      accessibilityLabel={`${category.callToActionLabel}: ${category.name}`}
      accessibilityRole={onPress ? 'button' : undefined}
      accessibilityState={{ disabled: !onPress }}
      className="overflow-hidden rounded-2xl bg-subtle-surface active:opacity-80"
      disabled={!onPress}
      onPress={onPress ? () => onPress(category) : undefined}
      style={styles.card}
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
      <View className="flex-1 justify-end gap-0.5 px-2.5 pb-2.5">
        <Text numberOfLines={1} tone="brandForeground" variant="captionStrong">
          {category.name}
        </Text>
        <Text className="opacity-80" tone="brandForeground" variant="microStrong">
          {category.callToActionLabel} →
        </Text>
      </View>
    </Pressable>
  );
});
