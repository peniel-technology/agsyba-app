import { CalendarDays } from 'lucide-react-native';
import { Pressable, View } from 'react-native';

import { Text } from '@/components/ui/Text';
import { colors, iconSizes, iconStrokeWidths } from '@/theme';

interface ReturnPickupDateFieldProps {
  error?: string;
  onPress: () => void;
  value: string;
}

export function ReturnPickupDateField({ error, onPress, value }: ReturnPickupDateFieldProps) {
  return (
    <View className="gap-1.5">
      <Text tone="muted" variant="caption">
        Preferred Pickup Date
      </Text>
      <Pressable
        accessibilityLabel="Preferred pickup date"
        accessibilityRole="button"
        className={`flex-row items-center justify-between rounded-sm border bg-surface p-3 active:bg-subtle-surface ${
          error ? 'border-error' : 'border-border'
        }`}
        onPress={onPress}
      >
        <Text tone={value ? 'default' : 'muted'} variant="body">
          {value || 'Select date'}
        </Text>
        <CalendarDays
          accessible={false}
          color={colors.muted}
          size={iconSizes.compact}
          strokeWidth={iconStrokeWidths.regular}
        />
      </Pressable>
      {error ? (
        <Text accessibilityRole="alert" tone="error" variant="detail">
          {error}
        </Text>
      ) : null}
    </View>
  );
}
