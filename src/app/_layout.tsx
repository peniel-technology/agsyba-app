import '@/global.css';

import { InstrumentSerif_400Regular } from '@expo-google-fonts/instrument-serif';
import type {
  BottomTabBarProps as NavigationBottomTabBarProps,
  BottomTabOptionsArgs,
  BottomTabNavigationOptions,
} from '@react-navigation/bottom-tabs';
import type { ParamListBase } from '@react-navigation/native';
import { QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import { Tabs } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback, useEffect, useMemo, useRef } from 'react';
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
import { ToastHost } from '@/components/common/ToastHost';
import { AppTabBar } from '@/components/layouts/AppTabBar';
import { colors, motion } from '@/theme';
import type { TabTransitionState } from '@/types/tabTransition';

void SplashScreen.preventAutoHideAsync();

const homeTabOptions = { title: 'Home' } as const;
const categoryTabOptions = { title: 'Category' } as const;
const deliveryAddressTabOptions = { href: null, title: 'Add Delivery Address' } as const;
const editProfileTabOptions = { href: null, title: 'Edit Profile' } as const;
const contactTabOptions = { href: null, title: 'Contact' } as const;
const couponsOffersTabOptions = { href: null, title: 'Coupons & Offers' } as const;
const createNewPasswordTabOptions = {
  animation: 'none',
  href: null,
  sceneStyleInterpolator: undefined,
  title: 'Create New Password',
} as const;
const forgotPasswordTabOptions = {
  animation: 'none',
  href: null,
  sceneStyleInterpolator: undefined,
  title: 'Forgot Password',
} as const;
const aboutTabOptions = { href: null, title: 'About' } as const;
const orderSuccessTabOptions = { href: null, title: 'Order Success' } as const;
const ordersReturnsTabOptions = { href: null, title: 'Orders & Returns' } as const;
const paymentTabOptions = { href: null, title: 'Payment' } as const;
const footwearCollectionTabOptions = { href: null, title: 'Footwear' } as const;
const kidsCollectionTabOptions = { href: null, title: "Kids' Collection" } as const;
const loginTabOptions = {
  animation: 'none',
  href: null,
  sceneStyleInterpolator: undefined,
  title: 'Login',
} as const;
const mensCollectionTabOptions = { href: null, title: "Men's Collection" } as const;
const notificationsTabOptions = { href: null, title: 'Notifications' } as const;
const productDetailTabOptions = { href: null, title: 'Product Details' } as const;
const productFiltersTabOptions = { href: null, title: 'Filters' } as const;
const rateReviewTabOptions = { href: null, title: 'Rate & Review' } as const;
const registerTabOptions = {
  animation: 'none',
  href: null,
  sceneStyleInterpolator: undefined,
  title: 'Register',
} as const;
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
  routeKey: string,
  transitionState: TabTransitionState,
): NonNullable<BottomTabNavigationOptions['sceneStyleInterpolator']> {
  return ({ current }) => {
    const transition = transitionState.current;
    const fallbackTranslateX = current.progress.interpolate({
      inputRange: [-1, 0, 1],
      outputRange: [-screenWidth, 0, screenWidth],
      extrapolate: 'clamp',
    });

    if (!transition || (routeKey !== transition.fromKey && routeKey !== transition.toKey)) {
      return {
        sceneStyle: {
          transform: [{ translateX: fallbackTranslateX }],
        },
      };
    }

    const isIncomingScene = routeKey === transition.toKey;
    const progressBound = isIncomingScene ? transition.incomingStart : transition.outgoingEnd;
    const isLeftBound = progressBound === -1;

    return {
      sceneStyle: {
        transform: [
          {
            translateX: current.progress.interpolate({
              inputRange: isLeftBound ? [-1, 0] : [0, 1],
              outputRange: isIncomingScene
                ? isLeftBound
                  ? [-screenWidth, 0]
                  : [0, -screenWidth]
                : isLeftBound
                  ? [screenWidth, 0]
                  : [0, screenWidth],
              extrapolate: 'clamp',
            }),
          },
        ],
      },
    };
  };
}

function createTabScreenOptions(
  screenWidth: number,
  transitionState: TabTransitionState,
): (props: BottomTabOptionsArgs<ParamListBase>) => BottomTabNavigationOptions {
  return ({ route }) => ({
    animation: 'shift',
    freezeOnBlur: false,
    headerShown: false,
    lazy: true,
    sceneStyle: { backgroundColor: colors.background },
    sceneStyleInterpolator: createHorizontalSlideInterpolator(
      screenWidth,
      route.key,
      transitionState,
    ),
    transitionSpec: {
      animation: 'timing',
      config: {
        duration: motion.tabSlideTransitionMs,
        easing: Easing.bezier(0.22, 0.61, 0.36, 1),
      },
    },
  });
}

export default function RootLayout() {
  const { width: screenWidth } = useWindowDimensions();
  const tabTransitionState = useRef<TabTransitionState>({
    current: null,
    resetTimer: null,
  }).current;
  const [fontsLoaded, fontError] = useFonts({
    InstrumentSerif_400Regular,
    Manrope_400Regular,
    Manrope_500Medium,
    Manrope_600SemiBold,
    Manrope_700Bold,
    Manrope_800ExtraBold,
  });
  const tabScreenOptions = useMemo(
    () => createTabScreenOptions(screenWidth, tabTransitionState),
    [screenWidth, tabTransitionState],
  );
  const renderTabBar = useCallback(
    (props: NavigationBottomTabBarProps) => (
      <AppTabBar {...props} transitionState={tabTransitionState} />
    ),
    [tabTransitionState],
  );

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
            <Tabs.Screen name="create-new-password" options={createNewPasswordTabOptions} />
            <Tabs.Screen name="forgot-password" options={forgotPasswordTabOptions} />
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
            <Tabs.Screen name="edit-profile" options={editProfileTabOptions} />
            <Tabs.Screen name="payment" options={paymentTabOptions} />
            <Tabs.Screen name="order-success" options={orderSuccessTabOptions} />
            <Tabs.Screen name="womens-collection" options={womensCollectionTabOptions} />
          </Tabs>
          <ToastHost />
        </QueryClientProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
