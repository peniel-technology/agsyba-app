import { Linking } from 'react-native';

import type { ContactFormValues } from '@/features/contact/schemas/contactFormSchema';

export function createContactEmailUrl(recipient: string, values: ContactFormValues): string {
  const body = [
    `Name: ${values.firstName} ${values.lastName}`,
    `Email: ${values.email}`,
    `Phone: ${values.phone}`,
    '',
    values.message,
  ].join('\n');

  return `mailto:${recipient}?subject=${encodeURIComponent(values.subject)}&body=${encodeURIComponent(body)}`;
}

export function openContactEmailDraft(recipient: string, values: ContactFormValues): Promise<void> {
  return Linking.openURL(createContactEmailUrl(recipient, values));
}
