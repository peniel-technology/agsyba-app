import footwearThumbImage from '@/assets/images/shop/footwear-thumb.webp';
import kidsThumbImage from '@/assets/images/shop/kids-thumb.webp';
import menThumbImage from '@/assets/images/shop/men-thumb.webp';
import womenThumbImage from '@/assets/images/shop/women-thumb.webp';
import { routes } from '@/constants/routes';

export const shopCategories = [
  {
    href: routes.mensCollection,
    id: 'men',
    image: menThumbImage,
    imageAccessibilityLabel: 'Man wearing a neutral shirt',
    name: 'Men',
  },
  {
    href: routes.womensCollection,
    id: 'women',
    image: womenThumbImage,
    imageAccessibilityLabel: 'Woman wearing a rose-colored outfit',
    name: 'Women',
  },
  {
    href: routes.kidsCollection,
    id: 'kids',
    image: kidsThumbImage,
    imageAccessibilityLabel: 'Child holding a skateboard',
    name: 'Kids',
  },
  {
    href: routes.footwearCollection,
    id: 'footwear',
    image: footwearThumbImage,
    imageAccessibilityLabel: 'Brown leather ankle boots',
    name: 'Footwear',
  },
] as const;
