import type { Money } from '@/types/product';

export interface ProductDetailImage {
  accessibilityLabel: string;
  id: string;
  source: number;
}

export type ProductRating = 1 | 2 | 3 | 4 | 5;

export interface ProductRatingDistribution {
  percentage: number;
  stars: ProductRating;
}

export interface ProductRatingSummary {
  average: number;
  distribution: readonly ProductRatingDistribution[];
  subtitle: string;
  totalLabel: string;
}

export interface ProductReview {
  author: string;
  date: string;
  id: string;
  images: readonly ProductDetailImage[];
  initials: string;
  rating: ProductRating;
  text: string;
  verifiedPurchase: boolean;
}

export interface ProductSeller {
  initial: string;
  name: string;
  rating: number;
}

export interface ProductColorOption {
  id: string;
  label: string;
  swatchClassName: string;
}

export interface ProductOffer {
  description: string;
  id: string;
}

export type ProductServiceIcon = 'delivery' | 'payment' | 'return' | 'shipping';

export interface ProductService {
  icon: ProductServiceIcon;
  id: string;
  label: string;
}

export interface ProductSpecification {
  id: string;
  label: string;
  value: string;
}

export interface ProductDetail {
  brand: string;
  colors: readonly ProductColorOption[];
  discountPercentage: number;
  estimatedDelivery: string;
  freeShippingLabel: string;
  id: string;
  images: readonly ProductDetailImage[];
  name: string;
  offers: readonly ProductOffer[];
  originalPrice: Money;
  price: Money;
  rating: number;
  ratingSummary: ProductRatingSummary;
  reviewCount: number;
  reviews: readonly ProductReview[];
  seller: ProductSeller;
  services: readonly ProductService[];
  sizes: readonly string[];
  specifications: readonly ProductSpecification[];
}
