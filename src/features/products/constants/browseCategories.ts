import footwearCollectionImage from '@/assets/images/categories/footwear-collection.webp';
import kidsDressingImage from '@/assets/images/categories/kids-dressing.webp';
import mensDressingImage from '@/assets/images/categories/mens-dressing.webp';
import womensDressingImage from '@/assets/images/categories/womens-dressing.webp';
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
