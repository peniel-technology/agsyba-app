import { Pressable, View } from 'react-native';

import { Text } from '@/components/ui/Text';
import type { ProductColorOption } from '@/features/products/types/productDetail';

interface ProductColorSelectorProps {
  colors: readonly ProductColorOption[];
  onColorChange: (colorId: string) => void;
  selectedColorId: string;
}

export function ProductColorSelector({
  colors,
  onColorChange,
  selectedColorId,
}: ProductColorSelectorProps) {
  const selectedColor = colors.find((color) => color.id === selectedColorId) ?? colors[0];

  return (
    <View className="gap-3 px-4">
      <Text className="uppercase" variant="captionStrong">
        Color: {selectedColor?.label ?? 'Not selected'}
      </Text>
      <View className="flex-row items-center gap-3.5">
        {colors.map((color) => {
          const isSelected = color.id === selectedColorId;

          return (
            <Pressable
              accessibilityLabel={`Select ${color.label} color`}
              accessibilityRole="button"
              accessibilityState={{ selected: isSelected }}
              className={`size-7 items-center justify-center rounded-full ${
                isSelected ? 'border-2 border-brand' : ''
              }`}
              key={color.id}
              onPress={() => onColorChange(color.id)}
            >
              <View className={`size-6 rounded-full ${color.swatchClassName}`} />
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
