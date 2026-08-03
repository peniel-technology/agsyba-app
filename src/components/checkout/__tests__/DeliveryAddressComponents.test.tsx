import { zodResolver } from '@hookform/resolvers/zod';
import { act, fireEvent, render, waitFor } from '@testing-library/react-native';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { AddressTypeSelector } from '@/components/checkout/AddressTypeSelector';
import { CurrentLocationButton } from '@/components/checkout/CurrentLocationButton';
import { DefaultAddressToggle } from '@/components/checkout/DefaultAddressToggle';
import { DeliverHereBar } from '@/components/checkout/DeliverHereBar';
import { OrderSummary } from '@/components/checkout/OrderSummary';
import { DeliveryAddressForm } from '@/components/forms/DeliveryAddressForm';
import { deliveryAddressDefaults } from '@/features/checkout/constants/deliveryAddress';
import {
  deliveryAddressSchema,
  type DeliveryAddressValues,
} from '@/features/checkout/schemas/deliveryAddressSchema';
import type { CartLine } from '@/stores/useCartStore';

jest.mock('lucide-react-native', () => ({
  Briefcase: 'Briefcase',
  Check: 'Check',
  ChevronDown: 'ChevronDown',
  ChevronRight: 'ChevronRight',
  ChevronUp: 'ChevronUp',
  House: 'House',
  LoaderCircle: 'LoaderCircle',
  MapPin: 'MapPin',
  Search: 'Search',
}));

const cartLine: CartLine = {
  isSelected: true,
  product: {
    bestPrice: { amount: 80, currency: 'AED' },
    brand: 'ZARA',
    deliveryLabel: 'Delivery tomorrow',
    discountPercentage: 20,
    id: 'dress',
    image: 1,
    imageAccessibilityLabel: 'Navy midi dress',
    isFavorite: false,
    name: 'Midi Dress',
    price: { amount: 100, currency: 'AED' },
    rating: 4.5,
    reviewCount: 20,
  },
  quantity: 2,
};

function AddressChoiceHarness() {
  const form = useForm<DeliveryAddressValues>({ defaultValues: deliveryAddressDefaults });

  return (
    <FormProvider {...form}>
      <AddressTypeSelector />
      <DefaultAddressToggle />
    </FormProvider>
  );
}

function AddressFormHarness() {
  const [isCountryPickerOpen, setIsCountryPickerOpen] = useState(false);
  const form = useForm<DeliveryAddressValues>({ defaultValues: deliveryAddressDefaults });

  return (
    <FormProvider {...form}>
      <DeliveryAddressForm
        isCountryPickerOpen={isCountryPickerOpen}
        isLocating={false}
        onCountryPickerOpenChange={setIsCountryPickerOpen}
        onUseCurrentLocation={jest.fn()}
      />
    </FormProvider>
  );
}

function ValidatedAddressFormHarness() {
  const [isCountryPickerOpen, setIsCountryPickerOpen] = useState(false);
  const form = useForm<DeliveryAddressValues>({
    defaultValues: deliveryAddressDefaults,
    mode: 'onTouched',
    reValidateMode: 'onChange',
    resolver: zodResolver(deliveryAddressSchema),
  });

  return (
    <FormProvider {...form}>
      <DeliveryAddressForm
        isCountryPickerOpen={isCountryPickerOpen}
        isLocating={false}
        onCountryPickerOpenChange={setIsCountryPickerOpen}
        onUseCurrentLocation={jest.fn()}
      />
      <DeliverHereBar onPress={form.handleSubmit(jest.fn())} />
    </FormProvider>
  );
}

