import {
  CalendarDays,
  Check,
  Clock,
  Copy,
  WalletCards,
  type LucideIcon,
} from 'lucide-react-native';
import { Pressable, View } from 'react-native';

import { Text } from '@/components/ui/Text';
import { returnExchangeSuccessData } from '@/features/orders/constants/returnExchangeSuccessData';
import { colors, iconSizes, iconStrokeWidths } from '@/theme';

interface ReturnSuccessOverviewProps {
  onCopyPress: () => void;
}

export function ReturnSuccessOverview({ onCopyPress }: ReturnSuccessOverviewProps) {
  return (
    <View className="gap-7 px-2 pt-8">
      <View className="items-center gap-3">
        <View className="size-16 items-center justify-center rounded-full bg-order-delivered">
          <View className="size-8 items-center justify-center rounded-full border-4 border-white">
            <Check
              accessible={false}
              color={colors.brandForeground}
              size={iconSizes.large}
              strokeWidth={iconStrokeWidths.emphasized}
            />
          </View>
        </View>
        <Text className="text-center" variant="promotionalTitle">
          Return Request Submitted!
        </Text>
        <Text className="max-w-80 text-center" tone="muted" variant="body">
          Your return request has been confirmed. You will receive a confirmation email shortly.
        </Text>
      </View>

      <Pressable
        accessibilityLabel={`Copy return ID ${returnExchangeSuccessData.returnId}`}
        accessibilityRole="button"
        className="flex-row items-center justify-center gap-3 rounded-lg border border-border bg-subtle-surface p-3 active:opacity-70"
        onPress={onCopyPress}
      >
        <Text tone="muted" variant="body">
          Return ID
        </Text>
        <Text tone="orderAction" variant="bodyStrong">
          {returnExchangeSuccessData.returnId}
        </Text>
        <Copy
          accessible={false}
          color={colors.orderAction}
          size={iconSizes.compact}
          strokeWidth={iconStrokeWidths.emphasized}
        />
      </Pressable>

      <View className="flex-row items-center rounded-lg bg-subtle-surface p-4">
        <ReturnMetric
          icon={CalendarDays}
          label="Pickup Date"
          value={returnExchangeSuccessData.pickupDate}
        />
        <View className="h-8 w-px bg-border" />
        <ReturnMetric icon={Clock} label="Time Slot" value={returnExchangeSuccessData.pickupTime} />
        <View className="h-8 w-px bg-border" />
        <ReturnMetric
          icon={WalletCards}
          label="Est. Refund"
          tone="orderAction"
          value={returnExchangeSuccessData.estimatedRefund}
        />
      </View>
    </View>
  );
}

interface ReturnMetricProps {
  icon: LucideIcon;
  label: string;
  tone?: 'default' | 'orderAction';
  value: string;
}

function ReturnMetric({ icon: Icon, label, tone = 'default', value }: ReturnMetricProps) {
  return (
    <View className="min-w-0 flex-1 items-center gap-1">
      <Icon
        accessible={false}
        color={colors.muted}
        size={iconSizes.medium}
        strokeWidth={iconStrokeWidths.emphasized}
      />
      <Text className="text-center" tone="muted" variant="caption">
        {label}
      </Text>
      <Text className="text-center" tone={tone} variant="captionStrong">
        {value}
      </Text>
    </View>
  );
}
