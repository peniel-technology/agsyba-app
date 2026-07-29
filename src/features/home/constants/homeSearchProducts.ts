import { allCollections } from '@/features/home/constants/allCollections';
import { mostPopularProducts } from '@/features/home/constants/mostPopularProducts';
import { newArrivals } from '@/features/home/constants/newArrivals';
import { trendingFootwear } from '@/features/home/constants/trendingFootwear';
import type { ProductPreview } from '@/types/product';

export const homeSearchProducts = [
  ...newArrivals,
  ...mostPopularProducts,
  ...trendingFootwear,
  ...allCollections,
] satisfies readonly ProductPreview[];
