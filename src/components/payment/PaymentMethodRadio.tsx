import type { ReactNode } from 'react';
import { memo } from 'react';
import { View } from 'react-native';

import { Text } from '@/components/ui/Text';
import { colors } from '@/theme';

interface PaymentMethodRadioProps {
  checked: boolean;
  iconFirst?: boolean;
  children: ReactNode;
  onPress?: () => void;
  title: ReactNode;
}

export const PaymentMethodRadio = memo(function PaymentMethodRadio({
  checked,
  iconFirst = false,
  children,
  title,
}: PaymentMethodRadioProps) {
  const isTextTitle = typeof title === 'string' || typeof title === 'number';
  return (
    <View
      accessibilityRole="radio"
      accessibilityState={{ checked }}
      className="flex-row items-center justify-between"
    >
      <View className="flex-1 flex-row items-center gap-3">
        <View
          className="items-center justify-center rounded-[10px] bg-surface"
          style={{
            width: 20,
            height: 20,
            borderWidth: checked ? 2 : 1,
            borderColor: checked ? colors.brand : colors.subtleBorder,
          }}
        >
          {checked ? (
            <View
              className="rounded-full"
              style={{
                height: 10,
                width: 10,
                backgroundColor: colors.brand,
                borderRadius: 5,
              }}
            />
          ) : null}
        </View>
        <View className="flex-row items-center gap-1.5">
          {iconFirst ? children : null}
          {isTextTitle ? (
            <Text tone={checked ? 'default' : 'muted'} variant="label">
              {title}
            </Text>
          ) : (
            <>{title}</>
          )}
          {iconFirst ? null : children}
        </View>
      </View>
    </View>
  );
});
