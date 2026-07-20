import { fireEvent, render } from '@testing-library/react-native';

import { TopNavbar } from '@/components/layouts/TopNavbar';

jest.mock('lucide-react-native', () => ({
  Bell: 'Bell',
  Menu: 'Menu',
  Search: 'Search',
  ShoppingBag: 'ShoppingBag',
}));

describe('TopNavbar', () => {
  it('renders the cart count and invokes navigation actions', () => {
    const onCartPress = jest.fn();
    const onMenuPress = jest.fn();

    const { getByLabelText, getByText } = render(
      <TopNavbar
        cartItemCount={5}
        onCartPress={onCartPress}
        onMenuPress={onMenuPress}
        onNotificationsPress={jest.fn()}
        onSearchPress={jest.fn()}
      />,
    );

    fireEvent.press(getByLabelText('Open menu'));
    fireEvent.press(getByLabelText('Shopping bag, 5 items'));

    expect(getByLabelText('AGSYBA logo')).toBeTruthy();
    expect(getByText('5')).toBeTruthy();
    expect(onMenuPress).toHaveBeenCalledTimes(1);
    expect(onCartPress).toHaveBeenCalledTimes(1);
  });

  it('does not render a badge for an empty cart', () => {
    const { queryByText } = render(
      <TopNavbar
        onCartPress={jest.fn()}
        onMenuPress={jest.fn()}
        onNotificationsPress={jest.fn()}
        onSearchPress={jest.fn()}
      />,
    );

    expect(queryByText('0')).toBeNull();
  });
});
