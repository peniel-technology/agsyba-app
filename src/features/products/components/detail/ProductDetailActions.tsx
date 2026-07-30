import { Heart, ShoppingBag } from 'lucide-react-native';
import { Pressable, View } from 'react-native';

import { Text } from '@/components/ui/Text';
import { colors, iconSizes, iconStrokeWidths } from '@/theme';

interface ProductDetailActionsProps {
  isFavorite: boolean;
  onAddToBagPress: () => void;
  onWishlistPress: () => void;
}

export function ProductDetailActions({
  isFavorite,
  onAddToBagPress,
  onWishlistPress,
}: ProductDetailActionsProps) {
  return (
    <View className="flex-row items-stretch gap-3 px-4">
      <Pressable
        accessibilityLabel="Add product to bag"
        accessibilityRole="button"
        className="min-h-14 flex-1 flex-row items-center justify-center gap-2 rounded-sm bg-brand px-3 active:opacity-70"
        onPress={onAddToBagPress}
      >
        <ShoppingBag
          accessible={false}
          color={colors.brandForeground}
          size={iconSizes.small}
          strokeWidth={iconStrokeWidths.emphasized}
        />
        <Text className="uppercase" tone="brandForeground" variant="bodyStrong">
          Add to Bag
        </Text>
      </Pressable>

      <Pressable
        accessibilityLabel={isFavorite ? 'Remove product from wishlist' : 'Add product to wishlist'}
        accessibilityRole="button"
        accessibilityState={{ selected: isFavorite }}
        className="min-h-14 flex-1 flex-row items-center justify-center gap-2 rounded-sm border border-brand bg-surface px-3 active:opacity-70"
        onPress={onWishlistPress}
      >
        <Heart
          accessible={false}
          color={colors.brand}
          fill={isFavorite ? colors.brand : 'none'}
          size={iconSizes.small}
          strokeWidth={iconStrokeWidths.emphasized}
        />
        <Text className="uppercase" tone="brand" variant="bodyStrong">
          Wishlist
        </Text>
      </Pressable>
    </View>
  );
}
