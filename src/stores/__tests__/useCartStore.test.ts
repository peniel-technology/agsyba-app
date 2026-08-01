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

const secondProduct: ProductPreview = {
  ...product,
  brand: 'H&M',
  id: 'hm-dress',
  name: 'Navy Fit & Flare Dress',
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
    expect(useCartStore.getState().items[product.id]?.isSelected).toBe(true);
  });

  it('updates quantities while keeping the total item count in sync', () => {
    useCartStore.getState().addItem(product, 2);
    useCartStore.getState().setItemQuantity(product.id, 4);

    expect(useCartStore.getState().itemCount).toBe(4);
    expect(useCartStore.getState().items[product.id]?.quantity).toBe(4);
  });

  it('removes a cart line and its quantity from the item count', () => {
    useCartStore.getState().addItem(product, 3);
    useCartStore.getState().removeItem(product.id);

    expect(useCartStore.getState().itemCount).toBe(0);
    expect(useCartStore.getState().items[product.id]).toBeUndefined();
  });

  it('toggles whether a cart line is selected for checkout', () => {
    useCartStore.getState().addItem(product);
    useCartStore.getState().toggleItemSelection(product.id);

    expect(useCartStore.getState().items[product.id]?.isSelected).toBe(false);

    useCartStore.getState().toggleItemSelection(product.id);

    expect(useCartStore.getState().items[product.id]?.isSelected).toBe(true);
  });

  it('selects and deselects every cart line together', () => {
    useCartStore.getState().addItem(product);
    useCartStore.getState().addItem(secondProduct);

    useCartStore.getState().setAllItemsSelected(false);

    expect(Object.values(useCartStore.getState().items).every((line) => !line.isSelected)).toBe(
      true,
    );

    useCartStore.getState().setAllItemsSelected(true);

    expect(Object.values(useCartStore.getState().items).every((line) => line.isSelected)).toBe(
      true,
    );
  });
});
