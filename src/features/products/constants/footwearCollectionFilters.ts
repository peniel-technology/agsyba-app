export const footwearCollectionCategories = [
  'All',
  'Sneakers',
  'Heels',
  'Boots',
  'Sandals',
  'Loafers',
] as const;

export type FootwearCollectionCategory = (typeof footwearCollectionCategories)[number];
