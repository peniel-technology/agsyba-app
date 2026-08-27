import type { KeyboardTypeOptions } from 'react-native';

import type { ContactFormValues } from '@/features/contact/schemas/contactFormSchema';

export type { ContactFormValues } from '@/features/contact/schemas/contactFormSchema';

export interface ContactTextFieldConfig {
  id: 'firstName' | 'lastName' | 'email' | 'phone';
  type: 'text' | 'email' | 'phone';
  label: string;
  placeholder: string;
  keyboardType: KeyboardTypeOptions;
}

export interface ContactDropdownConfig {
  id: 'subject';
  type: 'dropdown';
  label: string;
  placeholder: string;
  options: readonly string[];
  keyboardType?: never;
}

export interface ContactTextAreaConfig {
  id: 'message';
  type: 'textarea';
  label: string;
  placeholder: string;
}

export type ContactFormField =
  ContactTextFieldConfig | ContactDropdownConfig | ContactTextAreaConfig;

export interface ContactFormData {
  title: string;
  subtitle: string;
  fields: readonly ContactFormField[];
  agreement: string;
  buttonText: string;
  footer: string;
}

export type ContactFormFieldId = Exclude<keyof ContactFormValues, 'agreement'>;

export const contactFormData: ContactFormData = {
  title: 'Send Us a Message',
  subtitle: "Fill in the form below and we'll get back to you within 24 hours",

  fields: [
    {
      id: 'firstName',
      type: 'text',
      label: 'First Name',
      keyboardType: 'default',
      placeholder: 'Enter First Name',
    },
    {
      id: 'lastName',
      type: 'text',
      label: 'Last Name',
      keyboardType: 'default',
      placeholder: 'Enter Last Name',
    },
    {
      id: 'email',
      type: 'email',
      label: 'Email Address',
      keyboardType: 'email-address',
      placeholder: 'Enter Email Address',
    },
    {
      id: 'phone',
      type: 'phone',
      label: 'Phone Number',
      keyboardType: 'phone-pad',
      placeholder: 'Enter Phone Number',
    },
    {
      id: 'subject',
      type: 'dropdown',
      label: 'Subject',
      placeholder: 'General Inquiry',
      options: ['General Inquiry', 'Order Support', 'Returns', 'Wholesale', 'Partnership'],
    },
    {
      id: 'message',
      type: 'textarea',
      label: 'Message',
      placeholder: 'Write your message here...',
    },
  ],

  agreement: 'I agree to the Privacy Policy and Terms of Service',
  buttonText: 'SEND MESSAGE',
  footer: 'Your information is safe and will never be shared',
} as const;

export const contactFormDefaultValues = {
  agreement: false,
  email: '',
  firstName: '',
  lastName: '',
  message: '',
  phone: '',
  subject: 'General Inquiry',
} satisfies ContactFormValues;
