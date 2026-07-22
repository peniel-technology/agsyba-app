import { Image } from 'expo-image';
import { Pressable, StyleSheet, View } from 'react-native';

import { Text } from '@/components/ui/Text';
import { layout } from '@/theme';

const promotionImage = require('@/assets/images/home/drawer-promo-bag.webp') as number;

interface DrawerPromotionProps {
  onPress?: () => void;
}

export function DrawerPromotion({ onPress }: DrawerPromotionProps) {
  return (
    <View className="border-t border-subtle-border bg-surface p-4">
      <View className="h-28 flex-row items-center justify-between overflow-hidden rounded-lg bg-drawer-promotion px-4 py-2.5">
        <View className="w-36 items-start gap-1">
          <Text className="uppercase opacity-90" tone="brandForeground" variant="microStrong">
            Special Offer
          </Text>
          <Text className="leading-6" tone="brandForeground" variant="sectionHeading">
            Up to 50% Off
          </Text>
          <Text className="opacity-80" tone="brandForeground" variant="badge">
            On selected items only
          </Text>
          <Pressable
            accessibilityLabel="Shop special offer"
            accessibilityRole="button"
            accessibilityState={{ disabled: !onPress }}
            className="min-h-7 items-center justify-center rounded-sm bg-surface px-2.5 active:opacity-80"
            disabled={!onPress}
            onPress={onPress}
          >
            <Text tone="brand" variant="badge">
              Shop Now
            </Text>
          </Pressable>
        </View>
        <Image
          accessibilityLabel="Cream handbag included in the special offer"
          accessible
          className="rounded-sm"
          contentFit="cover"
          source={promotionImage}
          style={styles.image}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    height: layout.drawerPromotionImageHeight,
    width: layout.drawerPromotionImageWidth,
  },
});
