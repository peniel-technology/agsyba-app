import { useRouter } from 'expo-router';
import { useCallback } from 'react';
import { ScrollView } from 'react-native';

import { PageHeader, Screen } from '@/components/layouts';
import { routes } from '@/constants/routes';
import { ReturnExchangeForm } from '@/features/orders/components/ReturnExchangeForm';
import { ReturnExchangeProgress } from '@/features/orders/components/ReturnExchangeProgress';
import { ReturnProductSummary } from '@/features/orders/components/ReturnProductSummary';

export function ReturnExchangeScreen() {
  const router = useRouter();

  const handleBackPress = useCallback(() => {
    router.replace(routes.ordersReturns);
  }, [router]);

  const handleSubmit = useCallback(() => {
    router.push(routes.returnExchangeMethod);
  }, [router]);

  return (
    <Screen includeBottomInset={false} padded={false}>
      <PageHeader onBackPress={handleBackPress} title="Return / Exchange" />
      <ReturnExchangeProgress />
      <ScrollView
        className="flex-1 bg-surface"
        contentContainerClassName="gap-5 px-4 pb-10 pt-4"
        keyboardShouldPersistTaps="handled"
      >
        <ReturnProductSummary />
        <ReturnExchangeForm onCancel={handleBackPress} onSubmit={handleSubmit} />
      </ScrollView>
    </Screen>
  );
}
