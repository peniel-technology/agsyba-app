import { Check, ChevronDown, ChevronUp, Search } from 'lucide-react-native';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, TextInput, View } from 'react-native';
import { useController, useFormContext } from 'react-hook-form';

import { Text } from '@/components/ui/Text';
import {
  countryCallingCodeOptions,
  type CountryCallingCodeOption,
} from '@/features/checkout/constants/countryCallingCodes';
import type { DeliveryAddressValues } from '@/features/checkout/schemas/deliveryAddressSchema';
import { colors, iconSizes, iconStrokeWidths, layout } from '@/theme';

interface CountryCallingCodePickerProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

interface CountryCallingCodeDropdownProps {
  onSelect: () => void;
}

export function CountryCallingCodePicker({ isOpen, onOpenChange }: CountryCallingCodePickerProps) {
  const { control } = useFormContext<DeliveryAddressValues>();
  const { field: countryCodeField } = useController({ control, name: 'countryCode' });
  const { field: callingCodeField } = useController({ control, name: 'countryCallingCode' });
  const selectedCountry = countryCallingCodeOptions.find(
    (country) => country.countryCode === countryCodeField.value,
  );

  return (
    <Pressable
      accessibilityLabel={`Select country calling code, currently ${callingCodeField.value}`}
      accessibilityRole="button"
      accessibilityState={{ expanded: isOpen }}
      className="h-10 flex-row items-center gap-1.5 active:opacity-70"
      onPress={(event) => {
        event?.stopPropagation();
        onOpenChange(!isOpen);
      }}
    >
      <Text variant="body">{selectedCountry?.flag ?? ''}</Text>
      <Text variant="label">{callingCodeField.value}</Text>
      {isOpen ? (
        <ChevronUp
          accessible={false}
          color={colors.muted}
          size={iconSizes.small}
          strokeWidth={iconStrokeWidths.regular}
        />
      ) : (
        <ChevronDown
          accessible={false}
          color={colors.muted}
          size={iconSizes.small}
          strokeWidth={iconStrokeWidths.regular}
        />
      )}
    </Pressable>
  );
}

export function CountryCallingCodeDropdown({ onSelect }: CountryCallingCodeDropdownProps) {
  const [query, setQuery] = useState('');
  const { control, setValue } = useFormContext<DeliveryAddressValues>();
  const { field: countryCodeField } = useController({ control, name: 'countryCode' });
  const selectedCountry = countryCallingCodeOptions.find(
    (country) => country.countryCode === countryCodeField.value,
  );
  const normalizedQuery = query.trim().toLocaleLowerCase();
  const filteredCountries = useMemo(
    () =>
      normalizedQuery
        ? countryCallingCodeOptions.filter((country) =>
            `${country.name} ${country.countryCode} ${country.callingCode}`
              .toLocaleLowerCase()
              .includes(normalizedQuery),
          )
        : countryCallingCodeOptions,
    [normalizedQuery],
  );
  const visibleCountries = useMemo(() => {
    if (normalizedQuery) {
      return filteredCountries;
    }

    return [
      ...(selectedCountry ? [selectedCountry] : []),
      ...countryCallingCodeOptions.filter(
        (country) => country.countryCode !== selectedCountry?.countryCode,
      ),
    ];
  }, [filteredCountries, normalizedQuery, selectedCountry]);

  const handleSelect = (country: CountryCallingCodeOption) => {
    setValue('countryCode', country.countryCode, {
      shouldDirty: true,
      shouldValidate: true,
    });
    setValue('countryCallingCode', country.callingCode, {
      shouldDirty: true,
      shouldValidate: true,
    });
    onSelect();
    setQuery('');
  };

  return (
    <View className="bg-surface p-2">
      <View className="h-10 flex-row items-center gap-2 rounded-md border border-border bg-subtle-surface px-3">
        <Search
          accessible={false}
          color={colors.muted}
          size={iconSizes.compact}
          strokeWidth={iconStrokeWidths.regular}
        />
        <TextInput
          accessibilityLabel="Search country calling codes"
          autoCapitalize="none"
          autoCorrect={false}
          className="h-10 flex-1 py-0 text-sm text-foreground"
          onChangeText={setQuery}
          placeholder="Search country or code"
          placeholderTextColor={colors.muted}
          value={query}
        />
      </View>

      <View
        className="mt-2 overflow-hidden"
        style={{ height: layout.countryCallingCodeDropdownHeight }}
      >
        <ScrollView
          accessibilityLabel="Country calling code options"
          className="flex-1"
          contentContainerClassName="pb-1"
          keyboardShouldPersistTaps="always"
          nestedScrollEnabled
          persistentScrollbar
          showsVerticalScrollIndicator
        >
          {visibleCountries.length > 0 ? (
            visibleCountries.map((country) => {
              const isSelected = country.countryCode === countryCodeField.value;

              return (
                <Pressable
                  accessibilityLabel={`Select ${country.name} ${country.callingCode}`}
                  accessibilityRole="button"
                  className={`min-h-11 flex-row items-center gap-2 rounded-md px-2 active:bg-subtle-surface ${isSelected ? 'bg-sale-surface' : ''}`}
                  key={country.countryCode}
                  onPress={() => handleSelect(country)}
                >
                  <Text variant="body">{country.flag}</Text>
                  <Text className="flex-1" numberOfLines={1} variant="captionMedium">
                    {country.name}
                  </Text>
                  <Text tone={isSelected ? 'brand' : 'muted'} variant="captionStrong">
                    {country.callingCode}
                  </Text>
                  {isSelected ? (
                    <Check
                      accessible={false}
                      color={colors.brand}
                      size={iconSizes.small}
                      strokeWidth={iconStrokeWidths.emphasized}
                    />
                  ) : (
                    <View className="size-3.5" />
                  )}
                </Pressable>
              );
            })
          ) : (
            <Text className="px-2 py-4 text-center" tone="muted" variant="captionMedium">
              No countries found
            </Text>
          )}
        </ScrollView>
      </View>
    </View>
  );
}
