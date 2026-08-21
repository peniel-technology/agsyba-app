import { useRouter } from 'expo-router';
import { useCallback } from 'react';
import { Alert, ScrollView } from 'react-native';

import { PageHeader, Screen } from '@/components/layouts';
import { routes } from '@/constants/routes';
import { ReviewForm, type ReviewSubmission } from '@/features/reviews/components/ReviewForm';
import { ReviewProductCard } from '@/features/reviews/components/ReviewProductCard';

export function ReviewScreen() {
  const router = useRouter();

  const handleBackPress = useCallback(() => {
    router.replace(routes.ordersReturns);
  }, [router]);

  const handleSubmit = useCallback((submission: ReviewSubmission) => {
    Alert.alert(
      'Review Submitted',
      `Thanks for rating this product ${submission.overallRating}/5. Your review is awaiting moderation.`,
    );
  }, []);

  return (
    <Screen includeBottomInset={false} padded={false}>
      <PageHeader onBackPress={handleBackPress} title="Rate & Review" />
      <ScrollView
        className="flex-1 bg-surface"
        contentContainerClassName="gap-6 p-4 pb-10"
        keyboardShouldPersistTaps="handled"
      >
        <ReviewProductCard />
        <ReviewForm onSubmit={handleSubmit} />
      </ScrollView>
    </Screen>
  );
}
