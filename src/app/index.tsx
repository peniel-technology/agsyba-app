import { useRouter } from 'expo-router';
import { useCallback } from 'react';
import { ScrollView, View } from 'react-native';

import { ThemedModal } from '@/components/modals/ThemedModal';
import { Screen, SidebarDrawer, TopNavbar } from '@/components/layouts';
import { ProductGrid } from '@/components/product/ProductGrid';
import { ProductSlider } from '@/components/product/ProductSlider';
import { routes } from '@/constants/routes';
import { FlashSaleBanner } from '@/features/home/components/FlashSaleBanner';
import { HeroCarousel } from '@/features/home/components/HeroCarousel';
import { PromotionalBanner } from '@/features/home/components/PromotionalBanner';
import { SaleBanner } from '@/features/home/components/SaleBanner';
import { ShopByCategory } from '@/features/home/components/ShopByCategory';
import { ShoppingBenefits } from '@/features/home/components/ShoppingBenefits';
import { ShopByStyle } from '@/features/home/components/ShopByStyle';
import { allCollections } from '@/features/home/constants/allCollections';
import { flashSale } from '@/features/home/constants/flashSale';
import { heroSlides } from '@/features/home/constants/heroSlides';
import { mostPopularProducts } from '@/features/home/constants/mostPopularProducts';
import { newArrivals } from '@/features/home/constants/newArrivals';
import { promotionBanner } from '@/features/home/constants/promotionBanner';
import { salePromotionBanner } from '@/features/home/constants/salePromotionBanner';
import { shopCategories } from '@/features/home/constants/shopCategories';
import { shoppingBenefits } from '@/features/home/constants/shoppingBenefits';
import { styleCategories } from '@/features/home/constants/styleCategories';
import { trendingFootwear } from '@/features/home/constants/trendingFootwear';
import { useProductBagNavigation } from '@/hooks/useProductBagNavigation';
import { useWishlist } from '@/features/wishlist/hooks/useWishlist';
import { useLogout } from '@/features/auth/hooks/useLogout';
import { useThemedModal } from '@/hooks/useThemedModal';
import { useCurrentCustomer } from '@/queries/useCurrentCustomer';
import { useCartStore } from '@/stores/useCartStore';
import { useUiStore } from '@/stores/useUiStore';
import type { DrawerItemId } from '@/types/drawer';

export default function HomeScreen() {
  const router = useRouter();
  const closeDrawer = useUiStore((state) => state.closeDrawer);
  const addCartItem = useCartStore((state) => state.addItem);
  const cartItemCount = useCartStore((state) => state.itemCount);
  const isDrawerOpen = useUiStore((state) => state.isDrawerOpen);
  const openDrawer = useUiStore((state) => state.openDrawer);
  const { bagProductIds, openBag } = useProductBagNavigation();
  const { data: customer } = useCurrentCustomer();
  const { productIds: wishlistProductIds, toggleItem: toggleWishlistItem } = useWishlist();
  const { modalProps, openModal } = useThemedModal();
  const confirmLogout = useLogout(openModal);
  const openAccount = useCallback(() => {
    closeDrawer();
    router.replace(customer ? routes.profile : routes.login);
  }, [closeDrawer, customer, router]);
  const openSearch = useCallback(() => {
    router.push({ params: { returnTo: routes.home }, pathname: routes.search });
  }, [router]);
  const openNotifications = useCallback(() => {
    router.push({ params: { returnTo: routes.home }, pathname: routes.notifications });
  }, [router]);
  const openProductDetail = useCallback(() => {
    router.push(routes.productDetail);
  }, [router]);
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
          params: { returnTo: routes.home },
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
        onCartPress={openBag}
        onMenuPress={openDrawer}
        onNotificationsPress={openNotifications}
        onSearchPress={openSearch}
      />
      <ScrollView className="flex-1" contentContainerClassName="py-4">
        <HeroCarousel slides={heroSlides} />
        <View className="mt-4">
          <ShoppingBenefits benefits={shoppingBenefits} />
        </View>
        <View className="mt-8">
          <ShopByCategory categories={shopCategories} />
        </View>
        <View className="mt-6">
          <FlashSaleBanner sale={flashSale} />
        </View>
        <View className="mt-8">
          <ProductSlider
            bagProductIds={bagProductIds}
            onAddToCartPress={addCartItem}
            onFavoritePress={toggleWishlistItem}
            onGoToBagPress={openBag}
            onProductPress={openProductDetail}
            products={newArrivals}
            title="New Arrivals"
            wishlistProductIds={wishlistProductIds}
          />
        </View>
        <View className="mt-8">
          <ProductSlider
            bagProductIds={bagProductIds}
            onAddToCartPress={addCartItem}
            onFavoritePress={toggleWishlistItem}
            onGoToBagPress={openBag}
            onProductPress={openProductDetail}
            products={mostPopularProducts}
            title="Most Popular Products"
            wishlistProductIds={wishlistProductIds}
          />
        </View>
        <View className="mt-8">
          <PromotionalBanner content={promotionBanner} />
        </View>
        <View className="mt-8">
          <ProductSlider
            bagProductIds={bagProductIds}
            onAddToCartPress={addCartItem}
            onFavoritePress={toggleWishlistItem}
            onGoToBagPress={openBag}
            onProductPress={openProductDetail}
            products={trendingFootwear}
            title="Trending Footwear"
            wishlistProductIds={wishlistProductIds}
          />
        </View>
        <View className="mt-8">
          <ShopByStyle categories={styleCategories} />
        </View>
        <View className="mt-8">
          <ProductGrid
            bagProductIds={bagProductIds}
            onAddToCartPress={addCartItem}
            onFavoritePress={toggleWishlistItem}
            onGoToBagPress={openBag}
            onProductPress={openProductDetail}
            products={allCollections}
            title="All Collections"
            wishlistProductIds={wishlistProductIds}
          />
        </View>
        <View className="mt-8">
          <SaleBanner content={salePromotionBanner} />
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
