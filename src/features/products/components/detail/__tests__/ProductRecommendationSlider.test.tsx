import { fireEvent, render } from '@testing-library/react-native';

import { ProductRecommendationSlider } from '@/features/products/components/detail/ProductRecommendationSlider';
import type { ProductPreview } from '@/types/product';

jest.mock('expo-image', () => ({ Image: 'ExpoImage' }));
jest.mock('lucide-react-native', () => ({
  Heart: 'Heart',
  ShoppingBag: 'ShoppingBag',
  Star: 'Star',
}));

const products: readonly ProductPreview[] = [
  {
    bestPrice: { amount: 108, currency: 'AED' },
    brand: 'CLARKS',
    deliveryLabel: 'Delivery by Aug 01',
    discountPercentage: 20,
    id: 'classic-loafers',
    image: 1,
    imageAccessibilityLabel: 'Brown classic loafers',
    imageFit: 'contain',
    isFavorite: false,
    name: 'Classic Leather Loafers',
    price: { amount: 135, currency: 'AED' },
    rating: 4.6,
    reviewCount: 18,
  },
  {
    bestPrice: { amount: 76, currency: 'AED' },
    brand: 'SANDRO',
    deliveryLabel: 'Delivery by Aug 02',
    discountPercentage: 20,
    id: 'summer-pants',
    image: 2,
    imageAccessibilityLabel: 'Tailored summer pants',
    imageFit: 'cover',
    isFavorite: false,
    name: 'Tailored Summer Pants',
    price: { amount: 95, currency: 'AED' },
    rating: 4.2,
    reviewCount: 9,
  },
];

describe('ProductRecommendationSlider', () => {
  it('supports product, bag, wishlist, and view-all actions', () => {
    const onAddToCartPress = jest.fn();
    const onProductPress = jest.fn();
    const onViewAllPress = jest.fn();
    const { getByLabelText } = render(
      <ProductRecommendationSlider
        onAddToCartPress={onAddToCartPress}
        onProductPress={onProductPress}
        onViewAllPress={onViewAllPress}
        products={products}
        title="You May Also Like"
      />,
    );

    fireEvent.press(getByLabelText('Open CLARKS Classic Leather Loafers'));
    fireEvent.press(getByLabelText('Add Classic Leather Loafers to cart'));
    fireEvent.press(getByLabelText('Add Classic Leather Loafers to wishlist'));
    fireEvent.press(getByLabelText('View all You May Also Like'));

    expect(onProductPress).toHaveBeenCalledWith(products[0]);
    expect(onAddToCartPress).toHaveBeenCalledWith(products[0]);
    expect(getByLabelText('Remove Classic Leather Loafers from wishlist')).toBeTruthy();
    expect(onViewAllPress).toHaveBeenCalledTimes(1);
  });

  it('does not render an empty recommendation section', () => {
    const { queryByText } = render(
      <ProductRecommendationSlider
        onAddToCartPress={jest.fn()}
        onProductPress={jest.fn()}
        onViewAllPress={jest.fn()}
        products={[]}
        title="Recently Viewed"
      />,
    );

    expect(queryByText('Recently Viewed')).toBeNull();
  });
});
