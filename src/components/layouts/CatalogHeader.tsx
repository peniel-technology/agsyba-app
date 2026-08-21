import { ChevronLeft, Search, ShoppingBag, UserRound } from 'lucide-react-native';
import { Pressable, View } from 'react-native';

import { AgsybaLogo } from '@/components/common/AgsybaLogo';
import { Text } from '@/components/ui/Text';
import { colors, iconSizes, iconStrokeWidths, spacing } from '@/theme';

interface CatalogHeaderProps {
  cartItemCount?: number;
  onBackPress: () => void;
  onCartPress?: () => void;
  onSearchPress: () => void;
}

function formatCartItemCount(count: number): string {
  return count > 99 ? '99+' : count.toString();
}

export function CatalogHeader({
  cartItemCount = 0,
  onBackPress,
  onCartPress,
  onSearchPress,
}: CatalogHeaderProps) {
  const visibleCartItemCount = Math.max(0, cartItemCount);
  const cartAccessibilityLabel =
    visibleCartItemCount > 0
      ? `Shopping bag, ${visibleCartItemCount} items`
      : 'Shopping bag, empty';

  return (
    <View
      accessibilityRole="header"
      className="h-14 flex-row items-center justify-between border-b border-subtle-border bg-surface px-2"
    >
      <Pressable
        accessibilityLabel="Go back"
        accessibilityRole="button"
        className="size-10 items-center justify-center rounded-full active:bg-subtle-surface"
        hitSlop={spacing[1]}
        onPress={onBackPress}
      >
        <ChevronLeft
          accessible={false}
          color={colors.text}
          size={iconSizes.large}
          strokeWidth={iconStrokeWidths.emphasized}
        />
      </Pressable>

      <View pointerEvents="none" className="absolute inset-x-0 items-center justify-center">
        <AgsybaLogo height={16} width={112} />
      </View>

      <View className="flex-row items-center">
        <Pressable
          accessibilityLabel="Search products"
          accessibilityRole="button"
          className="size-10 items-center justify-center rounded-full active:bg-subtle-surface"
          hitSlop={spacing[1]}
          onPress={onSearchPress}
        >
          <Search
            accessible={false}
            color={colors.text}
            size={iconSizes.medium}
            strokeWidth={iconStrokeWidths.regular}
          />
        </Pressable>

        <View className="relative">
          <Pressable
            accessibilityLabel={cartAccessibilityLabel}
            accessibilityRole="button"
            accessibilityState={{ disabled: !onCartPress }}
            className="size-10 items-center justify-center rounded-full active:bg-subtle-surface"
            disabled={!onCartPress}
            hitSlop={spacing[1]}
            onPress={onCartPress}
          >
            <ShoppingBag
              accessible={false}
              color={colors.text}
              size={iconSizes.medium}
              strokeWidth={iconStrokeWidths.regular}
            />
          </Pressable>
          {visibleCartItemCount > 0 ? (
            <View
              className="absolute right-0 top-0 min-w-4 items-center justify-center rounded-full bg-brand px-1"
              pointerEvents="none"
            >
              <Text
                className="text-center leading-4"
                tone="brandForeground"
                variant="captionMedium"
              >
                {formatCartItemCount(visibleCartItemCount)}
              </Text>
            </View>
          ) : null}
        </View>

        <Pressable
          accessibilityLabel="Account"
          accessibilityRole="button"
          accessibilityState={{ disabled: true }}
          className="size-10 items-center justify-center rounded-full opacity-50"
          disabled
        >
          <UserRound
            accessible={false}
            color={colors.text}
            size={iconSizes.medium}
            strokeWidth={iconStrokeWidths.regular}
          />
        </Pressable>
      </View>
    </View>
  );
}
