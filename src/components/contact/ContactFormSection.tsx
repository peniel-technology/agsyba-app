import { View } from 'react-native';

import { ContactCheckbox } from '@/components/contact/ContactCheckbox';
import { ContactDropdown } from '@/components/contact/ContactDropdown';
import { ContactPrimaryButton } from '@/components/contact/ContactPrimaryButton';
import { ContactTextArea } from '@/components/contact/ContactTextArea';
import { ContactTextField } from '@/components/contact/ContactTextField';
import { Text } from '@/components/ui/Text';
import type { ContactFormData, ContactFormFieldId, ContactFormValues } from '@/data/contactForm';

type ContactFormSectionProps = {
  data: ContactFormData;
  values: ContactFormValues;
  onChange: (fieldId: ContactFormFieldId | 'agreement', value: string) => void;
  onSubmit: () => void;
  loading?: boolean;
};

export function ContactFormSection({
  data,
  values,
  onChange,
  onSubmit,
  loading = false,
}: ContactFormSectionProps) {
  const isAgreementChecked = values.agreement === 'true';

  return (
    <View className="w-full flex-col gap-6 p-6">
      <View className="flex-col gap-1.5">
        <Text className="text-xl font-manrope-bold text-neutral-900" variant="heading">
          {data.title}
        </Text>
        <Text className="leading-5 text-sm font-manrope text-neutral-500">{data.subtitle}</Text>
      </View>

      <View className="flex-col gap-4">
        {data.fields.map((field) => {
          if (field.type === 'dropdown') {
            return (
              <ContactDropdown
                key={field.id}
                label={field.label}
                onSelect={(value) => {
                  onChange(field.id, value);
                }}
                options={field.options}
                placeholder={field.placeholder}
                value={values[field.id]}
              />
            );
          }

          if (field.type === 'textarea') {
            return (
              <ContactTextArea
                key={field.id}
                label={field.label}
                onChangeText={(value) => {
                  onChange(field.id, value);
                }}
                placeholder={field.placeholder}
                value={values[field.id]}
              />
            );
          }

          return (
            <ContactTextField
              key={field.id}
              keyboardType={field.keyboardType}
              label={field.label}
              onChangeText={(value) => {
                onChange(field.id, value);
              }}
              placeholder={field.placeholder}
              value={values[field.id]}
            />
          );
        })}

        <ContactCheckbox
          checked={isAgreementChecked}
          label={data.agreement}
          onToggle={() => {
            onChange('agreement', isAgreementChecked ? 'false' : 'true');
          }}
        />

        <ContactPrimaryButton loading={loading} onPress={onSubmit} title={data.buttonText} />

        <Text className="text-center text-xs font-manrope text-neutral-500">{data.footer}</Text>
      </View>
    </View>
  );
}
