import type { ReactNode } from 'react';
import { Bell, Menu, Search, ShoppingBag } from 'lucide-react-native';
import { Pressable, View } from 'react-native';

import { AgsybaLogo } from '@/components/common/AgsybaLogo';
import { Text } from '@/components/ui/Text';
import { colors, iconSizes, iconStrokeWidths, spacing } from '@/theme';

interface NavbarActionProps {
  accessibilityLabel: string;
  children: ReactNode;
  onPress?: () => void;
}

function NavbarAction({ accessibilityLabel, children, onPress }: NavbarActionProps) {
  return (
    <Pressable
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="button"
      accessibilityState={{ disabled: !onPress }}
      className="size-10 items-center justify-center rounded-full active:bg-background"
      disabled={!onPress}
      hitSlop={spacing[1]}
      onPress={onPress}
    >
      {children}
    </Pressable>
  );
}

interface TopNavbarProps {
  cartItemCount?: number;
  onCartPress?: () => void;
  onMenuPress?: () => void;
  onNotificationsPress?: () => void;
  onSearchPress?: () => void;
}

function formatCartItemCount(count: number): string {
  return count > 99 ? '99+' : count.toString();
}

export function TopNavbar({
  cartItemCount = 0,
  onCartPress,
  onMenuPress,
  onNotificationsPress,
  onSearchPress,
}: TopNavbarProps) {
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
      <NavbarAction accessibilityLabel="Open menu" onPress={onMenuPress}>
        <Menu color={colors.text} size={iconSizes.large} strokeWidth={iconStrokeWidths.regular} />
      </NavbarAction>

      <View pointerEvents="none" className="absolute inset-x-0 items-center justify-center">
        <AgsybaLogo />
      </View>

      <View className="flex-row items-center">
        <NavbarAction accessibilityLabel="Search" onPress={onSearchPress}>
          <Search
            color={colors.text}
            size={iconSizes.medium}
            strokeWidth={iconStrokeWidths.regular}
          />
        </NavbarAction>

        <NavbarAction accessibilityLabel="Notifications" onPress={onNotificationsPress}>
          <Bell
            color={colors.text}
            size={iconSizes.medium}
            strokeWidth={iconStrokeWidths.regular}
          />
        </NavbarAction>

        <View className="relative">
          <NavbarAction accessibilityLabel={cartAccessibilityLabel} onPress={onCartPress}>
            <ShoppingBag
              color={colors.text}
              size={iconSizes.medium}
              strokeWidth={iconStrokeWidths.regular}
            />
          </NavbarAction>

          {visibleCartItemCount > 0 ? (
            <View
              pointerEvents="none"
              className="absolute right-0 top-0 min-w-4 items-center justify-center rounded-full bg-brand px-1"
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
