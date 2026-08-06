import { memo } from 'react';
import { Check } from 'lucide-react-native';
import { View } from 'react-native';

import { colors, iconStrokeWidths } from '@/theme';

export const SuccessBadge = memo(function SuccessBadge() {
  return (
    <View className="size-20 items-center justify-center rounded-full bg-success">
      <View className="size-9 items-center justify-center">
        <Check color={colors.brandForeground} size={24} strokeWidth={iconStrokeWidths.emphasized} />
      </View>
    </View>
  );
});
