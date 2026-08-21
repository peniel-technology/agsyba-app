import { ordersReturnsData } from '@/features/orders/constants/ordersReturnsData';
import { defaultReturnPickupAddress } from '@/features/orders/constants/returnExchangeMethodData';
import { formatCurrency } from '@/utils/formatCurrency';

export const returnExchangeReviewData = {
  actionRequested: 'Return for Refund',
  itemPrice: formatCurrency(ordersReturnsData.items[0].product.price),
  originalPaymentMethod:
    'Original Payment Method: Credit Card ending ****5678. Refund will be processed after pickup validation.',
  pickupAddress: defaultReturnPickupAddress,
  pickupDate: 'Wednesday, 22 May 2024',
  pickupTime: '12PM - 3PM',
  reason: 'Wrong size/fit',
  shippingFee: 'FREE',
} as const;
