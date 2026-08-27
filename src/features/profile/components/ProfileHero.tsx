import { Pencil } from 'lucide-react-native';
import { Pressable, View } from 'react-native';

import { Text } from '@/components/ui/Text';
import { colors, iconSizes, iconStrokeWidths, spacing } from '@/theme';
import type { Customer } from '@/types/customer';
import { ProfileAvatar } from '@/features/profile/components/ProfileAvatar';

interface ProfileHeroProps {
  customer: Customer;
  onEditPress: () => void;
}

function getDisplayName(customer: Customer): string {
  const name = [customer.first_name, customer.last_name]
    .filter((value): value is string => Boolean(value?.trim()))
    .join(' ');

  return name || customer.email;
}

function getMemberSince(createdAt: string | null | undefined): string {
  if (!createdAt) {
    return 'AGSYBA member';
  }

  const date = new Date(createdAt);
  if (Number.isNaN(date.getTime())) {
    return 'AGSYBA member';
  }

  return `Member since ${date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}`;
}

export function ProfileHero({ customer, onEditPress }: ProfileHeroProps) {
  return (
    <View className="gap-4 border-b border-subtle-border bg-surface p-4">
      <View className="flex-row items-center gap-4">
        <ProfileAvatar customer={customer} />
        <View className="flex-1 gap-1">
          <Text variant="title">{getDisplayName(customer)}</Text>
          <Text tone="muted" variant="caption">
            {getMemberSince(customer.created_at)}
          </Text>
        </View>
        <Pressable
          accessibilityLabel="Edit profile"
          accessibilityRole="button"
          className="flex-row items-center gap-1 rounded-sm border border-brand px-3 py-1.5 active:bg-sale-surface"
          hitSlop={spacing[1]}
          onPress={onEditPress}
        >
          <Pencil
            accessible={false}
            color={colors.brand}
            size={iconSizes.small}
            strokeWidth={iconStrokeWidths.regular}
          />
          <Text className="uppercase" tone="brand" variant="microStrong">
            Edit
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
