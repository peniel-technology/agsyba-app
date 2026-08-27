import { Image } from 'expo-image';
import { UserRound } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { View } from 'react-native';

import { colors, iconSizes, iconStrokeWidths, motion } from '@/theme';
import { getCustomerAvatarUrl } from '@/features/profile/utils/getCustomerAvatarUrl';
import type { Customer } from '@/types/customer';

interface ProfileAvatarProps {
  customer: Customer;
  imageUri?: string | null;
  size?: 'hero' | 'profile';
}

function getDisplayName(customer: Customer): string {
  const name = [customer.first_name, customer.last_name]
    .filter((value): value is string => Boolean(value?.trim()))
    .join(' ');

  return name || customer.email;
}

export function ProfileAvatar({ customer, imageUri, size = 'hero' }: ProfileAvatarProps) {
  const avatarUrl = imageUri === undefined ? getCustomerAvatarUrl(customer) : imageUri;
  const [avatarLoadFailed, setAvatarLoadFailed] = useState(false);
  const dimensionClassName = size === 'profile' ? 'size-24' : 'size-16';
  const iconSize = size === 'profile' ? iconSizes.extraLarge : iconSizes.large;

  useEffect(() => {
    setAvatarLoadFailed(false);
  }, [avatarUrl]);

  return (
    <View className={`${dimensionClassName} overflow-hidden rounded-full bg-sale-surface`}>
      {avatarUrl && !avatarLoadFailed ? (
        <Image
          accessibilityLabel={`${getDisplayName(customer)} profile picture`}
          accessible
          className={dimensionClassName}
          contentFit="cover"
          onError={() => setAvatarLoadFailed(true)}
          source={{ uri: avatarUrl }}
          transition={motion.imageTransitionMs}
        />
      ) : (
        <View className={`${dimensionClassName} items-center justify-center`}>
          <UserRound
            accessible={false}
            color={colors.brand}
            size={iconSize}
            strokeWidth={iconStrokeWidths.regular}
          />
        </View>
      )}
    </View>
  );
}
