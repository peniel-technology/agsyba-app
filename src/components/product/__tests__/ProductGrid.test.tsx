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

  it('renders an empty state when no products are available', () => {
    const { getByText } = render(
      <ProductGrid products={[]} showHeader={false} title="All Collections" />,
    );

    expect(getByText('No products found')).toBeTruthy();
    expect(
      getByText(
        'There are no products available in this category. Try selecting another category.',
      ),
    ).toBeTruthy();
  });

  it('supports collection-specific empty-state copy', () => {
    const { getByText } = render(
      <ProductGrid
        emptyDescription="Try clearing your filters."
        emptyTitle="No matching items"
        products={[]}
        showHeader={false}
        title="Filtered Products"
      />,
    );

    expect(getByText('No matching items')).toBeTruthy();
    expect(getByText('Try clearing your filters.')).toBeTruthy();
  });

  it('can render cards without a section header', () => {
    const { getByText, queryByText } = render(
      <ProductGrid products={[product]} showHeader={false} title="Men's Products" />,
    );

    expect(queryByText("Men's Products")).toBeNull();
    expect(getByText('Floral Georgette Wrap Dress')).toBeTruthy();
  });
});
