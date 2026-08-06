import { Banknote, Building, CreditCard } from 'lucide-react-native';
import { memo, useCallback } from 'react';
import { View } from 'react-native';

import { CashOnDelivery } from '@/components/payment/CashOnDelivery';
import { CreditDebitCard } from '@/components/payment/CreditDebitCard';
import { NetBanking } from '@/components/payment/NetBanking';
import { PaymentAccordion } from '@/components/payment/PaymentAccordion';
import { PaymentMethodRadio } from '@/components/payment/PaymentMethodRadio';
import { PaymentSection } from '@/components/payment/PaymentSection';
import { type PaymentMethod } from '@/components/payment/PaymentTypes';
import { Text } from '@/components/ui/Text';
import { colors, iconSizes, iconStrokeWidths } from '@/theme';

interface PaymentMethodsProps {
  selectedPaymentMethod: PaymentMethod;
  selectedBank: string;
  cardHolderName: string;
  cardNumber: string;
  cvv: string;
  expiry: string;
  saveCard: boolean;
  popularBanks: readonly string[];
  otherBanks: readonly string[];
  onBankChange: (bank: string) => void;
  onMethodSelect: (method: PaymentMethod) => void;
  onCardHolderNameChange: (value: string) => void;
  onCardNumberChange: (value: string) => void;
  onCvvChange: (value: string) => void;
  onExpiryChange: (value: string) => void;
  onSaveCardToggle: () => void;
}

export const PaymentMethods = memo(function PaymentMethods({
  selectedPaymentMethod,
  selectedBank,
  cardHolderName,
  cardNumber,
  cvv,
  expiry,
  saveCard,
  popularBanks,
  otherBanks,
  onBankChange,
  onMethodSelect,
  onCardHolderNameChange,
  onCardNumberChange,
  onCvvChange,
  onExpiryChange,
  onSaveCardToggle,
}: PaymentMethodsProps) {
  const isCardSelected = selectedPaymentMethod === 'card';
  const isNetBanking = selectedPaymentMethod === 'netBanking';
  const isCodSelected = selectedPaymentMethod === 'cashOnDelivery';

  const selectCard = useCallback(() => {
    onMethodSelect('card');
  }, [onMethodSelect]);

  const selectNetBanking = useCallback(() => {
    onMethodSelect('netBanking');
  }, [onMethodSelect]);

  const selectCashOnDelivery = useCallback(() => {
    onMethodSelect('cashOnDelivery');
  }, [onMethodSelect]);

  return (
    <PaymentSection className="border mx-4 border-brand rounded-lg overflow-hidden bg-surface">
      <PaymentAccordion
        isOpen={isCardSelected}
        left={
          <PaymentMethodRadio checked={isCardSelected} iconFirst title="Credit / Debit Card">
            <CreditCard
              color={isCardSelected ? colors.brand : colors.muted}
              size={iconSizes.medium}
              strokeWidth={iconStrokeWidths.emphasized}
            />
          </PaymentMethodRadio>
        }
        onPress={selectCard}
      >
        <CreditDebitCard
          cardHolderName={cardHolderName}
          cardNumber={cardNumber}
          cvv={cvv}
          expiry={expiry}
          saveCard={saveCard}
          onCardHolderNameChange={onCardHolderNameChange}
          onCardNumberChange={onCardNumberChange}
          onCvvChange={onCvvChange}
          onExpiryChange={onExpiryChange}
          onSaveCardToggle={onSaveCardToggle}
        />
      </PaymentAccordion>

      <PaymentAccordion
        isOpen={isNetBanking}
        left={
          <PaymentMethodRadio
            checked={isNetBanking}
            iconFirst
            title={
              <View className="flex-1 flex-row items-center gap-2">
                <Text tone={isNetBanking ? 'default' : 'muted'} variant="label">
                  Net Banking
                </Text>
                <View className="rounded-[10px] bg-brand px-1.5 py-0.5">
                  <Text variant="microStrong" tone="brandForeground">
                    8 Offers
                  </Text>
                </View>
              </View>
            }
          >
            <Building
              color={isNetBanking ? colors.brand : colors.muted}
              size={iconSizes.compact}
              strokeWidth={iconStrokeWidths.emphasized}
            />
          </PaymentMethodRadio>
        }
        onPress={selectNetBanking}
      >
        <NetBanking
          selectedBank={selectedBank}
          onBankSelect={onBankChange}
          otherBanks={otherBanks}
          popularBanks={popularBanks}
        />
      </PaymentAccordion>

      <PaymentAccordion
        isOpen={isCodSelected}
        left={
          <PaymentMethodRadio checked={isCodSelected} title="Cash on Delivery" iconFirst>
            <Banknote
              color={isCodSelected ? colors.brand : colors.muted}
              size={iconSizes.compact}
              strokeWidth={iconStrokeWidths.emphasized}
            />
          </PaymentMethodRadio>
        }
        onPress={selectCashOnDelivery}
      >
        <CashOnDelivery />
      </PaymentAccordion>
    </PaymentSection>
  );
});
