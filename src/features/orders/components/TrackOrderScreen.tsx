import { useRouter } from 'expo-router';
import { useCallback } from 'react';
import { ScrollView } from 'react-native';

import { PageHeader, Screen } from '@/components/layouts';
import { routes } from '@/constants/routes';
import { ShipmentStatusCard } from '@/features/orders/components/ShipmentStatusCard';
import { TrackingAddressCard } from '@/features/orders/components/TrackingAddressCard';
import { TrackingHistoryCard } from '@/features/orders/components/TrackingHistoryCard';
import { TrackingOrderSummaryCard } from '@/features/orders/components/TrackingOrderSummaryCard';
import { TrackingProductCard } from '@/features/orders/components/TrackingProductCard';
import { TrackingSupportSection } from '@/features/orders/components/TrackingSupportSection';
import { trackingData } from '@/features/orders/constants/trackingData';

export function TrackOrderScreen() {
  const router = useRouter();

  const handleBackPress = useCallback(() => {
    router.replace(routes.ordersReturns);
  }, [router]);

  const handleContactPress = useCallback(() => {
    router.push(routes.contact);
  }, [router]);

  return (
    <Screen includeBottomInset={false} padded={false}>
      <PageHeader onBackPress={handleBackPress} title="Track Order" />
      <ScrollView
        className="flex-1 bg-order-background"
        contentContainerClassName="gap-4 px-4 pb-10 pt-5"
        keyboardShouldPersistTaps="handled"
      >
        <TrackingOrderSummaryCard
          estimatedDelivery={trackingData.estimatedDelivery}
          orderNumber={trackingData.orderNumber}
          shipmentType={trackingData.shipmentType}
        />
        <TrackingProductCard
          color={trackingData.productColor}
          product={trackingData.product}
          quantity={trackingData.productQuantity}
          size={trackingData.productSize}
        />
        <ShipmentStatusCard steps={trackingData.steps} />
        <TrackingHistoryCard entries={trackingData.history} />
        <TrackingAddressCard
          address={trackingData.address.line}
          label={trackingData.address.label}
          name={trackingData.address.name}
          phone={trackingData.address.phone}
        />
        <TrackingSupportSection onContactPress={handleContactPress} />
      </ScrollView>
    </Screen>
  );
}
