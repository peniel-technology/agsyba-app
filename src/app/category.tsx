import { useRouter } from 'expo-router';
import { useCallback } from 'react';
import { ScrollView, View } from 'react-native';

import { ThemedModal } from '@/components/modals/ThemedModal';
import { SearchForm } from '@/components/forms/SearchForm';
import { Screen, SidebarDrawer, TopNavbar } from '@/components/layouts';
import { routes } from '@/constants/routes';
import { BrowseCategories } from '@/features/products/components/BrowseCategories';
import { CategoryOfferBanner } from '@/features/products/components/CategoryOfferBanner';
import { TrendingNow } from '@/features/products/components/TrendingNow';
import { browseCategories } from '@/features/products/constants/browseCategories';
import { trendingCategories } from '@/features/products/constants/trendingCategories';
import { useCategorySearch } from '@/features/products/hooks/useCategorySearch';
import type { BrowseCategory } from '@/features/products/types/browseCategory';
import { useLogout } from '@/features/auth/hooks/useLogout';
import { useThemedModal } from '@/hooks/useThemedModal';
import { useCurrentCustomer } from '@/queries/useCurrentCustomer';
import { useCartStore } from '@/stores/useCartStore';
import { useUiStore } from '@/stores/useUiStore';
import type { DrawerItemId } from '@/types/drawer';

export default function CategoryScreen() {
  const router = useRouter();
  const cartItemCount = useCartStore((state) => state.itemCount);
  const closeDrawer = useUiStore((state) => state.closeDrawer);
  const isDrawerOpen = useUiStore((state) => state.isDrawerOpen);
  const openDrawer = useUiStore((state) => state.openDrawer);
  const { filteredCategories, setQuery } = useCategorySearch(browseCategories);
  const { data: customer } = useCurrentCustomer();
  const { modalProps, openModal } = useThemedModal();
  const confirmLogout = useLogout(openModal);
  const openAccount = useCallback(() => {
    closeDrawer();
    router.replace(customer ? routes.profile : routes.login);
  }, [closeDrawer, customer, router]);
  const openCart = useCallback(() => {
    router.push(routes.shoppingBag);
  }, [router]);
  const openSearch = useCallback(() => {
    router.push({ params: { returnTo: routes.category }, pathname: routes.search });
  }, [router]);
  const openNotifications = useCallback(() => {
    router.push({ params: { returnTo: routes.category }, pathname: routes.notifications });
  }, [router]);
  const handleCategoryPress = useCallback(
    (category: BrowseCategory) => {
      if (category.href) {
        router.push(category.href);
      }
    },
    [router],
  );
  const handleDrawerItemPress = useCallback(
    (itemId: DrawerItemId) => {
      closeDrawer();

      if (itemId === 'about') {
        router.replace(routes.about);
        return;
      }

      if (itemId === 'logout') {
        confirmLogout();
        return;
      }

      if (itemId === 'contact') {
        router.replace(routes.contact);
        return;
      }

      if (itemId === 'wishlist') {
        router.replace(routes.wishlist);
        return;
      }

      if (itemId === 'account') {
        router.replace(routes.profile);
        return;
      }

      if (itemId === 'notifications') {
        router.replace({
          params: { returnTo: routes.category },
          pathname: routes.notifications,
        });
      }
    },
    [closeDrawer, confirmLogout, router],
  );

  return (
    <Screen includeBottomInset={false} padded={false}>
      <TopNavbar
        cartItemCount={cartItemCount}
        onCartPress={openCart}
        onMenuPress={openDrawer}
        onNotificationsPress={openNotifications}
        onSearchPress={openSearch}
      />
      <ScrollView
        className="flex-1"
        contentContainerClassName="py-4"
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps="handled"
      >
        <View className="px-4">
          <SearchForm onQueryChange={setQuery} />
        </View>
        <View className="mt-8">
          <BrowseCategories categories={filteredCategories} onCategoryPress={handleCategoryPress} />
        </View>
        <View className="mt-8">
          <TrendingNow categories={trendingCategories} />
        </View>
        <View className="mt-8">
          <CategoryOfferBanner />
        </View>
      </ScrollView>
      <SidebarDrawer
        customer={customer}
        isOpen={isDrawerOpen}
        onClose={closeDrawer}
        onItemPress={handleDrawerItemPress}
        onLoginPress={openAccount}
      />
      <ThemedModal {...modalProps} />
    </Screen>
  );
}
