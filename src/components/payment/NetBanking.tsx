import { memo } from 'react';
import { View } from 'react-native';

import { OtherBanksDropdown } from '@/components/payment/OtherBanksDropdown';
import { PopularBanks } from '@/components/payment/PopularBanks';
import { Text } from '@/components/ui/Text';

interface NetBankingProps {
  selectedBank: string;
  popularBanks: readonly string[];
  otherBanks: readonly string[];
  onBankSelect: (bank: string) => void;
}

export const NetBanking = memo(function NetBanking({
  selectedBank,
  popularBanks,
  otherBanks,
  onBankSelect,
}: NetBankingProps) {
  return (
    <View className="gap-3 p-3.5">
      <View className="gap-2">
        <Text tone="muted" variant="captionStrong" className="uppercase">
          Popular Banks
        </Text>
        <PopularBanks
          options={popularBanks}
          selectedBank={selectedBank}
          onBankSelect={onBankSelect}
        />
      </View>

      <View className="gap-2">
        <Text tone="muted" variant="captionStrong" className="uppercase">
          Other Banks
        </Text>
        <OtherBanksDropdown
          options={otherBanks}
          selectedBank={selectedBank}
          onBankSelect={onBankSelect}
        />
      </View>
    </View>
  );
});
