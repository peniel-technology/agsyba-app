import type { PropsWithChildren } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native';

import { Screen } from '@/components/layouts';
import { AuthHeader } from '@/features/auth/components/AuthHeader';
import { AuthTabs, type AuthTab } from '@/features/auth/components/AuthTabs';

interface AuthPageLayoutProps extends PropsWithChildren {
  activeTab: AuthTab;
  onBackPress: () => void;
  onLoginPress: () => void;
  onRegisterPress: () => void;
}

export function AuthPageLayout({
  activeTab,
  children,
  onBackPress,
  onLoginPress,
  onRegisterPress,
}: AuthPageLayoutProps) {
  return (
    <Screen className="bg-surface" includeBottomInset={false} padded={false}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        className="flex-1"
      >
        <AuthHeader onBackPress={onBackPress} />
        <ScrollView
          className="flex-1 bg-surface"
          contentContainerClassName="gap-8 px-6 pb-10 pt-6"
          keyboardDismissMode="on-drag"
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <AuthTabs
            activeTab={activeTab}
            onLoginPress={onLoginPress}
            onRegisterPress={onRegisterPress}
          />
          {children}
        </ScrollView>
      </KeyboardAvoidingView>
    </Screen>
  );
}
