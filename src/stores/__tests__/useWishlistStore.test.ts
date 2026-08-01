import { useWishlistStore } from '@/stores/useWishlistStore';
import type { ProductPreview } from '@/types/product';

const product: ProductPreview = {
  bestPrice: { amount: 76, currency: 'AED' },
  brand: 'ZARA',
  deliveryLabel: 'Delivery by Jul 21',
  discountPercentage: 20,
  id: 'zara-dress',
  image: 1,
  imageAccessibilityLabel: 'Light blue dress',
  isFavorite: false,
  name: 'Pleated Chiffon Midi Dress',
  price: { amount: 95, currency: 'AED' },
  rating: 4.2,
  reviewCount: 128,
};

describe('useWishlistStore', () => {
  beforeEach(() => {
    useWishlistStore.setState({ items: {} });
  });

  it('adds and removes wishlist products', () => {
    useWishlistStore.getState().addItem(product);

    expect(useWishlistStore.getState().items[product.id]).toEqual(product);

    useWishlistStore.getState().removeItem(product.id);

    expect(useWishlistStore.getState().items[product.id]).toBeUndefined();
  });
});
