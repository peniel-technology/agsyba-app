import type { PropsWithChildren } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import Animated, { SlideInLeft, SlideInRight } from 'react-native-reanimated';

import { Screen } from '@/components/layouts';
import { AuthHeader } from '@/features/auth/components/AuthHeader';
import { AuthTabs, type AuthTab } from '@/features/auth/components/AuthTabs';
import type { AuthTransitionDirection } from '@/features/auth/utils/authTransition';
import { motion } from '@/theme';

interface AuthPageLayoutProps extends PropsWithChildren {
  activeTab?: AuthTab;
  onBackPress: () => void;
  onLoginPress?: () => void;
  onRegisterPress?: () => void;
  transitionDirection?: AuthTransitionDirection;
  transitionKey?: string;
}

export function AuthPageLayout({
  activeTab,
  children,
  onBackPress,
  onLoginPress,
  onRegisterPress,
  transitionDirection,
  transitionKey,
}: AuthPageLayoutProps) {
  const enteringAnimation =
    transitionDirection === 'forward'
      ? SlideInRight.duration(motion.screenSlideTransitionMs)
      : transitionDirection === 'back'
        ? SlideInLeft.duration(motion.screenSlideTransitionMs)
        : undefined;

  return (
    <Screen
      className="bg-surface"
      includeBottomInset={false}
      padded={false}
      safeAreaClassName="bg-surface"
    >
      <AuthHeader onBackPress={onBackPress} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        className="flex-1"
      >
        <Animated.View
          className="flex-1"
          entering={enteringAnimation}
          key={transitionKey ?? transitionDirection ?? 'static'}
        >
          <ScrollView
            className="flex-1 bg-surface"
            contentContainerClassName="gap-8 px-6 pb-10 pt-6"
            keyboardDismissMode="on-drag"
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            {activeTab && onLoginPress && onRegisterPress ? (
              <AuthTabs
                activeTab={activeTab}
                onLoginPress={onLoginPress}
                onRegisterPress={onRegisterPress}
              />
            ) : null}
            {children}
          </ScrollView>
        </Animated.View>
      </KeyboardAvoidingView>
    </Screen>
  );
}
