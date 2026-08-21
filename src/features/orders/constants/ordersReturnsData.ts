import emeraldVelvetMaxiGownImage from '@/assets/images/collections/emerald-velvet-maxi-gown.webp';
import floralDressImage from '@/assets/images/shop/product-floral.webp';
import navyFitFlareDressImage from '@/assets/images/products/navy-fit-flare-dress.webp';
import type { Money, ProductPreview } from '@/types/product';

export type OrderItemAction = 'buy-again' | 'rate-review' | 'return' | 'track';
export type OrderItemStatus = 'delivered' | 'shipped' | 'processing';

export interface OrderItem {
  actions: readonly OrderItemAction[];
  color: string;
  detail: string;
  id: string;
  product: ProductPreview;
  quantity: number;
  size: string;
  status: OrderItemStatus;
  statusLabel?: string;
}

export interface OrdersReturnsData {
  discount: Money;
  itemCount: number;
  items: readonly OrderItem[];
  orderDate: string;
  orderNumber: string;
  paymentDetail: string;
  shippingDetail: string;
  shippingMethod: string;
  subtotal: Money;
  taxDetail: string;
  total: Money;
}

const floralMaxiDress: ProductPreview = {
  bestPrice: { amount: 89.99, currency: 'AED' },
  brand: 'MANGO',
  deliveryLabel: 'Estimated delivery: Mon, 18 Feb 2024',
  discountPercentage: 20,
  id: 'order-floral-maxi-dress',
  image: floralDressImage,
  imageAccessibilityLabel: 'Floral maxi dress from the order',
  imageFit: 'cover',
  isFavorite: false,
  name: 'Floral Maxi Dress',
  price: { amount: 89.99, currency: 'AED' },
  rating: 4.5,
  reviewCount: 94,
};

const navyMidiDress: ProductPreview = {
  bestPrice: { amount: 65, currency: 'AED' },
  brand: 'H&M',
  deliveryLabel: 'Shipped on: 16 Feb 2024',
  discountPercentage: 15,
  id: 'order-long-sleeve-midi-dress',
  image: navyFitFlareDressImage,
  imageAccessibilityLabel: 'Navy long sleeve midi dress from the order',
  imageFit: 'cover',
  isFavorite: false,
  name: 'Long Sleeve Midi Dress',
  price: { amount: 65, currency: 'AED' },
  rating: 4.3,
  reviewCount: 56,
};

const velvetEveningDress: ProductPreview = {
  bestPrice: { amount: 119.9, currency: 'AED' },
  brand: 'ZARA',
  deliveryLabel: 'Delivered on: 14 Feb 2024',
  discountPercentage: 25,
  id: 'order-velvet-evening-dress',
  image: emeraldVelvetMaxiGownImage,
  imageAccessibilityLabel: 'Velvet evening dress from the order',
  imageFit: 'cover',
  isFavorite: false,
  name: 'Velvet Evening Dress',
  price: { amount: 119.9, currency: 'AED' },
  rating: 4.8,
  reviewCount: 128,
};

export const ordersReturnsData: OrdersReturnsData = {
  discount: { amount: 25.15, currency: 'AED' },
  itemCount: 4,
  items: [
    {
      actions: ['track', 'return', 'buy-again'],
      color: 'Red',
      detail: 'Estimated delivery: Mon, 18 Feb 2024',
      id: 'order-floral-maxi-dress',
      product: floralMaxiDress,
      quantity: 1,
      size: 'M',
      status: 'processing',
    },
    {
      actions: ['track'],
      color: 'Navy',
      detail: 'Shipped on: 16 Feb 2024 · Tracking: #TRK8847291',
      id: 'order-long-sleeve-midi-dress',
      product: navyMidiDress,
      quantity: 1,
      size: 'S',
      status: 'shipped',
      statusLabel: 'Shipped',
    },
    {
      actions: ['rate-review', 'return', 'buy-again'],
      color: 'Black',
      detail: 'Delivered on: 14 Feb 2024 · You rated this product 4/5 stars',
      id: 'order-velvet-evening-dress',
      product: velvetEveningDress,
      quantity: 1,
      size: 'M',
      status: 'delivered',
      statusLabel: 'Delivered',
    },
  ],
  orderDate: '15 Feb 2024',
  orderNumber: 'STY-2024-089',
  paymentDetail: 'Payment: Via Credit Card ending ****5678',
  shippingDetail: 'Shipping: All India free delivery',
  shippingMethod: 'Express Shipping',
  subtotal: { amount: 289.99, currency: 'AED' },
  taxDetail: 'Tax info: GST @18% included in price',
  total: { amount: 289.95, currency: 'AED' },
};
