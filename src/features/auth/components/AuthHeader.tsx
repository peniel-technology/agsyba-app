import Svg, { Path } from 'react-native-svg';
import { Pressable, View } from 'react-native';

import { AgsybaLogo } from '@/components/common/AgsybaLogo';

interface AuthHeaderProps {
  onBackPress: () => void;
}

export function AuthHeader({ onBackPress }: AuthHeaderProps) {
  return (
    <View className="h-14 flex-row items-center justify-between border-b border-subtle-border bg-surface px-4">
      <Pressable
        accessibilityLabel="Go back"
        accessibilityRole="button"
        className="h-6 w-[26px] items-center justify-center active:opacity-70"
        onPress={onBackPress}
      >
        <Svg accessible={false} fill="none" height={24} viewBox="0 0 26 24" width={26}>
          <Path
            d="M11.8672 21L1.86719 12L11.8672 3"
            stroke="#1A1A1A"
            strokeLinecap="round"
            strokeWidth={2.5}
          />
        </Svg>
      </Pressable>
      <View className="absolute inset-x-0 items-center">
        <AgsybaLogo height={16} width={112} />
      </View>
      <View className="size-10" />
    </View>
  );
}
