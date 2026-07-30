import { footwearCollectionProducts } from '@/features/products/constants/footwearCollectionProducts';
import { mensCollectionProducts } from '@/features/products/constants/mensCollectionProducts';
import { womensCollectionProducts } from '@/features/products/constants/womensCollectionProducts';
import type { ProductPreview } from '@/types/product';

export const youMayAlsoLikeProducts = [
  footwearCollectionProducts[4],
  womensCollectionProducts[6],
  womensCollectionProducts[2],
  footwearCollectionProducts[2],
] as const satisfies readonly ProductPreview[];

export const recentlyViewedProducts = [
  womensCollectionProducts[1],
  mensCollectionProducts[5],
  mensCollectionProducts[6],
  footwearCollectionProducts[3],
] as const satisfies readonly ProductPreview[];
