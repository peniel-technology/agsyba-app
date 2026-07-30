import { fireEvent, render } from '@testing-library/react-native';

import { ProductDetailActions } from '@/features/products/components/detail/ProductDetailActions';

jest.mock('lucide-react-native', () => ({ Heart: 'Heart', ShoppingBag: 'ShoppingBag' }));

describe('ProductDetailActions', () => {
  it('invokes add-to-bag and wishlist actions', () => {
    const onAddToBagPress = jest.fn();
    const onWishlistPress = jest.fn();
    const { getByLabelText } = render(
      <ProductDetailActions
        isFavorite={false}
        onAddToBagPress={onAddToBagPress}
        onWishlistPress={onWishlistPress}
      />,
    );

    fireEvent.press(getByLabelText('Add product to bag'));
    fireEvent.press(getByLabelText('Add product to wishlist'));

    expect(onAddToBagPress).toHaveBeenCalledTimes(1);
    expect(onWishlistPress).toHaveBeenCalledTimes(1);
  });
});
