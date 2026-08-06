import type { Money } from '@/types/product';

const floralMaxiDressImage =
  require('@/assets/images/products/women/zara-floral-midi-wrap-dress.webp') as number;
const longBlazerDressImage =
  require('@/assets/images/products/women/sandro-tailored-linen-blazer.webp') as number;
const velvetEveningDressImage =
  require('@/assets/images/collections/emerald-velvet-maxi-gown.webp') as number;

export interface OrderSuccessTimelineStep {
  id: string;
  label: string;
  date: string;
  completed: boolean;
}

export interface OrderSuccessProduct {
  id: string;
  title: string;
  variant: string;
  image: number;
  price: Money;
}

export interface OrderSuccessSupportLink {
  id: string;
  label: string;
  href: string;
}

export interface OrderSuccessAddress {
  name: string;
  line: string;
}

export interface OrderSuccessData {
  orderNumber: string;
  orderDate: string;
  paymentStatus: string;
  expectedDelivery: string;
  shippingMethod: string;
  shippingAddress: OrderSuccessAddress;
  successMessage: string;
  successTitle: string;
  ctaPrimary: string;
  ctaSecondary: string;
  items: readonly OrderSuccessProduct[];
  timeline: readonly OrderSuccessTimelineStep[];
  supportLinks: readonly OrderSuccessSupportLink[];
  totalPaid: Money;
}

export const orderSuccessData: OrderSuccessData = {
  orderNumber: 'AGS-2026-78432',
  orderDate: 'Placed on 17 Jul 2026 • 09:41 AM',
  paymentStatus: 'PAID',
  expectedDelivery: '22-24 Jul 2026',
  shippingMethod: 'Standard Shipping (Free)',
  shippingAddress: {
    name: 'Sarah Al-Mansoori',
    line: 'Villa 14, Al Wasl Road, Al Badaa, Jumeirah, Dubai',
  },
  successTitle: 'Order Placed Successfully!',
  successMessage: 'Thank you for your purchase, Sarah!',
  ctaPrimary: 'TRACK ORDER',
  ctaSecondary: 'CONTINUE SHOPPING',
  items: [
    {
      id: 'floral-maxi-dress',
      image: floralMaxiDressImage,
      price: {
        amount: 899.99,
        currency: 'AED',
      },
      title: 'Floral Maxi Dress',
      variant: 'Size M / Color Red',
    },
    {
      id: 'long-blazer-midi-dress',
      image: longBlazerDressImage,
      price: {
        amount: 660.3,
        currency: 'AED',
      },
      title: 'Long Blazer Midi Dress',
      variant: 'Size S / Color Navy',
    },
    {
      id: 'velvet-evening-dress',
      image: velvetEveningDressImage,
      price: {
        amount: 819.5,
        currency: 'AED',
      },
      title: 'Velvet Evening Dress',
      variant: 'Size M / Color Dark Green',
    },
  ],
  timeline: [
    {
      id: 'confirmed',
      completed: true,
      date: 'Today, 15 Mar 2024',
      label: 'Order Confirmed',
    },
    {
      id: 'processing',
      completed: false,
      date: '16 Mar 2024',
      label: 'Processing',
    },
    {
      id: 'shipped',
      completed: false,
      date: '17-18 Mar 2024',
      label: 'Shipped',
    },
    {
      id: 'delivered',
      completed: false,
      date: 'Mon 18 - Wed 20 Mar 2024',
      label: 'Delivered',
    },
  ],
  supportLinks: [
    {
      id: 'contact-support',
      href: '/',
      label: 'Contact Support',
    },
    {
      id: 'return-policy',
      href: '/',
      label: 'Return Policy',
    },
  ],
  totalPaid: {
    amount: 580.32,
    currency: 'AED',
  },
};
