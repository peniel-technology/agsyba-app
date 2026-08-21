import { Star } from 'lucide-react-native';
import { Pressable, View } from 'react-native';

import { colors, iconStrokeWidths } from '@/theme';

interface StarRatingProps {
  accessibilityLabel: string;
  onChange: (value: number) => void;
  size?: number;
  value: number;
}

export function StarRating({ accessibilityLabel, onChange, size = 16, value }: StarRatingProps) {
  return (
    <View accessibilityLabel={accessibilityLabel} className="flex-row items-center gap-1">
      {Array.from({ length: 5 }, (_, index) => {
        const starValue = index + 1;
        const isSelected = starValue <= value;

        return (
          <Pressable
            accessibilityLabel={`${accessibilityLabel}: ${starValue} of 5 stars`}
            accessibilityRole="button"
            className="rounded-sm active:opacity-60"
            hitSlop={4}
            key={starValue}
            onPress={() => onChange(starValue)}
          >
            <Star
              accessible={false}
              color={isSelected ? colors.orderAction : colors.border}
              fill="transparent"
              size={size}
              strokeWidth={iconStrokeWidths.emphasized}
            />
          </Pressable>
        );
      })}
    </View>
  );
}
