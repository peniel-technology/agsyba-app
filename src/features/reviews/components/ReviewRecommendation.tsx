import { ThumbsDown, ThumbsUp } from 'lucide-react-native';
import { Pressable, View } from 'react-native';

import { Text } from '@/components/ui/Text';
import { colors, iconSizes, iconStrokeWidths } from '@/theme';

export type Recommendation = 'yes' | 'no';

interface ReviewRecommendationProps {
  onChange: (value: Recommendation) => void;
  value: Recommendation;
}

export function ReviewRecommendation({ onChange, value }: ReviewRecommendationProps) {
  return (
    <View className="gap-3">
      <Text variant="title">Would you recommend this product?</Text>
      <View className="flex-row gap-3">
        <Pressable
          accessibilityLabel="Yes, I would recommend this product"
          accessibilityRole="button"
          accessibilityState={{ selected: value === 'yes' }}
          className={`flex-1 flex-row items-center justify-center gap-2 rounded-full border px-4 py-3 active:opacity-70 ${
            value === 'yes' ? 'border-order-action bg-sale-surface' : 'border-border bg-surface'
          }`}
          onPress={() => onChange('yes')}
        >
          <ThumbsUp
            accessible={false}
            color={value === 'yes' ? colors.orderAction : colors.muted}
            size={iconSizes.compact}
            strokeWidth={iconStrokeWidths.regular}
          />
          <Text tone={value === 'yes' ? 'orderAction' : 'muted'} variant="label">
            Yes
          </Text>
        </Pressable>
        <Pressable
          accessibilityLabel="No, I would not recommend this product"
          accessibilityRole="button"
          accessibilityState={{ selected: value === 'no' }}
          className={`flex-1 flex-row items-center justify-center gap-2 rounded-full border px-4 py-3 active:opacity-70 ${
            value === 'no' ? 'border-order-action bg-sale-surface' : 'border-border bg-surface'
          }`}
          onPress={() => onChange('no')}
        >
          <ThumbsDown
            accessible={false}
            color={value === 'no' ? colors.orderAction : colors.muted}
            size={iconSizes.compact}
            strokeWidth={iconStrokeWidths.regular}
          />
          <Text tone={value === 'no' ? 'orderAction' : 'muted'} variant="label">
            No
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
