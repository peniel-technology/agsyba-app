import { useCartStore } from '@/stores/useCartStore';
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

describe('useCartStore', () => {
  beforeEach(() => {
    useCartStore.setState({ itemCount: 0, items: {} });
  });

  it('adds products and accumulates quantities', () => {
    useCartStore.getState().addItem(product, 2);
    useCartStore.getState().addItem(product);

    expect(useCartStore.getState().itemCount).toBe(3);
    expect(useCartStore.getState().items[product.id]?.quantity).toBe(3);
  });
});
