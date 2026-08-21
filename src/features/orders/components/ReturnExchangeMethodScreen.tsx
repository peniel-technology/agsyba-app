import { useRouter } from 'expo-router';
import { useCallback } from 'react';
import { ScrollView } from 'react-native';

import { PageHeader, Screen } from '@/components/layouts';
import { routes } from '@/constants/routes';
import { ReturnExchangeMethodForm } from '@/features/orders/components/ReturnExchangeMethodForm';
import { ReturnExchangeProgress } from '@/features/orders/components/ReturnExchangeProgress';
import { ReturnProductSummary } from '@/features/orders/components/ReturnProductSummary';
import type { ReturnExchangeMethodValues } from '@/features/orders/schemas/returnExchangeMethodSchema';

export function ReturnExchangeMethodScreen() {
  const router = useRouter();

  const handleBackPress = useCallback(() => {
    router.replace(routes.returnExchange);
  }, [router]);

  const handleConfirm = useCallback(
    (values: ReturnExchangeMethodValues) => {
      router.push({
        params: values,
        pathname: routes.returnExchangeReview,
      });
    },
    [router],
  );

  return (
    <Screen includeBottomInset={false} padded={false}>
      <PageHeader onBackPress={handleBackPress} title="Return / Exchange" />
      <ReturnExchangeProgress activeStep={1} />
      <ScrollView
        className="flex-1 bg-surface"
        contentContainerClassName="gap-5 px-4 pb-10 pt-4"
        keyboardShouldPersistTaps="handled"
      >
        <ReturnProductSummary />
        <ReturnExchangeMethodForm onBack={handleBackPress} onConfirm={handleConfirm} />
      </ScrollView>
    </Screen>
  );
}
