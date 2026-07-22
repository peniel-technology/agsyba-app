import { fireEvent, render } from '@testing-library/react-native';

import { ProductGrid } from '@/components/product/ProductGrid';
import type { ProductPreview } from '@/types/product';

jest.mock('expo-image', () => ({ Image: 'ExpoImage' }));
jest.mock('lucide-react-native', () => ({ Heart: 'Heart', Star: 'Star' }));

const product: ProductPreview = {
  bestPrice: { amount: 62, currency: 'AED' },
  brand: 'AND',
  deliveryLabel: 'Delivery by Jul 23',
  discountPercentage: 20,
  id: 'and-dress',
  image: 1,
  imageAccessibilityLabel: 'Floral dress',
  isFavorite: false,
  name: 'Floral Georgette Wrap Dress',
  price: { amount: 78, currency: 'AED' },
  rating: 4.2,
  reviewCount: 92,
};

describe('ProductGrid', () => {
  it('renders products and invokes the see more action', () => {
    const onSeeMorePress = jest.fn();
    const { getByLabelText, getByText } = render(
      <ProductGrid onSeeMorePress={onSeeMorePress} products={[product]} title="All Collections" />,
    );

    fireEvent.press(getByLabelText('See More All Collections'));

    expect(getByText('All Collections')).toBeTruthy();
    expect(getByText('Floral Georgette Wrap Dress')).toBeTruthy();
    expect(onSeeMorePress).toHaveBeenCalledTimes(1);
  });

  it('does not render an empty grid', () => {
    const { queryByText } = render(<ProductGrid products={[]} title="All Collections" />);

    expect(queryByText('All Collections')).toBeNull();
  });
});
