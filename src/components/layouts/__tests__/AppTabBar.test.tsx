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

  it('keeps the home tab selected on the product detail route', () => {
    mockUsePathname.mockReturnValue('/product-detail');
    const props = {
      descriptors: {},
      insets: { bottom: 0, left: 0, right: 0, top: 0 },
      navigation: { emit: jest.fn(), navigate: jest.fn() },
      state: {
        history: [],
        index: 2,
        key: 'tabs',
        preloadedRouteKeys: [],
        routeNames: ['index', 'category', 'product-detail'],
        routes: [
          { key: 'index-key', name: 'index', params: undefined },
          { key: 'category-key', name: 'category', params: undefined },
          { key: 'product-detail-key', name: 'product-detail', params: undefined },
        ],
        stale: false,
        type: 'tab',
      },
    } as unknown as NavigationBottomTabBarProps;
    const { getByLabelText } = render(<AppTabBar {...props} />);

    expect(getByLabelText('Home tab')).toHaveAccessibilityState({ selected: true });
    expect(getByLabelText('Category tab')).toHaveAccessibilityState({ selected: false });
  });

  it('hides the app tab bar on the product filter route', () => {
    mockUsePathname.mockReturnValue('/product-filters');
    const props = {
      descriptors: {},
      insets: { bottom: 0, left: 0, right: 0, top: 0 },
      navigation: { emit: jest.fn(), navigate: jest.fn() },
      state: {
        history: [],
        index: 2,
        key: 'tabs',
        preloadedRouteKeys: [],
        routeNames: ['index', 'category', 'product-filters'],
        routes: [
          { key: 'index-key', name: 'index', params: undefined },
          { key: 'category-key', name: 'category', params: undefined },
          { key: 'product-filters-key', name: 'product-filters', params: undefined },
        ],
        stale: false,
        type: 'tab',
      },
    } as unknown as NavigationBottomTabBarProps;
    const { queryByLabelText } = render(<AppTabBar {...props} />);

    expect(queryByLabelText('Home tab')).toBeNull();
    expect(queryByLabelText('Category tab')).toBeNull();
  });

  it('selects the shop tab on the shopping bag route', () => {
    mockUsePathname.mockReturnValue('/shopping-bag');
    const props = {
      descriptors: {},
      insets: { bottom: 0, left: 0, right: 0, top: 0 },
      navigation: { emit: jest.fn(), navigate: jest.fn() },
      state: {
        history: [],
        index: 2,
        key: 'tabs',
        preloadedRouteKeys: [],
        routeNames: ['index', 'category', 'shopping-bag'],
        routes: [
          { key: 'index-key', name: 'index', params: undefined },
          { key: 'category-key', name: 'category', params: undefined },
          { key: 'shopping-bag-key', name: 'shopping-bag', params: undefined },
        ],
        stale: false,
        type: 'tab',
      },
    } as unknown as NavigationBottomTabBarProps;
    const { getByLabelText } = render(<AppTabBar {...props} />);

    expect(getByLabelText('Shop tab')).toHaveAccessibilityState({ selected: true });
    expect(getByLabelText('Home tab')).toHaveAccessibilityState({ selected: false });
  });

  it('opens the shopping bag from the shop tab', () => {
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
        routeNames: ['index', 'category', 'shopping-bag'],
        routes: [
          { key: 'index-key', name: 'index', params: undefined },
          { key: 'category-key', name: 'category', params: undefined },
          { key: 'shopping-bag-key', name: 'shopping-bag', params: undefined },
        ],
        stale: false,
        type: 'tab',
      },
    } as unknown as NavigationBottomTabBarProps;
    const { getByLabelText } = render(<AppTabBar {...props} />);

    fireEvent.press(getByLabelText('Shop tab'));

    expect(emit).toHaveBeenCalledWith({
      canPreventDefault: true,
      target: 'shopping-bag-key',
      type: 'tabPress',
    });
    expect(navigate).toHaveBeenCalledWith('shopping-bag');
  });
});
