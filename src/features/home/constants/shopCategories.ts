import dressesImage from '@/assets/images/home/category-dresses.webp';
import menImage from '@/assets/images/home/category-men.webp';
import saleImage from '@/assets/images/home/category-sale.webp';
import shoesImage from '@/assets/images/home/category-shoes.webp';
import womenImage from '@/assets/images/home/category-women.webp';
import type { ShopCategory } from '@/features/home/types/shopCategory';

export const shopCategories = [
  {
    id: 'women',
    image: womenImage,
    imageAccessibilityLabel: 'Woman wearing an elegant white dress',
    name: 'Women',
  },
  {
    id: 'men',
    image: menImage,
    imageAccessibilityLabel: 'Man wearing a neutral blazer',
    name: 'Men',
  },
  {
    id: 'dresses',
    image: dressesImage,
    imageAccessibilityLabel: 'Pink dress hanging on a clothing rack',
    name: 'Dresses',
  },
  {
    id: 'shoes',
    image: shoesImage,
    imageAccessibilityLabel: 'Pair of burgundy ankle boots',
    name: 'Shoes',
  },
  {
    id: 'sale',
    image: saleImage,
    imageAccessibilityLabel: 'Sale percentage symbol',
    name: 'Sale',
  },
] as const satisfies readonly ShopCategory[];
