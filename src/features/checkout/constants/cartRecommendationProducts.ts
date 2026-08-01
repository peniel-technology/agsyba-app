import { womensCollectionProducts } from '@/features/products/constants/womensCollectionProducts';
import type { ProductPreview } from '@/types/product';

export const cartRecommendationProducts = [
  womensCollectionProducts[2],
  womensCollectionProducts[7],
] as const satisfies readonly ProductPreview[];
