import type { BottomTabBarProps as NavigationBottomTabBarProps } from '@react-navigation/bottom-tabs';
import { fireEvent, render } from '@testing-library/react-native';

import { AppTabBar } from '@/components/layouts/AppTabBar';

jest.mock('lucide-react-native', () => ({
  Grid3X3: 'Grid3X3',
  Heart: 'Heart',
  Home: 'Home',
  ShoppingBag: 'ShoppingBag',
  UserRound: 'UserRound',
}));

describe('AppTabBar', () => {
  it('switches to the category tab through the tab navigator', () => {
    const emit = jest.fn(() => ({ defaultPrevented: false }));
    const navigate = jest.fn();
    const props = {
      descriptors: {},
      insets: { bottom: 0, left: 0, right: 0, top: 0 },
      navigation: { emit, navigate },
      state: {
        history: [],
        index: 0,
        key: 'tabs',
        preloadedRouteKeys: [],
        routeNames: ['index', 'category'],
        routes: [
          { key: 'index-key', name: 'index', params: undefined },
          { key: 'category-key', name: 'category', params: undefined },
        ],
        stale: false,
        type: 'tab',
      },
    } as unknown as NavigationBottomTabBarProps;
    const { getByLabelText } = render(<AppTabBar {...props} />);

    fireEvent.press(getByLabelText('Category tab'));

    expect(emit).toHaveBeenCalledWith({
      canPreventDefault: true,
      target: 'category-key',
      type: 'tabPress',
    });
    expect(navigate).toHaveBeenCalledWith('category');
  });
});
