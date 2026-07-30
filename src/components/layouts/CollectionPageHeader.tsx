import { ArrowLeft, Search, ShoppingBag } from 'lucide-react-native';
import { Pressable, View } from 'react-native';

import { Text } from '@/components/ui/Text';
import { colors, iconSizes, iconStrokeWidths, spacing } from '@/theme';

interface CollectionPageHeaderProps {
  cartItemCount?: number;
  onBackPress: () => void;
  onCartPress?: () => void;
  onSearchPress: () => void;
  title: string;
}

export function CollectionPageHeader({
  cartItemCount = 0,
  onBackPress,
  onCartPress,
  onSearchPress,
  title,
}: CollectionPageHeaderProps) {
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
      <View className="w-20 items-start">
        <Pressable
          accessibilityLabel="Go back"
          accessibilityRole="button"
          className="size-10 items-center justify-center rounded-full active:bg-subtle-surface"
          hitSlop={spacing[1]}
          onPress={onBackPress}
        >
          <ArrowLeft
            accessible={false}
            color={colors.text}
            size={iconSizes.large}
            strokeWidth={iconStrokeWidths.emphasized}
          />
        </Pressable>
      </View>

      <View pointerEvents="none" className="absolute inset-x-0 items-center justify-center">
        <Text variant="sectionHeading">{title}</Text>
      </View>

      <View className="w-20 flex-row items-center justify-end">
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
                {visibleCartItemCount > 99 ? '99+' : visibleCartItemCount}
              </Text>
            </View>
          ) : null}
        </View>
      </View>
    </View>
  );
}
