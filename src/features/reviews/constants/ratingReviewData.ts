import type { ImageSourcePropType } from 'react-native';

import floralDressImage from '@/assets/images/shop/product-floral.webp';
import navyDressImage from '@/assets/images/products/navy-fit-flare-dress.webp';
import pleatedDressImage from '@/assets/images/shop/product-pleated.webp';

export interface ReviewPhoto {
  accessibilityLabel: string;
  id: string;
  image: ImageSourcePropType;
}

export interface ReviewCategoryRating {
  id: string;
  label: string;
  value: number;
}

export const reviewProduct = {
  accessibilityLabel: 'Floral Maxi Dress product image',
  image: floralDressImage,
  name: 'Floral Maxi Dress',
  orderNumber: 'Order #STY-2024-089',
  purchasedOn: 'Purchased on 15 Feb 2024',
} as const;

export const initialCategoryRatings: readonly ReviewCategoryRating[] = [
  { id: 'fit', label: 'Fit & Sizing', value: 4 },
  { id: 'quality', label: 'Quality & Material', value: 4 },
  { id: 'value', label: 'Value for Money', value: 3 },
  { id: 'style', label: 'Style & Design', value: 5 },
];

export const initialReviewPhotos: readonly ReviewPhoto[] = [
  {
    accessibilityLabel: 'Customer photo of the floral dress',
    id: 'review-photo-floral',
    image: floralDressImage,
  },
  {
    accessibilityLabel: 'Customer photo of a navy dress',
    id: 'review-photo-navy',
    image: navyDressImage,
  },
  {
    accessibilityLabel: 'Customer photo of a pleated dress',
    id: 'review-photo-pleated',
    image: pleatedDressImage,
  },
];
