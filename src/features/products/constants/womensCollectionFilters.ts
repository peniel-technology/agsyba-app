export const womensCollectionCategories = [
  'All',
  'Dresses',
  'Tops',
  'Skirts',
  'Jackets',
  'Accessories',
] as const;

export type WomensCollectionCategory = (typeof womensCollectionCategories)[number];
