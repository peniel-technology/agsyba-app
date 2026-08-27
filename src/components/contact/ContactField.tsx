import type { PropsWithChildren } from 'react';
import { View } from 'react-native';

import { Text } from '@/components/ui/Text';

export interface ContactFieldProps extends PropsWithChildren {
  error?: string;
  label: string;
}

export function ContactField({ children, error, label }: ContactFieldProps) {
  return (
    <View className="w-full gap-1.5">
      <Text variant="captionStrong">{label}</Text>
      {children}
      {error ? (
        <Text accessibilityRole="alert" tone="error" variant="detail">
          {error}
        </Text>
      ) : null}
    </View>
  );
}
