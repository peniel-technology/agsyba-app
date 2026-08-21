import { filterCollectionProducts } from '@/features/products/hooks/useCollection';
import type { CollectionProduct } from '@/features/products/types/collection';

const products = [
  {
    bestPrice: { amount: 100, currency: 'AED' },
    brand: 'ZARA',
    categories: ['Dresses'],
    deliveryLabel: 'Delivery by Aug 01',
    discountPercentage: 20,
    id: 'zara-dress',
    image: 1,
    imageAccessibilityLabel: 'White dress',
    isFavorite: false,
    name: 'Pleated Dress',
    price: { amount: 125, currency: 'AED' },
    rating: 4.2,
    reviewCount: 95,
  },
  {
    bestPrice: { amount: 80, currency: 'AED' },
    brand: 'REISS',
    categories: ['Tops'],
    deliveryLabel: 'Delivery by Aug 02',
    discountPercentage: 10,
    id: 'reiss-top',
    image: 2,
    imageAccessibilityLabel: 'Blue top',
    isFavorite: false,
    name: 'Merino Top',
    price: { amount: 100, currency: 'AED' },
    rating: 4.5,
    reviewCount: 48,
  },
] satisfies readonly CollectionProduct[];

describe('filterCollectionProducts', () => {
  it('returns the complete collection for the All category', () => {
    expect(filterCollectionProducts(products, 'All')).toBe(products);
  });

  it('returns products belonging to the selected category', () => {
    expect(filterCollectionProducts(products, 'Dresses')).toEqual([products[0]]);
  });
});
