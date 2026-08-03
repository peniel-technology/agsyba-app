import type { ReactNode } from 'react';
import { ChevronLeft, ShoppingBag } from 'lucide-react-native';
import { Pressable, View } from 'react-native';

import { Text } from '@/components/ui/Text';
import { colors, iconSizes, iconStrokeWidths, spacing } from '@/theme';

interface CheckoutHeaderProps {
  itemCount: number;
  onBackPress: () => void;
  rightActions?: ReactNode;
  title: string;
}

function formatItemCount(count: number): string {
  return count > 99 ? '99+' : count.toString();
}

export function CheckoutHeader({
  itemCount,
  onBackPress,
  rightActions,
  title,
}: CheckoutHeaderProps) {
  const visibleItemCount = Math.max(0, itemCount);
  const bagAccessibilityLabel =
    visibleItemCount > 0 ? `Shopping bag, ${visibleItemCount} items` : 'Shopping bag, empty';

  return (
    <View
      accessibilityRole="header"
      className="h-14 flex-row items-center justify-between border-b border-subtle-border bg-surface px-2"
    >
      <Pressable
        accessibilityLabel="Go back"
        accessibilityRole="button"
        className="size-10 items-center justify-center rounded-full active:bg-subtle-surface"
        hitSlop={spacing[1]}
        onPress={onBackPress}
      >
        <ChevronLeft
          color={colors.text}
          size={iconSizes.large}
          strokeWidth={iconStrokeWidths.emphasized}
        />
      </Pressable>

      <View pointerEvents="none" className="absolute inset-x-14 items-center justify-center">
        <Text className="text-sm" numberOfLines={1} variant="bodyStrong">
          {title}
        </Text>
      </View>

      <View className="flex-row items-center">
        {rightActions}
        <View
          accessibilityLabel={bagAccessibilityLabel}
          className="relative size-10 items-center justify-center"
        >
          <ShoppingBag
            color={colors.text}
            size={iconSizes.medium}
            strokeWidth={iconStrokeWidths.regular}
          />
          {visibleItemCount > 0 ? (
            <View className="absolute right-0 top-0 min-w-4 items-center justify-center rounded-full bg-brand px-1">
              <Text
                className="text-center leading-4"
                tone="brandForeground"
                variant="captionMedium"
              >
                {formatItemCount(visibleItemCount)}
              </Text>
            </View>
          ) : null}
        </View>
      </View>
    </View>
  );
}
