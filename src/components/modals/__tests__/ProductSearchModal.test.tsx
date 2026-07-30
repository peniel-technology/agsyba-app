import { fireEvent, render } from '@testing-library/react-native';

import { ProductSearchModal } from '@/components/modals/ProductSearchModal';
import type { ProductPreview } from '@/types/product';

jest.mock('expo-image', () => ({ Image: 'ExpoImage' }));
jest.mock('lucide-react-native', () => ({
  Heart: 'Heart',
  Search: 'Search',
  ShoppingBag: 'ShoppingBag',
  Star: 'Star',
  X: 'X',
}));

const products: readonly ProductPreview[] = [
  {
    bestPrice: { amount: 100, currency: 'AED' },
    brand: 'ZARA',
    deliveryLabel: 'Delivery by Aug 01',
    discountPercentage: 20,
    id: 'zara-shirt',
    image: 1,
    imageAccessibilityLabel: 'White linen shirt',
    isFavorite: false,
    name: 'Premium Linen Shirt',
    price: { amount: 125, currency: 'AED' },
    rating: 4.2,
    reviewCount: 95,
  },
  {
    bestPrice: { amount: 156, currency: 'AED' },
    brand: 'REISS',
    deliveryLabel: 'Delivery by Aug 02',
    discountPercentage: 20,
    id: 'reiss-polo',
    image: 2,
    imageAccessibilityLabel: 'Navy polo shirt',
    isFavorite: false,
    name: 'Merino Polo Shirt',
    price: { amount: 195, currency: 'AED' },
    rating: 4.9,
    reviewCount: 48,
  },
];

describe('ProductSearchModal', () => {
  it('filters products by brand or product name', () => {
    const { getByLabelText, getByText, queryByText } = render(
      <ProductSearchModal isVisible onClose={jest.fn()} products={products} />,
    );

    fireEvent.changeText(getByLabelText('Search the product catalog'), 'zara');

    expect(getByText('Premium Linen Shirt')).toBeTruthy();
    expect(queryByText('Merino Polo Shirt')).toBeNull();
  });

  it('closes the search experience', () => {
    const onClose = jest.fn();
    const { getByLabelText } = render(
      <ProductSearchModal isVisible onClose={onClose} products={products} />,
    );

    fireEvent.press(getByLabelText('Close search'));

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('opens a selected product from the search results', () => {
    const onProductPress = jest.fn();
    const { getByLabelText } = render(
      <ProductSearchModal
        isVisible
        onClose={jest.fn()}
        onProductPress={onProductPress}
        products={products}
      />,
    );

    fireEvent.press(getByLabelText('Open ZARA Premium Linen Shirt'));

    expect(onProductPress).toHaveBeenCalledWith(products[0]);
  });
});
