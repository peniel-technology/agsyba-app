import { Pressable, View } from 'react-native';

import { Text } from '@/components/ui/Text';
import { spacing } from '@/theme';

interface ProductSectionHeaderProps {
  onSeeMorePress?: () => void;
  seeMoreLabel?: string;
  title: string;
}

export function ProductSectionHeader({
  onSeeMorePress,
  seeMoreLabel = 'See More',
  title,
}: ProductSectionHeaderProps) {
  return (
    <View className="flex-row items-center justify-between px-4">
      <Text className="capitalize" variant="sectionHeading">
        {title}
      </Text>
      <Pressable
        accessibilityLabel={`${seeMoreLabel} ${title}`}
        accessibilityRole={onSeeMorePress ? 'button' : undefined}
        accessibilityState={{ disabled: !onSeeMorePress }}
        className="min-h-10 justify-center active:opacity-70"
        disabled={!onSeeMorePress}
        hitSlop={spacing[1]}
        onPress={onSeeMorePress}
      >
        <Text className="uppercase" tone="brand" variant="captionStrong">
          {seeMoreLabel}
        </Text>
      </Pressable>
    </View>
  );
}
