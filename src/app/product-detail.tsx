import { useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { Alert, ScrollView, Share, View } from 'react-native';

import { CollectionPageHeader, Screen } from '@/components/layouts';
import { ProductSearchModal } from '@/components/modals/ProductSearchModal';
import { routes } from '@/constants/routes';
import { homeSearchProducts } from '@/features/home/constants/homeSearchProducts';
import { ProductBestOffers } from '@/features/products/components/detail/ProductBestOffers';
import { ProductBreadcrumbs } from '@/features/products/components/detail/ProductBreadcrumbs';
import { ProductColorSelector } from '@/features/products/components/detail/ProductColorSelector';
import { ProductDetailActions } from '@/features/products/components/detail/ProductDetailActions';
import { ProductDetailSummary } from '@/features/products/components/detail/ProductDetailSummary';
import { ProductDeliveryServices } from '@/features/products/components/detail/ProductDeliveryServices';
import { ProductEstimatedDelivery } from '@/features/products/components/detail/ProductEstimatedDelivery';
import { ProductImageGallery } from '@/features/products/components/detail/ProductImageGallery';
import { ProductQuantitySelector } from '@/features/products/components/detail/ProductQuantitySelector';
import { ProductRecommendationSlider } from '@/features/products/components/detail/ProductRecommendationSlider';
import { ProductRatingsReviews } from '@/features/products/components/detail/ProductRatingsReviews';
import { ProductSellerInfo } from '@/features/products/components/detail/ProductSellerInfo';
import { ProductSizeSelector } from '@/features/products/components/detail/ProductSizeSelector';
import { ProductSpecifications } from '@/features/products/components/detail/ProductSpecifications';
import {
  blushFloralWrapMidiDress,
  blushFloralWrapMidiDressPreview,
} from '@/features/products/constants/blushFloralWrapMidiDress';
import {
  recentlyViewedProducts,
  youMayAlsoLikeProducts,
} from '@/features/products/constants/productDetailRecommendations';
import { useCartStore } from '@/stores/useCartStore';
import type { ProductPreview } from '@/types/product';

const productSearchProducts = [
  blushFloralWrapMidiDressPreview,
  ...homeSearchProducts,
] satisfies readonly ProductPreview[];

export default function ProductDetailScreen() {
  const router = useRouter();
  const addCartItem = useCartStore((state) => state.addItem);
  const cartItemCount = useCartStore((state) => state.itemCount);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedColorId, setSelectedColorId] = useState('beige');
  const [selectedSize, setSelectedSize] = useState('M');
  const closeSearch = useCallback(() => {
    setIsSearchVisible(false);
  }, []);
  const openSearch = useCallback(() => {
    setIsSearchVisible(true);
  }, []);
  const handleBackPress = useCallback(() => {
    router.back();
  }, [router]);
  const toggleFavorite = useCallback(() => {
    setIsFavorite((currentValue) => !currentValue);
  }, []);
  const shareProduct = useCallback(async () => {
    try {
      await Share.share({
        message: `${blushFloralWrapMidiDress.name} — AED ${blushFloralWrapMidiDress.price.amount.toFixed(2)}`,
        title: blushFloralWrapMidiDress.name,
      });
    } catch {
      Alert.alert('Unable to Share', 'Please try sharing this product again.');
    }
  }, []);
  const addToBag = useCallback(() => {
    addCartItem(blushFloralWrapMidiDressPreview, quantity);
  }, [addCartItem, quantity]);
  const openBag = useCallback(() => {
    Alert.alert('Shopping Bag', `${cartItemCount} items in your bag.`);
  }, [cartItemCount]);
  const openSizeGuide = useCallback(() => {
    Alert.alert('Size Guide', 'XS: 6 · S: 8 · M: 10 · L: 12 · XL: 14');
  }, []);
  const openSellerInfo = useCallback(() => {
    Alert.alert(
      blushFloralWrapMidiDress.seller.name,
      `Seller rating: ${blushFloralWrapMidiDress.seller.rating.toFixed(1)} out of 5.`,
    );
  }, []);
  const addRecommendedProductToCart = useCallback(
    (product: ProductPreview) => {
      addCartItem(product);
    },
    [addCartItem],
  );
  const openRecommendedProduct = useCallback(() => {
    router.push(routes.productDetail);
  }, [router]);
  const viewAllRecommendations = useCallback(() => {
    Alert.alert('You May Also Like', `${youMayAlsoLikeProducts.length} products available.`);
  }, []);
  const viewAllRecentlyViewed = useCallback(() => {
    Alert.alert('Recently Viewed', `${recentlyViewedProducts.length} products available.`);
  }, []);

  return (
    <Screen includeBottomInset={false} padded={false}>
      <CollectionPageHeader
        cartItemCount={cartItemCount}
        onBackPress={handleBackPress}
        onCartPress={openBag}
        onSearchPress={openSearch}
        title="Footwear"
      />

      <ScrollView
        className="flex-1 bg-surface"
        contentContainerClassName="pb-10"
        keyboardShouldPersistTaps="handled"
      >
        <ProductImageGallery
          images={blushFloralWrapMidiDress.images}
          isFavorite={isFavorite}
          onFavoritePress={toggleFavorite}
          onSharePress={shareProduct}
        />

        <View className="gap-8 pt-4">
          <ProductBreadcrumbs productName={blushFloralWrapMidiDress.name} />
          <ProductDetailSummary product={blushFloralWrapMidiDress} />
          <ProductColorSelector
            colors={blushFloralWrapMidiDress.colors}
            onColorChange={setSelectedColorId}
            selectedColorId={selectedColorId}
          />
          <ProductSizeSelector
            onSizeChange={setSelectedSize}
            onSizeGuidePress={openSizeGuide}
            selectedSize={selectedSize}
            sizes={blushFloralWrapMidiDress.sizes}
          />
          <ProductQuantitySelector onQuantityChange={setQuantity} quantity={quantity} />
          <ProductDetailActions
            isFavorite={isFavorite}
            onAddToBagPress={addToBag}
            onWishlistPress={toggleFavorite}
          />
          <ProductBestOffers offers={blushFloralWrapMidiDress.offers} />
          <ProductDeliveryServices services={blushFloralWrapMidiDress.services} />
          <ProductSpecifications specifications={blushFloralWrapMidiDress.specifications} />
          <ProductEstimatedDelivery
            deliveryWindow={blushFloralWrapMidiDress.estimatedDelivery}
            shippingLabel={blushFloralWrapMidiDress.freeShippingLabel}
          />
          <ProductRatingsReviews
            reviews={blushFloralWrapMidiDress.reviews}
            summary={blushFloralWrapMidiDress.ratingSummary}
          />
          <ProductSellerInfo
            onViewStorePress={openSellerInfo}
            seller={blushFloralWrapMidiDress.seller}
          />
          <ProductRecommendationSlider
            onAddToCartPress={addRecommendedProductToCart}
            onProductPress={openRecommendedProduct}
            onViewAllPress={viewAllRecommendations}
            products={youMayAlsoLikeProducts}
            title="You May Also Like"
          />
          <ProductRecommendationSlider
            onAddToCartPress={addRecommendedProductToCart}
            onProductPress={openRecommendedProduct}
            onViewAllPress={viewAllRecentlyViewed}
            products={recentlyViewedProducts}
            title="Recently Viewed"
          />
        </View>
      </ScrollView>

      <ProductSearchModal
        isVisible={isSearchVisible}
        onAddToCartPress={addCartItem}
        onClose={closeSearch}
        onProductPress={closeSearch}
        products={productSearchProducts}
      />
    </Screen>
  );
}
