import { Pencil, UserRound } from 'lucide-react-native';
import { Pressable, View } from 'react-native';

import { Text } from '@/components/ui/Text';
import { profileData } from '@/features/profile/constants/profileData';
import { colors, iconSizes, iconStrokeWidths, spacing } from '@/theme';

interface ProfileHeroProps {
  onEditPress: () => void;
}

export function ProfileHero({ onEditPress }: ProfileHeroProps) {
  return (
    <View className="gap-4 border-b border-subtle-border bg-surface p-4">
      <View className="flex-row items-center gap-4">
        <View className="size-16 items-center justify-center rounded-full bg-sale-surface">
          <UserRound
            color={colors.brand}
            size={iconSizes.large}
            strokeWidth={iconStrokeWidths.regular}
          />
        </View>
        <View className="flex-1 gap-1">
          <Text variant="title">{profileData.displayName}</Text>
          <Text tone="muted" variant="caption">
            {profileData.memberSince}
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
