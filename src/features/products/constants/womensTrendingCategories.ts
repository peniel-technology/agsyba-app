import blazersImage from '@/assets/images/categories/trending/women/blazers.webp';
import handbagsImage from '@/assets/images/categories/trending/women/handbags.webp';
import heelsImage from '@/assets/images/categories/trending/women/heels.webp';
import knitwearImage from '@/assets/images/categories/trending/women/knitwear.webp';
import maxiDressesImage from '@/assets/images/categories/trending/women/maxi-dresses.webp';
import type { CircularCategoryItem } from '@/types/circularCategory';

export const womensTrendingCategories = [
  {
    id: 'maxi-dresses',
    image: maxiDressesImage,
    imageAccessibilityLabel: 'Neutral layered maxi dress',
    name: 'Maxi Dresses',
  },
  {
    id: 'blazers',
    image: blazersImage,
    imageAccessibilityLabel: 'Neutral double-breasted blazer',
    name: 'Blazers',
  },
  {
    id: 'handbags',
    image: handbagsImage,
    imageAccessibilityLabel: 'Tan structured leather handbag',
    name: 'Handbags',
  },
  {
    id: 'heels',
    image: heelsImage,
    imageAccessibilityLabel: 'Burgundy high-heel shoes',
    name: 'Heels',
  },
  {
    id: 'knitwear',
    image: knitwearImage,
    imageAccessibilityLabel: 'Folded neutral cable-knit sweater',
    name: 'Knitwear',
  },
] as const satisfies readonly CircularCategoryItem[];
