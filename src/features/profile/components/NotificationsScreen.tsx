import { useLocalSearchParams, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { ScrollView } from 'react-native';

import { AccountPageHeader, Screen } from '@/components/layouts';
import { routes } from '@/constants/routes';
import { NotificationsCategoryTabs } from '@/features/profile/components/NotificationsCategoryTabs';
import { NotificationsEmptyState } from '@/features/profile/components/NotificationsEmptyState';
import type { NotificationFilter } from '@/features/profile/components/NotificationsCategoryTabs';
import { useProductBagNavigation } from '@/hooks/useProductBagNavigation';
import { useCartStore } from '@/stores/useCartStore';

export function NotificationsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ returnTo?: string | string[] }>();
  const [activeTab, setActiveTab] = useState<NotificationFilter>('all');
  const cartItemCount = useCartStore((state) => state.itemCount);
  const { openBag } = useProductBagNavigation();

  const returnTo = Array.isArray(params.returnTo) ? params.returnTo[0] : params.returnTo;

  const handleBackPress = useCallback(() => {
    if (returnTo === routes.profile) {
      router.replace(routes.profile);
      return;
    }

    if (router.canGoBack()) {
      router.back();
      return;
    }

    router.replace(routes.home);
  }, [returnTo, router]);

  const openSearch = useCallback(() => {
    router.push({ params: { returnTo: routes.notifications }, pathname: routes.search });
  }, [router]);

  const openOffers = useCallback(() => {
    router.push(routes.couponsOffers);
  }, [router]);

  const openOrders = useCallback(() => {
    router.push(routes.ordersReturns);
  }, [router]);

  return (
    <Screen includeBottomInset={false} padded={false}>
      <AccountPageHeader
        cartItemCount={cartItemCount}
        onBackPress={handleBackPress}
        onCartPress={openBag}
        onSearchPress={openSearch}
        title="Notifications"
      />
      <NotificationsCategoryTabs activeTab={activeTab} onTabChange={setActiveTab} />
      <ScrollView
        className="flex-1 bg-surface"
        contentContainerClassName="pb-8"
        keyboardShouldPersistTaps="handled"
      >
        <NotificationsEmptyState onExploreOffersPress={openOffers} onViewOrdersPress={openOrders} />
      </ScrollView>
    </Screen>
  );
}
