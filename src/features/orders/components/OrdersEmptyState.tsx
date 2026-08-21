import { CreditCard, FileText, RefreshCw, Truck, type LucideIcon } from 'lucide-react-native';
import { Pressable, View } from 'react-native';

import { Text } from '@/components/ui/Text';
import { colors, iconSizes, iconStrokeWidths } from '@/theme';

interface OrdersEmptyStateProps {
  onBrowseNewArrivalsPress: () => void;
  onStartShoppingPress: () => void;
}

const benefits: readonly { icon: LucideIcon; label: string }[] = [
  { icon: Truck, label: 'Free Shipping on AED 200+' },
  { icon: RefreshCw, label: 'Easy 30-Day Returns' },
  { icon: CreditCard, label: '100% Secure Payments' },
];

export function OrdersEmptyState({
  onBrowseNewArrivalsPress,
  onStartShoppingPress,
}: OrdersEmptyStateProps) {
  return (
    <View className="bg-surface">
      <View className="items-center gap-7 px-6 pb-10 pt-10">
        <View
          accessibilityLabel="No orders"
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
            No Orders Yet
          </Text>
          <Text className="self-stretch text-center text-sm leading-5" tone="muted" variant="body">
            You haven&apos;t placed any orders yet. Start browsing and your orders will appear here.
          </Text>
        </View>

        <View className="h-0.5 w-10 bg-order-action" />

        <View className="items-center gap-4 self-stretch">
          <Pressable
            accessibilityLabel="Start shopping"
            accessibilityRole="button"
            className="self-stretch items-center justify-center rounded-sm bg-order-action px-6 py-3.5 active:opacity-80"
            onPress={onStartShoppingPress}
          >
            <Text className="font-manrope-bold uppercase" tone="brandForeground" variant="label">
              Start Shopping
            </Text>
          </Pressable>

          <Pressable
            accessibilityLabel="Browse new arrivals"
            accessibilityRole="button"
            className="rounded-sm px-2 py-1 active:opacity-70"
            onPress={onBrowseNewArrivalsPress}
          >
            <Text className="font-manrope-semibold" tone="orderAction" variant="label">
              Browse New Arrivals →
            </Text>
          </Pressable>
        </View>
      </View>

      <View className="gap-4 px-6 pb-10">
        {benefits.map(({ icon: BenefitIcon, label }) => (
          <View
            className="flex-row items-center gap-3 rounded-lg bg-subtle-surface p-3.5"
            key={label}
          >
            <BenefitIcon
              accessible={false}
              color={colors.orderAction}
              size={iconSizes.medium}
              strokeWidth={iconStrokeWidths.subtle}
            />
            <Text className="flex-1" variant="label">
              {label}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}
