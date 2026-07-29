import adidasClassicLeatherBootsImage from '@/assets/images/products/footwear/adidas-classic-leather-boots.webp';
import aldoStrappyBlockHeelsImage from '@/assets/images/products/footwear/aldo-strappy-block-heels.webp';
import clarksSuedeLoafersImage from '@/assets/images/products/footwear/clarks-suede-loafers.webp';
import converseAnkleChelseaBootsImage from '@/assets/images/products/footwear/converse-ankle-chelsea-boots.webp';
import drMartensRunningTrainersImage from '@/assets/images/products/footwear/dr-martens-running-trainers.webp';
import nikeAirMax90SneakersImage from '@/assets/images/products/footwear/nike-air-max-90-sneakers.webp';
import pumaPlatformSandalsImage from '@/assets/images/products/footwear/puma-platform-sandals.webp';
import steveMaddenCanvasLowTopImage from '@/assets/images/products/footwear/steve-madden-canvas-low-top.webp';
import type { FootwearCollectionCategory } from '@/features/products/constants/footwearCollectionFilters';
import type { ProductPreview } from '@/types/product';

type FootwearProductCategory = Exclude<FootwearCollectionCategory, 'All'>;

export interface FootwearCollectionProduct extends ProductPreview {
  categories: readonly FootwearProductCategory[];
}

export const footwearCollectionTotalCount = 294;

export const footwearCollectionProducts = [
  {
    bestPrice: { amount: 399, currency: 'AED' },
    brand: 'NIKE',
    categories: ['Sneakers'],
    deliveryLabel: 'Delivery by Jul 25',
    discountPercentage: 25,
    id: 'nike-air-max-90-sneakers',
    image: nikeAirMax90SneakersImage,
    imageAccessibilityLabel: 'White, red, and blue Nike Air Max sneaker',
    imageFit: 'cover',
    isFavorite: false,
    name: 'Air Max 90 Sneakers',
    price: { amount: 499, currency: 'AED' },
    rating: 4.8,
    reviewCount: 312,
  },
  {
    bestPrice: { amount: 349, currency: 'AED' },
    brand: 'ADIDAS',
    categories: ['Boots'],
    deliveryLabel: 'Delivery by Jul 26',
    discountPercentage: 0,
    id: 'adidas-classic-leather-boots',
    image: adidasClassicLeatherBootsImage,
    imageAccessibilityLabel: 'Pair of brown classic leather lace-up boots',
    imageFit: 'cover',
    isFavorite: false,
    name: 'Classic Leather Boots',
    price: { amount: 349, currency: 'AED' },
    rating: 4.7,
    reviewCount: 145,
  },
  {
    bestPrice: { amount: 210, currency: 'AED' },
    brand: 'ALDO',
    categories: ['Heels', 'Sandals'],
    deliveryLabel: 'Delivery by Jul 25',
    discountPercentage: 0,
    id: 'aldo-strappy-block-heels',
    image: aldoStrappyBlockHeelsImage,
    imageAccessibilityLabel: 'Pair of metallic strappy block-heel sandals',
    imageFit: 'contain',
    isFavorite: false,
    name: 'Strappy Block Heels',
    price: { amount: 210, currency: 'AED' },
    rating: 4.5,
    reviewCount: 98,
  },
  {
    bestPrice: { amount: 144, currency: 'AED' },
    brand: 'STEVE MADDEN',
    categories: ['Sneakers'],
    deliveryLabel: 'Delivery by Jul 27',
    discountPercentage: 40,
    id: 'steve-madden-canvas-low-top',
    image: steveMaddenCanvasLowTopImage,
    imageAccessibilityLabel: 'Black canvas low-top sneaker with white laces',
    imageFit: 'contain',
    isFavorite: false,
    name: 'Canvas Low-Top',
    price: { amount: 180, currency: 'AED' },
    rating: 4.6,
    reviewCount: 112,
  },
  {
    bestPrice: { amount: 290, currency: 'AED' },
    brand: 'CLARKS',
    categories: ['Loafers'],
    deliveryLabel: 'Delivery by Jul 26',
    discountPercentage: 0,
    id: 'clarks-suede-loafers',
    image: clarksSuedeLoafersImage,
    imageAccessibilityLabel: 'Pair of grey suede loafers with metal detail',
    imageFit: 'contain',
    isFavorite: false,
    name: 'Suede Loafers',
    price: { amount: 290, currency: 'AED' },
    rating: 4.7,
    reviewCount: 83,
  },
  {
    bestPrice: { amount: 240, currency: 'AED' },
    brand: 'DR. MARTENS',
    categories: ['Sneakers'],
    deliveryLabel: 'Delivery by Jul 28',
    discountPercentage: 0,
    id: 'dr-martens-running-trainers',
    image: drMartensRunningTrainersImage,
    imageAccessibilityLabel: 'Pair of blue running trainers with orange laces',
    imageFit: 'contain',
    isFavorite: false,
    name: 'Running Trainers',
    price: { amount: 240, currency: 'AED' },
    rating: 4.6,
    reviewCount: 74,
  },
  {
    bestPrice: { amount: 316, currency: 'AED' },
    brand: 'CONVERSE',
    categories: ['Boots'],
    deliveryLabel: 'Delivery by Jul 28',
    discountPercentage: 20,
    id: 'converse-ankle-chelsea-boots',
    image: converseAnkleChelseaBootsImage,
    imageAccessibilityLabel: 'Black ankle Chelsea boots worn with black trousers',
    imageFit: 'cover',
    isFavorite: false,
    name: 'Ankle Chelsea Boots',
    price: { amount: 395, currency: 'AED' },
    rating: 4.8,
    reviewCount: 120,
  },
  {
    bestPrice: { amount: 165, currency: 'AED' },
    brand: 'PUMA',
    categories: ['Sandals'],
    deliveryLabel: 'Delivery by Jul 25',
    discountPercentage: 0,
    id: 'puma-platform-sandals',
    image: pumaPlatformSandalsImage,
    imageAccessibilityLabel: 'Pair of white platform sandals',
    imageFit: 'contain',
    isFavorite: false,
    name: 'Platform Sandals',
    price: { amount: 165, currency: 'AED' },
    rating: 4.4,
    reviewCount: 56,
  },
] as const satisfies readonly FootwearCollectionProduct[];
