export const mensCollectionCategories = [
  'All',
  'Shirts',
  'T-Shirts',
  'Trousers',
  'Jackets',
  'Suits',
  'Casual',
] as const;

export type MensCollectionCategory = (typeof mensCollectionCategories)[number];
