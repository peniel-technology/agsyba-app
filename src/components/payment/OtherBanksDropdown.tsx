import { ChevronDown } from 'lucide-react-native';
import { memo, useCallback, useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';

import { BankOption } from '@/components/payment/BankOption';
import { Text } from '@/components/ui/Text';
import { colors, iconSizes, iconStrokeWidths } from '@/theme';

interface OtherBanksDropdownProps {
  options: readonly string[];
  selectedBank: string;
  onBankSelect: (bank: string) => void;
}

export const OtherBanksDropdown = memo(function OtherBanksDropdown({
  options,
  selectedBank,
  onBankSelect,
}: OtherBanksDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  return (
    <View className="gap-2">
      <Pressable
        accessibilityRole="button"
        accessibilityState={{ expanded: isOpen }}
        className="self-stretch h-10 flex-row items-center justify-between rounded-sm border border-border bg-stone-50 px-3"
        onPress={toggle}
      >
        <Text tone="muted" variant="label">
          Select bank
        </Text>
        <View className="size-4 relative overflow-hidden">
          <ChevronDown
            color={colors.muted}
            size={iconSizes.small}
            strokeWidth={iconStrokeWidths.emphasized}
          />
        </View>
      </Pressable>

      {isOpen ? (
        <ScrollView
          className="max-h-40 border border-border rounded-sm bg-white"
          nestedScrollEnabled
          showsVerticalScrollIndicator
          contentContainerStyle={{ padding: 8 }}
        >
          <View className="gap-2">
            {options.map((bank) => (
              <BankOption
                key={bank}
                label={bank}
                selected={selectedBank === bank}
                onPress={() => onBankSelect(bank)}
              />
            ))}
          </View>
        </ScrollView>
      ) : null}
    </View>
  );
});
