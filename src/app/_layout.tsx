import '@/global.css';

import { InstrumentSerif_400Regular } from '@expo-google-fonts/instrument-serif';
import type { BottomTabBarProps as NavigationBottomTabBarProps } from '@react-navigation/bottom-tabs';
import { QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import { Tabs } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
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
const tabScreenOptions = {
  animation: 'fade',
  freezeOnBlur: true,
  headerShown: false,
  lazy: true,
  sceneStyle: { backgroundColor: colors.background },
  transitionSpec: {
    animation: 'timing',
    config: { duration: motion.tabTransitionMs },
  },
} as const;

function renderTabBar(props: NavigationBottomTabBarProps) {
  return <AppTabBar {...props} />;
}

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    InstrumentSerif_400Regular,
    Manrope_400Regular,
    Manrope_500Medium,
    Manrope_600SemiBold,
    Manrope_700Bold,
    Manrope_800ExtraBold,
  });

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
          <Tabs tabBar={renderTabBar} screenOptions={tabScreenOptions}>
            <Tabs.Screen name="index" options={homeTabOptions} />
            <Tabs.Screen name="category" options={categoryTabOptions} />
          </Tabs>
        </QueryClientProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
