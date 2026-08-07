import type { ReactNode } from 'react';
import { Bell, Search } from 'lucide-react-native';
import { Pressable } from 'react-native';

import { CheckoutHeader } from '@/components/cart/CheckoutHeader';
import { colors, iconSizes, iconStrokeWidths, spacing } from '@/theme';

interface ShoppingBagHeaderProps {
  itemCount: number;
  onBackPress: () => void;
  onNotificationsPress?: () => void;
  onSearchPress?: () => void;
  title?: string;
  titleClassName?: string;
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

export function ShoppingBagHeader({
  itemCount,
  onBackPress,
  onNotificationsPress,
  onSearchPress,
  title = 'Shopping Bag',
  titleClassName,
}: ShoppingBagHeaderProps) {
  return (
    <CheckoutHeader
      itemCount={itemCount}
      onBackPress={onBackPress}
      rightActions={
        <>
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
        </>
      }
      title={title}
      titleClassName={titleClassName}
    />
  );
}
