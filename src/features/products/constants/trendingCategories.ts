import bestSellersImage from '@/assets/images/categories/trending/best-sellers.webp';
import newArrivalsImage from '@/assets/images/categories/trending/new-arrivals.webp';
import saleImage from '@/assets/images/categories/trending/sale.webp';
import seasonalImage from '@/assets/images/categories/trending/seasonal.webp';
import type { CircularCategoryItem } from '@/types/circularCategory';

export const trendingCategories = [
  {
    id: 'new-arrivals',
    image: newArrivalsImage,
    imageAccessibilityLabel: 'Emerald evening gown displayed in a studio',
    name: 'New Arrivals',
  },
  {
    id: 'best-sellers',
    image: bestSellersImage,
    imageAccessibilityLabel: 'Emerald high heels displayed on a pedestal',
    name: 'Best Sellers',
  },
  {
    id: 'sale',
    image: saleImage,
    imageAccessibilityLabel: 'Formal charcoal suit displayed on a mannequin',
    name: 'Sale',
  },
  {
    id: 'seasonal',
    image: seasonalImage,
    imageAccessibilityLabel: 'Colorful sneakers displayed on stacked blocks',
    name: 'Seasonal',
  },
] as const satisfies readonly CircularCategoryItem[];
