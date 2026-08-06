import type { ReactNode } from 'react';
import { memo } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react-native';
import { Pressable, View } from 'react-native';

import { colors, iconSizes, iconStrokeWidths } from '@/theme';

interface PaymentAccordionProps {
  children: ReactNode;
  isOpen: boolean;
  left: ReactNode;
  onPress: () => void;
}

export const PaymentAccordion = memo(function PaymentAccordion({
  children,
  isOpen,
  left,
  onPress,
}: PaymentAccordionProps) {
  return (
    <View className="border-b border-border bg-surface px-4 py-3">
      <Pressable
        accessibilityRole="button"
        accessibilityState={{ expanded: isOpen }}
        className="flex-row items-center gap-3"
        onPress={onPress}
      >
        {left}
        {isOpen ? (
          <ChevronDown
            color={colors.text}
            size={iconSizes.small}
            strokeWidth={iconStrokeWidths.subtle}
          />
        ) : (
          <ChevronRight
            color={colors.text}
            size={iconSizes.small}
            strokeWidth={iconStrokeWidths.subtle}
          />
        )}
      </Pressable>

      {isOpen ? <View className="mt-3">{children}</View> : null}
    </View>
  );
});
