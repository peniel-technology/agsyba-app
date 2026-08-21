import { ArrowLeft } from 'lucide-react-native';
import { Pressable, View } from 'react-native';

import { AgsybaLogo } from '@/components/common/AgsybaLogo';
import { colors, iconSizes, iconStrokeWidths } from '@/theme';

interface AuthHeaderProps {
  onBackPress: () => void;
}

export function AuthHeader({ onBackPress }: AuthHeaderProps) {
  return (
    <View className="h-14 flex-row items-center justify-between border-b border-subtle-border bg-surface px-4">
      <Pressable
        accessibilityLabel="Go back"
        accessibilityRole="button"
        className="size-6 items-center justify-center active:opacity-70"
        onPress={onBackPress}
      >
        <ArrowLeft
          accessible={false}
          color={colors.text}
          size={iconSizes.large}
          strokeWidth={iconStrokeWidths.emphasized}
        />
      </Pressable>
      <View className="absolute inset-x-0 items-center">
        <AgsybaLogo height={16} width={112} />
      </View>
      <View className="size-10" />
    </View>
  );
}
