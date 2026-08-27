export type ContactInfoIcon = 'map-pin' | 'phone' | 'mail' | 'clock';
export type ContactSocialIconName = 'instagram' | 'facebook' | 'mail' | 'twitter';
export type ContactValueSize = 'compact' | 'regular';
export type ContactValueTone = 'brand' | 'default';
export type ContactValueWeight = 'medium' | 'regular';

export interface ContactInformationItem {
  id: string;
  label: string;
  value: string;
  icon: ContactInfoIcon;
  valueSize?: ContactValueSize;
  valueTone?: ContactValueTone;
  valueWeight?: ContactValueWeight;
}

export interface ContactSocialLinkItem {
  id: string;
  icon: ContactSocialIconName;
  label: string;
  onPress?: () => void;
}

export interface ContactInformationData {
  title: string;
  subtitle: string;
  items: readonly ContactInformationItem[];
  socialLinks: readonly ContactSocialLinkItem[];
}
