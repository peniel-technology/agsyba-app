import { fireEvent, render } from '@testing-library/react-native';

import { ProductSlider } from '@/components/product/ProductSlider';
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
  price: { amount: 45, currency: 'AED' },
  rating: 4.2,
  reviewCount: 128,
};

describe('ProductSlider', () => {
  it('renders its heading and invokes the see more action', () => {
    const onAddToCartPress = jest.fn();
    const onSeeMorePress = jest.fn();
    const { getByLabelText, getByText } = render(
      <ProductSlider
        onAddToCartPress={onAddToCartPress}
        onSeeMorePress={onSeeMorePress}
        products={[product]}
        title="New Arrivals"
      />,
    );

    fireEvent.press(getByLabelText('Add Pleated Chiffon Midi Dress to cart'));
    fireEvent.press(getByLabelText('See More New Arrivals'));

    expect(getByText('Add to Cart')).toBeTruthy();
    expect(getByText('New Arrivals')).toBeTruthy();
    expect(getByLabelText('New Arrivals products')).toBeTruthy();
    expect(onSeeMorePress).toHaveBeenCalledTimes(1);
    expect(onAddToCartPress).toHaveBeenCalledWith(product);
  });

  it('does not render an empty slider', () => {
    const { queryByText } = render(<ProductSlider products={[]} title="New Arrivals" />);

    expect(queryByText('New Arrivals')).toBeNull();
  });
});
