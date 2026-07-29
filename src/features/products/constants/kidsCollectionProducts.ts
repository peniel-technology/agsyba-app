import benettonCargoJoggersImage from '@/assets/images/products/kids/benetton-cargo-joggers.webp';
import cartersRainbowKnitSweaterImage from '@/assets/images/products/kids/carters-rainbow-knit-sweater.webp';
import gapTulleSkirtSetImage from '@/assets/images/products/kids/gap-tulle-skirt-set.webp';
import hmDenimDungareesImage from '@/assets/images/products/kids/hm-denim-dungarees.webp';
import mangoCottonPoloShirtImage from '@/assets/images/products/kids/mango-cotton-polo-shirt.webp';
import nextPufferJacketImage from '@/assets/images/products/kids/next-puffer-jacket.webp';
import petitBateauStripedTshirtPackImage from '@/assets/images/products/kids/petit-bateau-striped-tshirt-pack.webp';
import zaraFloralPrintDressImage from '@/assets/images/products/kids/zara-floral-print-dress.webp';
import type { KidsCollectionCategory } from '@/features/products/constants/kidsCollectionFilters';
import type { ProductPreview } from '@/types/product';

type KidsProductCategory = Exclude<KidsCollectionCategory, 'All'>;

export interface KidsCollectionProduct extends ProductPreview {
  categories: readonly KidsProductCategory[];
}

export const kidsCollectionTotalCount = 186;

export const kidsCollectionProducts = [
  {
    bestPrice: { amount: 103, currency: 'AED' },
    brand: 'ZARA KIDS',
    categories: ['Girls'],
    deliveryLabel: 'Delivery by Jul 25',
    discountPercentage: 30,
    id: 'zara-kids-floral-print-dress',
    image: zaraFloralPrintDressImage,
    imageAccessibilityLabel: 'Girl wearing a colorful floral print dress',
    imageFit: 'cover',
    isFavorite: false,
    name: 'Floral Print Dress',
    price: { amount: 129, currency: 'AED' },
    rating: 4.6,
    reviewCount: 87,
  },
  {
    bestPrice: { amount: 76, currency: 'AED' },
    brand: 'H&M KIDS',
    categories: ['Baby', 'Boys'],
    deliveryLabel: 'Delivery by Jul 26',
    discountPercentage: 20,
    id: 'hm-kids-denim-dungarees',
    image: hmDenimDungareesImage,
    imageAccessibilityLabel: 'Children denim dungarees with a striped shirt',
    imageFit: 'contain',
    isFavorite: false,
    name: 'Denim Dungarees',
    price: { amount: 95, currency: 'AED' },
    rating: 4.7,
    reviewCount: 54,
  },
  {
    bestPrice: { amount: 63, currency: 'AED' },
    brand: 'MANGO KIDS',
    categories: ['Boys'],
    deliveryLabel: 'Delivery by Jul 25',
    discountPercentage: 20,
    id: 'mango-kids-cotton-polo-shirt',
    image: mangoCottonPoloShirtImage,
    imageAccessibilityLabel: 'Children pastel striped cotton polo shirt',
    imageFit: 'contain',
    isFavorite: false,
    name: 'Cotton Polo Shirt',
    price: { amount: 79, currency: 'AED' },
    rating: 4.5,
    reviewCount: 32,
  },
  {
    bestPrice: { amount: 119, currency: 'AED' },
    brand: 'GAP KIDS',
    categories: ['Girls'],
    deliveryLabel: 'Delivery by Jul 27',
    discountPercentage: 20,
    id: 'gap-kids-tulle-skirt-set',
    image: gapTulleSkirtSetImage,
    imageAccessibilityLabel: 'Girl wearing a pink tulle skirt set',
    imageFit: 'cover',
    isFavorite: false,
    name: 'Tulle Skirt Set',
    price: { amount: 149, currency: 'AED' },
    rating: 4.8,
    reviewCount: 63,
  },
  {
    bestPrice: { amount: 166, currency: 'AED' },
    brand: 'NEXT',
    categories: ['Baby', 'Boys', 'Girls'],
    deliveryLabel: 'Delivery by Jul 26',
    discountPercentage: 15,
    id: 'next-kids-puffer-jacket',
    image: nextPufferJacketImage,
    imageAccessibilityLabel: 'Yellow children puffer jacket',
    imageFit: 'contain',
    isFavorite: false,
    name: 'Puffer Jacket',
    price: { amount: 195, currency: 'AED' },
    rating: 4.9,
    reviewCount: 104,
  },
  {
    bestPrice: { amount: 92, currency: 'AED' },
    brand: 'PETIT BATEAU',
    categories: ['Baby'],
    deliveryLabel: 'Delivery by Jul 28',
    discountPercentage: 20,
    id: 'petit-bateau-striped-tshirt-pack',
    image: petitBateauStripedTshirtPackImage,
    imageAccessibilityLabel: 'Folded blue and white striped organic cotton shirt pack',
    imageFit: 'contain',
    isFavorite: false,
    name: 'Striped T-Shirt Pack',
    price: { amount: 115, currency: 'AED' },
    rating: 4.8,
    reviewCount: 92,
  },
  {
    bestPrice: { amount: 108, currency: 'AED' },
    brand: 'BENETTON',
    categories: ['Boys', 'Teens'],
    deliveryLabel: 'Delivery by Jul 28',
    discountPercentage: 20,
    id: 'benetton-kids-cargo-joggers',
    image: benettonCargoJoggersImage,
    imageAccessibilityLabel: 'Olive children cargo joggers',
    imageFit: 'contain',
    isFavorite: false,
    name: 'Cargo Joggers',
    price: { amount: 135, currency: 'AED' },
    rating: 4.4,
    reviewCount: 41,
  },
  {
    bestPrice: { amount: 68, currency: 'AED' },
    brand: "CARTER'S",
    categories: ['Baby', 'Girls'],
    deliveryLabel: 'Delivery by Jul 25',
    discountPercentage: 20,
    id: 'carters-rainbow-knit-sweater',
    image: cartersRainbowKnitSweaterImage,
    imageAccessibilityLabel: 'Children rainbow striped knit sweater',
    imageFit: 'contain',
    isFavorite: false,
    name: 'Rainbow Knit Sweater',
    price: { amount: 85, currency: 'AED' },
    rating: 4.7,
    reviewCount: 78,
  },
] as const satisfies readonly KidsCollectionProduct[];
