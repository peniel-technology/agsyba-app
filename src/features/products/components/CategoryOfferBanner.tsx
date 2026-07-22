import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, StyleSheet, View } from 'react-native';

import { Text } from '@/components/ui/Text';
import { gradients } from '@/theme';

interface CategoryOfferBannerProps {
  onPress?: () => void;
}

export function CategoryOfferBanner({ onPress }: CategoryOfferBannerProps) {
  return (
    <View className="px-4">
      <View className="overflow-hidden rounded-lg">
        <LinearGradient
          colors={gradients.categoryOffer}
          end={{ x: 1, y: 0 }}
          start={{ x: 0, y: 0 }}
          style={StyleSheet.absoluteFillObject}
        />
        <View className="items-start gap-4 p-6">
          <View className="items-start gap-1">
            <Text
              className="text-xs font-manrope-extrabold uppercase opacity-90"
              tone="brandForeground"
              variant="captionStrong"
            >
              Special Offer
            </Text>
            <Text className="leading-10" tone="brandForeground" variant="display">
              Up to 50% Off
            </Text>
            <Text className="opacity-80" tone="brandForeground" variant="caption">
              On selected fashion &amp; footwear categories
            </Text>
          </View>

          <Pressable
            accessibilityLabel="Shop the special offer"
            accessibilityRole={onPress ? 'button' : undefined}
            accessibilityState={{ disabled: !onPress }}
            className="min-h-10 justify-center rounded-3xl bg-surface px-5 py-2.5 active:opacity-70"
            disabled={!onPress}
            onPress={onPress}
          >
            <Text tone="brand" variant="label">
              Shop Now
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
