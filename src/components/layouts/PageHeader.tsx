import { ArrowLeft } from 'lucide-react-native';
import { Pressable, View } from 'react-native';

import { Text } from '@/components/ui/Text';
import { colors, iconSizes, iconStrokeWidths, spacing } from '@/theme';

interface PageHeaderProps {
  onBackPress?: () => void;
  title: string;
}

export function PageHeader({ onBackPress, title }: PageHeaderProps) {
  return (
    <View
      accessibilityRole="header"
      className="h-14 flex-row items-center border-b border-subtle-border bg-surface px-2"
    >
      <Pressable
        accessibilityLabel="Go back"
        accessibilityRole="button"
        accessibilityState={{ disabled: !onBackPress }}
        className="size-10 items-center justify-center rounded-full active:bg-subtle-surface"
        disabled={!onBackPress}
        hitSlop={spacing[1]}
        onPress={onBackPress}
      >
        <ArrowLeft
          accessible={false}
          color={colors.text}
          size={iconSizes.medium}
          strokeWidth={iconStrokeWidths.regular}
        />
      </Pressable>
      <View pointerEvents="none" className="absolute inset-x-0 items-center justify-center">
        <Text variant="bodyStrong">{title}</Text>
      </View>
    </View>
  );
}
