import { Info } from 'lucide-react-native';
import { View } from 'react-native';

import { Text } from '@/components/ui/Text';
import { colors, iconSizes, iconStrokeWidths } from '@/theme';

export function ReturnPolicyNotice() {
  return (
    <View className="flex-row items-start gap-2.5 rounded-md bg-orange-50 p-3">
      <Info
        accessible={false}
        color={colors.orderAction}
        size={iconSizes.compact}
        strokeWidth={iconStrokeWidths.emphasized}
      />
      <Text className="flex-1" variant="caption">
        <Text variant="captionStrong">Return Policy: </Text>
        Items must be returned within 30 days in original condition.
      </Text>
    </View>
  );
}
