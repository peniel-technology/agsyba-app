import pinkRuffleSkaterDressImage from '@/assets/images/products/pink-ruffle-skater-dress.webp';
import stripedCottonMaxiDressImage from '@/assets/images/products/striped-cotton-maxi-dress.webp';
import type { ProductPreview } from '@/types/product';

export const mostPopularProducts = [
  {
    bestPrice: { amount: 58, currency: 'AED' },
    brand: 'FOREVER 21',
    deliveryLabel: 'Delivery by Jul 23',
    discountPercentage: 20,
    id: 'forever-21-striped-cotton-maxi-dress',
    image: stripedCottonMaxiDressImage,
    imageAccessibilityLabel: 'Model wearing a striped cotton maxi dress by the sea',
    imageFit: 'cover',
    isFavorite: false,
    name: 'Striped Cotton Maxi Dress',
    price: { amount: 72, currency: 'AED' },
    rating: 4,
    reviewCount: 42,
  },
  {
    bestPrice: { amount: 52, currency: 'AED' },
    brand: 'VERO MODA',
    deliveryLabel: 'Delivery by Jul 24',
    discountPercentage: 20,
    id: 'vero-moda-pink-ruffle-skater-dress',
    image: pinkRuffleSkaterDressImage,
    imageAccessibilityLabel: 'Model wearing a pink ruffle skater dress in a studio',
    imageFit: 'cover',
    isFavorite: false,
    name: 'Pink Ruffle Skater Dress',
    price: { amount: 65, currency: 'AED' },
    rating: 4.1,
    reviewCount: 31,
  },
] as const satisfies readonly ProductPreview[];
