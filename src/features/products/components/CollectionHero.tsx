import { Image } from 'expo-image';
import { ChevronRight } from 'lucide-react-native';
import { Pressable, StyleSheet, View } from 'react-native';

import { Text } from '@/components/ui/Text';
import { colors, iconSizes, iconStrokeWidths, motion } from '@/theme';

interface CollectionHeroProps {
  callToActionLabel: string;
  description: string;
  eyebrow: string;
  image: number;
  imageAccessibilityLabel: string;
  onShopPress?: () => void;
  title: string;
}

export function CollectionHero({
  callToActionLabel,
  description,
  eyebrow,
  image,
  imageAccessibilityLabel,
  onShopPress,
  title,
}: CollectionHeroProps) {
  return (
    <View className="self-stretch px-4">
      <View className="h-72 overflow-hidden rounded-xl bg-subtle-surface">
        <Image
          accessibilityLabel={imageAccessibilityLabel}
          accessible
          contentFit="cover"
          source={image}
          style={StyleSheet.absoluteFillObject}
          transition={motion.imageTransitionMs}
        />
        <View className="absolute inset-0 bg-drawer-backdrop/40" pointerEvents="none" />

        <View className="flex-1 items-start justify-end p-6">
          <View className="self-stretch items-start gap-3">
            <Text className="uppercase" tone="brandForeground" variant="captionStrong">
              {eyebrow}
            </Text>
            <Text className="self-stretch uppercase" tone="brandForeground" variant="display">
              {title}
            </Text>
            <Text
              className="self-stretch text-sm leading-5 opacity-90"
              tone="brandForeground"
              variant="body"
            >
              {description}
            </Text>
            <Pressable
              accessibilityLabel={`${callToActionLabel}: ${title}`}
              accessibilityRole="button"
              accessibilityState={{ disabled: !onShopPress }}
              className="min-h-11 flex-row items-center gap-1 py-2 active:opacity-70"
              disabled={!onShopPress}
              hitSlop={8}
              onPress={onShopPress}
            >
              <Text className="uppercase" tone="brandForeground" variant="captionStrong">
                {callToActionLabel}
              </Text>
              <ChevronRight
                accessible={false}
                color={colors.brandForeground}
                size={iconSizes.small}
                strokeWidth={iconStrokeWidths.emphasized}
              />
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}
