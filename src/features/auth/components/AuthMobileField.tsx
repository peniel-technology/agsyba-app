import { ChevronDown } from 'lucide-react-native';
import { useState } from 'react';
import { Pressable, TextInput, View } from 'react-native';

import { CountryCallingCodeModal } from '@/components/forms/CountryCallingCodeModal';
import { Text } from '@/components/ui/Text';
import {
  countryCallingCodeOptions,
  type CountryCallingCodeOption,
} from '@/features/checkout/constants/countryCallingCodes';
import { colors, iconSizes, iconStrokeWidths } from '@/theme';

interface AuthMobileFieldProps {
  callingCode: string;
  error?: string;
  label?: string;
  onChangeText: (value: string) => void;
  onCountryChange?: (country: CountryCallingCodeOption) => void;
  placeholder?: string;
  showErrorBorder?: boolean;
  value: string;
}

export function AuthMobileField({
  callingCode,
  error,
  label = 'Mobile Number',
  onChangeText,
  onCountryChange,
  placeholder = 'Enter your mobile number',
  showErrorBorder = false,
  value,
}: AuthMobileFieldProps) {
  const [isCountryPickerOpen, setIsCountryPickerOpen] = useState(false);
  const selectedCountry =
    countryCallingCodeOptions.find((country) => country.callingCode === callingCode) ??
    countryCallingCodeOptions[0];

  const handleCountrySelect = (country: CountryCallingCodeOption) => {
    setIsCountryPickerOpen(false);
    onCountryChange?.(country);
  };

  return (
    <>
      <View className="gap-2">
        <Text variant="captionStrong">{label}</Text>
        <View
          className={`min-h-12 flex-row items-center gap-3 rounded-sm border bg-surface px-4 py-3 ${error && showErrorBorder ? 'border-error' : 'border-border'}`}
        >
          <Pressable
            accessibilityLabel={`Select country calling code, currently ${selectedCountry.callingCode}`}
            accessibilityRole="button"
            accessibilityState={{ expanded: isCountryPickerOpen }}
            className="flex-row items-center gap-1 rounded-xs border border-border bg-subtle-surface px-2 py-1 active:bg-border"
            onPress={() => setIsCountryPickerOpen(true)}
          >
            <Text variant="body">{selectedCountry.flag}</Text>
            <Text variant="captionStrong">{selectedCountry.callingCode}</Text>
            <ChevronDown
              accessible={false}
              color={colors.muted}
              size={iconSizes.tiny}
              strokeWidth={iconStrokeWidths.subtle}
            />
          </Pressable>
          <TextInput
            accessibilityHint={error}
            accessibilityLabel={label}
            autoComplete="tel"
            className="min-h-6 flex-1 py-0 font-manrope text-sm text-foreground"
            keyboardType="phone-pad"
            onChangeText={onChangeText}
            placeholder={placeholder}
            placeholderTextColor={colors.muted}
            returnKeyType="next"
            value={value}
          />
        </View>
      </View>

      <CountryCallingCodeModal
        isVisible={isCountryPickerOpen}
        onClose={() => setIsCountryPickerOpen(false)}
        onSelect={handleCountrySelect}
        selectedCountryCode={selectedCountry.countryCode}
      />
    </>
  );
}
