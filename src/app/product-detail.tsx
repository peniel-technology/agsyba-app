import { useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { Alert, ScrollView, Share, View } from 'react-native';

import { CollectionPageHeader, Screen } from '@/components/layouts';
import { routes } from '@/constants/routes';
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
import { useProductBagNavigation } from '@/hooks/useProductBagNavigation';
import { useCartStore } from '@/stores/useCartStore';
import { useWishlist } from '@/features/wishlist/hooks/useWishlist';
import type { ProductPreview } from '@/types/product';

export default function ProductDetailScreen() {
  const router = useRouter();
  const addCartItem = useCartStore((state) => state.addItem);
  const cartItemCount = useCartStore((state) => state.itemCount);
  const { bagProductIds, openBag } = useProductBagNavigation();
  const { productIds: wishlistProductIds, toggleItem: toggleWishlistItem } = useWishlist();
  const isProductInBag = bagProductIds.has(blushFloralWrapMidiDressPreview.id);
  const isFavorite = wishlistProductIds.has(blushFloralWrapMidiDressPreview.id);
  const [quantity, setQuantity] = useState(1);
  const [selectedColorId, setSelectedColorId] = useState('beige');
  const [selectedSize, setSelectedSize] = useState('M');
  const openSearch = useCallback(() => {
    router.push({ params: { returnTo: routes.productDetail }, pathname: routes.search });
  }, [router]);
  const handleBackPress = useCallback(() => {
    router.back();
  }, [router]);
  const toggleFavorite = useCallback(() => {
    toggleWishlistItem(blushFloralWrapMidiDressPreview);
  }, [toggleWishlistItem]);
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
        title={blushFloralWrapMidiDress.collectionTitle}
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
            isInBag={isProductInBag}
            onAddToBagPress={addToBag}
            onGoToBagPress={openBag}
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
            bagProductIds={bagProductIds}
            onAddToCartPress={addRecommendedProductToCart}
            onFavoritePress={toggleWishlistItem}
            onGoToBagPress={openBag}
            onProductPress={openRecommendedProduct}
            onViewAllPress={viewAllRecommendations}
            products={youMayAlsoLikeProducts}
            title="You May Also Like"
            wishlistProductIds={wishlistProductIds}
          />
          <ProductRecommendationSlider
            bagProductIds={bagProductIds}
            onAddToCartPress={addRecommendedProductToCart}
            onFavoritePress={toggleWishlistItem}
            onGoToBagPress={openBag}
            onProductPress={openRecommendedProduct}
            onViewAllPress={viewAllRecentlyViewed}
            products={recentlyViewedProducts}
            title="Recently Viewed"
            wishlistProductIds={wishlistProductIds}
          />
        </View>
      </ScrollView>
    </Screen>
  );
}
