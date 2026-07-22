import classicLinenDressImage from '@/assets/images/products/classic-linen-shirt-dress.webp';
import navyFitFlareDressImage from '@/assets/images/products/navy-fit-flare-dress.webp';
import pleatedChiffonDressImage from '@/assets/images/products/pleated-chiffon-midi-dress.webp';
import type { ProductPreview } from '@/types/product';

export const newArrivals = [
  {
    bestPrice: { amount: 76, currency: 'AED' },
    brand: 'ZARA',
    deliveryLabel: 'Delivery by Jul 21',
    discountPercentage: 20,
    id: 'zara-pleated-chiffon-midi-dress',
    image: pleatedChiffonDressImage,
    imageAccessibilityLabel: 'Light blue pleated chiffon midi dress',
    isFavorite: false,
    name: 'Pleated Chiffon Midi Dress',
    price: { amount: 45, currency: 'AED' },
    rating: 4.2,
    reviewCount: 128,
  },
  {
    bestPrice: { amount: 76, currency: 'AED' },
    brand: 'H&M',
    deliveryLabel: 'Delivery by Jul 21',
    discountPercentage: 20,
    id: 'hm-navy-fit-flare-dress',
    image: navyFitFlareDressImage,
    imageAccessibilityLabel: 'Dark navy fit and flare midi dress',
    isFavorite: false,
    name: 'Navy Fit & Flare Dress',
    price: { amount: 95, currency: 'AED' },
    rating: 4.5,
    reviewCount: 95,
  },
  {
    bestPrice: { amount: 67, currency: 'AED' },
    brand: 'MANGO',
    deliveryLabel: 'Delivery by Jul 22',
    discountPercentage: 20,
    id: 'mango-classic-linen-shirt-dress',
    image: classicLinenDressImage,
    imageAccessibilityLabel: 'Warm ivory linen shirt midi dress',
    isFavorite: false,
    name: 'Classic Linen Shirt Dress',
    price: { amount: 84, currency: 'AED' },
    rating: 4.8,
    reviewCount: 67,
  },
] as const satisfies readonly ProductPreview[];
