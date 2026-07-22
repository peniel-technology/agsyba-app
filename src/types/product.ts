export interface Money {
  amount: number;
  currency: string;
}

export interface ProductPreview {
  bestPrice: Money;
  brand: string;
  deliveryLabel: string;
  discountPercentage: number;
  id: string;
  image: number;
  imageAccessibilityLabel: string;
  imageFit?: 'contain' | 'cover';
  isFavorite: boolean;
  name: string;
  price: Money;
  rating: number;
  reviewCount: number;
}
