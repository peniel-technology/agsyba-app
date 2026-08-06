import type { BottomTabBarProps as NavigationBottomTabBarProps } from '@react-navigation/bottom-tabs';
import { usePathname } from 'expo-router';

import { BottomTabBar, type BottomTabId } from '@/components/layouts/BottomTabBar';
import { routes } from '@/constants/routes';

const enabledTabs = ['home', 'category', 'shop'] as const satisfies readonly BottomTabId[];

const routeNames = {
  category: 'category',
  home: 'index',
  shop: 'shopping-bag',
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

export function AppTabBar({ navigation, state }: NavigationBottomTabBarProps) {
  const pathname = usePathname();

  if (pathname === routes.productFilters) {
    return null;
  }

  const activeTab: BottomTabId =
    pathname === routes.shoppingBag ||
    pathname === routes.deliveryAddress ||
    pathname === routes.payment ||
    pathname === routes.orderSuccess
      ? 'shop'
      : isCategoryPath(pathname)
        ? 'category'
        : 'home';
  const handleTabPress = (tab: BottomTabId) => {
    if (tab !== 'home' && tab !== 'category' && tab !== 'shop') {
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
