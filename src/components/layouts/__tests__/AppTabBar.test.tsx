import type { BottomTabBarProps as NavigationBottomTabBarProps } from '@react-navigation/bottom-tabs';
import { fireEvent, render } from '@testing-library/react-native';

import { AppTabBar } from '@/components/layouts/AppTabBar';

const mockUsePathname = jest.fn(() => '/');

jest.mock('expo-router', () => ({
  usePathname: () => mockUsePathname(),
}));
jest.mock('lucide-react-native', () => ({
  Grid3X3: 'Grid3X3',
  Heart: 'Heart',
  Home: 'Home',
  ShoppingBag: 'ShoppingBag',
  UserRound: 'UserRound',
}));

describe('AppTabBar', () => {
  beforeEach(() => {
    mockUsePathname.mockReturnValue('/');
  });

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

  it('keeps the category tab selected on the men’s collection route', () => {
    mockUsePathname.mockReturnValue('/mens-collection');
    const props = {
      descriptors: {},
      insets: { bottom: 0, left: 0, right: 0, top: 0 },
      navigation: { emit: jest.fn(), navigate: jest.fn() },
      state: {
        history: [],
        index: 2,
        key: 'tabs',
        preloadedRouteKeys: [],
        routeNames: ['index', 'category', 'mens-collection'],
        routes: [
          { key: 'index-key', name: 'index', params: undefined },
          { key: 'category-key', name: 'category', params: undefined },
          { key: 'mens-collection-key', name: 'mens-collection', params: undefined },
        ],
        stale: false,
        type: 'tab',
      },
    } as unknown as NavigationBottomTabBarProps;
    const { getByLabelText } = render(<AppTabBar {...props} />);

    expect(getByLabelText('Category tab')).toHaveAccessibilityState({ selected: true });
    expect(getByLabelText('Home tab')).toHaveAccessibilityState({ selected: false });
  });

  it('keeps the category tab selected on the women’s collection route', () => {
    mockUsePathname.mockReturnValue('/womens-collection');
    const props = {
      descriptors: {},
      insets: { bottom: 0, left: 0, right: 0, top: 0 },
      navigation: { emit: jest.fn(), navigate: jest.fn() },
      state: {
        history: [],
        index: 2,
        key: 'tabs',
        preloadedRouteKeys: [],
        routeNames: ['index', 'category', 'womens-collection'],
        routes: [
          { key: 'index-key', name: 'index', params: undefined },
          { key: 'category-key', name: 'category', params: undefined },
          { key: 'womens-collection-key', name: 'womens-collection', params: undefined },
        ],
        stale: false,
        type: 'tab',
      },
    } as unknown as NavigationBottomTabBarProps;
    const { getByLabelText } = render(<AppTabBar {...props} />);

    expect(getByLabelText('Category tab')).toHaveAccessibilityState({ selected: true });
    expect(getByLabelText('Home tab')).toHaveAccessibilityState({ selected: false });
  });

  it("keeps the category tab selected on the kids' collection route", () => {
    mockUsePathname.mockReturnValue('/kids-collection');
    const props = {
      descriptors: {},
      insets: { bottom: 0, left: 0, right: 0, top: 0 },
      navigation: { emit: jest.fn(), navigate: jest.fn() },
      state: {
        history: [],
        index: 2,
        key: 'tabs',
        preloadedRouteKeys: [],
        routeNames: ['index', 'category', 'kids-collection'],
        routes: [
          { key: 'index-key', name: 'index', params: undefined },
          { key: 'category-key', name: 'category', params: undefined },
          { key: 'kids-collection-key', name: 'kids-collection', params: undefined },
        ],
        stale: false,
        type: 'tab',
      },
    } as unknown as NavigationBottomTabBarProps;
    const { getByLabelText } = render(<AppTabBar {...props} />);

    expect(getByLabelText('Category tab')).toHaveAccessibilityState({ selected: true });
    expect(getByLabelText('Home tab')).toHaveAccessibilityState({ selected: false });
  });

  it('keeps the category tab selected on the footwear collection route', () => {
    mockUsePathname.mockReturnValue('/footwear-collection');
    const props = {
      descriptors: {},
      insets: { bottom: 0, left: 0, right: 0, top: 0 },
      navigation: { emit: jest.fn(), navigate: jest.fn() },
      state: {
        history: [],
        index: 2,
        key: 'tabs',
        preloadedRouteKeys: [],
        routeNames: ['index', 'category', 'footwear-collection'],
        routes: [
          { key: 'index-key', name: 'index', params: undefined },
          { key: 'category-key', name: 'category', params: undefined },
          { key: 'footwear-collection-key', name: 'footwear-collection', params: undefined },
        ],
        stale: false,
        type: 'tab',
      },
    } as unknown as NavigationBottomTabBarProps;
    const { getByLabelText } = render(<AppTabBar {...props} />);

    expect(getByLabelText('Category tab')).toHaveAccessibilityState({ selected: true });
    expect(getByLabelText('Home tab')).toHaveAccessibilityState({ selected: false });
  });
});
