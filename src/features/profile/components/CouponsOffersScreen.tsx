import { useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { ScrollView, View } from 'react-native';

import { PageHeader, Screen } from '@/components/layouts';
import { ThemedModal } from '@/components/modals/ThemedModal';
import { Text } from '@/components/ui/Text';
import { routes } from '@/constants/routes';
import { CouponCodeEntry } from '@/features/profile/components/CouponCodeEntry';
import { ExpiredCouponCard } from '@/features/profile/components/ExpiredCouponCard';
import { CouponOfferCard } from '@/features/profile/components/CouponOfferCard';
import {
  availableCoupons,
  expiredCoupons,
  type CouponOffer,
} from '@/features/profile/constants/couponData';
import { useThemedModal } from '@/hooks/useThemedModal';

export function CouponsOffersScreen() {
  const router = useRouter();
  const { modalProps, openModal } = useThemedModal();
  const [couponCode, setCouponCode] = useState('');

  const handleBackPress = useCallback(() => {
    router.replace(routes.profile);
  }, [router]);

  const handleApply = useCallback(() => {
    const normalizedCode = couponCode.trim().toUpperCase();
    const coupon = availableCoupons.find((offer) => offer.code === normalizedCode);

    if (!coupon) {
      openModal({
        message: 'Enter a valid available coupon code.',
        title: 'Invalid coupon',
        tone: 'error',
      });
      return;
    }

    openModal({
      message: `${coupon.code} is ready to use at checkout.`,
      title: 'Coupon applied',
      tone: 'success',
    });
  }, [couponCode, openModal]);

  const handleCopyPress = useCallback((code: string) => {
    setCouponCode(code);
  }, []);

  const handleTermsPress = useCallback(
    (offer: CouponOffer) => {
      openModal({
        message: offer.description,
        title: `${offer.code} terms`,
        tone: 'info',
      });
    },
    [openModal],
  );

  return (
    <Screen includeBottomInset={false} padded={false}>
      <PageHeader onBackPress={handleBackPress} title="Coupons & Offers" />
      <ScrollView
        className="flex-1 bg-surface"
        contentContainerClassName="pb-10"
        keyboardShouldPersistTaps="handled"
      >
        <CouponCodeEntry onApply={handleApply} onChange={setCouponCode} value={couponCode} />

        <View className="h-px bg-subtle-border" />

        <View className="gap-4 p-5">
          <View className="flex-row items-center gap-2">
            <Text variant="label">Available Coupons</Text>
            <Text tone="muted" variant="captionMedium">
              {availableCoupons.length} coupons
            </Text>
          </View>
          {availableCoupons.map((offer) => (
            <CouponOfferCard
              key={offer.code}
              offer={offer}
              onCopyPress={handleCopyPress}
              onTermsPress={handleTermsPress}
            />
          ))}
        </View>

        <View className="h-px bg-subtle-border" />

        <View className="gap-4 p-5">
          <Text tone="muted" variant="label">
            Expired Coupons
          </Text>
          {expiredCoupons.map((offer) => (
            <ExpiredCouponCard key={offer.code} offer={offer} onCopyPress={handleCopyPress} />
          ))}
        </View>
      </ScrollView>
      <ThemedModal {...modalProps} />
    </Screen>
  );
}
