import { Star } from 'lucide-react-native';
import { Pressable, View } from 'react-native';

import { Text } from '@/components/ui/Text';
import type { ProductSeller } from '@/features/products/types/productDetail';
import { colors, iconStrokeWidths, spacing } from '@/theme';

interface ProductSellerInfoProps {
  onViewStorePress: () => void;
  seller: ProductSeller;
}

export function ProductSellerInfo({ onViewStorePress, seller }: ProductSellerInfoProps) {
  return (
    <View className="gap-3 px-4">
      <Text className="uppercase" variant="captionStrong">
        Seller Info
      </Text>

      <View className="flex-row items-center justify-between gap-3 rounded-xl border border-subtle-border bg-surface p-3">
        <View className="min-w-0 flex-1 flex-row items-center gap-2.5">
          <View className="size-8 items-center justify-center rounded-full bg-sale-surface">
            <Text tone="brand" variant="captionStrong">
              {seller.initial}
            </Text>
          </View>
          <View className="min-w-0 flex-1 gap-0.5">
            <Text numberOfLines={1} variant="label">
              Sold by: {seller.name}
            </Text>
            <View
              accessibilityLabel={`${seller.rating.toFixed(1)} out of 5 seller rating`}
              className="flex-row items-center gap-1.5"
            >
              <Text tone="brand" variant="captionStrong">
                {seller.rating.toFixed(1)}
              </Text>
              <Star
                accessible={false}
                color={colors.rating}
                size={spacing[3]}
                strokeWidth={iconStrokeWidths.emphasized}
              />
            </View>
          </View>
        </View>

        <Pressable
          accessibilityLabel={`View ${seller.name}`}
          accessibilityRole="button"
          className="shrink-0 active:opacity-70"
          hitSlop={spacing[2]}
          onPress={onViewStorePress}
        >
          <Text className="underline" tone="brand" variant="caption">
            View Store
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
