import { Heart } from 'lucide-react-native';
import { Pressable, ScrollView, View } from 'react-native';

import { ProductCard } from '@/components/product/ProductCard';
import { Text } from '@/components/ui/Text';
import { colors, iconSizes, iconStrokeWidths, layout } from '@/theme';
import type { ProductPreview } from '@/types/product';

interface WishlistEmptyStateProps {
  onExploreCollectionsPress: () => void;
  onFavoritePress: (product: ProductPreview) => void;
  onProductPress: (product: ProductPreview) => void;
  onViewNewArrivalsPress: () => void;
  trendingProducts: readonly ProductPreview[];
}

export function WishlistEmptyState({
  onExploreCollectionsPress,
  onFavoritePress,
  onProductPress,
  onViewNewArrivalsPress,
  trendingProducts,
}: WishlistEmptyStateProps) {
  return (
    <View className="bg-surface">
      <View className="items-center gap-7 px-6 pb-10 pt-10">
        <View
          accessibilityLabel="Empty wishlist"
          accessibilityRole="image"
          className="size-24 items-center justify-center rounded-full bg-subtle-surface"
        >
          <Heart
            accessible={false}
            color={colors.neutral400}
            size={iconSizes.extraLarge}
            strokeWidth={iconStrokeWidths.emphasized}
          />
        </View>

        <View className="items-center gap-3 self-stretch">
          <Text className="self-stretch text-center" variant="promotionalTitle">
            Your Wishlist is Empty
          </Text>
          <Text className="self-stretch text-center text-sm leading-5" tone="muted" variant="body">
            Save your favorites here. Tap the heart icon on any product to add it to your wishlist.
          </Text>
        </View>

        <View className="h-0.5 w-10 bg-brand" />

        <View className="items-center gap-4 self-stretch">
          <Pressable
            accessibilityLabel="Explore collections"
            accessibilityRole="button"
            className="self-stretch items-center justify-center rounded-sm bg-brand px-6 py-3.5 active:opacity-80"
            onPress={onExploreCollectionsPress}
          >
            <Text className="font-manrope-bold uppercase" tone="brandForeground" variant="label">
              Explore Collections
            </Text>
          </Pressable>

          <Pressable
            accessibilityLabel="View new arrivals"
            accessibilityRole="button"
            className="rounded-sm px-2 py-1 active:opacity-70"
            onPress={onViewNewArrivalsPress}
          >
            <Text tone="brand" variant="label">
              View New Arrivals →
            </Text>
          </Pressable>
        </View>
      </View>

      <View className="gap-4 pb-10">
        <View className="px-6">
          <Text className="text-lg" variant="title">
            Trending Now
          </Text>
        </View>
        <ScrollView
          accessibilityLabel="Trending products"
          contentContainerClassName="gap-4 pl-6 pr-6"
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {trendingProducts.map((product) => (
            <ProductCard
              cardWidth={layout.productCardWidth}
              key={product.id}
              onFavoritePress={onFavoritePress}
              onPress={onProductPress}
              product={product}
              showAddToCartButton={false}
              showReviewCount
            />
          ))}
        </ScrollView>
      </View>
    </View>
  );
}
