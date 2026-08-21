import { CircleOff } from 'lucide-react-native';
import { Pressable, StyleSheet, View } from 'react-native';

import { Text } from '@/components/ui/Text';
import type { CouponOffer } from '@/features/profile/constants/couponData';
import { colors, iconSizes, iconStrokeWidths } from '@/theme';

interface ExpiredCouponCardProps {
  onCopyPress: (code: string) => void;
  offer: CouponOffer;
}

const styles = StyleSheet.create({
  copyButton: {
    borderRadius: 4,
  },
});

export function ExpiredCouponCard({ onCopyPress, offer }: ExpiredCouponCardProps) {
  return (
    <View className="gap-3 rounded-lg border border-subtle-border bg-subtle-surface p-4 opacity-60">
      <View className="flex-row items-center justify-between gap-3">
        <View className="flex-row items-center gap-1.5">
          <CircleOff
            color={colors.muted}
            size={iconSizes.compact}
            strokeWidth={iconStrokeWidths.regular}
          />
          <Text className="font-manrope-bold line-through" tone="muted" variant="label">
            {offer.code}
          </Text>
        </View>
        <Pressable
          accessibilityLabel={`Copy ${offer.code} coupon code`}
          accessibilityRole="button"
          accessibilityState={{ disabled: true }}
          className="px-3.5 py-2"
          disabled
          onPress={() => onCopyPress(offer.code)}
          style={styles.copyButton}
        >
          <Text tone="muted" variant="captionStrong">
            Copy Code
          </Text>
        </Pressable>
      </View>
      <Text tone="muted" variant="captionMedium">
        {offer.description}
      </Text>
      <Text tone="orderAction" variant="captionStrong">
        Expired: {offer.validUntil}
      </Text>
    </View>
  );
}
