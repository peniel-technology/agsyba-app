import airForceWhiteSneakersImage from '@/assets/images/products/air-force-1-white-sneakers.webp';
import classicLeatherAnkleBootsImage from '@/assets/images/products/classic-leather-ankle-boots.webp';
import type { ProductPreview } from '@/types/product';

export const trendingFootwear = [
  {
    bestPrice: { amount: 96, currency: 'AED' },
    brand: 'ALDO',
    deliveryLabel: 'Delivery by Jul 26',
    discountPercentage: 20,
    id: 'aldo-classic-leather-ankle-boots',
    image: classicLeatherAnkleBootsImage,
    imageAccessibilityLabel: 'Pair of black classic leather ankle boots',
    isFavorite: false,
    name: 'Classic Leather Ankle Boots',
    price: { amount: 120, currency: 'AED' },
    rating: 4.3,
    reviewCount: 89,
  },
  {
    bestPrice: { amount: 68, currency: 'AED' },
    brand: 'NIKE',
    deliveryLabel: 'Delivery by Jul 22',
    discountPercentage: 20,
    id: 'nike-air-force-1-white-sneakers',
    image: airForceWhiteSneakersImage,
    imageAccessibilityLabel: 'Pair of white low-top sneakers',
    isFavorite: false,
    name: 'Air Force 1 White Sneakers',
    price: { amount: 85, currency: 'AED' },
    rating: 4.4,
    reviewCount: 124,
  },
] as const satisfies readonly ProductPreview[];
