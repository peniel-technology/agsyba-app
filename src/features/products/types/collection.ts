import type { ComponentType } from 'react';

import type { CircularCategoryItem } from '@/types/circularCategory';
import type { ProductPreview } from '@/types/product';

export interface CollectionProduct extends ProductPreview {
  categories: readonly string[];
}

export interface CollectionTrendingProps {
  categories: readonly CircularCategoryItem[];
}

export interface CollectionDefinition {
  categories: readonly string[];
  hero: ComponentType;
  productTitle: string;
  products: readonly CollectionProduct[];
  refreshLabel: string;
  route: string;
  title: string;
  totalCount: number;
  trending: ComponentType<CollectionTrendingProps>;
  trendingCategories: readonly CircularCategoryItem[];
}
