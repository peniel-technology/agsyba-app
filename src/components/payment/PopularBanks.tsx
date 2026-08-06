import { memo } from 'react';
import { View } from 'react-native';

import { BankOption } from '@/components/payment/BankOption';

interface PopularBanksProps {
  options: readonly string[];
  selectedBank: string;
  onBankSelect: (bank: string) => void;
}

export const PopularBanks = memo(function PopularBanks({
  options,
  selectedBank,
  onBankSelect,
}: PopularBanksProps) {
  const pairs = options.reduce((acc, option, index) => {
    if (index % 2 === 0) {
      acc.push([option]);
    } else if (acc.length > 0) {
      acc[acc.length - 1]?.push(option);
    }

    return acc;
  }, [] as string[][]);

  return (
    <View className="gap-2">
      {pairs.map((row, rowIndex) => (
        <View key={`${rowIndex}-${row[0]}`} className="flex-row gap-2">
          {row.map((bank) => (
            <BankOption
              className="flex-1"
              key={bank}
              label={bank}
              selected={selectedBank === bank}
              onPress={() => onBankSelect(bank)}
            />
          ))}
        </View>
      ))}
    </View>
  );
});
