import { fireEvent, render, waitFor } from '@testing-library/react-native';

import { SidebarDrawer } from '@/components/layouts/SidebarDrawer';

jest.mock('expo-image', () => ({ Image: 'ExpoImage' }));
jest.mock('lucide-react-native', () => ({
  Baby: 'Baby',
  Bell: 'Bell',
  ChevronDown: 'ChevronDown',
  ChevronRight: 'ChevronRight',
  CircleDollarSign: 'CircleDollarSign',
  CircleHelp: 'CircleHelp',
  Footprints: 'Footprints',
  Globe2: 'Globe2',
  Heart: 'Heart',
  Info: 'Info',
  LogOut: 'LogOut',
  Mail: 'Mail',
  MapPin: 'MapPin',
  Package: 'Package',
  Search: 'Search',
  Tag: 'Tag',
  TrendingUp: 'TrendingUp',
  User: 'User',
  X: 'X',
  Zap: 'Zap',
}));

describe('SidebarDrawer', () => {
  it('renders the complete menu and invokes drawer actions', async () => {
    const onClose = jest.fn();
    const onItemPress = jest.fn();
    const onLoginPress = jest.fn();
    const onPromotionPress = jest.fn();
    const onSearchSubmit = jest.fn();
    const { getAllByLabelText, getByLabelText, getByText } = render(
      <SidebarDrawer
        isOpen
        onClose={onClose}
        onItemPress={onItemPress}
        onLoginPress={onLoginPress}
        onPromotionPress={onPromotionPress}
        onSearchSubmit={onSearchSubmit}
      />,
    );

    fireEvent.press(getByLabelText('Men'));
    fireEvent.press(getByLabelText('Login or sign up'));
    fireEvent.changeText(getByLabelText('Search products and categories'), '  dresses  ');
    fireEvent(getByLabelText('Search products and categories'), 'submitEditing');
    fireEvent.press(getByLabelText('Shop special offer'));
    fireEvent.press(getAllByLabelText('Close navigation menu')[1]);

    expect(getByLabelText('Navigation menu')).toBeTruthy();
    expect(getByLabelText('Cream handbag included in the special offer')).toHaveStyle({
      height: 90,
      width: 100,
    });
    expect(getByText('UP TO 50% OFF')).toBeTruthy();
    expect(onItemPress).toHaveBeenCalledWith('men');
    expect(onLoginPress).toHaveBeenCalledTimes(1);
    await waitFor(() => expect(onSearchSubmit).toHaveBeenCalledWith('dresses'));
    expect(onPromotionPress).toHaveBeenCalledTimes(1);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('keeps search editable when no submit callback is provided', () => {
    const { getByLabelText } = render(<SidebarDrawer isOpen onClose={jest.fn()} />);

    expect(getByLabelText('Wishlist')).toBeDisabled();
    expect(getByLabelText('Search products and categories')).not.toBeDisabled();
  });
});
