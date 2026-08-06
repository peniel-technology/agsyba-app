import { memo } from 'react';

import { ShoppingBagHeader } from '@/components/cart/ShoppingBagHeader';

interface OrderSuccessHeaderProps {
  itemCount: number;
  onBackPress: () => void;
}

export const OrderSuccessHeader = memo(function OrderSuccessHeader({
  itemCount,
  onBackPress,
}: OrderSuccessHeaderProps) {
  return (
    <ShoppingBagHeader itemCount={itemCount} onBackPress={onBackPress} title="Order Success" />
  );
});
