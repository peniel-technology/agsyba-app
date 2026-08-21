import { CheckCircle2 } from 'lucide-react-native';
import { View } from 'react-native';

import { Text } from '@/components/ui/Text';
import { profileData } from '@/features/profile/constants/profileData';
import { colors, iconSizes, iconStrokeWidths } from '@/theme';

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

export function ProfileInformationCard() {
  return (
    <View className="gap-4 rounded-lg border border-border bg-surface p-4">
      <View className="flex-row gap-4">
        <ProfileField label="First Name" value={profileData.firstName} />
        <ProfileField label="Last Name" value={profileData.lastName} />
      </View>

      <View className="h-px bg-subtle-border" />

      <View className="gap-1">
        <Text className="uppercase" tone="muted" variant="micro">
          Email
        </Text>
        <View className="flex-row items-center gap-1.5">
          <Text className="flex-1" numberOfLines={1} variant="label">
            {profileData.email}
          </Text>
          <CheckCircle2
            color={colors.success}
            size={iconSizes.small}
            strokeWidth={iconStrokeWidths.regular}
          />
        </View>
      </View>

      <View className="h-px bg-subtle-border" />

      <ProfileField label="Phone" value={profileData.phone} />

      <View className="h-px bg-subtle-border" />

      <View className="flex-row gap-4">
        <ProfileField label="Gender" value={profileData.gender} />
        <ProfileField label="Date of Birth" value={profileData.dateOfBirth} />
      </View>
    </View>
  );
}
