import { View } from 'react-native';

import type { ReactNode } from 'react';

import { ContactIconButton } from '@/components/contact/ContactIconButton';

export interface ContactSocialLinksProps {
  items: readonly {
    id: string;
    icon: ReactNode;
    label: string;
    onPress?: () => void;
  }[];
}

export function ContactSocialLinks({ items }: ContactSocialLinksProps) {
  return (
    <View className="flex-row items-start gap-3">
      {items.map((item) => (
        <ContactIconButton
          accessibilityLabel={item.label}
          icon={item.icon}
          key={item.id}
          onPress={item.onPress}
        />
      ))}
    </View>
  );
}
