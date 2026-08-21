import footwearCollectionImage from '@/assets/images/shop/footwear-thumb.webp';
import kidsDressingImage from '@/assets/images/shop/kids-thumb.webp';
import mensDressingImage from '@/assets/images/shop/men-thumb.webp';
import womensDressingImage from '@/assets/images/shop/women-thumb.webp';
import { routes } from '@/constants/routes';
import type { BrowseCategory } from '@/features/products/types/browseCategory';

export const browseCategories = [
  {
    href: routes.mensCollection,
    id: 'mens-dressing',
    image: mensDressingImage,
    imageAccessibilityLabel: 'Man wearing a neutral tailored suit in a modern interior',
    name: "Men's Dressing",
  },
  {
    href: routes.womensCollection,
    id: 'womens-dressing',
    image: womensDressingImage,
    imageAccessibilityLabel: 'Woman wearing a white dress in modern architecture',
    name: "Women's Dressing",
  },
  {
    href: routes.kidsCollection,
    id: 'kids-dressing',
    image: kidsDressingImage,
    imageAccessibilityLabel: 'Children playing together in neutral casual clothing',
    name: "Kids' Dressing",
  },
  {
    href: routes.footwearCollection,
    id: 'footwear-collection',
    image: footwearCollectionImage,
    imageAccessibilityLabel: 'Pair of brown leather ankle boots on display',
    name: 'Footwear Collection',
  },
] as const satisfies readonly BrowseCategory[];
