import { memo } from 'react';
import { ChevronRight } from 'lucide-react-native';
import { Pressable, View } from 'react-native';

import { Text } from '@/components/ui/Text';
import { colors, iconSizes, iconStrokeWidths } from '@/theme';

interface SupportLinkProps {
  label: string;
  onPress: () => void;
}

export const SupportLink = memo(function SupportLink({ label, onPress }: SupportLinkProps) {
  return (
    <Pressable
      accessibilityLabel={label}
      accessibilityRole="button"
      className="flex-row items-center gap-1"
      onPress={onPress}
    >
      <Text className="text-xs" tone="brand" variant="captionStrong">
        {label}
      </Text>
      <View className="size-3.5">
        <ChevronRight
          color={colors.brand}
          size={iconSizes.small}
          strokeWidth={iconStrokeWidths.emphasized}
        />
      </View>
    </Pressable>
  );
});
