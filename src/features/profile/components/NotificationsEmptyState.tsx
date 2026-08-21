import { FileText } from 'lucide-react-native';
import { Pressable, View } from 'react-native';

import { Text } from '@/components/ui/Text';
import { colors, iconSizes, iconStrokeWidths } from '@/theme';

interface NotificationsEmptyStateProps {
  onExploreOffersPress: () => void;
  onViewOrdersPress: () => void;
}

export function NotificationsEmptyState({
  onExploreOffersPress,
  onViewOrdersPress,
}: NotificationsEmptyStateProps) {
  return (
    <View className="items-center gap-7 bg-surface px-6 pb-10 pt-10">
      <View
        accessibilityLabel="No notifications"
        accessibilityRole="image"
        className="size-24 items-center justify-center rounded-full bg-subtle-surface"
      >
        <FileText
          accessible={false}
          color={colors.neutral400}
          size={iconSizes.emptyState}
          strokeWidth={iconStrokeWidths.standard}
        />
      </View>

      <View className="items-center gap-3 self-stretch">
        <Text className="self-stretch text-center" variant="promotionalTitle">
          No Notifications Yet
        </Text>
        <Text className="self-stretch text-center text-sm leading-5" tone="muted" variant="body">
          We&apos;ll notify you about your order updates, exclusive offers, and important alerts.
          Stay tuned!
        </Text>
      </View>

      <View className="h-0.5 w-10 bg-order-action" />

      <View className="items-center gap-4 self-stretch">
        <Pressable
          accessibilityLabel="Explore offers"
          accessibilityRole="button"
          className="self-stretch items-center justify-center rounded-sm bg-order-action px-6 py-3.5 active:opacity-80"
          onPress={onExploreOffersPress}
        >
          <Text className="font-manrope-bold uppercase" tone="brandForeground" variant="label">
            Explore Offers
          </Text>
        </Pressable>

        <Pressable
          accessibilityLabel="View my orders"
          accessibilityRole="button"
          className="rounded-sm px-2 py-1 active:opacity-70"
          onPress={onViewOrdersPress}
        >
          <Text className="font-manrope-semibold" tone="orderAction" variant="label">
            View My Orders →
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
