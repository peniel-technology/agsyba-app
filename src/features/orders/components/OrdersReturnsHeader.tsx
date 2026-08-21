import { AccountPageHeader } from '@/components/layouts/AccountPageHeader';

interface OrdersReturnsHeaderProps {
  cartItemCount?: number;
  onBackPress: () => void;
  onCartPress?: () => void;
  onNotificationsPress?: () => void;
  onSearchPress: () => void;
}

export function OrdersReturnsHeader({
  cartItemCount = 0,
  onBackPress,
  onCartPress,
  onNotificationsPress,
  onSearchPress,
}: OrdersReturnsHeaderProps) {
  return (
    <AccountPageHeader
      cartItemCount={cartItemCount}
      onBackPress={onBackPress}
      onCartPress={onCartPress}
      onNotificationsPress={onNotificationsPress}
      onSearchPress={onSearchPress}
      title="Orders & Returns"
    />
  );
}
