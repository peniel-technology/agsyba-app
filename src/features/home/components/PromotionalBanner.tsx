import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, StyleSheet, View } from 'react-native';

import { Text } from '@/components/ui/Text';
import type { PromotionBannerContent } from '@/features/home/types/promotionBanner';
import { gradientLocations, gradients, layout } from '@/theme';

interface PromotionalBannerProps {
  content: PromotionBannerContent;
  onPress?: () => void;
  variant?: 'brand' | 'sale';
}

const styles = StyleSheet.create({
  banner: { height: layout.promotionalBannerHeight },
});

export function PromotionalBanner({ content, onPress, variant = 'brand' }: PromotionalBannerProps) {
  const isSale = variant === 'sale';
  const titleClassName = isSale
    ? 'text-5xl uppercase leading-10 tracking-wide'
    : 'uppercase leading-9 tracking-wide';
  const buttonClassName = isSale
    ? 'min-h-10 justify-center rounded-sm bg-surface px-5 py-2.5 active:opacity-70'
    : 'min-h-9 justify-center rounded-sm bg-brand px-4 py-2 active:opacity-70';

  return (
    <View className="px-4">
      <View className="overflow-hidden rounded-md" style={styles.banner}>
        <Image
          accessibilityLabel={content.imageAccessibilityLabel}
          accessible
          contentFit="cover"
          source={content.image}
          style={StyleSheet.absoluteFillObject}
        />
        <LinearGradient
          colors={isSale ? gradients.saleBanner : gradients.promotionalBanner}
          locations={isSale ? gradientLocations.saleBanner : gradientLocations.promotionalBanner}
          pointerEvents="none"
          style={StyleSheet.absoluteFillObject}
        />

        <View className="flex-1 items-start justify-center gap-3 p-6">
          <Text
            className={titleClassName}
            tone="brandForeground"
            variant={isSale ? 'display' : 'heading'}
          >
            {content.title}
          </Text>
          <Text className="text-sm leading-5 opacity-80" tone="brandForeground" variant="body">
            {content.description}
          </Text>
          <Pressable
            accessibilityLabel={`${content.callToActionLabel}: ${content.title}`}
            accessibilityRole={onPress ? 'button' : undefined}
            accessibilityState={{ disabled: !onPress }}
            className={buttonClassName}
            disabled={!onPress}
            onPress={onPress}
          >
            <Text
              className="uppercase"
              tone={isSale ? 'default' : 'brandForeground'}
              variant={isSale ? 'captionStrong' : 'label'}
            >
              {content.callToActionLabel}
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
