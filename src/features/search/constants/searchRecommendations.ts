import hmKnitBodyconDressImage from '@/assets/images/products/women/hm-knit-bodycon-dress.webp';
import zaraFloralMidiWrapDressImage from '@/assets/images/products/women/zara-floral-midi-wrap-dress.webp';
import type { ProductPreview } from '@/types/product';

export const searchRecommendations = [
  {
    bestPrice: { amount: 188, currency: 'AED' },
    brand: 'REISS',
    deliveryLabel: 'Delivery by Jul 22',
    discountPercentage: 20,
    id: 'reiss-ribbed-knit-bodycon-dress',
    image: hmKnitBodyconDressImage,
    imageAccessibilityLabel: 'Ribbed knit bodycon dress from REISS',
    imageFit: 'cover',
    isFavorite: false,
    name: 'Ribbed Knit Bodycon Dress',
    price: { amount: 235, currency: 'AED' },
    rating: 4.4,
    reviewCount: 142,
  },
  {
    bestPrice: { amount: 132, currency: 'AED' },
    brand: 'RESERVED',
    deliveryLabel: 'Delivery by Jul 24',
    discountPercentage: 35,
    id: 'reserved-ruffle-hem-summer-dress',
    image: zaraFloralMidiWrapDressImage,
    imageAccessibilityLabel: 'Ruffle hem summer dress from RESERVED',
    imageFit: 'cover',
    isFavorite: false,
    name: 'Ruffle Hem Summer Dress',
    price: { amount: 165, currency: 'AED' },
    rating: 4.2,
    reviewCount: 89,
  },
] as const satisfies readonly ProductPreview[];
