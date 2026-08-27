import type { ContactInformationData } from '@/types/contact';

export type {
  ContactInformationData,
  ContactInformationItem,
  ContactSocialLinkItem,
} from '@/types/contact';

export const contactSupportEmail = 'hello@styara.com';

export const contactInformation: ContactInformationData = {
  title: 'Contact Information',
  subtitle: 'Reach us through any of these channels:',

  items: [
    {
      id: 'address',
      label: 'OUR ADDRESS',
      value:
        'Parvatutech, Office 205, NBO Bank Building, Khalid Bin Waleed St., Bur Dubai Dubai P.O Box: 22725',
      icon: 'map-pin',
      valueSize: 'compact',
    },
    {
      id: 'phone',
      label: 'CALL US',
      value: '+91 123 456 7890',
      icon: 'phone',
    },
    {
      id: 'email',
      label: 'EMAIL US',
      value: contactSupportEmail,
      icon: 'mail',
      valueTone: 'brand',
    },
    {
      id: 'hours',
      label: 'WORKING HOURS',
      value: 'Monday to Saturday, 9:30 AM - 7:00 PM',
      icon: 'clock',
      valueSize: 'compact',
      valueWeight: 'medium',
    },
  ],

  socialLinks: [
    {
      id: 'instagram',
      icon: 'instagram',
      label: 'Instagram',
    },
    {
      id: 'facebook',
      icon: 'facebook',
      label: 'Facebook',
    },
    {
      id: 'mail',
      icon: 'mail',
      label: 'Email',
    },
    {
      id: 'twitter',
      icon: 'twitter',
      label: 'X',
    },
  ],
} as const;
