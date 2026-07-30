import { Image } from 'expo-image';
import { ChevronLeft, ChevronRight, X } from 'lucide-react-native';
import { useCallback, useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Text } from '@/components/ui/Text';
import { ProductStarRating } from '@/features/products/components/detail/ProductStarRating';
import type { ProductReview } from '@/features/products/types/productDetail';
import { colors, iconSizes, iconStrokeWidths, motion, spacing } from '@/theme';

interface ProductReviewGalleryProps {
  review: ProductReview;
}

const styles = StyleSheet.create({
  imageFill: StyleSheet.absoluteFillObject,
  viewerImage: StyleSheet.absoluteFillObject,
});

export function ProductReviewGallery({ review }: ProductReviewGalleryProps) {
  const { author, images } = review;
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const activeIndex = selectedIndex ?? 0;
  const closeViewer = useCallback(() => {
    setSelectedIndex(null);
  }, []);
  const showPreviousImage = useCallback(() => {
    setSelectedIndex((currentIndex) =>
      currentIndex === null ? null : Math.max(0, currentIndex - 1),
    );
  }, []);
  const showNextImage = useCallback(() => {
    setSelectedIndex((currentIndex) =>
      currentIndex === null ? null : Math.min(images.length - 1, currentIndex + 1),
    );
  }, [images.length]);

  if (images.length === 0) {
    return null;
  }

  return (
    <>
      <ScrollView
        accessibilityLabel={`${author} review photos`}
        contentContainerClassName="gap-2"
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {images.map((image, index) => (
          <Pressable
            accessibilityLabel={`Open ${image.accessibilityLabel}`}
            accessibilityRole="button"
            className="relative h-28 w-28 overflow-hidden rounded-lg bg-subtle-surface active:opacity-80"
            key={image.id}
            onPress={() => setSelectedIndex(index)}
          >
            <Image
              accessibilityIgnoresInvertColors
              contentFit="cover"
              source={image.source}
              style={styles.imageFill}
              transition={motion.imageTransitionMs}
            />
            {index === 0 ? (
              <View className="absolute bottom-2 right-2 rounded-full bg-black/60 px-2 py-1">
                <Text tone="brandForeground" variant="detailStrong">
                  {images.length} photos
                </Text>
              </View>
            ) : null}
          </Pressable>
        ))}
      </ScrollView>

      <Modal
        animationType="fade"
        onRequestClose={closeViewer}
        presentationStyle="fullScreen"
        statusBarTranslucent
        visible={selectedIndex !== null}
      >
        <SafeAreaView
          accessibilityViewIsModal
          className="flex-1 bg-foreground"
          edges={['top', 'bottom']}
        >
          <View className="h-16 flex-row items-center border-b border-surface/10 px-4">
            <Pressable
              accessibilityLabel="Close review image viewer"
              accessibilityRole="button"
              className="size-10 items-center justify-center rounded-full bg-white/10 active:opacity-70"
              hitSlop={spacing[2]}
              onPress={closeViewer}
            >
              <X
                accessible={false}
                color={colors.brandForeground}
                size={iconSizes.large}
                strokeWidth={iconStrokeWidths.regular}
              />
            </Pressable>
            <View className="ml-3 flex-1">
              <Text tone="brandForeground" variant="bodyStrong">
                Customer Photos
              </Text>
              <Text className="mt-0.5" tone="brandForeground" variant="caption">
                {activeIndex + 1} of {images.length}
              </Text>
            </View>
          </View>

          <View className="flex-row items-center gap-3 border-b border-surface/10 px-4 py-3">
            <View className="size-10 items-center justify-center rounded-full bg-sale-surface">
              <Text tone="brand" variant="captionStrong">
                {review.initials}
              </Text>
            </View>
            <View className="flex-1 gap-1">
              <View className="flex-row items-center gap-2">
                <Text tone="brandForeground" variant="captionStrong">
                  {review.author}
                </Text>
                {review.verifiedPurchase ? (
                  <Text tone="success" variant="detailMedium">
                    Verified Purchase
                  </Text>
                ) : null}
              </View>
              <ProductStarRating rating={review.rating} />
            </View>
            <Text className="opacity-70" tone="brandForeground" variant="caption">
              {review.date}
            </Text>
          </View>

          <View className="flex-1 px-4 py-3">
            <View className="relative flex-1 overflow-hidden rounded-2xl bg-surface/5">
              <Image
                accessibilityLabel={images[activeIndex].accessibilityLabel}
                contentFit="contain"
                source={images[activeIndex].source}
                style={styles.viewerImage}
                transition={motion.imageTransitionMs}
              />

              <Pressable
                accessibilityLabel="Show previous review image"
                accessibilityRole="button"
                accessibilityState={{ disabled: activeIndex === 0 }}
                className="absolute left-3 top-1/2 -mt-5 size-10 items-center justify-center rounded-full bg-drawer-backdrop/60 active:opacity-70 disabled:opacity-30"
                disabled={activeIndex === 0}
                hitSlop={spacing[2]}
                onPress={showPreviousImage}
              >
                <ChevronLeft
                  accessible={false}
                  color={colors.brandForeground}
                  size={iconSizes.large}
                  strokeWidth={iconStrokeWidths.emphasized}
                />
              </Pressable>

              <Pressable
                accessibilityLabel="Show next review image"
                accessibilityRole="button"
                accessibilityState={{ disabled: activeIndex === images.length - 1 }}
                className="absolute right-3 top-1/2 -mt-5 size-10 items-center justify-center rounded-full bg-drawer-backdrop/60 active:opacity-70 disabled:opacity-30"
                disabled={activeIndex === images.length - 1}
                hitSlop={spacing[2]}
                onPress={showNextImage}
              >
                <ChevronRight
                  accessible={false}
                  color={colors.brandForeground}
                  size={iconSizes.large}
                  strokeWidth={iconStrokeWidths.emphasized}
                />
              </Pressable>

              <View
                className="absolute bottom-3 self-center rounded-full bg-drawer-backdrop/70 px-3 py-1.5"
                pointerEvents="none"
              >
                <Text tone="brandForeground" variant="captionStrong">
                  {activeIndex + 1} / {images.length}
                </Text>
              </View>
            </View>
          </View>

          <View className="gap-3 border-t border-surface/10 px-4 pb-3 pt-3">
            <Text className="opacity-80" numberOfLines={3} tone="brandForeground" variant="caption">
              {review.text}
            </Text>

            <ScrollView
              accessibilityLabel="Review image thumbnails"
              contentContainerClassName="gap-2"
              horizontal
              showsHorizontalScrollIndicator={false}
            >
              {images.map((image, index) => {
                const isSelected = index === activeIndex;

                return (
                  <Pressable
                    accessibilityLabel={`Show ${image.accessibilityLabel}`}
                    accessibilityRole="button"
                    accessibilityState={{ selected: isSelected }}
                    className={`size-16 overflow-hidden rounded-lg ${
                      isSelected ? 'border-2 border-brand' : 'border border-surface/30'
                    }`}
                    key={image.id}
                    onPress={() => setSelectedIndex(index)}
                  >
                    <Image
                      accessibilityIgnoresInvertColors
                      contentFit="cover"
                      source={image.source}
                      style={styles.imageFill}
                      transition={motion.imageTransitionMs}
                    />
                  </Pressable>
                );
              })}
            </ScrollView>
          </View>
        </SafeAreaView>
      </Modal>
    </>
  );
}
