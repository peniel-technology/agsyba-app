import navyFitFlareDressImage from '@/assets/images/products/navy-fit-flare-dress.webp';
import type { ProductPreview } from '@/types/product';

export type TrackingStepState = 'completed' | 'current' | 'upcoming';

export interface TrackingHistoryEntry {
  description: string;
  isCurrent?: boolean;
  timestamp: string;
}

export interface TrackingStep {
  label: string;
  state: TrackingStepState;
}

const trackingProduct: ProductPreview = {
  bestPrice: { amount: 65, currency: 'AED' },
  brand: 'H&M',
  deliveryLabel: 'Tomorrow, 20 Mar 2024',
  discountPercentage: 15,
  id: 'order-long-sleeve-midi-dress',
  image: navyFitFlareDressImage,
  imageAccessibilityLabel: 'Navy long sleeve midi dress',
  imageFit: 'cover',
  isFavorite: false,
  name: 'Long Sleeve Midi Dress',
  price: { amount: 65, currency: 'AED' },
  rating: 4.3,
  reviewCount: 56,
};

export const trackingData = {
  address: {
    label: 'Home',
    line: '123 Park Avenue, Apt 4B, Dubai, UAE',
    name: 'Sarah Lawson',
    phone: '+971 55 234 5678',
  },
  estimatedDelivery: 'Tomorrow, 20 Mar 2024',
  history: [
    {
      description: 'Package out for delivery with courier',
      isCurrent: true,
      timestamp: 'Today, 9:15 AM',
    },
    {
      description: 'Package arrived at local facility',
      timestamp: 'Today, 6:30 AM',
    },
    {
      description: 'Package dispatched from Mumbai warehouse',
      timestamp: '19 Mar, 4:45 PM',
    },
    {
      description: 'Order confirmed & packed',
      timestamp: '18 Mar, 2:00 PM',
    },
    {
      description: 'Order placed successfully',
      timestamp: '18 Mar, 11:30 AM',
    },
  ] satisfies readonly TrackingHistoryEntry[],
  orderNumber: 'STY-2024-089',
  product: trackingProduct,
  productColor: 'Navy',
  productQuantity: 1,
  productSize: 'S',
  shipmentType: 'Express',
  steps: [
    { label: 'Placed', state: 'completed' },
    { label: 'Confirmed', state: 'completed' },
    { label: 'Shipped', state: 'completed' },
    { label: 'On the Way', state: 'current' },
    { label: 'Delivered', state: 'upcoming' },
  ] satisfies readonly TrackingStep[],
} as const;
