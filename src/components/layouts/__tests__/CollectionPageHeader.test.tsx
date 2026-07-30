import { fireEvent, render } from '@testing-library/react-native';

import { CollectionPageHeader } from '@/components/layouts/CollectionPageHeader';

jest.mock('lucide-react-native', () => ({
  ArrowLeft: 'ArrowLeft',
  Search: 'Search',
  ShoppingBag: 'ShoppingBag',
}));

describe('CollectionPageHeader', () => {
  it('renders the title and invokes navigation actions', () => {
    const onBackPress = jest.fn();
    const onSearchPress = jest.fn();
    const { getByLabelText, getByText } = render(
      <CollectionPageHeader
        onBackPress={onBackPress}
        onSearchPress={onSearchPress}
        title="Men's Collection"
      />,
    );

    fireEvent.press(getByLabelText('Go back'));
    fireEvent.press(getByLabelText('Search products'));

    expect(getByText("Men's Collection")).toBeTruthy();
    expect(onBackPress).toHaveBeenCalledTimes(1);
    expect(onSearchPress).toHaveBeenCalledTimes(1);
    expect(getByLabelText('Shopping bag, empty')).toBeDisabled();
  });

  it('renders the cart count and invokes the cart action', () => {
    const onCartPress = jest.fn();
    const { getByLabelText, getByText } = render(
      <CollectionPageHeader
        cartItemCount={3}
        onBackPress={jest.fn()}
        onCartPress={onCartPress}
        onSearchPress={jest.fn()}
        title="Women's Collection"
      />,
    );

    fireEvent.press(getByLabelText('Shopping bag, 3 items'));

    expect(getByText('3')).toBeTruthy();
    expect(onCartPress).toHaveBeenCalledTimes(1);
  });
});
