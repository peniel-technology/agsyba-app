import { act, fireEvent, render, renderHook } from '@testing-library/react-native';

import { ProductCard } from '@/components/product/ProductCard';
import { useWishlist } from '@/features/wishlist/hooks/useWishlist';
import { useWishlistStore } from '@/stores/useWishlistStore';
import type { ProductPreview } from '@/types/product';

jest.mock('expo-image', () => ({ Image: 'ExpoImage' }));
jest.mock('lucide-react-native', () => ({
  Heart: 'Heart',
  ShoppingBag: 'ShoppingBag',
  Star: 'Star',
}));

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

describe('useWishlist', () => {
  beforeEach(() => {
    useWishlistStore.setState({ items: {} });
  });

  it('toggles a product and exposes its count and ids', () => {
    const { result } = renderHook(() => useWishlist());

    act(() => result.current.toggleItem(product));

    expect(result.current.itemCount).toBe(1);
    expect(result.current.productIds.has(product.id)).toBe(true);
    expect(result.current.items[0]).toMatchObject({ ...product, isFavorite: true });

    act(() => result.current.toggleItem(product));

    expect(result.current.itemCount).toBe(0);
    expect(result.current.productIds.has(product.id)).toBe(false);
  });

  it('adds a product to the shared wishlist when its card heart is pressed', () => {
    const { result } = renderHook(() => useWishlist());
    const { getByLabelText } = render(
      <ProductCard onFavoritePress={result.current.toggleItem} product={product} />,
    );

    fireEvent.press(getByLabelText('Add Pleated Chiffon Midi Dress to wishlist'));

    expect(useWishlistStore.getState().items[product.id]).toMatchObject({
      ...product,
      isFavorite: true,
    });
  });
});
