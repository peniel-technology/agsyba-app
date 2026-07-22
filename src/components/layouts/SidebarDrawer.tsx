import { User, X } from 'lucide-react-native';
import { useEffect } from 'react';
import { BackHandler, Pressable, ScrollView, useWindowDimensions, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AgsybaLogo } from '@/components/common/AgsybaLogo';
import { DrawerSearchForm } from '@/components/forms/DrawerSearchForm';
import { DrawerMenuItem } from '@/components/layouts/DrawerMenuItem';
import { DrawerPromotion } from '@/components/layouts/DrawerPromotion';
import { Text } from '@/components/ui/Text';
import { drawerMenuItems } from '@/constants/drawerMenuItems';
import { colors, iconSizes, iconStrokeWidths, layout, motion, spacing } from '@/theme';
import type { DrawerItemId } from '@/types/drawer';

interface SidebarDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onItemPress?: (itemId: DrawerItemId) => void;
  onLoginPress?: () => void;
  onPromotionPress?: () => void;
  onSearchSubmit?: (query: string) => void;
}

export function SidebarDrawer({
  isOpen,
  onClose,
  onItemPress,
  onLoginPress,
  onPromotionPress,
  onSearchSubmit,
}: SidebarDrawerProps) {
  const { width: windowWidth } = useWindowDimensions();
  const drawerWidth = Math.min(layout.sidebarDrawerWidth, windowWidth - spacing[12]);
  const progress = useSharedValue(isOpen ? 1 : 0);

  useEffect(() => {
    progress.value = withTiming(isOpen ? 1 : 0, {
      duration: motion.drawerTransitionMs,
    });
  }, [isOpen, progress]);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const subscription = BackHandler.addEventListener('hardwareBackPress', () => {
      onClose();
      return true;
    });

    return () => subscription.remove();
  }, [isOpen, onClose]);

  const backdropStyle = useAnimatedStyle(() => ({
    opacity: progress.value,
  }));
  const drawerStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: (progress.value - 1) * drawerWidth }],
  }));

  return (
    <View
      accessibilityElementsHidden={!isOpen}
      className="absolute inset-0 z-50"
      importantForAccessibility={isOpen ? 'auto' : 'no-hide-descendants'}
      pointerEvents={isOpen ? 'auto' : 'none'}
    >
      <Animated.View className="absolute inset-0" style={backdropStyle}>
        <Pressable
          accessibilityLabel="Close navigation menu"
          accessibilityRole="button"
          className="flex-1 bg-drawer-backdrop/40"
          onPress={onClose}
        />
      </Animated.View>

      <Animated.View
        accessibilityLabel="Navigation menu"
        accessibilityRole="menu"
        className="absolute bottom-0 left-0 top-0 border-r border-subtle-border bg-surface"
        style={[{ width: drawerWidth }, drawerStyle]}
      >
        <SafeAreaView className="flex-1" edges={['bottom']}>
          <View className="flex-row items-center justify-between pb-3 pl-5 pr-2.5 pt-5">
            <AgsybaLogo height={16} width={112} />
            <Pressable
              accessibilityLabel="Close navigation menu"
              accessibilityRole="button"
              className="size-10 items-center justify-center rounded-full active:bg-subtle-surface"
              hitSlop={spacing[1]}
              onPress={onClose}
            >
              <X
                accessible={false}
                color={colors.text}
                size={iconSizes.compact}
                strokeWidth={iconStrokeWidths.subtle}
              />
            </Pressable>
          </View>

          <ScrollView
            className="flex-1"
            contentContainerClassName="pb-2"
            keyboardDismissMode="on-drag"
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <Pressable
              accessibilityLabel="Login or sign up"
              accessibilityRole="button"
              accessibilityState={{ disabled: !onLoginPress }}
              className="flex-row items-center gap-4 px-5 py-4 active:bg-subtle-surface"
              disabled={!onLoginPress}
              onPress={onLoginPress}
            >
              <View className="size-12 items-center justify-center rounded-full border border-subtle-border bg-subtle-surface">
                <User
                  accessible={false}
                  color={colors.muted}
                  size={iconSizes.medium}
                  strokeWidth={iconStrokeWidths.emphasized}
                />
              </View>
              <View className="gap-0.5">
                <Text variant="bodyStrong">Hello, Guest</Text>
                <Text tone="brand" variant="captionMedium">
                  Login / Sign up &gt;
                </Text>
              </View>
            </Pressable>

            <DrawerSearchForm onSubmit={onSearchSubmit} />

            <View>
              {drawerMenuItems.map((item) => (
                <DrawerMenuItem item={item} key={item.id} onPress={onItemPress} />
              ))}
            </View>
          </ScrollView>

          <DrawerPromotion onPress={onPromotionPress} />
        </SafeAreaView>
      </Animated.View>
    </View>
  );
}
