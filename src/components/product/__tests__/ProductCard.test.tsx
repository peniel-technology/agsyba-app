import { fireEvent, render } from '@testing-library/react-native';

import { ProductCard } from '@/components/product/ProductCard';
import type { ProductPreview } from '@/types/product';

jest.mock('expo-image', () => ({ Image: 'ExpoImage' }));
jest.mock('lucide-react-native', () => ({ Heart: 'Heart', Star: 'Star' }));

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
  price: { amount: 45, currency: 'AED' },
  rating: 4.2,
  reviewCount: 128,
};

describe('ProductCard', () => {
  it('renders product details and invokes product actions', () => {
    const onFavoritePress = jest.fn();
    const onPress = jest.fn();
    const { getByLabelText, getByText, queryByText } = render(
      <ProductCard onFavoritePress={onFavoritePress} onPress={onPress} product={product} />,
    );

    fireEvent.press(getByLabelText('Open ZARA Pleated Chiffon Midi Dress'));
    fireEvent.press(getByLabelText('Add Pleated Chiffon Midi Dress to wishlist'));

    expect(getByText('20% OFF')).toBeTruthy();
    expect(getByText('AED 45.00')).toBeTruthy();
    expect(getByText('4.2')).toBeTruthy();
    expect(queryByText('128')).toBeNull();
    expect(onPress).toHaveBeenCalledWith(product);
    expect(onFavoritePress).toHaveBeenCalledWith(product);
  });
});
