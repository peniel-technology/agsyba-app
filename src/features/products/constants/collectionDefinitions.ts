import { FootwearCollectionHero } from '@/features/products/components/FootwearCollectionHero';
import { FootwearTrending } from '@/features/products/components/FootwearTrending';
import { KidsCollectionHero } from '@/features/products/components/KidsCollectionHero';
import { KidsTrending } from '@/features/products/components/KidsTrending';
import { MensCollectionHero } from '@/features/products/components/MensCollectionHero';
import { MensTrending } from '@/features/products/components/MensTrending';
import { WomensCollectionHero } from '@/features/products/components/WomensCollectionHero';
import { WomensTrending } from '@/features/products/components/WomensTrending';
import { footwearCollectionCategories } from '@/features/products/constants/footwearCollectionFilters';
import {
  footwearCollectionProducts,
  footwearCollectionTotalCount,
} from '@/features/products/constants/footwearCollectionProducts';
import { footwearTrendingCategories } from '@/features/products/constants/footwearTrendingCategories';
import { kidsCollectionCategories } from '@/features/products/constants/kidsCollectionFilters';
import {
  kidsCollectionProducts,
  kidsCollectionTotalCount,
} from '@/features/products/constants/kidsCollectionProducts';
import { kidsTrendingCategories } from '@/features/products/constants/kidsTrendingCategories';
import { mensCollectionCategories } from '@/features/products/constants/mensCollectionFilters';
import {
  mensCollectionProducts,
  mensCollectionTotalCount,
} from '@/features/products/constants/mensCollectionProducts';
import { mensTrendingCategories } from '@/features/products/constants/mensTrendingCategories';
import { womensCollectionCategories } from '@/features/products/constants/womensCollectionFilters';
import {
  womensCollectionProducts,
  womensCollectionTotalCount,
} from '@/features/products/constants/womensCollectionProducts';
import { womensTrendingCategories } from '@/features/products/constants/womensTrendingCategories';
import { routes } from '@/constants/routes';
import type { CollectionDefinition } from '@/features/products/types/collection';

export const collectionDefinitions = {
  footwear: {
    categories: footwearCollectionCategories,
    hero: FootwearCollectionHero,
    productTitle: 'Footwear Products',
    products: footwearCollectionProducts,
    refreshLabel: 'Refreshing footwear products',
    route: routes.footwearCollection,
    title: 'Footwear',
    totalCount: footwearCollectionTotalCount,
    trending: FootwearTrending,
    trendingCategories: footwearTrendingCategories,
  },
  kids: {
    categories: kidsCollectionCategories,
    hero: KidsCollectionHero,
    productTitle: "Kids' Products",
    products: kidsCollectionProducts,
    refreshLabel: "Refreshing kids' products",
    route: routes.kidsCollection,
    title: "Kids' Collection",
    totalCount: kidsCollectionTotalCount,
    trending: KidsTrending,
    trendingCategories: kidsTrendingCategories,
  },
  mens: {
    categories: mensCollectionCategories,
    hero: MensCollectionHero,
    productTitle: "Men's Products",
    products: mensCollectionProducts,
    refreshLabel: "Refreshing men's products",
    route: routes.mensCollection,
    title: "Men's Collection",
    totalCount: mensCollectionTotalCount,
    trending: MensTrending,
    trendingCategories: mensTrendingCategories,
  },
  womens: {
    categories: womensCollectionCategories,
    hero: WomensCollectionHero,
    productTitle: "Women's Products",
    products: womensCollectionProducts,
    refreshLabel: "Refreshing women's products",
    route: routes.womensCollection,
    title: "Women's Collection",
    totalCount: womensCollectionTotalCount,
    trending: WomensTrending,
    trendingCategories: womensTrendingCategories,
  },
} satisfies Record<string, CollectionDefinition>;
