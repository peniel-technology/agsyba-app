import ankleBootsImage from '@/assets/images/categories/trending/footwear/ankle-boots.webp';
import runningShoesImage from '@/assets/images/categories/trending/footwear/running-shoes.webp';
import slidesImage from '@/assets/images/categories/trending/footwear/slides.webp';
import whiteSneakersImage from '@/assets/images/categories/trending/footwear/white-sneakers.webp';
import type { CircularCategoryItem } from '@/types/circularCategory';

export const footwearTrendingCategories = [
  {
    id: 'white-sneakers',
    image: whiteSneakersImage,
    imageAccessibilityLabel: 'Minimal white low-top sneaker',
    name: 'White Sneakers',
  },
  {
    id: 'ankle-boots',
    image: ankleBootsImage,
    imageAccessibilityLabel: 'Neutral ankle boots arranged with seasonal accessories',
    name: 'Ankle Boots',
  },
  {
    id: 'slides',
    image: slidesImage,
    imageAccessibilityLabel: 'Blue slides on a beach',
    name: 'Slides',
  },
  {
    id: 'running-shoes',
    image: runningShoesImage,
    imageAccessibilityLabel: 'Pair of colorful performance running shoes',
    name: 'Running Shoes',
  },
] as const satisfies readonly CircularCategoryItem[];
