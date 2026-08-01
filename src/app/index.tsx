import { useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { ScrollView, View } from 'react-native';

import { Screen, SidebarDrawer, TabPageContent, TopNavbar } from '@/components/layouts';
import { ProductSearchModal } from '@/components/modals/ProductSearchModal';
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
import { homeSearchProducts } from '@/features/home/constants/homeSearchProducts';
import { heroSlides } from '@/features/home/constants/heroSlides';
import { mostPopularProducts } from '@/features/home/constants/mostPopularProducts';
import { newArrivals } from '@/features/home/constants/newArrivals';
import { promotionBanner } from '@/features/home/constants/promotionBanner';
import { salePromotionBanner } from '@/features/home/constants/salePromotionBanner';
import { shopCategories } from '@/features/home/constants/shopCategories';
import { shoppingBenefits } from '@/features/home/constants/shoppingBenefits';
import { styleCategories } from '@/features/home/constants/styleCategories';
import { trendingFootwear } from '@/features/home/constants/trendingFootwear';
import { useTabPageLoader } from '@/hooks/useTabPageLoader';
import { useCartStore } from '@/stores/useCartStore';
import { useUiStore } from '@/stores/useUiStore';

export default function HomeScreen() {
  const router = useRouter();
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const closeDrawer = useUiStore((state) => state.closeDrawer);
  const addCartItem = useCartStore((state) => state.addItem);
  const cartItemCount = useCartStore((state) => state.itemCount);
  const isDrawerOpen = useUiStore((state) => state.isDrawerOpen);
  const openDrawer = useUiStore((state) => state.openDrawer);
  const isPageLoading = useTabPageLoader();
  const closeSearch = useCallback(() => {
    setIsSearchVisible(false);
  }, []);
  const openSearch = useCallback(() => {
    setIsSearchVisible(true);
  }, []);
  const openProductDetail = useCallback(() => {
    closeSearch();
    router.push(routes.productDetail);
  }, [closeSearch, router]);
  const openCart = useCallback(() => {
    router.push(routes.shoppingBag);
  }, [router]);

  return (
    <Screen includeBottomInset={false} padded={false}>
      <TopNavbar
        cartItemCount={cartItemCount}
        onCartPress={openCart}
        onMenuPress={openDrawer}
        onSearchPress={openSearch}
      />
      <TabPageContent isLoading={isPageLoading} loadingLabel="Loading home page">
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
              onAddToCartPress={addCartItem}
              onProductPress={openProductDetail}
              products={newArrivals}
              title="New Arrivals"
            />
          </View>
          <View className="mt-8">
            <ProductSlider
              onAddToCartPress={addCartItem}
              onProductPress={openProductDetail}
              products={mostPopularProducts}
              title="Most Popular Products"
            />
          </View>
          <View className="mt-8">
            <PromotionalBanner content={promotionBanner} />
          </View>
          <View className="mt-8">
            <ProductSlider
              onAddToCartPress={addCartItem}
              onProductPress={openProductDetail}
              products={trendingFootwear}
              title="Trending Footwear"
            />
          </View>
          <View className="mt-8">
            <ShopByStyle categories={styleCategories} />
          </View>
          <View className="mt-8">
            <ProductGrid
              onAddToCartPress={addCartItem}
              onProductPress={openProductDetail}
              products={allCollections}
              title="All Collections"
            />
          </View>
          <View className="mt-8">
            <SaleBanner content={salePromotionBanner} />
          </View>
        </ScrollView>
      </TabPageContent>
      <SidebarDrawer isOpen={isDrawerOpen} onClose={closeDrawer} />
      <ProductSearchModal
        isVisible={isSearchVisible}
        onAddToCartPress={addCartItem}
        onClose={closeSearch}
        onProductPress={openProductDetail}
        products={homeSearchProducts}
      />
    </Screen>
  );
}
