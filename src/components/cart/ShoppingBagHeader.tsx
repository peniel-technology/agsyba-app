import type { ReactNode } from 'react';
import { Bell, ChevronLeft, Search, ShoppingBag } from 'lucide-react-native';
import { Pressable, View } from 'react-native';

import { Text } from '@/components/ui/Text';
import { colors, iconSizes, iconStrokeWidths, spacing } from '@/theme';

interface ShoppingBagHeaderProps {
  itemCount: number;
  onBackPress: () => void;
  onNotificationsPress?: () => void;
  onSearchPress?: () => void;
}

interface HeaderActionProps {
  accessibilityLabel: string;
  children: ReactNode;
  onPress?: () => void;
}

function HeaderAction({ accessibilityLabel, children, onPress }: HeaderActionProps) {
  return (
    <Pressable
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="button"
      accessibilityState={{ disabled: !onPress }}
      className="size-10 items-center justify-center rounded-full active:bg-subtle-surface"
      disabled={!onPress}
      hitSlop={spacing[1]}
      onPress={onPress}
    >
      {children}
    </Pressable>
  );
}

function formatItemCount(count: number): string {
  return count > 99 ? '99+' : count.toString();
}

export function ShoppingBagHeader({
  itemCount,
  onBackPress,
  onNotificationsPress,
  onSearchPress,
}: ShoppingBagHeaderProps) {
  const visibleItemCount = Math.max(0, itemCount);
  const bagAccessibilityLabel =
    visibleItemCount > 0 ? `Shopping bag, ${visibleItemCount} items` : 'Shopping bag, empty';

  return (
    <View
      accessibilityRole="header"
      className="h-14 flex-row items-center justify-between border-b border-subtle-border bg-surface px-2"
    >
      <View className="flex-1 flex-row items-center">
        <HeaderAction accessibilityLabel="Go back" onPress={onBackPress}>
          <ChevronLeft
            color={colors.text}
            size={iconSizes.large}
            strokeWidth={iconStrokeWidths.emphasized}
          />
        </HeaderAction>
        <Text className="text-lg" variant="bodyStrong">
          Shopping Bag
        </Text>
      </View>

      <View className="flex-row items-center">
        <HeaderAction accessibilityLabel="Search products" onPress={onSearchPress}>
          <Search
            color={colors.text}
            size={iconSizes.medium}
            strokeWidth={iconStrokeWidths.regular}
          />
        </HeaderAction>

        <HeaderAction accessibilityLabel="Notifications" onPress={onNotificationsPress}>
          <Bell
            color={colors.text}
            size={iconSizes.medium}
            strokeWidth={iconStrokeWidths.regular}
          />
        </HeaderAction>

        <View
          accessibilityLabel={bagAccessibilityLabel}
          className="relative size-10 items-center justify-center"
        >
          <ShoppingBag
            color={colors.text}
            size={iconSizes.medium}
            strokeWidth={iconStrokeWidths.regular}
          />
          {visibleItemCount > 0 ? (
            <View className="absolute right-0 top-0 min-w-4 items-center justify-center rounded-full bg-brand px-1">
              <Text
                className="text-center leading-4"
                tone="brandForeground"
                variant="captionMedium"
              >
                {formatItemCount(visibleItemCount)}
              </Text>
            </View>
          ) : null}
        </View>
      </View>
    </View>
  );
}
