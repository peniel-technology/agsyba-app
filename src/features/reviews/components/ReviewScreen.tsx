import { useRouter } from 'expo-router';
import { useCallback } from 'react';
import { ScrollView } from 'react-native';

import { PageHeader, Screen } from '@/components/layouts';
import { ThemedModal } from '@/components/modals/ThemedModal';
import { routes } from '@/constants/routes';
import { ReviewForm, type ReviewSubmission } from '@/features/reviews/components/ReviewForm';
import { ReviewProductCard } from '@/features/reviews/components/ReviewProductCard';
import { useThemedModal } from '@/hooks/useThemedModal';

export function ReviewScreen() {
  const router = useRouter();
  const { modalProps, openModal } = useThemedModal();

  const handleBackPress = useCallback(() => {
    router.replace(routes.ordersReturns);
  }, [router]);

  const handleSubmit = useCallback(
    (submission: ReviewSubmission) => {
      openModal({
        message: `Thanks for rating this product ${submission.overallRating}/5. Your review is awaiting moderation.`,
        title: 'Review submitted',
        tone: 'success',
      });
    },
    [openModal],
  );

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
      <ThemedModal {...modalProps} />
    </Screen>
  );
}
