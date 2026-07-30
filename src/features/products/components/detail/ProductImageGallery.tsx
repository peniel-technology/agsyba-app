import { Image } from 'expo-image';
import { ChevronLeft, ChevronRight, Heart, Share2 } from 'lucide-react-native';
import { useCallback, useRef, useState } from 'react';
import type { ListRenderItem, NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';

import { colors, iconSizes, iconStrokeWidths, layout, motion, spacing } from '@/theme';
import type { ProductDetailImage } from '@/features/products/types/productDetail';

interface ProductImageGalleryProps {
  images: readonly ProductDetailImage[];
  isFavorite: boolean;
  onFavoritePress: () => void;
  onSharePress: () => void;
}

const styles = StyleSheet.create({
  gallery: { height: layout.productDetailGalleryHeight },
  imageFill: StyleSheet.absoluteFillObject,
  thumbnail: {
    height: layout.productDetailThumbnailSize,
    width: layout.productDetailThumbnailSize,
  },
});

export function ProductImageGallery({
  images,
  isFavorite,
  onFavoritePress,
  onSharePress,
}: ProductImageGalleryProps) {
  const { width: galleryWidth } = useWindowDimensions();
  const galleryRef = useRef<FlatList<ProductDetailImage>>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const selectImage = useCallback((index: number) => {
    setActiveIndex(index);
    galleryRef.current?.scrollToIndex({ animated: true, index });
  }, []);
  const showPreviousImage = useCallback(() => {
    selectImage(Math.max(0, activeIndex - 1));
  }, [activeIndex, selectImage]);
  const showNextImage = useCallback(() => {
    selectImage(Math.min(images.length - 1, activeIndex + 1));
  }, [activeIndex, images.length, selectImage]);
  const handleScrollEnd = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const nextIndex = Math.round(event.nativeEvent.contentOffset.x / galleryWidth);
      setActiveIndex(Math.min(Math.max(nextIndex, 0), images.length - 1));
    },
    [galleryWidth, images.length],
  );
  const renderImage = useCallback<ListRenderItem<ProductDetailImage>>(
    ({ item }) => (
      <Image
        accessibilityLabel={item.accessibilityLabel}
        contentFit="contain"
        source={item.source}
        style={{ height: layout.productDetailGalleryHeight, width: galleryWidth }}
        transition={motion.imageTransitionMs}
      />
    ),
    [galleryWidth],
  );
  const getItemLayout = useCallback(
    (_data: ArrayLike<ProductDetailImage> | null | undefined, index: number) => ({
      index,
      length: galleryWidth,
      offset: galleryWidth * index,
    }),
    [galleryWidth],
  );

  return (
    <View className="gap-3">
      <View className="relative overflow-hidden bg-surface" style={styles.gallery}>
        <FlatList
          data={images}
          decelerationRate="fast"
          getItemLayout={getItemLayout}
          horizontal
          keyExtractor={(item) => item.id}
          onMomentumScrollEnd={handleScrollEnd}
          pagingEnabled
          ref={galleryRef}
          renderItem={renderImage}
          showsHorizontalScrollIndicator={false}
        />

        <View
          accessibilityLabel={`Image ${activeIndex + 1} of ${images.length}`}
          className="absolute bottom-3 inset-x-0 flex-row items-center justify-center gap-1.5"
          pointerEvents="none"
        >
          {images.map((image, index) => (
            <View
              className={`rounded-full ${
                index === activeIndex ? 'size-2 bg-brand' : 'size-1.5 bg-muted/60'
              }`}
              key={image.id}
            />
          ))}
        </View>

        <Pressable
          accessibilityLabel="Show previous product image"
          accessibilityRole="button"
          accessibilityState={{ disabled: activeIndex === 0 }}
          className="absolute left-3 top-1/2 -mt-5 size-9 items-center justify-center rounded-full bg-drawer-backdrop/30 active:opacity-70 disabled:opacity-30"
          disabled={activeIndex === 0}
          hitSlop={spacing[2]}
          onPress={showPreviousImage}
        >
          <ChevronLeft
            accessible={false}
            color={colors.brandForeground}
            size={iconSizes.medium}
            strokeWidth={iconStrokeWidths.emphasized}
          />
        </Pressable>

        <Pressable
          accessibilityLabel="Show next product image"
          accessibilityRole="button"
          accessibilityState={{ disabled: activeIndex === images.length - 1 }}
          className="absolute right-3 top-1/2 -mt-5 size-9 items-center justify-center rounded-full bg-drawer-backdrop/30 active:opacity-70 disabled:opacity-30"
          disabled={activeIndex === images.length - 1}
          hitSlop={spacing[2]}
          onPress={showNextImage}
        >
          <ChevronRight
            accessible={false}
            color={colors.brandForeground}
            size={iconSizes.medium}
            strokeWidth={iconStrokeWidths.emphasized}
          />
        </Pressable>

        <View className="absolute right-4 top-4 flex-row gap-2">
          <Pressable
            accessibilityLabel="Share product"
            accessibilityRole="button"
            className="size-9 items-center justify-center rounded-full bg-surface shadow-md active:opacity-70"
            hitSlop={spacing[2]}
            onPress={onSharePress}
          >
            <Share2
              accessible={false}
              color={colors.muted}
              size={iconSizes.small}
              strokeWidth={iconStrokeWidths.regular}
            />
          </Pressable>

          <Pressable
            accessibilityLabel={
              isFavorite ? 'Remove product from wishlist' : 'Add product to wishlist'
            }
            accessibilityRole="button"
            accessibilityState={{ selected: isFavorite }}
            className="size-9 items-center justify-center rounded-full bg-surface shadow-md active:opacity-70"
            hitSlop={spacing[2]}
            onPress={onFavoritePress}
          >
            <Heart
              accessible={false}
              color={isFavorite ? colors.brand : colors.muted}
              fill={isFavorite ? colors.brand : 'none'}
              size={iconSizes.small}
              strokeWidth={iconStrokeWidths.regular}
            />
          </Pressable>
        </View>
      </View>

      <ScrollView
        accessibilityLabel="Product image thumbnails"
        contentContainerClassName="gap-2 px-4"
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
              className={`overflow-hidden rounded-xl ${
                isSelected ? 'border-2 border-brand' : 'border border-subtle-border'
              }`}
              key={image.id}
              onPress={() => selectImage(index)}
              style={styles.thumbnail}
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
  );
}
