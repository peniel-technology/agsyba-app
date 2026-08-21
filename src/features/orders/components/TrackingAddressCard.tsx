import { StyleSheet, View } from 'react-native';

import { Text } from '@/components/ui/Text';

interface TrackingAddressCardProps {
  address: string;
  label: string;
  name: string;
  phone: string;
}

const styles = StyleSheet.create({
  addressBadge: {
    borderRadius: 4,
  },
});

export function TrackingAddressCard({ address, label, name, phone }: TrackingAddressCardProps) {
  return (
    <View className="gap-3 rounded-md border border-border bg-surface p-4">
      <View className="flex-row items-center justify-between gap-3">
        <Text variant="bodyStrong">Delivering to</Text>
        <View className="bg-success-surface px-2.5 py-1" style={styles.addressBadge}>
          <Text className="uppercase" tone="success" variant="microStrong">
            {label}
          </Text>
        </View>
      </View>
      <View className="h-px bg-subtle-border" />
      <View className="gap-1">
        <Text variant="label">{name}</Text>
        <Text tone="muted" variant="caption">
          {address}
        </Text>
        <Text tone="muted" variant="caption">
          {phone}
        </Text>
      </View>
    </View>
  );
}
