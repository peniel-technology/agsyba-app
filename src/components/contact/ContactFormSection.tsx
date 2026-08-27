import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm, type FieldErrors, type SubmitHandler } from 'react-hook-form';
import { View } from 'react-native';

import { ContactCheckbox } from '@/components/contact/ContactCheckbox';
import { ContactDropdown } from '@/components/contact/ContactDropdown';
import { ContactPrimaryButton } from '@/components/contact/ContactPrimaryButton';
import { ContactTextArea } from '@/components/contact/ContactTextArea';
import { ContactTextField } from '@/components/contact/ContactTextField';
import { Text } from '@/components/ui/Text';
import {
  contactFormDefaultValues,
  type ContactFormData,
  type ContactFormFieldId,
} from '@/data/contactForm';
import {
  contactFormSchema,
  type ContactFormValues,
} from '@/features/contact/schemas/contactFormSchema';

type ContactFormSectionProps = {
  data: ContactFormData;
  onSubmit: SubmitHandler<ContactFormValues>;
  loading?: boolean;
};

function getErrorMessage(
  errors: FieldErrors<ContactFormValues>,
  fieldId: ContactFormFieldId,
): string | undefined {
  const message = errors[fieldId]?.message;

  return typeof message === 'string' ? message : undefined;
}

export function ContactFormSection({ data, onSubmit, loading = false }: ContactFormSectionProps) {
  const {
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<ContactFormValues>({
    defaultValues: contactFormDefaultValues,
    mode: 'onTouched',
    resolver: zodResolver(contactFormSchema),
  });

  return (
    <View className="w-full flex-col gap-6 p-6">
      <View className="flex-col gap-1.5">
        <Text variant="title">{data.title}</Text>
        <Text tone="muted" variant="caption">
          {data.subtitle}
        </Text>
      </View>

      <View className="flex-col gap-4">
        {data.fields.map((field) => {
          const error = getErrorMessage(errors, field.id);

          if (field.type === 'dropdown') {
            return (
              <Controller
                control={control}
                key={field.id}
                name={field.id}
                render={({ field: controllerField }) => (
                  <ContactDropdown
                    error={error}
                    label={field.label}
                    onBlur={controllerField.onBlur}
                    onSelect={controllerField.onChange}
                    options={field.options}
                    placeholder={field.placeholder}
                    value={controllerField.value}
                  />
                )}
              />
            );
          }

          if (field.type === 'textarea') {
            return (
              <Controller
                control={control}
                key={field.id}
                name={field.id}
                render={({ field: controllerField }) => (
                  <ContactTextArea
                    error={error}
                    label={field.label}
                    onBlur={controllerField.onBlur}
                    onChangeText={controllerField.onChange}
                    placeholder={field.placeholder}
                    value={controllerField.value}
                  />
                )}
              />
            );
          }

          return (
            <Controller
              control={control}
              key={field.id}
              name={field.id}
              render={({ field: controllerField }) => (
                <ContactTextField
                  error={error}
                  keyboardType={field.keyboardType}
                  label={field.label}
                  onBlur={controllerField.onBlur}
                  onChangeText={controllerField.onChange}
                  placeholder={field.placeholder}
                  value={controllerField.value}
                />
              )}
            />
          );
        })}

        <Controller
          control={control}
          name="agreement"
          render={({ field }) => (
            <ContactCheckbox
              checked={field.value}
              error={
                typeof errors.agreement?.message === 'string' ? errors.agreement.message : undefined
              }
              label={data.agreement}
              onToggle={() => field.onChange(!field.value)}
            />
          )}
        />

        <ContactPrimaryButton
          loading={loading || isSubmitting}
          onPress={() => void handleSubmit(onSubmit)()}
          title={data.buttonText}
        />

        <Text className="text-center" tone="muted" variant="caption">
          {data.footer}
        </Text>
      </View>
    </View>
  );
}
