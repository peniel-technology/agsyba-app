import { CalendarSync, Check, Package, type LucideIcon } from 'lucide-react-native';
import { Pressable, View } from 'react-native';

import { Text } from '@/components/ui/Text';
import {
  returnActionOptions,
  type ReturnAction,
} from '@/features/orders/constants/returnExchangeData';
import { colors, iconSizes, iconStrokeWidths } from '@/theme';

interface ReturnActionCardsProps {
  onChange: (value: ReturnAction) => void;
  value: ReturnAction;
}

const actionDescriptions: Record<ReturnAction, string> = {
  exchange: 'Exchange for different size or color',
  refund: 'Refund to payment method within 5-7 days',
};

const actionIcons: Record<ReturnAction, LucideIcon> = {
  exchange: CalendarSync,
  refund: Package,
};

export function ReturnActionCards({ onChange, value }: ReturnActionCardsProps) {
  return (
    <View className="flex-row gap-3">
      {returnActionOptions.map((option) => {
        const isSelected = option.value === value;
        const ActionIcon = actionIcons[option.value];

        return (
          <Pressable
            accessibilityLabel={`Select ${option.label}`}
            accessibilityRole="radio"
            accessibilityState={{ checked: isSelected }}
            className={`min-w-0 flex-1 gap-1.5 rounded-lg border p-3.5 active:opacity-70 ${
              isSelected ? 'border-order-action bg-sale-surface' : 'border-border bg-surface'
            }`}
            key={option.value}
            onPress={() => onChange(option.value)}
          >
            <View className="flex-row items-center justify-between gap-2">
              <View className="flex-row items-center gap-2">
                <ActionIcon
                  color={isSelected ? colors.orderAction : colors.neutral500}
                  size={iconSizes.large}
                  strokeWidth={iconStrokeWidths.standard}
                />
                <Text className="font-manrope-bold" variant="label">
                  {option.label}
                </Text>
              </View>
              {isSelected ? (
                <View className="size-5 items-center justify-center rounded-full bg-order-action">
                  <Check
                    accessible={false}
                    color={colors.brandForeground}
                    size={iconSizes.tiny}
                    strokeWidth={iconStrokeWidths.emphasized}
                  />
                </View>
              ) : null}
            </View>
            <Text className="leading-4" tone="muted" variant="caption">
              {actionDescriptions[option.value]}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
