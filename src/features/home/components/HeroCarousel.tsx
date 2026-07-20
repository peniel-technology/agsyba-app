import { ChevronRight } from 'lucide-react-native';
import { memo, useCallback, useMemo } from 'react';
import type { ListRenderItem } from 'react-native';
import { FlatList, Pressable, StyleSheet, useWindowDimensions, View } from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';

import { Text } from '@/components/ui/Text';
import { useAutoCarousel } from '@/features/home/hooks/useAutoCarousel';
import type { HeroSlide } from '@/features/home/types';
import {
  colors,
  gradientLocations,
  gradients,
  iconSizes,
  iconStrokeWidths,
  layout,
  motion,
  spacing,
} from '@/theme';

interface HeroCardProps {
  isLoopClone?: boolean;
  onPress?: () => void;
  size: number;
  slide: HeroSlide;
}

const HeroCard = memo(function HeroCard({
  isLoopClone = false,
  onPress,
  size,
  slide,
}: HeroCardProps) {
  const accessibleTitle = slide.title.replace('\n', ' ');

  return (
    <View
      accessibilityElementsHidden={isLoopClone}
      className="overflow-hidden rounded-lg bg-background"
      importantForAccessibility={isLoopClone ? 'no-hide-descendants' : 'auto'}
      style={{ height: size, width: size }}
    >
      <Image
        accessibilityLabel={slide.imageAccessibilityLabel}
        accessible
        contentFit="cover"
        source={slide.image}
        style={StyleSheet.absoluteFillObject}
        transition={motion.imageTransitionMs}
      />

      <LinearGradient
        colors={gradients.hero}
        locations={gradientLocations.hero}
        pointerEvents="box-none"
        style={StyleSheet.absoluteFillObject}
      >
        <View className="flex-1 justify-end p-6">
          <View className="gap-2">
            <Text className="uppercase" tone="brandForeground" variant="captionStrong">
              {slide.eyebrow}
            </Text>

            <Text className="uppercase" tone="brandForeground" variant="display">
              {slide.title}
            </Text>

            <Pressable
              accessibilityLabel={`${slide.callToActionLabel}: ${accessibleTitle}`}
              accessibilityRole={onPress ? 'button' : undefined}
              accessibilityState={{ disabled: !onPress }}
              className="min-h-10 flex-row items-center self-start py-2 active:opacity-70"
              disabled={!onPress}
              hitSlop={spacing[1]}
              onPress={onPress}
            >
              <Text className="uppercase" tone="brandForeground" variant="captionStrong">
                {slide.callToActionLabel}
              </Text>
              <ChevronRight
                color={colors.brandForeground}
                size={iconSizes.small}
                strokeWidth={iconStrokeWidths.emphasized}
              />
            </Pressable>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
});

function HeroSlideSeparator() {
  return <View className="w-5" />;
}

interface HeroCarouselProps {
  onSlidePress?: (slide: HeroSlide) => void;
  slides: readonly HeroSlide[];
}

interface CarouselSlide {
  isLoopClone: boolean;
  key: string;
  slide: HeroSlide;
}

export function HeroCarousel({ onSlidePress, slides }: HeroCarouselProps) {
  const { width: windowWidth } = useWindowDimensions();
  const cardSize = Math.min(windowWidth - spacing[8], layout.heroCardMaxSize);
  const snapInterval = cardSize + spacing[5];
  const carouselSlides = useMemo<readonly CarouselSlide[]>(() => {
    const originalSlides = slides.map((slide) => ({
      isLoopClone: false,
      key: slide.id,
      slide,
    }));
    const [firstSlide] = slides;

    if (!firstSlide || slides.length === 1) {
      return originalSlides;
    }

    return [
      ...originalSlides,
      {
        isLoopClone: true,
        key: `${firstSlide.id}-loop-clone`,
        slide: firstSlide,
      },
    ];
  }, [slides]);
  const {
    carouselRef,
    handleMomentumScrollBegin,
    handleMomentumScrollEnd,
    handleScrollBeginDrag,
    handleScrollEndDrag,
  } = useAutoCarousel<CarouselSlide>({
    intervalMs: motion.heroAutoSlideIntervalMs,
    itemCount: slides.length,
    snapInterval,
    transitionDurationMs: motion.heroSlideTransitionMs,
  });

  const renderSlide = useCallback<ListRenderItem<CarouselSlide>>(
    ({ item }) => (
      <HeroCard
        isLoopClone={item.isLoopClone}
        onPress={onSlidePress ? () => onSlidePress(item.slide) : undefined}
        size={cardSize}
        slide={item.slide}
      />
    ),
    [cardSize, onSlidePress],
  );

  const getItemLayout = useCallback(
    (_data: ArrayLike<CarouselSlide> | null | undefined, index: number) => ({
      index,
      length: snapInterval,
      offset: snapInterval * index,
    }),
    [snapInterval],
  );

  return (
    <FlatList
      accessibilityLabel="Featured collections"
      contentContainerStyle={{ paddingHorizontal: spacing[4] }}
      data={carouselSlides}
      decelerationRate="fast"
      disableIntervalMomentum
      getItemLayout={getItemLayout}
      horizontal
      initialNumToRender={2}
      ItemSeparatorComponent={HeroSlideSeparator}
      keyExtractor={(item) => item.key}
      maxToRenderPerBatch={3}
      onMomentumScrollBegin={handleMomentumScrollBegin}
      onMomentumScrollEnd={handleMomentumScrollEnd}
      onScrollBeginDrag={handleScrollBeginDrag}
      onScrollEndDrag={handleScrollEndDrag}
      ref={carouselRef}
      renderItem={renderSlide}
      showsHorizontalScrollIndicator={false}
      snapToAlignment="start"
      snapToInterval={snapInterval}
      windowSize={3}
    />
  );
}
