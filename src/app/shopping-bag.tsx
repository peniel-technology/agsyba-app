import { useRouter } from 'expo-router';
import { useCallback, useMemo, useState } from 'react';
import { ScrollView } from 'react-native';

import { AppliedCouponCard } from '@/components/cart/AppliedCouponCard';
import { ApplyCouponCard } from '@/components/cart/ApplyCouponCard';
import { CartRecommendationSlider } from '@/components/cart/CartRecommendationSlider';
import { CartProductItem } from '@/components/cart/CartProductItem';
import { CartCheckoutBar } from '@/components/cart/CartCheckoutBar';
import { CartPriceDetails } from '@/components/cart/CartPriceDetails';
import { CheckoutProgress } from '@/components/cart/CheckoutProgress';
import { FreeShippingProgress } from '@/components/cart/FreeShippingProgress';
import { SelectAllCartItems } from '@/components/cart/SelectAllCartItems';
import { ShoppingBagEmptyState } from '@/components/cart/ShoppingBagEmptyState';
import { ShoppingBagHeader } from '@/components/cart/ShoppingBagHeader';
import { Screen } from '@/components/layouts';
import { ProductSearchModal } from '@/components/modals/ProductSearchModal';
import { cartConfiguration } from '@/constants/cart';
import { routes } from '@/constants/routes';
import { cartRecommendationProducts } from '@/features/checkout/constants/cartRecommendationProducts';
import { homeSearchProducts } from '@/features/home/constants/homeSearchProducts';
import { useCartStore } from '@/stores/useCartStore';
import { useWishlistStore } from '@/stores/useWishlistStore';
import type { Money, ProductPreview } from '@/types/product';

export default function ShoppingBagScreen() {
  const router = useRouter();
  const addItem = useCartStore((state) => state.addItem);
  const addWishlistItem = useWishlistStore((state) => state.addItem);
  const itemCount = useCartStore((state) => state.itemCount);
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const setAllItemsSelected = useCartStore((state) => state.setAllItemsSelected);
  const setItemQuantity = useCartStore((state) => state.setItemQuantity);
  const toggleItemSelection = useCartStore((state) => state.toggleItemSelection);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isCouponApplied, setIsCouponApplied] = useState(true);
  const cartLines = useMemo(() => Object.values(items), [items]);
  const selectedItemCount = useMemo(
    () => cartLines.reduce((count, line) => (line.isSelected ? count + line.quantity : count), 0),
    [cartLines],
  );
  const selectedProductCount = useMemo(
    () => cartLines.reduce((count, line) => count + Number(line.isSelected), 0),
    [cartLines],
  );
  const isAllSelected = selectedProductCount === cartLines.length;
  const isPartiallySelected = selectedProductCount > 0 && !isAllSelected;
  const subtotal = useMemo(
    () =>
      cartLines.reduce(
        (total, line) =>
          line.isSelected ? total + line.product.price.amount * line.quantity : total,
        0,
      ),
    [cartLines],
  );
  const couponSavingsAmount = isCouponApplied
    ? (subtotal * cartConfiguration.couponDiscountPercentage) / 100
    : 0;
  const totalAmount = Math.max(0, subtotal - couponSavingsAmount);
  const priceMoney: Money = {
    amount: subtotal,
    currency: cartConfiguration.freeShippingCurrency,
  };
  const couponSavingsMoney: Money = {
    amount: couponSavingsAmount,
    currency: cartConfiguration.freeShippingCurrency,
  };
  const totalMoney: Money = {
    amount: totalAmount,
    currency: cartConfiguration.freeShippingCurrency,
  };
  const handleBackPress = useCallback(() => {
    if (router.canGoBack()) {
      router.back();
      return;
    }

    router.replace(routes.home);
  }, [router]);
  const closeSearch = useCallback(() => {
    setIsSearchVisible(false);
  }, []);
  const openSearch = useCallback(() => {
    setIsSearchVisible(true);
  }, []);
  const openProduct = useCallback(
    (_product: ProductPreview) => {
      closeSearch();
      router.push(routes.productDetail);
    },
    [closeSearch, router],
  );
  const openCategory = useCallback(() => {
    router.replace(routes.category);
  }, [router]);
  const continueShopping = useCallback(() => {
    router.replace(routes.home);
  }, [router]);
  const moveToWishlist = useCallback(
    (product: ProductPreview) => {
      addWishlistItem(product);
      removeItem(product.id);
    },
    [addWishlistItem, removeItem],
  );
  const toggleAllItems = useCallback(() => {
    setAllItemsSelected(!isAllSelected);
  }, [isAllSelected, setAllItemsSelected]);
  const applyCoupon = useCallback(() => {
    setIsCouponApplied(true);
  }, []);
  const editCoupon = useCallback(() => {
    setIsCouponApplied(false);
  }, []);
  const proceedToCheckout = useCallback(() => {
    router.push(routes.deliveryAddress);
  }, [router]);

  return (
    <Screen includeBottomInset={false} padded={false}>
      <ShoppingBagHeader
        itemCount={itemCount}
        onBackPress={handleBackPress}
        onSearchPress={openSearch}
      />
      {cartLines.length > 0 ? (
        <>
          <CheckoutProgress activeStep="cart" />
          <FreeShippingProgress
            currency={cartConfiguration.freeShippingCurrency}
            subtotal={subtotal}
            threshold={cartConfiguration.freeShippingThreshold}
          />
          <ScrollView className="flex-1 bg-background" contentContainerClassName="gap-3 p-4">
            <SelectAllCartItems
              isAllSelected={isAllSelected}
              isPartiallySelected={isPartiallySelected}
              onSelectionChange={toggleAllItems}
              productCount={cartLines.length}
            />
            {cartLines.map(({ isSelected, product, quantity }) => (
              <CartProductItem
                color={cartConfiguration.defaultItemColor}
                isSelected={isSelected}
                key={product.id}
                onDecreasePress={() => setItemQuantity(product.id, quantity - 1)}
                onIncreasePress={() => setItemQuantity(product.id, quantity + 1)}
                onMoveToWishlistPress={() => moveToWishlist(product)}
                onRemovePress={() => removeItem(product.id)}
                onSelectionChange={() => toggleItemSelection(product.id)}
                product={product}
                quantity={quantity}
                size={cartConfiguration.defaultItemSize}
              />
            ))}
            <ApplyCouponCard onPress={applyCoupon} />
            {isCouponApplied ? (
              <AppliedCouponCard
                code={cartConfiguration.couponCode}
                onEditPress={editCoupon}
                savings={couponSavingsMoney}
              />
            ) : null}
            <CartPriceDetails
              discount={couponSavingsMoney}
              itemCount={selectedItemCount}
              price={priceMoney}
              total={totalMoney}
            />
          </ScrollView>
          <CartCheckoutBar
            disabled={selectedItemCount === 0}
            onCheckoutPress={proceedToCheckout}
            total={totalMoney}
          />
        </>
      ) : (
        <ScrollView className="flex-1 bg-surface" contentContainerClassName="pb-6">
          <ShoppingBagEmptyState
            onContinueShoppingPress={continueShopping}
            onShopNowPress={openCategory}
          />
          <CartRecommendationSlider
            onProductPress={openProduct}
            products={cartRecommendationProducts}
          />
        </ScrollView>
      )}

      <ProductSearchModal
        isVisible={isSearchVisible}
        onAddToCartPress={addItem}
        onClose={closeSearch}
        onProductPress={openProduct}
        products={homeSearchProducts}
      />
    </Screen>
  );
}
