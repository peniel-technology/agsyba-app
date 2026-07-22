import { Grid3X3, Heart, Home, ShoppingBag, UserRound, type LucideIcon } from 'lucide-react-native';
import { useEffect } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Text } from '@/components/ui/Text';
import { colors, iconSizes, iconStrokeWidths, layout, motion, shadows } from '@/theme';

export type BottomTabId = 'home' | 'category' | 'shop' | 'wishlist' | 'account';

interface BottomTabItem {
  icon: LucideIcon;
  id: BottomTabId;
  label: string;
}

interface BottomTabBarProps {
  activeTab: BottomTabId;
  enabledTabs?: readonly BottomTabId[];
  onTabPress?: (tab: BottomTabId) => void;
}

const bottomEdges = ['bottom'] as const;

const bottomTabItems = [
  { icon: Home, id: 'home', label: 'Home' },
  { icon: Grid3X3, id: 'category', label: 'Category' },
  { icon: ShoppingBag, id: 'shop', label: 'Shop' },
  { icon: Heart, id: 'wishlist', label: 'Wishlist' },
  { icon: UserRound, id: 'account', label: 'Account' },
] as const satisfies readonly BottomTabItem[];

const styles = StyleSheet.create({
  bar: {
    elevation: shadows.bottomNavigation.elevation,
    height: layout.bottomTabBarHeight,
    shadowColor: shadows.bottomNavigation.color,
    shadowOffset: { height: shadows.bottomNavigation.offsetY, width: 0 },
    shadowOpacity: shadows.bottomNavigation.opacity,
    shadowRadius: shadows.bottomNavigation.radius,
  },
});

export function BottomTabBar({ activeTab, enabledTabs, onTabPress }: BottomTabBarProps) {
  const activeIndex = bottomTabItems.findIndex((item) => item.id === activeTab);
  const indicatorPosition = useSharedValue(activeIndex);

  useEffect(() => {
    indicatorPosition.value = withTiming(activeIndex, {
      duration: motion.tabIndicatorTransitionMs,
    });
  }, [activeIndex, indicatorPosition]);

  const indicatorStyle = useAnimatedStyle(() => ({
    left: `${(indicatorPosition.value / bottomTabItems.length) * 100}%`,
  }));

  return (
    <SafeAreaView className="bg-surface" edges={bottomEdges}>
      <View
        accessibilityLabel="Primary navigation"
        accessibilityRole="tablist"
        className="flex-row items-center border-t border-subtle-border bg-surface py-2.5"
        style={styles.bar}
      >
        <Animated.View
          accessibilityElementsHidden
          className="absolute top-0 h-0.5 rounded-full bg-brand"
          importantForAccessibility="no-hide-descendants"
          pointerEvents="none"
          style={[{ width: `${100 / bottomTabItems.length}%` }, indicatorStyle]}
        />
        {bottomTabItems.map((item) => {
          const isActive = item.id === activeTab;
          const isEnabled =
            !isActive &&
            onTabPress !== undefined &&
            (enabledTabs === undefined || enabledTabs.includes(item.id));
          const Icon = item.icon;

          return (
            <Pressable
              accessibilityLabel={`${item.label} tab`}
              accessibilityRole="tab"
              accessibilityState={{ disabled: !isEnabled, selected: isActive }}
              className="flex-1 items-center gap-1 active:opacity-70"
              disabled={!isEnabled}
              key={item.id}
              onPress={isEnabled ? () => onTabPress(item.id) : undefined}
            >
              <Icon
                accessible={false}
                color={isActive ? colors.brand : colors.muted}
                size={iconSizes.medium}
                strokeWidth={iconStrokeWidths.regular}
              />
              <Text
                className={isActive ? 'font-manrope-semibold' : ''}
                tone={isActive ? 'brand' : 'muted'}
                variant="detail"
              >
                {item.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </SafeAreaView>
  );
}
