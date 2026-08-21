import { useRef } from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';

import { Text } from '@/components/ui/Text';
import { colors } from '@/theme';

interface CouponCodeEntryProps {
  onApply: () => void;
  onChange: (value: string) => void;
  value: string;
}

const styles = StyleSheet.create({
  applyButton: {
    borderRadius: 2,
  },
  input: {
    borderRadius: 2,
    borderWidth: 1,
  },
});

export function CouponCodeEntry({ onApply, onChange, value }: CouponCodeEntryProps) {
  const inputRef = useRef<TextInput>(null);

  return (
    <View className="gap-2.5 bg-surface p-5">
      <Text variant="captionStrong">Have a coupon code?</Text>
      <View className="h-11 flex-row items-center gap-3">
        <TextInput
          accessibilityLabel="Coupon code"
          autoCapitalize="characters"
          autoCorrect={false}
          className="h-10 flex-1 bg-surface px-4 font-manrope text-xs text-foreground"
          onChangeText={onChange}
          onSubmitEditing={onApply}
          placeholder="Enter coupon code"
          placeholderTextColor={colors.muted}
          ref={inputRef}
          returnKeyType="done"
          style={[styles.input, { borderColor: colors.subtleBorder }]}
          value={value}
        />
        <Pressable
          accessibilityLabel="Apply coupon code"
          accessibilityRole="button"
          className="h-10 w-24 items-center justify-center bg-order-action active:opacity-70"
          onPress={onApply}
          style={styles.applyButton}
        >
          <Text tone="brandForeground" variant="captionStrong">
            Apply
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
