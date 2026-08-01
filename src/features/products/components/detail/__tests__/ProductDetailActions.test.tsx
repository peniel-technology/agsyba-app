import { fireEvent, render } from '@testing-library/react-native';

import { ProductDetailActions } from '@/features/products/components/detail/ProductDetailActions';

jest.mock('lucide-react-native', () => ({ Heart: 'Heart', ShoppingBag: 'ShoppingBag' }));

describe('ProductDetailActions', () => {
  it('invokes add-to-bag and wishlist actions', () => {
    const onAddToBagPress = jest.fn();
    const onGoToBagPress = jest.fn();
    const onWishlistPress = jest.fn();
    const { getByLabelText } = render(
      <ProductDetailActions
        isFavorite={false}
        isInBag={false}
        onAddToBagPress={onAddToBagPress}
        onGoToBagPress={onGoToBagPress}
        onWishlistPress={onWishlistPress}
      />,
    );

    fireEvent.press(getByLabelText('Add product to bag'));
    fireEvent.press(getByLabelText('Add product to wishlist'));

    expect(onAddToBagPress).toHaveBeenCalledTimes(1);
    expect(onWishlistPress).toHaveBeenCalledTimes(1);
  });

  it('opens the bag when the product is already added', () => {
    const onGoToBagPress = jest.fn();
    const { getByLabelText, getByText } = render(
      <ProductDetailActions
        isFavorite={false}
        isInBag
        onAddToBagPress={jest.fn()}
        onGoToBagPress={onGoToBagPress}
        onWishlistPress={jest.fn()}
      />,
    );

    fireEvent.press(getByLabelText('Go to shopping bag'));

    expect(getByText('Go to Bag')).toBeTruthy();
    expect(onGoToBagPress).toHaveBeenCalledTimes(1);
  });
});
