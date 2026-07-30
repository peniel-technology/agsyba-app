import { Pressable, View } from 'react-native';

import { Text } from '@/components/ui/Text';
import { spacing } from '@/theme';

interface ProductSizeSelectorProps {
  onSizeChange: (size: string) => void;
  onSizeGuidePress?: () => void;
  selectedSize: string;
  sizes: readonly string[];
}

export function ProductSizeSelector({
  onSizeChange,
  onSizeGuidePress,
  selectedSize,
  sizes,
}: ProductSizeSelectorProps) {
  return (
    <View className="gap-3 px-4">
      <View className="flex-row items-center justify-between">
        <Text className="uppercase" variant="captionStrong">
          Size: {selectedSize}
        </Text>
        <Pressable
          accessibilityLabel="Open size guide"
          accessibilityRole="button"
          accessibilityState={{ disabled: !onSizeGuidePress }}
          className="active:opacity-70"
          disabled={!onSizeGuidePress}
          hitSlop={spacing[2]}
          onPress={onSizeGuidePress}
        >
          <Text className="underline" tone="brand" variant="caption">
            Size Guide
          </Text>
        </Pressable>
      </View>

      <View className="flex-row items-center gap-2">
        {sizes.map((size) => {
          const isSelected = size === selectedSize;

          return (
            <Pressable
              accessibilityLabel={`Select size ${size}`}
              accessibilityRole="button"
              accessibilityState={{ selected: isSelected }}
              className={`min-h-10 flex-1 items-center justify-center rounded-sm border ${
                isSelected
                  ? 'border-foreground bg-foreground'
                  : 'border-subtle-border bg-subtle-surface'
              }`}
              key={size}
              onPress={() => onSizeChange(size)}
            >
              <Text
                tone={isSelected ? 'brandForeground' : 'default'}
                variant={isSelected ? 'captionStrong' : 'captionMedium'}
              >
                {size}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
