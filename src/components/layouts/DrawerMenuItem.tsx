import { ChevronDown, ChevronRight } from 'lucide-react-native';
import { memo } from 'react';
import { Pressable, View } from 'react-native';

import { Text } from '@/components/ui/Text';
import { colors, iconSizes, iconStrokeWidths } from '@/theme';
import type { DrawerItemId, DrawerMenuItemConfig } from '@/types/drawer';

interface DrawerMenuItemProps {
  item: DrawerMenuItemConfig;
  onPress?: (itemId: DrawerItemId) => void;
}

export const DrawerMenuItem = memo(function DrawerMenuItem({ item, onPress }: DrawerMenuItemProps) {
  const Icon = item.icon;
  const isBrand = item.tone === 'brand';
  const isMuted = item.tone === 'muted';
  const iconColor = isBrand ? colors.brand : isMuted ? colors.muted : colors.text;
  const textTone = isBrand ? 'brand' : isMuted ? 'muted' : 'default';
  const isEnabled = onPress !== undefined;

  return (
    <>
      {item.dividerBefore ? <View className="h-px bg-subtle-border" /> : null}
      <Pressable
        accessibilityLabel={item.label}
        accessibilityRole="button"
        accessibilityState={{ disabled: !isEnabled }}
        className={`min-h-10 flex-row items-center justify-between active:bg-subtle-surface ${
          item.inset ? 'pl-11 pr-4' : 'px-4'
        }`}
        disabled={!isEnabled}
        onPress={isEnabled ? () => onPress(item.id) : undefined}
      >
        <View className="flex-row items-center gap-3">
          {Icon ? (
            <Icon
              accessible={false}
              color={iconColor}
              size={iconSizes.compact}
              strokeWidth={iconStrokeWidths.subtle}
            />
          ) : null}
          <Text tone={textTone} variant="label">
            {item.label}
          </Text>
        </View>

        <View className="flex-row items-center gap-1">
          {item.value ? (
            <Text tone="muted" variant="label">
              {item.value}
            </Text>
          ) : null}
          {item.badge ? (
            <View className="min-h-4 min-w-4 items-center justify-center rounded-full bg-brand px-1.5">
              <Text tone="brandForeground" variant="badge">
                {item.badge}
              </Text>
            </View>
          ) : null}
          {item.disclosure === 'expand' ? (
            <ChevronDown
              accessible={false}
              color={colors.muted}
              size={iconSizes.small}
              strokeWidth={iconStrokeWidths.subtle}
            />
          ) : null}
          {item.disclosure === 'navigate' ? (
            <ChevronRight
              accessible={false}
              color={colors.muted}
              size={iconSizes.small}
              strokeWidth={iconStrokeWidths.subtle}
            />
          ) : null}
        </View>
      </Pressable>
    </>
  );
});
