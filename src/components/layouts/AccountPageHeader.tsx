import { Bell, ChevronLeft, Search, ShoppingBag } from 'lucide-react-native';
import { Pressable, View } from 'react-native';

import { Text } from '@/components/ui/Text';
import { colors, iconSizes, iconStrokeWidths, spacing } from '@/theme';

export interface AccountPageHeaderProps {
  cartItemCount?: number;
  onBackPress: () => void;
  onCartPress?: () => void;
  onNotificationsPress?: () => void;
  onSearchPress: () => void;
  title: string;
}

function formatCartItemCount(count: number): string {
  return count > 99 ? '99+' : count.toString();
}

export function AccountPageHeader({
  cartItemCount = 0,
  onBackPress,
  onCartPress,
  onNotificationsPress,
  onSearchPress,
  title,
}: AccountPageHeaderProps) {
  const visibleCartItemCount = Math.max(0, cartItemCount);
  const cartAccessibilityLabel =
    visibleCartItemCount > 0
      ? `Shopping bag, ${visibleCartItemCount} items`
      : 'Shopping bag, empty';

  return (
    <View
      accessibilityRole="header"
      className="h-14 flex-row items-center justify-between border-b border-subtle-border bg-surface px-4"
    >
      <View className="flex-row items-center gap-3">
        <Pressable
          accessibilityLabel="Go back"
          accessibilityRole="button"
          className="size-6 items-center justify-center rounded-full active:bg-subtle-surface"
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
        <Text className="text-lg" variant="bodyStrong">
          {title}
        </Text>
      </View>

      <View className="flex-row items-center gap-4">
        <Pressable
          accessibilityLabel="Search products"
          accessibilityRole="button"
          className="size-5 items-center justify-center rounded-full active:bg-subtle-surface"
          hitSlop={spacing[1]}
          onPress={onSearchPress}
        >
          <Search
            accessible={false}
            color={colors.text}
            size={iconSizes.medium}
            strokeWidth={iconStrokeWidths.standard}
          />
        </Pressable>

        <Pressable
          accessibilityLabel="Notifications"
          accessibilityRole="button"
          accessibilityState={{ disabled: !onNotificationsPress }}
          className="size-5 items-center justify-center rounded-full active:bg-subtle-surface"
          disabled={!onNotificationsPress}
          hitSlop={spacing[1]}
          onPress={onNotificationsPress}
        >
          <Bell
            accessible={false}
            color={colors.text}
            size={iconSizes.medium}
            strokeWidth={iconStrokeWidths.standard}
          />
        </Pressable>

        <View className="relative">
          <Pressable
            accessibilityLabel={cartAccessibilityLabel}
            accessibilityRole="button"
            accessibilityState={{ disabled: !onCartPress }}
            className="size-5 items-center justify-center rounded-full active:bg-subtle-surface"
            disabled={!onCartPress}
            hitSlop={spacing[1]}
            onPress={onCartPress}
          >
            <ShoppingBag
              accessible={false}
              color={colors.text}
              size={iconSizes.medium}
              strokeWidth={iconStrokeWidths.standard}
            />
          </Pressable>
          {visibleCartItemCount > 0 ? (
            <View
              className="absolute -right-2 -top-2 min-w-4 items-center justify-center rounded-full bg-brand px-1"
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
      </View>
    </View>
  );
}
