import '@/global.css';

import { InstrumentSerif_400Regular } from '@expo-google-fonts/instrument-serif';
import type {
  BottomTabBarProps as NavigationBottomTabBarProps,
  BottomTabNavigationOptions,
} from '@react-navigation/bottom-tabs';
import { QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import { Tabs } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useMemo } from 'react';
import { Easing, useWindowDimensions } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  Manrope_400Regular,
  Manrope_500Medium,
  Manrope_600SemiBold,
  Manrope_700Bold,
  Manrope_800ExtraBold,
} from '@expo-google-fonts/manrope';

import { queryClient } from '@/lib/queryClient';
import { AppTabBar } from '@/components/layouts/AppTabBar';
import { colors, motion } from '@/theme';

void SplashScreen.preventAutoHideAsync();

const homeTabOptions = { title: 'Home' } as const;
const categoryTabOptions = { title: 'Category' } as const;
const footwearCollectionTabOptions = { href: null, title: 'Footwear' } as const;
const kidsCollectionTabOptions = { href: null, title: "Kids' Collection" } as const;
const mensCollectionTabOptions = { href: null, title: "Men's Collection" } as const;
const productDetailTabOptions = { href: null, title: 'Product Details' } as const;
const productFiltersTabOptions = { href: null, title: 'Filters' } as const;
const shoppingBagTabOptions = { href: null, title: 'Shopping Bag' } as const;
const womensCollectionTabOptions = { href: null, title: "Women's Collection" } as const;

function createHorizontalSlideInterpolator(
  screenWidth: number,
): NonNullable<BottomTabNavigationOptions['sceneStyleInterpolator']> {
  return ({ current }) => ({
    sceneStyle: {
      transform: [
        {
          translateX: current.progress.interpolate({
            inputRange: [-1, 0, 1],
            outputRange: [-screenWidth, 0, screenWidth],
          }),
        },
      ],
    },
  });
}

function createTabScreenOptions(screenWidth: number): BottomTabNavigationOptions {
  return {
    animation: 'shift',
    freezeOnBlur: false,
    headerShown: false,
    lazy: true,
    sceneStyle: { backgroundColor: colors.background },
    sceneStyleInterpolator: createHorizontalSlideInterpolator(screenWidth),
    transitionSpec: {
      animation: 'timing',
      config: {
        duration: motion.screenSlideTransitionMs,
        easing: Easing.bezier(0.2, 0, 0, 1),
      },
    },
  };
}

function renderTabBar(props: NavigationBottomTabBarProps) {
  return <AppTabBar {...props} />;
}

export default function RootLayout() {
  const { width: screenWidth } = useWindowDimensions();
  const [fontsLoaded, fontError] = useFonts({
    InstrumentSerif_400Regular,
    Manrope_400Regular,
    Manrope_500Medium,
    Manrope_600SemiBold,
    Manrope_700Bold,
    Manrope_800ExtraBold,
  });
  const tabScreenOptions = useMemo(() => createTabScreenOptions(screenWidth), [screenWidth]);

  useEffect(() => {
    if (fontsLoaded || fontError) {
      void SplashScreen.hideAsync();
    }
  }, [fontError, fontsLoaded]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <GestureHandlerRootView className="flex-1">
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          <Tabs
            detachInactiveScreens={false}
            tabBar={renderTabBar}
            screenOptions={tabScreenOptions}
          >
            <Tabs.Screen name="index" options={homeTabOptions} />
            <Tabs.Screen name="category" options={categoryTabOptions} />
            <Tabs.Screen name="footwear-collection" options={footwearCollectionTabOptions} />
            <Tabs.Screen name="kids-collection" options={kidsCollectionTabOptions} />
            <Tabs.Screen name="mens-collection" options={mensCollectionTabOptions} />
            <Tabs.Screen name="product-detail" options={productDetailTabOptions} />
            <Tabs.Screen name="product-filters" options={productFiltersTabOptions} />
            <Tabs.Screen name="shopping-bag" options={shoppingBagTabOptions} />
            <Tabs.Screen name="womens-collection" options={womensCollectionTabOptions} />
          </Tabs>
        </QueryClientProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
