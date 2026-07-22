import { ChevronRight, Zap } from 'lucide-react-native';
import { Fragment } from 'react';
import { Pressable, View } from 'react-native';

import { Text } from '@/components/ui/Text';
import type { FlashSaleContent, FlashSaleCountdown } from '@/features/home/types/flashSale';
import { colors, iconSizes, iconStrokeWidths } from '@/theme';

type CountdownUnitKey = keyof FlashSaleCountdown;

interface CountdownUnit {
  key: CountdownUnitKey;
  label: string;
}

const countdownUnits = [
  { key: 'days', label: 'days' },
  { key: 'hours', label: 'hrs' },
  { key: 'minutes', label: 'mins' },
  { key: 'seconds', label: 'secs' },
] as const satisfies readonly CountdownUnit[];

function formatCountdownValue(value: number): string {
  const normalizedValue = Number.isFinite(value) ? Math.max(0, Math.floor(value)) : 0;
  return normalizedValue.toString().padStart(2, '0');
}

interface FlashSaleBannerProps {
  onPress?: () => void;
  sale: FlashSaleContent;
}

export function FlashSaleBanner({ onPress, sale }: FlashSaleBannerProps) {
  return (
    <Pressable
      accessibilityLabel={`${sale.eyebrow}: ${sale.title}`}
      accessibilityRole={onPress ? 'button' : undefined}
      accessibilityState={{ disabled: !onPress }}
      className="h-20 w-full flex-row items-center overflow-hidden bg-sale-surface px-4 active:opacity-80"
      disabled={!onPress}
      onPress={onPress}
    >
      <View className="min-w-0 flex-1 flex-row items-center gap-2">
        <View className="size-10 items-center justify-center rounded-full bg-sale-badge">
          <Zap
            accessible={false}
            color={colors.sale}
            fill={colors.sale}
            size={iconSizes.compact}
            strokeWidth={iconStrokeWidths.regular}
          />
        </View>

        <View className="min-w-0 flex-1 gap-px">
          <Text numberOfLines={1} tone="sale" variant="overline">
            {sale.eyebrow}
          </Text>
          <Text numberOfLines={1} variant="bodyStrong">
            {sale.title}
          </Text>
          <Text numberOfLines={1} tone="muted" variant="captionMedium">
            {sale.description}
          </Text>
        </View>
      </View>

      <View className="mx-2 h-11 w-px bg-sale-divider" />

      <View className="flex-row items-center gap-2">
        <View className="flex-row items-center gap-0.5">
          {countdownUnits.map((unit, index) => (
            <Fragment key={unit.key}>
              {index > 0 ? (
                <Text className="self-start pt-0.5" tone="sale" variant="title">
                  :
                </Text>
              ) : null}

              <View className="items-center gap-px">
                <Text className="leading-7" tone="sale" variant="title">
                  {formatCountdownValue(sale.countdown[unit.key])}
                </Text>
                <Text tone="muted" variant="microStrong">
                  {unit.label}
                </Text>
              </View>
            </Fragment>
          ))}
        </View>

        <ChevronRight
          accessible={false}
          color={colors.sale}
          size={iconSizes.small}
          strokeWidth={iconStrokeWidths.subtle}
        />
      </View>
    </Pressable>
  );
}
