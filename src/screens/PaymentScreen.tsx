import { useLocalSearchParams, useRouter } from 'expo-router';
import { useCallback, useMemo, useState } from 'react';
import { ScrollView, View } from 'react-native';

import { Screen } from '@/components/layouts';
import { DeliveryAddressCard } from '@/components/payment/DeliveryAddressCard';
import { GiftCardSection } from '@/components/payment/GiftCardSection';
import { PayButton } from '@/components/payment/PayButton';
import { PaymentHeader } from '@/components/payment/PaymentHeader';
import { PaymentMethods } from '@/components/payment/PaymentMethods';
import { PaymentSummary } from '@/components/payment/PaymentSummary';
import type { PaymentMethod } from '@/components/payment/PaymentTypes';
import { routes } from '@/constants/routes';
import { useCheckoutSummary } from '@/features/checkout/hooks/useCheckoutSummary';
import { formatCurrency } from '@/utils/formatCurrency';

interface PaymentAddressParam {
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  fullName?: string;
  mobileNumber?: string;
  postalCode?: string;
  state?: string;
}

interface PaymentQueryParams extends PaymentAddressParam {
  countryCallingCode?: string;
}

function getParam(value: string | string[] | undefined): string {
  if (Array.isArray(value)) {
    return value[0] ?? '';
  }

  return value ?? '';
}

const popularBanks = [
  'HDFC Bank',
  'ICICI Bank',
  'State Bank of India',
  'Axis Bank',
  'Kotak Mahindra',
] as const;
const otherBanks = [
  'Bandhan Bank',
  'Yes Bank',
  'Indian Bank',
  'Canara Bank',
  'Federal Bank',
] as const;

export default function PaymentScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<PaymentQueryParams>();
  const { itemCount, total } = useCheckoutSummary();

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod>('card');
  const [selectedBank, setSelectedBank] = useState<string>(popularBanks[0] ?? 'HDFC Bank');
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolderName, setCardHolderName] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [saveCard, setSaveCard] = useState(false);

  const address = useMemo<PaymentAddressParam>(() => {
    return {
      addressLine1: getParam(params.addressLine1),
      addressLine2: getParam(params.addressLine2),
      city: getParam(params.city),
      fullName: getParam(params.fullName),
      mobileNumber: getParam(params.mobileNumber),
      postalCode: getParam(params.postalCode),
      state: getParam(params.state),
    };
  }, [params]);

  const mobileLabel = useMemo(() => {
    if (!address.mobileNumber) {
      return '';
    }

    const code = getParam(params.countryCallingCode);
    return `${code} ${address.mobileNumber}`.trim();
  }, [address.mobileNumber, params.countryCallingCode]);

  const payableAmount = useMemo(() => formatCurrency(total), [total]);

  const handleBackPress = useCallback(() => {
    if (router.canGoBack()) {
      router.back();
      return;
    }

    router.replace(routes.deliveryAddress);
  }, [router]);

  const handleApplyGiftCard = useCallback(() => {
    return;
  }, []);

  const handlePayPress = useCallback(() => {
    return;
  }, []);

  const handleCardNumberChange = useCallback((value: string) => {
    setCardNumber(value.replace(/\D/g, ''));
  }, []);

  const handleExpiryChange = useCallback((value: string) => {
    const filtered = value.replace(/\D/g, '');
    const partOne = filtered.slice(0, 2);
    const partTwo = filtered.slice(2, 4);
    const formatted = partTwo ? `${partOne}/${partTwo}` : partOne;
    setExpiry(formatted);
  }, []);

  const handleMethodChange = useCallback((method: PaymentMethod) => {
    setSelectedPaymentMethod(method);
  }, []);

  const handleSaveCardToggle = useCallback(() => {
    setSaveCard((current) => !current);
  }, []);

  const handleChangeAddressPress = useCallback(() => {
    router.replace(routes.deliveryAddress);
  }, [router]);

  return (
    <Screen includeBottomInset={false} padded={false}>
      <PaymentHeader cartItemCount={itemCount} onBackPress={handleBackPress} />
      <View className="flex-1">
        <ScrollView
          className="h-full flex-1 bg-white"
          contentContainerClassName="pb-4"
          keyboardDismissMode="on-drag"
          keyboardShouldPersistTaps="handled"
        >
          <View>
            <DeliveryAddressCard
              addressLine1={address.addressLine1 || 'No address added'}
              addressLine2={address.addressLine2}
              city={address.city}
              fullName={address.fullName || 'Customer'}
              mobileLabel={mobileLabel}
              onChangePress={handleChangeAddressPress}
            />
          </View>

          <View className="mt-2">
            <PaymentMethods
              selectedPaymentMethod={selectedPaymentMethod}
              selectedBank={selectedBank}
              cardHolderName={cardHolderName}
              cardNumber={cardNumber}
              cvv={cvv}
              expiry={expiry}
              saveCard={saveCard}
              popularBanks={popularBanks}
              otherBanks={otherBanks}
              onBankChange={setSelectedBank}
              onMethodSelect={handleMethodChange}
              onCardHolderNameChange={setCardHolderName}
              onCardNumberChange={handleCardNumberChange}
              onCvvChange={setCvv}
              onExpiryChange={handleExpiryChange}
              onSaveCardToggle={handleSaveCardToggle}
            />
          </View>

          <GiftCardSection onApplyPress={handleApplyGiftCard} />
        </ScrollView>
      </View>

      <View className="border-t border-border bg-surface">
        <PaymentSummary payableAmount={payableAmount} />
        <View className="p-4">
          <PayButton
            disabled={itemCount === 0}
            label={`PAY ${payableAmount} \u2192`}
            onPress={handlePayPress}
          />
        </View>
      </View>
    </Screen>
  );
}
