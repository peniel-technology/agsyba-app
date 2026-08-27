import { ChevronDown, ChevronUp } from 'lucide-react-native';
import { useCallback, useEffect, useState } from 'react';
import { LayoutAnimation, Platform, Pressable, ScrollView, UIManager, View } from 'react-native';

import { ContactField } from '@/components/contact/ContactField';
import { Text } from '@/components/ui/Text';
import { colors } from '@/theme/colors';

export interface ContactDropdownProps {
  label: string;
  value: string;
  placeholder: string;
  options: readonly string[];
  onSelect: (value: string) => void;
  onBlur?: () => void;
  error?: string;
}

export function ContactDropdown({
  label,
  error,
  onBlur,
  value,
  placeholder,
  options,
  onSelect,
}: ContactDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selectedValue = value || placeholder;
  const [fieldHeight, setFieldHeight] = useState(44);

  useEffect(() => {
    if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }, []);

  const toggleDropdown = useCallback(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    if (isOpen) {
      onBlur?.();
    }
    setIsOpen((current) => !current);
  }, [isOpen, onBlur]);

  const closeDropdown = useCallback(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsOpen(false);
  }, []);

  return (
    <ContactField error={error} label={label}>
      <View className="relative">
        <Pressable
          accessibilityRole="button"
          accessibilityHint={error}
          accessibilityState={{ expanded: isOpen }}
          className={`h-11 w-full flex-row items-center justify-between rounded-sm border bg-white px-4 ${error ? 'border-error' : 'border-zinc-100'}`}
          onLayout={(event) => {
            setFieldHeight(Math.round(event.nativeEvent.layout.height));
          }}
          onPress={toggleDropdown}
        >
          <Text
            className={`text-sm font-manrope ${value ? 'text-neutral-900' : 'text-neutral-500'}`}
          >
            {selectedValue}
          </Text>
          {isOpen ? (
            <ChevronUp color={colors.muted} size={16} strokeWidth={1.5} />
          ) : (
            <ChevronDown color={colors.muted} size={16} strokeWidth={1.5} />
          )}
        </Pressable>
        {isOpen ? (
          <ScrollView
            accessibilityLabel={`Select ${label}`}
            className="absolute left-0 right-0 rounded-sm border border-zinc-100 bg-white"
            style={{ top: Math.max(fieldHeight - 1, 0), zIndex: 50, elevation: 30 }}
            keyboardShouldPersistTaps="handled"
            nestedScrollEnabled
            showsVerticalScrollIndicator={false}
          >
            {options.map((option) => {
              const isSelected = option === selectedValue;

              return (
                <Pressable
                  accessibilityRole="button"
                  accessibilityState={{ selected: isSelected }}
                  className="h-11 w-full flex-row items-center px-4"
                  key={option}
                  onPress={() => {
                    onSelect(option);
                    onBlur?.();
                    closeDropdown();
                  }}
                >
                  <Text
                    className={`text-sm font-manrope ${isSelected ? 'text-neutral-900' : 'text-neutral-500'}`}
                  >
                    {option}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>
        ) : null}
      </View>
    </ContactField>
  );
}
