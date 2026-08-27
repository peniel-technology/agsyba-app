import { useCallback, useMemo } from 'react';
import { ScrollView, View } from 'react-native';
import { type Href, useRouter } from 'expo-router';

import { Screen } from '@/components/layouts';
import { DeliveryCard } from '@/components/order-success/DeliveryCard';
import { DeliveryTimeline } from '@/components/order-success/DeliveryTimeline';
import { NeedHelpCard } from '@/components/order-success/NeedHelpCard';
import { OrderActions } from '@/components/order-success/OrderActions';
import { OrderInfoCard } from '@/components/order-success/OrderInfoCard';
import { OrderSuccessHeader } from '@/components/order-success/OrderSuccessHeader';
import { PurchasedItemsCard } from '@/components/order-success/PurchasedItemsCard';
import { SuccessBadge } from '@/components/order-success/SuccessBadge';
import { SuccessMessage } from '@/components/order-success/SuccessMessage';
import { routes } from '@/constants/routes';
import { orderSuccessData } from '@/data/orderSuccess';
import { useCartStore } from '@/stores/useCartStore';
import { formatCurrency } from '@/utils/formatCurrency';

export default function OrderSuccessScreen() {
  const router = useRouter();
  const itemCount = useCartStore((state) => state.itemCount);
  const totalPaid = useMemo(() => formatCurrency(orderSuccessData.totalPaid), []);
  const supportLinks = useMemo(
    () =>
      orderSuccessData.supportLinks.map((link) => ({
        ...link,
      })),
    [],
  );

  const handleBackPress = useCallback(() => {
    if (router.canGoBack()) {
      router.back();
      return;
    }

    router.replace(routes.shoppingBag);
  }, [router]);

  const handleTrackOrderPress = useCallback(() => {
    router.push(routes.shoppingBag);
  }, [router]);

  const handleContinueShoppingPress = useCallback(() => {
    router.push(routes.home);
  }, [router]);

  const handleSupportLinkPress = useCallback(
    (label: string) => {
      const link = supportLinks.find((item) => item.label === label);

      if (!link) {
        return;
      }

      router.push(link.href as Href);
    },
    [router, supportLinks],
  );

  return (
    <Screen includeBottomInset={false} padded={false}>
      <OrderSuccessHeader itemCount={itemCount} onBackPress={handleBackPress} />
      <ScrollView className="bg-background" contentContainerClassName="gap-6 bg-background p-6">
        <View className="items-center gap-6">
          <SuccessBadge />
          <SuccessMessage
            subtitle={orderSuccessData.successMessage}
            title={orderSuccessData.successTitle}
          />
        </View>
        <OrderInfoCard
          orderDate={orderSuccessData.orderDate}
          orderNumber={orderSuccessData.orderNumber}
          status={orderSuccessData.paymentStatus}
        />
        <DeliveryCard
          addressLine={orderSuccessData.shippingAddress.line}
          customerName={orderSuccessData.shippingAddress.name}
          deliveryDate={orderSuccessData.expectedDelivery}
          shippingMethod={orderSuccessData.shippingMethod}
        />
        <PurchasedItemsCard amount={totalPaid} items={orderSuccessData.items} />
        <DeliveryTimeline steps={orderSuccessData.timeline} />
        <OrderActions
          onContinueShoppingPress={handleContinueShoppingPress}
          onTrackOrderPress={handleTrackOrderPress}
          primaryLabel={orderSuccessData.ctaPrimary}
          secondaryLabel={orderSuccessData.ctaSecondary}
        />
        <NeedHelpCard links={supportLinks} onLinkPress={handleSupportLinkPress} />
      </ScrollView>
    </Screen>
  );
}
