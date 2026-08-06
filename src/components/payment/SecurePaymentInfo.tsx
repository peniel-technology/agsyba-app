import { Lock } from 'lucide-react-native';
import { memo } from 'react';
import { View } from 'react-native';

import { Text } from '@/components/ui/Text';
import { colors, iconSizes, iconStrokeWidths } from '@/theme';

export const SecurePaymentInfo = memo(function SecurePaymentInfo() {
  return (
    <View className="flex-row items-center gap-2 mt-2">
      <Lock
        color={colors.success}
        size={iconSizes.small}
        strokeWidth={iconStrokeWidths.emphasized}
      />
      <Text className="text-xs" tone="muted" variant="caption">
        Secured with 128-bit SSL encryption.
      </Text>
    </View>
  );
});
