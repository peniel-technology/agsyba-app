import type { BlurEvent, KeyboardTypeOptions } from 'react-native';
import { TextInput } from 'react-native';

import { ContactField } from '@/components/contact/ContactField';
import { colors } from '@/theme/colors';

export interface ContactTextFieldProps {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  onBlur?: (event: BlurEvent) => void;
  error?: string;
  keyboardType?: KeyboardTypeOptions;
}

export function ContactTextField({
  label,
  placeholder,
  value,
  onChangeText,
  onBlur,
  error,
  keyboardType = 'default',
}: ContactTextFieldProps) {
  return (
    <ContactField error={error} label={label}>
      <TextInput
        accessibilityLabel={label}
        accessibilityHint={error}
        className={`h-11 rounded-sm border bg-white px-4 text-sm font-manrope text-neutral-900 ${error ? 'border-error' : 'border-zinc-100'}`}
        keyboardType={keyboardType}
        onBlur={onBlur}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.muted}
        value={value}
      />
    </ContactField>
  );
}
