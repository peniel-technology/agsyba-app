export interface ContactInformationItem {
  id: string;
  label: string;
  value: string;
  icon: 'map-pin' | 'phone' | 'mail' | 'clock';
  valueColor?: 'primary' | 'default';
}

export interface ContactSocialLinkItem {
  id: string;
  icon: 'instagram' | 'facebook' | 'mail' | 'twitter';
  onPress?: () => void;
}

export interface ContactInformationData {
  title: string;
  subtitle: string;
  items: readonly ContactInformationItem[];
  socialLinks: readonly ContactSocialLinkItem[];
}

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
      value: 'hello@styara.com',
      icon: 'mail',
      valueColor: 'primary',
    },
    {
      id: 'hours',
      label: 'WORKING HOURS',
      value: 'Monday to Saturday, 9:30 AM - 7:00 PM',
      icon: 'clock',
    },
  ],

  socialLinks: [
    {
      id: 'instagram',
      icon: 'instagram',
    },
    {
      id: 'facebook',
      icon: 'facebook',
    },
    {
      id: 'mail',
      icon: 'mail',
    },
    {
      id: 'twitter',
      icon: 'twitter',
    },
  ],
} as const;
