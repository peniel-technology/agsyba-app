import type { BottomTabBarProps as NavigationBottomTabBarProps } from '@react-navigation/bottom-tabs';

import { BottomTabBar, type BottomTabId } from '@/components/layouts/BottomTabBar';

const enabledTabs = ['home', 'category'] as const satisfies readonly BottomTabId[];

const routeNames = {
  category: 'category',
  home: 'index',
} as const;

function getActiveTab(routeName: string): BottomTabId {
  return routeName === routeNames.category ? 'category' : 'home';
}

export function AppTabBar({ navigation, state }: NavigationBottomTabBarProps) {
  const activeRoute = state.routes[state.index];
  const activeTab = getActiveTab(activeRoute?.name ?? routeNames.home);
  const handleTabPress = (tab: BottomTabId) => {
    if (tab !== 'home' && tab !== 'category') {
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
