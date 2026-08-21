import { useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { Alert, ScrollView, View } from 'react-native';

import { PageHeader, Screen } from '@/components/layouts';
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

export function CouponsOffersScreen() {
  const router = useRouter();
  const [couponCode, setCouponCode] = useState('');

  const handleBackPress = useCallback(() => {
    router.replace(routes.profile);
  }, [router]);

  const handleApply = useCallback(() => {
    const normalizedCode = couponCode.trim().toUpperCase();
    const coupon = availableCoupons.find((offer) => offer.code === normalizedCode);

    if (!coupon) {
      Alert.alert('Invalid Coupon', 'Enter a valid available coupon code.');
      return;
    }

    Alert.alert('Coupon Applied', `${coupon.code} is ready to use at checkout.`);
  }, [couponCode]);

  const handleCopyPress = useCallback((code: string) => {
    setCouponCode(code);
  }, []);

  const handleTermsPress = useCallback((offer: CouponOffer) => {
    Alert.alert(`${offer.code} Terms`, offer.description);
  }, []);

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
    </Screen>
  );
}
