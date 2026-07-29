import cosSilkCamisoleTopImage from '@/assets/images/products/women/cos-silk-camisole-top.webp';
import hmKnitBodyconDressImage from '@/assets/images/products/women/hm-knit-bodycon-dress.webp';
import mangoPleatedMaxiSkirtImage from '@/assets/images/products/women/mango-pleated-maxi-skirt.webp';
import massimoDuttiLeatherBikerJacketImage from '@/assets/images/products/women/massimo-dutti-leather-biker-jacket.webp';
import otherStoriesStrappyHeelSandalsImage from '@/assets/images/products/women/other-stories-strappy-heel-sandals.webp';
import reissQuiltedChainBagImage from '@/assets/images/products/women/reiss-quilted-chain-bag.webp';
import sandroTailoredLinenBlazerImage from '@/assets/images/products/women/sandro-tailored-linen-blazer.webp';
import zaraFloralMidiWrapDressImage from '@/assets/images/products/women/zara-floral-midi-wrap-dress.webp';
import type { WomensCollectionCategory } from '@/features/products/constants/womensCollectionFilters';
import type { ProductPreview } from '@/types/product';

type WomensProductCategory = Exclude<WomensCollectionCategory, 'All'>;

export interface WomensCollectionProduct extends ProductPreview {
  categories: readonly WomensProductCategory[];
}

export const womensCollectionTotalCount = 312;

export const womensCollectionProducts = [
  {
    bestPrice: { amount: 199, currency: 'AED' },
    brand: 'ZARA',
    categories: ['Dresses'],
    deliveryLabel: 'Delivery by Jul 31',
    discountPercentage: 25,
    id: 'zara-floral-midi-wrap-dress',
    image: zaraFloralMidiWrapDressImage,
    imageAccessibilityLabel: 'Woman wearing a floral midi wrap dress in a garden',
    imageFit: 'cover',
    isFavorite: false,
    name: 'Floral Midi Wrap Dress',
    price: { amount: 249, currency: 'AED' },
    rating: 4.8,
    reviewCount: 142,
  },
  {
    bestPrice: { amount: 116, currency: 'AED' },
    brand: 'COS',
    categories: ['Tops'],
    deliveryLabel: 'Delivery by Aug 01',
    discountPercentage: 20,
    id: 'cos-silk-camisole-top',
    image: cosSilkCamisoleTopImage,
    imageAccessibilityLabel: 'Woman wearing a white silk camisole top',
    imageFit: 'cover',
    isFavorite: false,
    name: 'Silk Camisole Top',
    price: { amount: 145, currency: 'AED' },
    rating: 4.7,
    reviewCount: 84,
  },
  {
    bestPrice: { amount: 148, currency: 'AED' },
    brand: 'MANGO',
    categories: ['Skirts'],
    deliveryLabel: 'Delivery by Aug 01',
    discountPercentage: 20,
    id: 'mango-pleated-tonal-maxi-skirt',
    image: mangoPleatedMaxiSkirtImage,
    imageAccessibilityLabel: 'Woman wearing an olive pleated tonal maxi skirt',
    imageFit: 'cover',
    isFavorite: false,
    name: 'Pleated Tonal Maxi Skirt',
    price: { amount: 185, currency: 'AED' },
    rating: 4.5,
    reviewCount: 96,
  },
  {
    bestPrice: { amount: 496, currency: 'AED' },
    brand: 'MASSIMO DUTTI',
    categories: ['Jackets'],
    deliveryLabel: 'Delivery by Aug 02',
    discountPercentage: 15,
    id: 'massimo-dutti-leather-biker-jacket',
    image: massimoDuttiLeatherBikerJacketImage,
    imageAccessibilityLabel: 'Woman wearing a black leather biker jacket at night',
    imageFit: 'cover',
    isFavorite: false,
    name: 'Leather Biker Jacket',
    price: { amount: 620, currency: 'AED' },
    rating: 4.9,
    reviewCount: 112,
  },
  {
    bestPrice: { amount: 312, currency: 'AED' },
    brand: 'REISS',
    categories: ['Accessories'],
    deliveryLabel: 'Delivery by Aug 03',
    discountPercentage: 20,
    id: 'reiss-quilted-leather-chain-bag',
    image: reissQuiltedChainBagImage,
    imageAccessibilityLabel: 'Black quilted leather handbag with gold chain',
    imageFit: 'cover',
    isFavorite: false,
    name: 'Quilted Leather Chain Bag',
    price: { amount: 390, currency: 'AED' },
    rating: 4.6,
    reviewCount: 203,
  },
  {
    bestPrice: { amount: 156, currency: 'AED' },
    brand: '& OTHER STORIES',
    categories: ['Accessories'],
    deliveryLabel: 'Delivery by Aug 03',
    discountPercentage: 40,
    id: 'other-stories-strappy-heel-sandals',
    image: otherStoriesStrappyHeelSandalsImage,
    imageAccessibilityLabel: 'Black strappy high-heel sandals',
    imageFit: 'cover',
    isFavorite: false,
    name: 'Strappy Heel Sandals',
    price: { amount: 195, currency: 'AED' },
    rating: 4.4,
    reviewCount: 64,
  },
  {
    bestPrice: { amount: 384, currency: 'AED' },
    brand: 'SANDRO',
    categories: ['Jackets'],
    deliveryLabel: 'Delivery by Aug 04',
    discountPercentage: 20,
    id: 'sandro-tailored-linen-blazer',
    image: sandroTailoredLinenBlazerImage,
    imageAccessibilityLabel: 'Woman wearing a camel tailored linen blazer',
    imageFit: 'cover',
    isFavorite: false,
    name: 'Tailored Linen Blazer',
    price: { amount: 480, currency: 'AED' },
    rating: 4.7,
    reviewCount: 118,
  },
  {
    bestPrice: { amount: 100, currency: 'AED' },
    brand: 'H&M',
    categories: ['Dresses'],
    deliveryLabel: 'Delivery by Aug 05',
    discountPercentage: 25,
    id: 'hm-knit-bodycon-dress',
    image: hmKnitBodyconDressImage,
    imageAccessibilityLabel: 'Woman wearing a rust knit bodycon dress',
    imageFit: 'cover',
    isFavorite: false,
    name: 'Knit Bodycon Dress',
    price: { amount: 125, currency: 'AED' },
    rating: 4.3,
    reviewCount: 51,
  },
] as const satisfies readonly WomensCollectionProduct[];
