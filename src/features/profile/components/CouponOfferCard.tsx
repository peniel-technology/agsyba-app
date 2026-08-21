import { ChevronRight } from 'lucide-react-native';
import { Pressable, StyleSheet, View } from 'react-native';

import { Text } from '@/components/ui/Text';
import type { CouponOffer } from '@/features/profile/constants/couponData';
import { colors, iconSizes, iconStrokeWidths } from '@/theme';

interface CouponOfferCardProps {
  onCopyPress: (code: string) => void;
  onTermsPress: (coupon: CouponOffer) => void;
  offer: CouponOffer;
}

const styles = StyleSheet.create({
  codeBadge: {
    borderRadius: 4,
  },
  copyButton: {
    borderColor: colors.orderAction,
    borderRadius: 4,
    borderWidth: 1,
  },
});

export function CouponOfferCard({ onCopyPress, onTermsPress, offer }: CouponOfferCardProps) {
  return (
    <View className="gap-3 rounded-lg border border-order-action/30 bg-sale-surface p-4">
      <View className="flex-row items-center justify-between gap-3">
        <View className="bg-order-action/10 px-2.5 py-1" style={styles.codeBadge}>
          <Text className="font-manrope-bold" tone="orderAction" variant="label">
            {offer.code}
          </Text>
        </View>
        <Pressable
          accessibilityLabel={`Copy ${offer.code} coupon code`}
          accessibilityRole="button"
          className="h-7 items-center justify-center px-3.5 active:opacity-70"
          onPress={() => onCopyPress(offer.code)}
          style={styles.copyButton}
        >
          <Text tone="orderAction" variant="captionStrong">
            Copy Code
          </Text>
        </Pressable>
      </View>
      <Text tone="muted" variant="captionMedium">
        {offer.description}
      </Text>
      <View className="flex-row items-center justify-between gap-3">
        <Text className="flex-1" tone="muted" variant="captionMedium">
          Valid till: {offer.validUntil}
        </Text>
        <Pressable
          accessibilityLabel={`View terms and conditions for ${offer.code}`}
          accessibilityRole="button"
          className="flex-row items-center active:opacity-70"
          onPress={() => onTermsPress(offer)}
        >
          <Text tone="primary" variant="captionMedium">
            Terms &amp; Conditions
          </Text>
          <ChevronRight
            color={colors.primary}
            size={iconSizes.small}
            strokeWidth={iconStrokeWidths.regular}
          />
        </Pressable>
      </View>
    </View>
  );
}
