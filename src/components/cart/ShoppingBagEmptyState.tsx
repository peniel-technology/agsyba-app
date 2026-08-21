import { FileText } from 'lucide-react-native';
import { Pressable, View } from 'react-native';

import { Text } from '@/components/ui/Text';
import { colors, iconSizes, iconStrokeWidths } from '@/theme';

interface ShoppingBagEmptyStateProps {
  onContinueShoppingPress: () => void;
  onShopNowPress: () => void;
}

export function ShoppingBagEmptyState({
  onContinueShoppingPress,
  onShopNowPress,
}: ShoppingBagEmptyStateProps) {
  return (
    <View className="items-center gap-7 px-6 pb-10 pt-10">
      <View
        accessibilityLabel="Empty shopping cart"
        accessibilityRole="image"
        className="size-24 items-center justify-center rounded-full bg-subtle-surface"
      >
        <FileText
          accessible={false}
          color={colors.neutral400}
          size={iconSizes.emptyState}
          strokeWidth={iconStrokeWidths.standard}
        />
      </View>

      <View className="items-center gap-3 self-stretch">
        <Text className="self-stretch text-center" variant="promotionalTitle">
          Your Cart is Empty
        </Text>
        <Text className="self-stretch text-center text-sm leading-5" tone="muted" variant="body">
          Looks like you haven&apos;t added anything yet. Explore and find something you love!
        </Text>
      </View>

      <View className="h-0.5 w-10 bg-order-action" />

      <View className="items-center gap-4 self-stretch">
        <Pressable
          accessibilityLabel="Shop now"
          accessibilityRole="button"
          className="self-stretch items-center justify-center rounded-sm bg-order-action px-6 py-3.5 active:opacity-80"
          onPress={onShopNowPress}
        >
          <Text className="font-manrope-bold uppercase" tone="brandForeground" variant="label">
            Shop Now
          </Text>
        </Pressable>

        <Pressable
          accessibilityLabel="Continue shopping"
          accessibilityRole="button"
          className="rounded-sm px-2 py-1 active:opacity-70"
          onPress={onContinueShoppingPress}
        >
          <Text className="font-manrope-semibold" tone="orderAction" variant="label">
            Continue Shopping →
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
