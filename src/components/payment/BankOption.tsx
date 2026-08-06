import { memo } from 'react';
import { Pressable, View } from 'react-native';

import { Text } from '@/components/ui/Text';
import { colors } from '@/theme';

interface BankOptionProps {
  className?: string;
  label: string;
  selected: boolean;
  onPress: () => void;
}

export const BankOption = memo(function BankOption({
  className = '',
  label,
  selected,
  onPress,
}: BankOptionProps) {
  return (
    <Pressable
      accessibilityRole="checkbox"
      accessibilityLabel={label}
      accessibilityState={{ checked: selected }}
      className={`flex-1 flex-row items-center gap-2 rounded-md bg-white px-3 py-2.5 ${className}`}
      onPress={onPress}
      style={{
        borderWidth: 1,
        borderColor: selected ? colors.brand : colors.border,
      }}
    >
      <View
        className="items-center justify-center rounded-full bg-surface"
        style={{
          height: 20,
          width: 20,
          borderWidth: 2,
          borderColor: selected ? colors.brand : colors.subtleBorder,
        }}
      >
        {selected ? (
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
      <Text tone={selected ? 'default' : 'muted'} variant="captionStrong">
        {label}
      </Text>
    </Pressable>
  );
});
