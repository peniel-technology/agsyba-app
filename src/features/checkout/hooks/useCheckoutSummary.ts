import { useMemo } from 'react';

import { cartConfiguration } from '@/constants/cart';
import { useCartStore } from '@/stores/useCartStore';
import type { Money } from '@/types/product';

export function useCheckoutSummary() {
  const items = useCartStore((state) => state.items);

  return useMemo(() => {
    const selectedLines = Object.values(items).filter((line) => line.isSelected);
    const itemCount = selectedLines.reduce((count, line) => count + line.quantity, 0);
    const subtotalAmount = selectedLines.reduce(
      (total, line) => total + line.product.price.amount * line.quantity,
      0,
    );
    const discountAmount = (subtotalAmount * cartConfiguration.couponDiscountPercentage) / 100;
    const currency =
      selectedLines[0]?.product.price.currency ?? cartConfiguration.freeShippingCurrency;
    const subtotal: Money = { amount: subtotalAmount, currency };
    const discount: Money = { amount: discountAmount, currency };
    const total: Money = { amount: Math.max(0, subtotalAmount - discountAmount), currency };

    return { discount, itemCount, selectedLines, subtotal, total };
  }, [items]);
}
