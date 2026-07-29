export const kidsCollectionCategories = [
  'All',
  'Girls',
  'Boys',
  'Baby',
  'Teens',
  'Accessories',
] as const;

export type KidsCollectionCategory = (typeof kidsCollectionCategories)[number];