describe('delivery address components', () => {
  it('supports selecting an address type and toggling the default address', () => {
    const { getByLabelText } = render(<AddressChoiceHarness />);
    const workOption = getByLabelText('Save address as Work');
    const defaultToggle = getByLabelText('Make this my default address');

    fireEvent.press(workOption);
    fireEvent.press(defaultToggle);

    expect(workOption).toHaveAccessibilityState({ checked: true });
    expect(defaultToggle).toHaveAccessibilityState({ checked: false });
  });

  it('invokes the location and delivery actions', () => {
    const onLocationPress = jest.fn();
    const onDeliverPress = jest.fn();
    const { getByLabelText } = render(
      <>
        <CurrentLocationButton isLoading={false} onPress={onLocationPress} />
        <DeliverHereBar onPress={onDeliverPress} />
      </>,
    );

    fireEvent.press(getByLabelText('Use current location'));
    fireEvent.press(getByLabelText('Deliver here'));

    expect(onLocationPress).toHaveBeenCalledTimes(1);
    expect(onDeliverPress).toHaveBeenCalledTimes(1);
  });

  it('renders the live cart summary', () => {
    const { getByLabelText, getByText } = render(
      <OrderSummary
        discount={{ amount: 40, currency: 'AED' }}
        itemCount={2}
        lines={[cartLine]}
        subtotal={{ amount: 200, currency: 'AED' }}
        total={{ amount: 160, currency: 'AED' }}
      />,
    );

    expect(getByText('Subtotal (2 items)')).toBeTruthy();
    expect(getByText('AED 200.00')).toBeTruthy();
    expect(getByText('-AED 40.00')).toBeTruthy();
    expect(getByText('AED 160.00')).toBeTruthy();
    expect(getByLabelText('Navy midi dress')).toHaveStyle({
      bottom: 0,
      left: 0,
      right: 0,
      top: 0,
    });
  });

  it('shows complete address values without nested input scrolling', () => {
    const { getByLabelText, getByPlaceholderText } = render(<AddressFormHarness />);
    const addressLine1 = getByLabelText('Address Line 1 (House No, Building, Street)');
    const singleRowLabels = ['Full Name', 'Mobile Number', 'Pincode / ZIP', 'City', 'State'];

    expect(addressLine1).toHaveProp('multiline', true);
    expect(addressLine1).toHaveProp('scrollEnabled', false);
    expect(addressLine1).toHaveProp('textAlignVertical', 'top');
    expect(addressLine1).toHaveStyle({ height: 64 });

    for (const label of singleRowLabels) {
      const input = getByLabelText(label);

      expect(input).toHaveProp('multiline', true);
      expect(input).toHaveProp('scrollEnabled', false);
      expect(input).toHaveProp('submitBehavior', 'submit');
      expect(input).toHaveProp('textAlignVertical', 'center');
      expect(input).toHaveStyle({ height: 40 });
    }

    fireEvent(addressLine1, 'contentSizeChange', {
      nativeEvent: { contentSize: { height: 80, width: 300 } },
    });

    expect(getByLabelText('Address Line 1 (House No, Building, Street)')).toHaveStyle({
      height: 80,
    });
    expect(getByPlaceholderText('Enter full name')).toHaveProp('value', '');
    expect(getByPlaceholderText('Enter mobile number')).toHaveProp('value', '');
    expect(getByPlaceholderText('Enter pincode or ZIP')).toHaveProp('value', '');
    expect(getByPlaceholderText('House number, building, or street')).toHaveProp('value', '');
    expect(getByPlaceholderText('Locality or area')).toHaveProp('value', '');
    expect(getByPlaceholderText('Enter city')).toHaveProp('value', '');
    expect(getByPlaceholderText('Enter state')).toHaveProp('value', '');
  });

  it('updates the selected country calling code', async () => {
    const { getByLabelText } = render(<AddressFormHarness />);

    expect(getByLabelText('Select country calling code, currently +971')).toBeTruthy();

    fireEvent.press(getByLabelText('Select country calling code, currently +971'));
    expect(getByLabelText('Country calling code options')).toHaveProp('nestedScrollEnabled', true);
    expect(getByLabelText('Country calling code options')).toHaveProp(
      'showsVerticalScrollIndicator',
      true,
    );
    fireEvent.changeText(getByLabelText('Search country calling codes'), 'India');

    await act(async () => {
      fireEvent.press(getByLabelText('Select India +91'));
    });

    expect(getByLabelText('Select country calling code, currently +91')).toBeTruthy();
  });

  it('clears stale validation messages when fields become valid', async () => {
    const { getByLabelText, getByText, queryByText } = render(<ValidatedAddressFormHarness />);

    await act(async () => {
      fireEvent.press(getByLabelText('Deliver here'));
    });

    expect(getByText('Enter your full name')).toBeTruthy();
    expect(getByText('Enter a valid mobile number')).toBeTruthy();

    await act(async () => {
      fireEvent.changeText(getByLabelText('Full Name'), 'Vishnu');
      fireEvent.changeText(getByLabelText('Mobile Number'), '12645679845');
    });

    await waitFor(() => {
      expect(queryByText('Enter your full name')).toBeNull();
      expect(queryByText('Enter a valid mobile number')).toBeNull();
    });
  });
});
