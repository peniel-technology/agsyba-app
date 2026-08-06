import { View } from 'react-native';
import { type ReactNode } from 'react';

import { ContactIconButton } from './ContactIconButton';

export interface ContactSocialLinksProps {
  items: readonly {
    id: string;
    icon: ReactNode;
    onPress?: () => void;
  }[];
}

export function ContactSocialLinks({ items }: ContactSocialLinksProps) {
  return (
    <View className="flex-row items-start gap-3">
      {items.map((item) => (
        <ContactIconButton icon={item.icon} key={item.id} onPress={item.onPress} />
      ))}
    </View>
  );
}
