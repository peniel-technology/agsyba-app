import { memo } from 'react';
import { View } from 'react-native';

import { CardForm } from '@/components/payment/CardForm';
import { CardLogosRow } from '@/components/payment/CardLogosRow';
import { PaymentSection } from '@/components/payment/PaymentSection';
import { SaveCardCheckbox } from '@/components/payment/SaveCardCheckbox';
import { SecurePaymentInfo } from '@/components/payment/SecurePaymentInfo';

interface CreditDebitCardProps {
  cardHolderName: string;
  cardNumber: string;
  cvv: string;
  expiry: string;
  saveCard: boolean;
  onCardHolderNameChange: (value: string) => void;
  onCardNumberChange: (value: string) => void;
  onCvvChange: (value: string) => void;
  onExpiryChange: (value: string) => void;
  onSaveCardToggle: () => void;
}

export const CreditDebitCard = memo(function CreditDebitCard({
  cardHolderName,
  cardNumber,
  cvv,
  expiry,
  saveCard,
  onCardHolderNameChange,
  onCardNumberChange,
  onCvvChange,
  onExpiryChange,
  onSaveCardToggle,
}: CreditDebitCardProps) {
  return (
    <PaymentSection>
      <CardLogosRow />
      <CardForm
        cardHolderName={cardHolderName}
        cardNumber={cardNumber}
        cvv={cvv}
        expiry={expiry}
        onCardHolderNameChange={onCardHolderNameChange}
        onCardNumberChange={onCardNumberChange}
        onCvvChange={onCvvChange}
        onExpiryChange={onExpiryChange}
      />
      <View className="gap-1">
        <SaveCardCheckbox checked={saveCard} onToggle={onSaveCardToggle} />
        <SecurePaymentInfo />
      </View>
    </PaymentSection>
  );
});
