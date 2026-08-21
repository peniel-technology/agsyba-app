import {
  Bell,
  ChevronRight,
  CreditCard,
  Gift,
  Heart,
  MapPin,
  Package,
  TicketPercent,
  type LucideIcon,
} from 'lucide-react-native';
import { Pressable, View } from 'react-native';

import { Text } from '@/components/ui/Text';
import {
  profileAccountItems,
  type ProfileAccountItemId,
} from '@/features/profile/constants/profileData';
import { colors, iconSizes, iconStrokeWidths, spacing } from '@/theme';

interface ProfileAccountMenuProps {
  onItemPress: (itemId: ProfileAccountItemId) => void;
}

const itemIcons: Record<ProfileAccountItemId, LucideIcon> = {
  addresses: MapPin,
  coupons: TicketPercent,
  'gift-cards': Gift,
  notifications: Bell,
  orders: Package,
  'saved-cards': CreditCard,
  wishlist: Heart,
};

const orderIconOptions = {
  color: colors.neutral600,
  size: iconSizes.compact,
  strokeWidth: iconStrokeWidths.medium,
} as const;

export function ProfileAccountMenu({ onItemPress }: ProfileAccountMenuProps) {
  return (
    <View className="overflow-hidden rounded-lg border border-border bg-surface">
      {profileAccountItems.map((item, index) => {
        const Icon = itemIcons[item.id];
        const iconOptions = item.id === 'orders' ? orderIconOptions : undefined;

        return (
          <Pressable
            accessibilityLabel={item.label}
            accessibilityRole="button"
            className={`min-h-12 flex-row items-center justify-between px-4 py-3 active:bg-subtle-surface ${
              index < profileAccountItems.length - 1 ? 'border-b border-subtle-border' : ''
            }`}
            hitSlop={spacing[1]}
            key={item.id}
            onPress={() => onItemPress(item.id)}
          >
            <View className="flex-row items-center gap-3">
              <Icon
                color={iconOptions?.color ?? colors.muted}
                size={iconOptions?.size ?? iconSizes.small}
                strokeWidth={iconOptions?.strokeWidth ?? iconStrokeWidths.regular}
              />
              <Text variant="label">{item.label}</Text>
            </View>
            <ChevronRight
              color={colors.muted}
              size={iconSizes.small}
              strokeWidth={iconStrokeWidths.subtle}
            />
          </Pressable>
        );
      })}
    </View>
  );
}
