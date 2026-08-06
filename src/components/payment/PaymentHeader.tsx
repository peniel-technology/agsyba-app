import { memo } from 'react';

import { CheckoutProgress } from '@/components/cart/CheckoutProgress';
import { ShoppingBagHeader } from '@/components/cart/ShoppingBagHeader';

interface PaymentHeaderProps {
  cartItemCount: number;
  onBackPress: () => void;
}

export const PaymentHeader = memo(function PaymentHeader({
  cartItemCount,
  onBackPress,
}: PaymentHeaderProps) {
  return (
    <>
      <ShoppingBagHeader itemCount={cartItemCount} onBackPress={onBackPress} title="Payment" />
      <CheckoutProgress activeStep="payment" />
    </>
  );
});
