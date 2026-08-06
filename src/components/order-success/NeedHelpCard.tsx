import { memo } from 'react';
import { View } from 'react-native';

import { SupportLink } from '@/components/order-success/SupportLink';
import { Text } from '@/components/ui/Text';

interface SupportLinkItem {
  id: string;
  label: string;
}

interface NeedHelpCardProps {
  links: readonly SupportLinkItem[];
  onLinkPress: (label: string) => void;
}

export const NeedHelpCard = memo(function NeedHelpCard({ links, onLinkPress }: NeedHelpCardProps) {
  return (
    <View className="gap-3 rounded-md shadow-sm border border-border bg-surface p-4">
      <Text className="text-sm" tone="default" variant="captionStrong">
        Need Help?
      </Text>
      <View className="gap-2">
        {links.map((link) => (
          <SupportLink key={link.id} label={link.label} onPress={() => onLinkPress(link.label)} />
        ))}
      </View>
    </View>
  );
});
