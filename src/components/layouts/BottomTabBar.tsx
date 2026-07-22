import { Grid3X3, Heart, Home, ShoppingBag, UserRound, type LucideIcon } from 'lucide-react-native';
import { Pressable, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Text } from '@/components/ui/Text';
import { colors, iconSizes, iconStrokeWidths, layout, shadows } from '@/theme';

export type BottomTabId = 'home' | 'category' | 'shop' | 'wishlist' | 'account';

interface BottomTabItem {
  icon: LucideIcon;
  id: BottomTabId;
  label: string;
}

interface BottomTabBarProps {
  activeTab: BottomTabId;
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

export function BottomTabBar({ activeTab, onTabPress }: BottomTabBarProps) {
  return (
    <SafeAreaView className="bg-surface" edges={bottomEdges}>
      <View
        accessibilityLabel="Primary navigation"
        accessibilityRole="tablist"
        className="flex-row items-center border-t border-subtle-border bg-surface py-2.5"
        style={styles.bar}
      >
        {bottomTabItems.map((item) => {
          const isActive = item.id === activeTab;
          const Icon = item.icon;

          return (
            <Pressable
              accessibilityLabel={`${item.label} tab`}
              accessibilityRole="tab"
              accessibilityState={{ disabled: !onTabPress, selected: isActive }}
              className="flex-1 items-center gap-1 active:opacity-70"
              disabled={!onTabPress}
              key={item.id}
              onPress={onTabPress ? () => onTabPress(item.id) : undefined}
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
