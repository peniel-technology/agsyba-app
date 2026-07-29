import cosLinenSummerBlazerImage from '@/assets/images/products/men/cos-linen-summer-blazer.webp';
import cosPleatedTrousersImage from '@/assets/images/products/men/cos-pleated-trousers.webp';
import hmRelaxedCottonTshirtImage from '@/assets/images/products/men/hm-relaxed-cotton-tshirt.webp';
import hugoBossLinenSuitImage from '@/assets/images/products/men/hugo-boss-linen-suit.webp';
import massimoDuttiChinoPantsImage from '@/assets/images/products/men/massimo-dutti-chino-pants.webp';
import ralphLaurenOxfordShirtImage from '@/assets/images/products/men/ralph-lauren-oxford-shirt.webp';
import reissMerinoPoloShirtImage from '@/assets/images/products/men/reiss-merino-polo-shirt.webp';
import zaraLinenMandarinShirtImage from '@/assets/images/products/men/zara-linen-mandarin-shirt.webp';
import type { MensCollectionCategory } from '@/features/products/constants/mensCollectionFilters';
import type { ProductPreview } from '@/types/product';

type MensProductCategory = Exclude<MensCollectionCategory, 'All'>;

export interface MensCollectionProduct extends ProductPreview {
  categories: readonly MensProductCategory[];
}

export const mensCollectionTotalCount = 248;

export const mensCollectionProducts = [
  {
    bestPrice: { amount: 199, currency: 'AED' },
    brand: 'COS',
    categories: ['Jackets', 'Suits'],
    deliveryLabel: 'Delivery by Jul 31',
    discountPercentage: 20,
    id: 'cos-tailored-linen-summer-blazer',
    image: cosLinenSummerBlazerImage,
    imageAccessibilityLabel: 'Man wearing a beige tailored linen summer blazer',
    imageFit: 'cover',
    isFavorite: false,
    name: 'Tailored Linen Summer Blazer',
    price: { amount: 249, currency: 'AED' },
    rating: 4.8,
    reviewCount: 64,
  },
  {
    bestPrice: { amount: 144, currency: 'AED' },
    brand: 'MASSIMO DUTTI',
    categories: ['Trousers', 'Casual'],
    deliveryLabel: 'Delivery by Aug 01',
    discountPercentage: 20,
    id: 'massimo-dutti-slim-fit-cotton-chino-pants',
    image: massimoDuttiChinoPantsImage,
    imageAccessibilityLabel: 'Man wearing an olive slim-fit shirt and chino pants',
    imageFit: 'cover',
    isFavorite: false,
    name: 'Slim Fit Cotton Chino Pants',
    price: { amount: 180, currency: 'AED' },
    rating: 4.5,
    reviewCount: 112,
  },
  {
    bestPrice: { amount: 100, currency: 'AED' },
    brand: 'ZARA',
    categories: ['Shirts'],
    deliveryLabel: 'Delivery by Aug 01',
    discountPercentage: 20,
    id: 'zara-premium-linen-mandarin-shirt',
    image: zaraLinenMandarinShirtImage,
    imageAccessibilityLabel: 'Man wearing a white premium linen mandarin shirt',
    imageFit: 'cover',
    isFavorite: false,
    name: 'Premium Linen Mandarin Shirt',
    price: { amount: 125, currency: 'AED' },
    rating: 4.2,
    reviewCount: 95,
  },
  {
    bestPrice: { amount: 156, currency: 'AED' },
    brand: 'REISS',
    categories: ['T-Shirts', 'Casual'],
    deliveryLabel: 'Delivery by Aug 02',
    discountPercentage: 20,
    id: 'reiss-knit-merino-wool-polo-shirt',
    image: reissMerinoPoloShirtImage,
    imageAccessibilityLabel: 'Man wearing a navy knit merino wool polo shirt',
    imageFit: 'cover',
    isFavorite: false,
    name: 'Knit Merino Wool Polo Shirt',
    price: { amount: 195, currency: 'AED' },
    rating: 4.9,
    reviewCount: 48,
  },
  {
    bestPrice: { amount: 360, currency: 'AED' },
    brand: 'HUGO BOSS',
    categories: ['Suits'],
    deliveryLabel: 'Delivery by Aug 03',
    discountPercentage: 20,
    id: 'hugo-boss-double-breasted-linen-suit',
    image: hugoBossLinenSuitImage,
    imageAccessibilityLabel: 'Model wearing a rust double-breasted linen suit',
    imageFit: 'cover',
    isFavorite: false,
    name: 'Double-Breasted Linen Suit',
    price: { amount: 450, currency: 'AED' },
    rating: 4.7,
    reviewCount: 34,
  },
  {
    bestPrice: { amount: 232, currency: 'AED' },
    brand: 'RALPH LAUREN',
    categories: ['Shirts', 'Casual'],
    deliveryLabel: 'Delivery by Aug 03',
    discountPercentage: 20,
    id: 'ralph-lauren-classic-fit-oxford-shirt',
    image: ralphLaurenOxfordShirtImage,
    imageAccessibilityLabel: 'Man wearing a blue classic-fit Oxford shirt',
    imageFit: 'cover',
    isFavorite: false,
    name: 'Classic Fit Oxford Shirt',
    price: { amount: 290, currency: 'AED' },
    rating: 4.6,
    reviewCount: 215,
  },
  {
    bestPrice: { amount: 36, currency: 'AED' },
    brand: 'H&M',
    categories: ['T-Shirts', 'Casual'],
    deliveryLabel: 'Delivery by Aug 04',
    discountPercentage: 20,
    id: 'hm-relaxed-fit-cotton-tshirt',
    image: hmRelaxedCottonTshirtImage,
    imageAccessibilityLabel: 'Man wearing a black relaxed-fit cotton T-shirt',
    imageFit: 'cover',
    isFavorite: false,
    name: 'Relaxed Fit Cotton T-Shirt',
    price: { amount: 45, currency: 'AED' },
    rating: 4.1,
    reviewCount: 88,
  },
  {
    bestPrice: { amount: 132, currency: 'AED' },
    brand: 'COS',
    categories: ['Trousers', 'Suits'],
    deliveryLabel: 'Delivery by Aug 05',
    discountPercentage: 25,
    id: 'cos-pleated-tapered-trousers',
    image: cosPleatedTrousersImage,
    imageAccessibilityLabel: 'Man wearing black pleated tapered trousers',
    imageFit: 'cover',
    isFavorite: false,
    name: 'Pleated Tapered Trousers',
    price: { amount: 165, currency: 'AED' },
    rating: 4.4,
    reviewCount: 56,
  },
] as const satisfies readonly MensCollectionProduct[];
