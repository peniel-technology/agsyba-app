import { Check, Search, X } from 'lucide-react-native';
import { useMemo, useState } from 'react';
import { Modal, Pressable, ScrollView, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Text } from '@/components/ui/Text';
import {
  countryCallingCodeOptions,
  type CountryCallingCodeOption,
} from '@/features/checkout/constants/countryCallingCodes';
import { colors, iconSizes, iconStrokeWidths, spacing } from '@/theme';

interface CountryCallingCodeModalProps {
  isVisible: boolean;
  onClose: () => void;
  onSelect: (country: CountryCallingCodeOption) => void;
  selectedCountryCode: string;
}

export function CountryCallingCodeModal({
  isVisible,
  onClose,
  onSelect,
  selectedCountryCode,
}: CountryCallingCodeModalProps) {
  const insets = useSafeAreaInsets();
  const [query, setQuery] = useState('');
  const normalizedQuery = query.trim().toLocaleLowerCase();
  const visibleCountries = useMemo(
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

  const handleClose = () => {
    setQuery('');
    onClose();
  };

  const handleSelect = (country: CountryCallingCodeOption) => {
    setQuery('');
    onSelect(country);
  };

  return (
    <Modal
      animationType="slide"
      onRequestClose={handleClose}
      statusBarTranslucent
      transparent
      visible={isVisible}
    >
      <View className="flex-1 justify-end">
        <Pressable
          accessibilityLabel="Close country picker"
          accessibilityRole="button"
          className="absolute inset-0 bg-drawer-backdrop/55"
          onPress={handleClose}
        />

        <View
          accessibilityViewIsModal
          className="max-h-[82%] rounded-t-3xl bg-surface px-4 pt-3"
          style={{ paddingBottom: Math.max(insets.bottom, spacing[4]) }}
        >
          <View className="mb-4 flex-row items-center justify-between">
            <View>
              <Text variant="title">Select country</Text>
              <Text className="mt-1" tone="muted" variant="detail">
                Choose your country calling code
              </Text>
            </View>
            <Pressable
              accessibilityLabel="Close country picker"
              accessibilityRole="button"
              className="size-10 items-center justify-center rounded-full active:bg-subtle-surface"
              hitSlop={spacing[1]}
              onPress={handleClose}
            >
              <X
                accessible={false}
                color={colors.muted}
                size={iconSizes.medium}
                strokeWidth={iconStrokeWidths.regular}
              />
            </Pressable>
          </View>

          <View className="h-12 flex-row items-center gap-2 rounded-md border border-border bg-subtle-surface px-3">
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
              className="h-12 flex-1 py-0 font-manrope text-sm text-foreground"
              onChangeText={setQuery}
              placeholder="Search country or code"
              placeholderTextColor={colors.muted}
              value={query}
            />
          </View>

          <ScrollView
            accessibilityLabel="Country calling code options"
            className="mt-3"
            contentContainerClassName="gap-1 pb-2"
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator
          >
            {visibleCountries.length > 0 ? (
              visibleCountries.map((country) => {
                const isSelected = country.countryCode === selectedCountryCode;

                return (
                  <Pressable
                    accessibilityLabel={`Select ${country.name} ${country.callingCode}`}
                    accessibilityRole="button"
                    accessibilityState={{ selected: isSelected }}
                    className={`min-h-12 flex-row items-center gap-3 rounded-md px-3 active:bg-subtle-surface ${isSelected ? 'bg-sale-surface' : ''}`}
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
                    ) : null}
                  </Pressable>
                );
              })
            ) : (
              <Text className="px-3 py-6 text-center" tone="muted" variant="captionMedium">
                No countries found
              </Text>
            )}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}
