import type { BlurEvent } from 'react-native';
import { TextInput } from 'react-native';

import { ContactField } from '@/components/contact/ContactField';
import { colors } from '@/theme/colors';

export interface ContactTextAreaProps {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  onBlur?: (event: BlurEvent) => void;
  error?: string;
}

export function ContactTextArea({
  error,
  label,
  onBlur,
  placeholder,
  value,
  onChangeText,
}: ContactTextAreaProps) {
  return (
    <ContactField error={error} label={label}>
      <TextInput
        accessibilityLabel={label}
        accessibilityHint={error}
        className={`min-h-28 rounded-sm border bg-white px-4 py-4 text-sm font-manrope text-neutral-900 ${error ? 'border-error' : 'border-zinc-100'}`}
        multiline
        onBlur={onBlur}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.muted}
        textAlignVertical="top"
        value={value}
      />
    </ContactField>
  );
}
