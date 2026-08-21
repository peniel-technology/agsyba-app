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
const deliveryAddressTabOptions = { href: null, title: 'Add Delivery Address' } as const;
const contactTabOptions = { href: null, title: 'Contact' } as const;
const couponsOffersTabOptions = { href: null, title: 'Coupons & Offers' } as const;
const aboutTabOptions = { href: null, title: 'About' } as const;
const orderSuccessTabOptions = { href: null, title: 'Order Success' } as const;
const ordersReturnsTabOptions = { href: null, title: 'Orders & Returns' } as const;
const paymentTabOptions = { href: null, title: 'Payment' } as const;
const footwearCollectionTabOptions = { href: null, title: 'Footwear' } as const;
const kidsCollectionTabOptions = { href: null, title: "Kids' Collection" } as const;
const loginTabOptions = { href: null, title: 'Login' } as const;
const mensCollectionTabOptions = { href: null, title: "Men's Collection" } as const;
const notificationsTabOptions = { href: null, title: 'Notifications' } as const;
const productDetailTabOptions = { href: null, title: 'Product Details' } as const;
const productFiltersTabOptions = { href: null, title: 'Filters' } as const;
const rateReviewTabOptions = { href: null, title: 'Rate & Review' } as const;
const registerTabOptions = { href: null, title: 'Register' } as const;
const returnExchangeTabOptions = { href: null, title: 'Return / Exchange' } as const;
const returnExchangeMethodTabOptions = {
  href: null,
  title: 'Return / Exchange Method',
} as const;
const returnExchangeReviewTabOptions = {
  href: null,
  title: 'Return / Exchange Review',
} as const;
const returnExchangeSuccessTabOptions = {
  href: null,
  title: 'Return Request Submitted',
} as const;
const savedCardsTabOptions = { href: null, title: 'Saved Cards' } as const;
const searchTabOptions = { href: null, title: 'Search' } as const;
const profileTabOptions = { title: 'My Profile' } as const;
const shopTabOptions = { title: 'Shop' } as const;
const shoppingBagTabOptions = { href: null, title: 'Shopping Bag' } as const;
const trackOrderTabOptions = { href: null, title: 'Track Order' } as const;
const wishlistTabOptions = { href: null, title: 'Wishlist' } as const;
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
            outputRange: [screenWidth, 0, -screenWidth],
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
            <Tabs.Screen name="login" options={loginTabOptions} />
            <Tabs.Screen name="mens-collection" options={mensCollectionTabOptions} />
            <Tabs.Screen name="notifications" options={notificationsTabOptions} />
            <Tabs.Screen name="product-detail" options={productDetailTabOptions} />
            <Tabs.Screen name="product-filters" options={productFiltersTabOptions} />
            <Tabs.Screen name="rate-review" options={rateReviewTabOptions} />
            <Tabs.Screen name="register" options={registerTabOptions} />
            <Tabs.Screen name="return-exchange" options={returnExchangeTabOptions} />
            <Tabs.Screen name="return-exchange-method" options={returnExchangeMethodTabOptions} />
            <Tabs.Screen name="return-exchange-review" options={returnExchangeReviewTabOptions} />
            <Tabs.Screen name="return-exchange-success" options={returnExchangeSuccessTabOptions} />
            <Tabs.Screen name="saved-cards" options={savedCardsTabOptions} />
            <Tabs.Screen name="search" options={searchTabOptions} />
            <Tabs.Screen name="orders-returns" options={ordersReturnsTabOptions} />
            <Tabs.Screen name="profile" options={profileTabOptions} />
            <Tabs.Screen name="shop" options={shopTabOptions} />
            <Tabs.Screen name="shopping-bag" options={shoppingBagTabOptions} />
            <Tabs.Screen name="track-order" options={trackOrderTabOptions} />
            <Tabs.Screen name="wishlist" options={wishlistTabOptions} />
            <Tabs.Screen name="about" options={aboutTabOptions} />
            <Tabs.Screen name="contact" options={contactTabOptions} />
            <Tabs.Screen name="coupons-offers" options={couponsOffersTabOptions} />
            <Tabs.Screen name="delivery-address" options={deliveryAddressTabOptions} />
            <Tabs.Screen name="payment" options={paymentTabOptions} />
            <Tabs.Screen name="order-success" options={orderSuccessTabOptions} />
            <Tabs.Screen name="womens-collection" options={womensCollectionTabOptions} />
          </Tabs>
        </QueryClientProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
