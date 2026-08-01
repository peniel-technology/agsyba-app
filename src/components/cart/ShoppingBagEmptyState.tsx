import { ArrowRight, ShoppingBag } from 'lucide-react-native';
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
    <View className="items-center gap-7 px-6 py-10">
      <View className="size-24 items-center justify-center rounded-full bg-subtle-surface">
        <ShoppingBag
          color={colors.muted}
          size={iconSizes.extraLarge}
          strokeWidth={iconStrokeWidths.subtle}
        />
      </View>

      <View className="items-center gap-3">
        <Text className="text-center text-3xl leading-9" variant="sectionHeading">
          Your Cart is Empty
        </Text>
        <Text className="text-center text-sm leading-5" tone="muted" variant="caption">
          Looks like you haven&apos;t added anything yet. Explore and find something you love!
        </Text>
      </View>

      <View className="h-0.5 w-10 bg-brand" />

      <View className="w-full items-center gap-4">
        <Pressable
          accessibilityLabel="Shop now"
          accessibilityRole="button"
          className="w-full items-center justify-center rounded-sm bg-brand px-6 py-3.5 active:opacity-80"
          onPress={onShopNowPress}
        >
          <Text className="uppercase" tone="brandForeground" variant="label">
            Shop Now
          </Text>
        </Pressable>

        <Pressable
          accessibilityLabel="Continue shopping"
          accessibilityRole="button"
          className="min-h-10 flex-row items-center justify-center gap-1 active:opacity-70"
          onPress={onContinueShoppingPress}
        >
          <Text tone="brand" variant="label">
            Continue Shopping
          </Text>
          <ArrowRight
            color={colors.brand}
            size={iconSizes.small}
            strokeWidth={iconStrokeWidths.emphasized}
          />
        </Pressable>
      </View>
    </View>
  );
}
