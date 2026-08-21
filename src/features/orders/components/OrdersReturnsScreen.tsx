import { useRouter } from 'expo-router';
import { useCallback, useMemo, useState } from 'react';
import { ScrollView, View } from 'react-native';

import { Screen } from '@/components/layouts';
import { routes } from '@/constants/routes';
import { useProductBagNavigation } from '@/hooks/useProductBagNavigation';
import { OrderItemCard } from '@/features/orders/components/OrderItemCard';
import { OrdersEmptyState } from '@/features/orders/components/OrdersEmptyState';
import { OrdersReturnsHeader } from '@/features/orders/components/OrdersReturnsHeader';
import {
  OrdersStatusTabs,
  type OrderStatusFilter,
} from '@/features/orders/components/OrdersStatusTabs';
import { OrderSummaryCard } from '@/features/orders/components/OrderSummaryCard';
import { OrderTotalsCard } from '@/features/orders/components/OrderTotalsCard';
import {
  ordersReturnsData,
  type OrderItem,
  type OrderItemAction,
} from '@/features/orders/constants/ordersReturnsData';
import { useCartStore } from '@/stores/useCartStore';
import { formatCurrency } from '@/utils/formatCurrency';

export function OrdersReturnsScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<OrderStatusFilter>('all');
  const addItem = useCartStore((state) => state.addItem);
  const cartItemCount = useCartStore((state) => state.itemCount);
  const { openBag } = useProductBagNavigation();
  const orderTotal = useMemo(() => formatCurrency(ordersReturnsData.total), []);
  const visibleItems = useMemo(
    () =>
      activeTab === 'all'
        ? ordersReturnsData.items
        : ordersReturnsData.items.filter((item) => item.status === activeTab),
    [activeTab],
  );
  const hasVisibleOrders = visibleItems.length > 0;

  const handleBackPress = useCallback(() => {
    router.replace(routes.profile);
  }, [router]);

  const handleTrackPress = useCallback(() => {
    router.push(routes.trackOrder);
  }, [router]);

  const openSearch = useCallback(() => {
    router.push({ params: { returnTo: routes.ordersReturns }, pathname: routes.search });
  }, [router]);

  const openNotifications = useCallback(() => {
    router.push({ params: { returnTo: routes.ordersReturns }, pathname: routes.notifications });
  }, [router]);

  const openStartShopping = useCallback(() => {
    router.push(routes.category);
  }, [router]);

  const openNewArrivals = useCallback(() => {
    router.push(routes.home);
  }, [router]);

  const handleActionPress = useCallback(
    (action: OrderItemAction, item: OrderItem) => {
      if (action === 'buy-again') {
        addItem(item.product);
        router.push(routes.shoppingBag);
        return;
      }

      if (action === 'track') {
        router.push(routes.trackOrder);
        return;
      }

      if (action === 'return') {
        router.push(routes.returnExchange);
        return;
      }

      router.push(routes.rateReview);
    },
    [addItem, router],
  );

  return (
    <Screen includeBottomInset={false} padded={false}>
      <OrdersReturnsHeader
        cartItemCount={cartItemCount}
        onBackPress={handleBackPress}
        onCartPress={openBag}
        onNotificationsPress={openNotifications}
        onSearchPress={openSearch}
      />
      <OrdersStatusTabs activeTab={activeTab} onTabChange={setActiveTab} />
      <ScrollView
        className="flex-1 bg-background"
        contentContainerClassName={hasVisibleOrders ? 'gap-4 p-4 pb-8' : 'pb-8'}
        keyboardShouldPersistTaps="handled"
      >
        {hasVisibleOrders ? (
          <>
            <OrderSummaryCard
              itemCount={activeTab === 'all' ? ordersReturnsData.itemCount : visibleItems.length}
              onTrackPress={handleTrackPress}
              orderDate={ordersReturnsData.orderDate}
              orderNumber={ordersReturnsData.orderNumber}
              shippingMethod={ordersReturnsData.shippingMethod}
              total={orderTotal}
            />

            <View className="gap-3">
              {visibleItems.map((item) => (
                <OrderItemCard item={item} key={item.id} onActionPress={handleActionPress} />
              ))}
            </View>

            {activeTab === 'all' ? (
              <OrderTotalsCard
                discount={ordersReturnsData.discount}
                itemCount={ordersReturnsData.itemCount}
                paymentDetail={ordersReturnsData.paymentDetail}
                shippingDetail={ordersReturnsData.shippingDetail}
                subtotal={ordersReturnsData.subtotal}
                taxDetail={ordersReturnsData.taxDetail}
                total={ordersReturnsData.total}
              />
            ) : null}
          </>
        ) : (
          <OrdersEmptyState
            onBrowseNewArrivalsPress={openNewArrivals}
            onStartShoppingPress={openStartShopping}
          />
        )}
      </ScrollView>
    </Screen>
  );
}
