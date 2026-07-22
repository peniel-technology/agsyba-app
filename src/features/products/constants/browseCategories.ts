import footwearCollectionImage from '@/assets/images/categories/footwear-collection.webp';
import kidsDressingImage from '@/assets/images/categories/kids-dressing.webp';
import mensDressingImage from '@/assets/images/categories/mens-dressing.webp';
import womensDressingImage from '@/assets/images/categories/womens-dressing.webp';
import type { BrowseCategory } from '@/features/products/types/browseCategory';

export const browseCategories = [
  {
    id: 'mens-dressing',
    image: mensDressingImage,
    imageAccessibilityLabel: 'Man wearing a neutral tailored suit in a modern interior',
    name: "Men's Dressing",
  },
  {
    id: 'womens-dressing',
    image: womensDressingImage,
    imageAccessibilityLabel: 'Woman wearing a white dress in modern architecture',
    name: "Women's Dressing",
  },
  {
    id: 'kids-dressing',
    image: kidsDressingImage,
    imageAccessibilityLabel: 'Children playing together in neutral casual clothing',
    name: "Kids' Dressing",
  },
  {
    id: 'footwear-collection',
    image: footwearCollectionImage,
    imageAccessibilityLabel: 'Pair of brown leather ankle boots on display',
    name: 'Footwear Collection',
  },
] as const satisfies readonly BrowseCategory[];
