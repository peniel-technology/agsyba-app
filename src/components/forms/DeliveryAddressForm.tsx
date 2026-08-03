import { useRef } from 'react';
import type { TextInput } from 'react-native';
import { View } from 'react-native';

import { AddressTypeSelector } from '@/components/checkout/AddressTypeSelector';
import { CurrentLocationButton } from '@/components/checkout/CurrentLocationButton';
import { DefaultAddressToggle } from '@/components/checkout/DefaultAddressToggle';
import {
  CountryCallingCodeDropdown,
  CountryCallingCodePicker,
} from '@/components/forms/CountryCallingCodePicker';
import { DeliveryAddressField } from '@/components/forms/DeliveryAddressField';
import { Text } from '@/components/ui/Text';

interface DeliveryAddressFormProps {
  isCountryPickerOpen: boolean;
  isLocating: boolean;
  onCountryPickerOpenChange: (isOpen: boolean) => void;
  onUseCurrentLocation: () => void;
}

export function DeliveryAddressForm({
  isCountryPickerOpen,
  isLocating,
  onCountryPickerOpenChange,
  onUseCurrentLocation,
}: DeliveryAddressFormProps) {
  const mobileNumberRef = useRef<TextInput>(null);
  const postalCodeRef = useRef<TextInput>(null);
  const addressLine1Ref = useRef<TextInput>(null);
  const addressLine2Ref = useRef<TextInput>(null);
  const cityRef = useRef<TextInput>(null);
  const stateRef = useRef<TextInput>(null);

  const handleCountryPickerOpenChange = (isOpen: boolean) => {
    onCountryPickerOpenChange(isOpen);
  };

  return (
    <View className="gap-6 px-4 pb-6 pt-4">
      <CurrentLocationButton isLoading={isLocating} onPress={onUseCurrentLocation} />

      <View className="gap-4">
        <Text className="uppercase" variant="captionStrong">
          Contact Details
        </Text>
        <DeliveryAddressField
          autoCapitalize="words"
          label="Full Name"
          name="fullName"
          onSubmitEditing={() => mobileNumberRef.current?.focus()}
          placeholder="Enter full name"
          textContentType="name"
        />
        <DeliveryAddressField
          expandedContent={
            isCountryPickerOpen ? (
              <CountryCallingCodeDropdown onSelect={() => handleCountryPickerOpenChange(false)} />
            ) : undefined
          }
          inputRef={mobileNumberRef}
          keyboardType="phone-pad"
          label="Mobile Number"
          name="mobileNumber"
          onSubmitEditing={() => postalCodeRef.current?.focus()}
          placeholder="Enter mobile number"
          prefix={
            <CountryCallingCodePicker
              isOpen={isCountryPickerOpen}
              onOpenChange={handleCountryPickerOpenChange}
            />
          }
          textContentType="telephoneNumber"
        />
      </View>

      <View className="gap-4">
        <Text className="uppercase" variant="captionStrong">
          Address
        </Text>
        <DeliveryAddressField
          autoCapitalize="characters"
          inputRef={postalCodeRef}
          label="Pincode / ZIP"
          name="postalCode"
          onSubmitEditing={() => addressLine1Ref.current?.focus()}
          placeholder="Enter pincode or ZIP"
          textContentType="postalCode"
        />
        <DeliveryAddressField
          inputRef={addressLine1Ref}
          label="Address Line 1 (House No, Building, Street)"
          multiline
          name="addressLine1"
          onSubmitEditing={() => addressLine2Ref.current?.focus()}
          placeholder="House number, building, or street"
          submitBehavior="submit"
          textContentType="streetAddressLine1"
        />
        <DeliveryAddressField
          inputRef={addressLine2Ref}
          label="Address Line 2 (Locality, Area)"
          multiline
          name="addressLine2"
          onSubmitEditing={() => cityRef.current?.focus()}
          placeholder="Locality or area"
          submitBehavior="submit"
          textContentType="streetAddressLine2"
        />
        <View className="flex-row gap-3">
          <View className="flex-1">
            <DeliveryAddressField
              autoCapitalize="words"
              inputRef={cityRef}
              label="City"
              name="city"
              onSubmitEditing={() => stateRef.current?.focus()}
              placeholder="Enter city"
              textContentType="addressCity"
            />
          </View>
          <View className="flex-1">
            <DeliveryAddressField
              autoCapitalize="words"
              inputRef={stateRef}
              label="State"
              name="state"
              placeholder="Enter state"
              returnKeyType="done"
              textContentType="addressState"
            />
          </View>
        </View>
      </View>

      <AddressTypeSelector />
      <DefaultAddressToggle />
    </View>
  );
}
