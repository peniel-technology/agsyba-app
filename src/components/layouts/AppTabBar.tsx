import type { BottomTabBarProps as NavigationBottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useLocalSearchParams, usePathname } from 'expo-router';

import { BottomTabBar, type BottomTabId } from '@/components/layouts/BottomTabBar';
import { routes } from '@/constants/routes';

const enabledTabs = [
  'home',
  'category',
  'shop',
  'wishlist',
  'account',
] as const satisfies readonly BottomTabId[];

const routeNames = {
  category: 'category',
  home: 'index',
  shop: 'shop',
  wishlist: 'wishlist',
  account: 'profile',
} as const;

function isCategoryPath(pathname: string): boolean {
  return (
    pathname === routes.category ||
    pathname.startsWith(`${routes.category}/`) ||
    pathname === routes.footwearCollection ||
    pathname.startsWith(`${routes.footwearCollection}/`) ||
    pathname === routes.kidsCollection ||
    pathname.startsWith(`${routes.kidsCollection}/`) ||
    pathname === routes.mensCollection ||
    pathname.startsWith(`${routes.mensCollection}/`) ||
    pathname === routes.womensCollection ||
    pathname.startsWith(`${routes.womensCollection}/`)
  );
}

function getSearchTab(returnTo: string | undefined): BottomTabId {
  if (returnTo === routes.home) {
    return 'home';
  }

  if (returnTo === routes.shop || returnTo === routes.shoppingBag) {
    return 'shop';
  }

  if (returnTo === routes.wishlist) {
    return 'wishlist';
  }

  if (
    returnTo === routes.profile ||
    returnTo === routes.ordersReturns ||
    returnTo === routes.notifications ||
    returnTo === routes.savedCards
  ) {
    return 'account';
  }

  return 'category';
}

function getActiveTab(pathname: string, searchReturnTo: string | undefined): BottomTabId {
  if (pathname === routes.search) {
    return getSearchTab(searchReturnTo);
  }

  if (
    pathname === routes.profile ||
    pathname === routes.ordersReturns ||
    pathname === routes.notifications ||
    pathname === routes.trackOrder ||
    pathname === routes.couponsOffers ||
    pathname === routes.rateReview ||
    pathname === routes.returnExchange ||
    pathname === routes.returnExchangeMethod ||
    pathname === routes.returnExchangeReview ||
    pathname === routes.returnExchangeSuccess ||
    pathname === routes.savedCards
  ) {
    return 'account';
  }

  if (pathname === routes.wishlist) {
    return 'wishlist';
  }

  if (
    pathname === routes.shop ||
    pathname === routes.shoppingBag ||
    pathname === routes.deliveryAddress ||
    pathname === routes.payment ||
    pathname === routes.orderSuccess
  ) {
    return 'shop';
  }

  if (isCategoryPath(pathname)) {
    return 'category';
  }

  return 'home';
}

export function AppTabBar({ navigation, state }: NavigationBottomTabBarProps) {
  const pathname = usePathname();
  const params = useLocalSearchParams<{ returnTo?: string | string[] }>();
  const searchReturnTo = Array.isArray(params.returnTo) ? params.returnTo[0] : params.returnTo;

  if (
    pathname === routes.login ||
    pathname === routes.productFilters ||
    pathname === routes.register
  ) {
    return null;
  }

  const activeTab = getActiveTab(pathname, searchReturnTo);
  const handleTabPress = (tab: BottomTabId) => {
    if (
      tab !== 'home' &&
      tab !== 'category' &&
      tab !== 'shop' &&
      tab !== 'wishlist' &&
      tab !== 'account'
    ) {
      return;
    }

    const routeName = routeNames[tab];
    const targetRoute = state.routes.find((route) => route.name === routeName);

    if (!targetRoute) {
      return;
    }

    const event = navigation.emit({
      canPreventDefault: true,
      target: targetRoute.key,
      type: 'tabPress',
    });

    if (!event.defaultPrevented) {
      navigation.navigate(routeName);
    }
  };

  return (
    <BottomTabBar activeTab={activeTab} enabledTabs={enabledTabs} onTabPress={handleTabPress} />
  );
}
