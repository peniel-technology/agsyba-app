import { useLocalSearchParams, useRouter } from 'expo-router';
import { useCallback } from 'react';
import { ScrollView } from 'react-native';

import { PageHeader, Screen } from '@/components/layouts';
import { routes } from '@/constants/routes';
import { ReturnExchangeReviewForm } from '@/features/orders/components/ReturnExchangeReviewForm';
import { ReturnExchangeProgress } from '@/features/orders/components/ReturnExchangeProgress';
import { ReturnProductSummary } from '@/features/orders/components/ReturnProductSummary';
import { ReturnRefundDetails } from '@/features/orders/components/ReturnRefundDetails';
import { ReturnReviewRequestCard } from '@/features/orders/components/ReturnReviewRequestCard';
import { returnExchangeReviewData } from '@/features/orders/constants/returnExchangeReviewData';

function getParam(value: string | string[] | undefined): string {
  return Array.isArray(value) ? (value[0] ?? '') : (value ?? '');
}

function getMethodLabel(method: string): string {
  if (method === 'drop-store') {
    return 'Drop at Store';
  }
  if (method === 'self-ship') {
    return 'Self Ship';
  }
  return 'Home Pickup';
}

function getTimeSlotLabel(timeSlot: string): string {
  if (timeSlot === '9am-12pm') {
    return '9AM - 12PM';
  }
  if (timeSlot === '3pm-6pm') {
    return '3PM - 6PM';
  }
  return '12PM - 3PM';
}

function getDateLabel(date: string): string {
  return date === '22 May 2024'
    ? 'Wednesday, 22 May 2024'
    : date || returnExchangeReviewData.pickupDate;
}

export function ReturnExchangeReviewScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const method = getParam(params.method);
  const pickupDate = getDateLabel(getParam(params.pickupDate));
  const pickupTime = getTimeSlotLabel(getParam(params.pickupTimeSlot));

  const handleBackPress = useCallback(() => {
    router.replace(routes.returnExchangeMethod);
  }, [router]);

  const handleSubmit = useCallback(() => {
    router.push(routes.returnExchangeSuccess);
  }, [router]);

  return (
    <Screen includeBottomInset={false} padded={false}>
      <PageHeader onBackPress={handleBackPress} title="Return / Exchange" />
      <ReturnExchangeProgress activeStep={2} />
      <ScrollView
        className="flex-1 bg-surface"
        contentContainerClassName="gap-5 px-4 pb-10 pt-4"
        keyboardShouldPersistTaps="handled"
      >
        <ReturnProductSummary />
        <ReturnReviewRequestCard
          pickupAddress={returnExchangeReviewData.pickupAddress}
          pickupDate={pickupDate}
          pickupMethod={getMethodLabel(method)}
          pickupTime={pickupTime}
        />
        <ReturnRefundDetails />
        <ReturnExchangeReviewForm onBack={handleBackPress} onSubmit={handleSubmit} />
      </ScrollView>
    </Screen>
  );
}
