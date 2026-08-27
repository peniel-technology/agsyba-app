import { CheckCircle2 } from 'lucide-react-native';
import { View } from 'react-native';

import { Text } from '@/components/ui/Text';
import { colors, iconSizes, iconStrokeWidths } from '@/theme';
import type { Customer } from '@/types/customer';

interface ProfileFieldProps {
  label: string;
  value: string;
}

function ProfileField({ label, value }: ProfileFieldProps) {
  return (
    <View className="min-w-0 flex-1 gap-1">
      <Text className="uppercase" tone="muted" variant="micro">
        {label}
      </Text>
      <Text numberOfLines={1} variant="label">
        {value}
      </Text>
    </View>
  );
}

interface ProfileInformationCardProps {
  customer: Customer;
}

export function ProfileInformationCard({ customer }: ProfileInformationCardProps) {
  return (
    <View className="gap-4 rounded-lg border border-border bg-surface p-4">
      <View className="flex-row gap-4">
        <ProfileField label="First Name" value={customer.first_name || 'Not provided'} />
        <ProfileField label="Last Name" value={customer.last_name || 'Not provided'} />
      </View>

      <View className="h-px bg-subtle-border" />

      <View className="gap-1">
        <Text className="uppercase" tone="muted" variant="micro">
          Email
        </Text>
        <View className="flex-row items-center gap-1.5">
          <Text className="flex-1" numberOfLines={1} variant="label">
            {customer.email}
          </Text>
          <CheckCircle2
            color={colors.success}
            size={iconSizes.small}
            strokeWidth={iconStrokeWidths.regular}
          />
        </View>
      </View>

      <View className="h-px bg-subtle-border" />

      <ProfileField label="Phone" value={customer.phone || 'Not provided'} />
    </View>
  );
}
