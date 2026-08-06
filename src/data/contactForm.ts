import type { KeyboardTypeOptions } from 'react-native';

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
  options: string[];
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

export type ContactFormFieldId = ContactFormData['fields'][number]['id'];

export interface ContactFormValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  agreement: 'true' | 'false';
}

export const contactFormData: ContactFormData = {
  title: 'Send Us a Message',
  subtitle: "Fill in the form below and we'll get back to you within 24 hours",

  fields: [
    {
      id: 'firstName',
      type: 'text',
      label: 'First Name',
      keyboardType: 'default',
      placeholder: 'Jane',
    },
    {
      id: 'lastName',
      type: 'text',
      label: 'Last Name',
      keyboardType: 'default',
      placeholder: 'Smith',
    },
    {
      id: 'email',
      type: 'email',
      label: 'Email Address',
      keyboardType: 'email-address',
      placeholder: 'jane@example.com',
    },
    {
      id: 'phone',
      type: 'phone',
      label: 'Phone Number',
      keyboardType: 'phone-pad',
      placeholder: '+91 000 000 0000',
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
