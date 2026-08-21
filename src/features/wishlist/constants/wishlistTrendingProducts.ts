import classicLinenDressImage from '@/assets/images/products/classic-linen-shirt-dress.webp';
import pleatedChiffonDressImage from '@/assets/images/products/pleated-chiffon-midi-dress.webp';
import type { ProductPreview } from '@/types/product';

export const wishlistTrendingProducts = [
  {
    bestPrice: { amount: 220, currency: 'AED' },
    brand: 'COS',
    deliveryLabel: 'Delivery by Jul 24',
    discountPercentage: 30,
    id: 'cos-lace-trim-cocktail-dress',
    image: pleatedChiffonDressImage,
    imageAccessibilityLabel: 'Lace trim cocktail dress from COS',
    isFavorite: false,
    name: 'Lace Trim Cocktail Dress',
    price: { amount: 275, currency: 'AED' },
    rating: 4.6,
    reviewCount: 183,
  },
  {
    bestPrice: { amount: 328, currency: 'AED' },
    brand: 'MASSIMO DUTTI',
    deliveryLabel: 'Delivery by Jul 26',
    discountPercentage: 10,
    id: 'massimo-dutti-silk-pleated-midi-dress',
    image: classicLinenDressImage,
    imageAccessibilityLabel: 'Silk pleated midi dress from Massimo Dutti',
    isFavorite: false,
    name: 'Silk Pleated Midi Dress',
    price: { amount: 410, currency: 'AED' },
    rating: 4.7,
    reviewCount: 156,
  },
] as const satisfies readonly ProductPreview[];
