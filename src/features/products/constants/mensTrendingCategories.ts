import blazersImage from '@/assets/images/categories/trending/men/blazers.webp';
import chinosImage from '@/assets/images/categories/trending/men/chinos.webp';
import linenShirtsImage from '@/assets/images/categories/trending/men/linen-shirts.webp';
import type { CircularCategoryItem } from '@/types/circularCategory';

export const mensTrendingCategories = [
  {
    id: 'linen-shirts',
    image: linenShirtsImage,
    imageAccessibilityLabel: 'Man wearing a blue linen shirt by the sea',
    name: 'Linen Shirts',
  },
  {
    id: 'chinos',
    image: chinosImage,
    imageAccessibilityLabel: 'Man wearing neutral chinos in a bright interior',
    name: 'Chinos',
  },
  {
    id: 'blazers',
    image: blazersImage,
    imageAccessibilityLabel: 'Close-up of a tailored grey blazer',
    name: 'Blazers',
  },
] as const satisfies readonly CircularCategoryItem[];
