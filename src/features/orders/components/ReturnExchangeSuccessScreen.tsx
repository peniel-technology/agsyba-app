import { useRouter } from 'expo-router';
import { useCallback } from 'react';
import { Alert, Pressable, ScrollView, View } from 'react-native';

import { PageHeader, Screen } from '@/components/layouts';
import { Text } from '@/components/ui/Text';
import { routes } from '@/constants/routes';
import { ReturnExchangeProgress } from '@/features/orders/components/ReturnExchangeProgress';
import { ReturnSuccessOverview } from '@/features/orders/components/ReturnSuccessOverview';
import { ReturnSuccessTimeline } from '@/features/orders/components/ReturnSuccessTimeline';
import { returnExchangeSuccessData } from '@/features/orders/constants/returnExchangeSuccessData';

export function ReturnExchangeSuccessScreen() {
  const router = useRouter();

  const handleBackPress = useCallback(() => {
    router.replace(routes.ordersReturns);
  }, [router]);

  const handleCopyPress = useCallback(() => {
    Alert.alert('Return ID', `${returnExchangeSuccessData.returnId} is ready to copy.`);
  }, []);

  const handleTrackPress = useCallback(() => {
    Alert.alert('Track Return Status', 'Return tracking will be available soon.');
  }, []);

  const handleContinueShopping = useCallback(() => {
    router.replace(routes.shop);
  }, [router]);

  return (
    <Screen includeBottomInset={false} padded={false}>
      <PageHeader onBackPress={handleBackPress} title="Return / Exchange" />
      <ReturnExchangeProgress activeStep={3} />
      <ScrollView
        className="flex-1 bg-surface"
        contentContainerClassName="gap-7 px-4 pb-10"
        keyboardShouldPersistTaps="handled"
      >
        <ReturnSuccessOverview onCopyPress={handleCopyPress} />
        <ReturnSuccessTimeline />
        <View className="gap-3 pt-2.5">
          <Pressable
            accessibilityLabel="Track return status"
            accessibilityRole="button"
            className="h-11 items-center justify-center rounded-sm border border-order-action active:bg-sale-surface"
            onPress={handleTrackPress}
          >
            <Text tone="orderAction" variant="label">
              TRACK RETURN STATUS
            </Text>
          </Pressable>
          <Pressable
            accessibilityLabel="Continue shopping"
            accessibilityRole="button"
            className="h-11 items-center justify-center rounded-sm bg-foreground active:opacity-70"
            onPress={handleContinueShopping}
          >
            <Text tone="brandForeground" variant="label">
              CONTINUE SHOPPING
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </Screen>
  );
}
