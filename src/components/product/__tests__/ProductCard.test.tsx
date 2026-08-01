import { fireEvent, render } from '@testing-library/react-native';

import { ProductCard } from '@/components/product/ProductCard';
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

describe('ProductCard', () => {
  it('renders product details and invokes product actions', () => {
    const onFavoritePress = jest.fn();
    const onAddToCartPress = jest.fn();
    const onPress = jest.fn();
    const { getByLabelText, getByText, queryByText } = render(
      <ProductCard
        onAddToCartPress={onAddToCartPress}
        onFavoritePress={onFavoritePress}
        onPress={onPress}
        product={product}
      />,
    );

    fireEvent.press(getByLabelText('Open ZARA Pleated Chiffon Midi Dress'));
    fireEvent.press(getByLabelText('Add Pleated Chiffon Midi Dress to bag'));
    fireEvent.press(getByLabelText('Add Pleated Chiffon Midi Dress to wishlist'));

    expect(getByText('Add to Bag')).toBeTruthy();
    expect(getByText('20% OFF')).toBeTruthy();
    expect(getByText('AED 45.00')).toBeTruthy();
    expect(getByText('4.2')).toBeTruthy();
    expect(queryByText('128')).toBeNull();
    expect(onPress).toHaveBeenCalledWith(product);
    expect(onAddToCartPress).toHaveBeenCalledWith(product);
    expect(onFavoritePress).toHaveBeenCalledWith(product);
  });

  it('omits offer details when a product is not discounted', () => {
    const fullPriceProduct: ProductPreview = {
      ...product,
      bestPrice: product.price,
      discountPercentage: 0,
    };
    const { queryByText } = render(<ProductCard product={fullPriceProduct} />);

    expect(queryByText('0% OFF')).toBeNull();
    expect(queryByText(/Best Price/)).toBeNull();
  });

  it('shows a go-to-bag action when the product is already in the bag', () => {
    const onGoToBagPress = jest.fn();
    const { getByLabelText, getByText } = render(
      <ProductCard isInBag onGoToBagPress={onGoToBagPress} product={product} />,
    );

    fireEvent.press(getByLabelText(`Go to shopping bag for ${product.name}`));

    expect(getByText('Go to Bag')).toBeTruthy();
    expect(onGoToBagPress).toHaveBeenCalledTimes(1);
  });
});
