import { Filter, Grid2X2, List } from 'lucide-react-native';
import { Pressable, View } from 'react-native';

import { Text } from '@/components/ui/Text';
import { colors, iconSizes, iconStrokeWidths, spacing } from '@/theme';

interface ShopToolbarProps {
  isGridView: boolean;
  onFilterPress: () => void;
  onGridPress: () => void;
  onListPress: () => void;
}

export function ShopToolbar({
  isGridView,
  onFilterPress,
  onGridPress,
  onListPress,
}: ShopToolbarProps) {
  return (
    <View className="flex-row items-center justify-end border-b border-t border-subtle-border px-4 py-2">
      <View className="flex-row items-center gap-3">
        <Pressable
          accessibilityLabel="Filter products"
          accessibilityRole="button"
          className="flex-row items-center gap-1.5 rounded-full bg-brand px-3.5 py-1.5 active:opacity-70"
          hitSlop={spacing[1]}
          onPress={onFilterPress}
        >
          <Filter
            color={colors.brandForeground}
            size={iconSizes.small}
            strokeWidth={iconStrokeWidths.regular}
          />
          <Text tone="brandForeground" variant="microStrong">
            Filter
          </Text>
        </Pressable>

        <View className="flex-row items-center gap-2">
          <Pressable
            accessibilityLabel="Grid view"
            accessibilityRole="button"
            accessibilityState={{ selected: isGridView }}
            className="size-8 items-center justify-center rounded-full active:bg-subtle-surface"
            hitSlop={spacing[1]}
            onPress={onGridPress}
          >
            <Grid2X2
              color={isGridView ? colors.brand : colors.muted}
              size={iconSizes.small}
              strokeWidth={iconStrokeWidths.regular}
            />
          </Pressable>
          <Pressable
            accessibilityLabel="List view"
            accessibilityRole="button"
            accessibilityState={{ selected: !isGridView }}
            className="size-8 items-center justify-center rounded-full active:bg-subtle-surface"
            hitSlop={spacing[1]}
            onPress={onListPress}
          >
            <List
              color={!isGridView ? colors.brand : colors.muted}
              size={iconSizes.small}
              strokeWidth={iconStrokeWidths.regular}
            />
          </Pressable>
        </View>
      </View>
    </View>
  );
}
