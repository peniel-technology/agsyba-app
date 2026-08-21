import { ordersReturnsData } from '@/features/orders/constants/ordersReturnsData';

export type ReturnCondition = 'damaged' | 'tried-on' | 'unused';
export type ReturnAction = 'exchange' | 'refund';
export type ReturnReason =
  | 'changed-my-mind'
  | 'defective-damaged'
  | 'not-as-described'
  | 'quality-issues'
  | 'wrong-size-fit';

export interface ReturnOption<TValue extends string> {
  label: string;
  value: TValue;
}

export const returnExchangeProduct = {
  color: 'Red',
  detail: 'Size: M · Color: Red · Qty: 1',
  image: ordersReturnsData.items[0].product.image,
  imageAccessibilityLabel: 'Floral Maxi Dress product image',
  name: ordersReturnsData.items[0].product.name,
  orderNumber: ordersReturnsData.orderNumber,
  purchasedDetail: 'Delivered on 18 May 2024',
} as const;

export const returnConditionOptions: readonly ReturnOption<ReturnCondition>[] = [
  { label: 'Unused', value: 'unused' },
  { label: 'Tried on', value: 'tried-on' },
  { label: 'Damaged', value: 'damaged' },
];

export const returnReasonOptions: readonly ReturnOption<ReturnReason>[] = [
  { label: 'Wrong size/fit', value: 'wrong-size-fit' },
  { label: 'Defective/Damaged', value: 'defective-damaged' },
  { label: 'Not as described', value: 'not-as-described' },
  { label: 'Changed my mind', value: 'changed-my-mind' },
  { label: 'Quality issues', value: 'quality-issues' },
];

export const returnActionOptions: readonly ReturnOption<ReturnAction>[] = [
  { label: 'Refund', value: 'refund' },
  { label: 'Exchange', value: 'exchange' },
];
