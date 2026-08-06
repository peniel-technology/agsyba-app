import { memo } from 'react';
import { View } from 'react-native';

import { PaymentInput } from '@/components/payment/PaymentInput';
import { PaymentSection } from '@/components/payment/PaymentSection';

interface CardFormProps {
  cardHolderName: string;
  cardNumber: string;
  cvv: string;
  expiry: string;
  onCardHolderNameChange: (value: string) => void;
  onCardNumberChange: (value: string) => void;
  onCvvChange: (value: string) => void;
  onExpiryChange: (value: string) => void;
}

export const CardForm = memo(function CardForm({
  cardHolderName,
  cardNumber,
  cvv,
  expiry,
  onCardHolderNameChange,
  onCardNumberChange,
  onCvvChange,
  onExpiryChange,
}: CardFormProps) {
  return (
    <PaymentSection>
      <PaymentInput
        autoCapitalize="words"
        label="Card Number"
        keyboardType="number-pad"
        maxLength={19}
        value={cardNumber}
        onValueChange={onCardNumberChange}
        className="bg-[#F9F9F9] border border-[#EBEBEB] rounded-lg pl-3"
        placeholder="XXXX XXXX XXXX XXXX"
      />
      <PaymentInput
        autoCapitalize="words"
        label="Name on Card"
        value={cardHolderName}
        onValueChange={onCardHolderNameChange}
        className="bg-[#F9F9F9] border border-[#EBEBEB] rounded-lg pl-3"
        placeholder="As Written on Card"
      />
      <View className="flex-row gap-3">
        <View className="flex-1">
          <PaymentInput
            label="Expiry (MM/YY)"
            keyboardType="number-pad"
            maxLength={5}
            value={expiry}
            onValueChange={onExpiryChange}
            className="bg-[#F9F9F9] border border-[#EBEBEB] rounded-lg pl-3"
            placeholder="MM / YY"
          />
        </View>
        <View className="w-28">
          <PaymentInput
            label="CVV"
            keyboardType="number-pad"
            maxLength={4}
            secureTextEntry
            value={cvv}
            onValueChange={onCvvChange}
            className="bg-[#F9F9F9] border border-[#EBEBEB] rounded-lg pl-3"
            placeholder="***"
          />
        </View>
      </View>
    </PaymentSection>
  );
});
