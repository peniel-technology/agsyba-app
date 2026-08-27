import { zodResolver } from '@hookform/resolvers/zod';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Check } from 'lucide-react-native';
import { Controller, type FieldErrors, useForm } from 'react-hook-form';
import { useCallback, useState } from 'react';
import { Pressable, View } from 'react-native';

import { Text } from '@/components/ui/Text';
import { routes } from '@/constants/routes';
import { AuthDivider } from '@/features/auth/components/AuthDivider';
import { AuthPageLayout } from '@/features/auth/components/AuthPageLayout';
import { AuthPasswordField } from '@/features/auth/components/AuthPasswordField';
import { type SocialProvider } from '@/features/auth/components/AuthProviderButton';
import { AuthTextField } from '@/features/auth/components/AuthTextField';
import { SocialAuthButtons } from '@/features/auth/components/SocialAuthButtons';
import { useGoogleLogin, useLogin } from '@/features/auth/hooks/useAuthMutations';
import { useRedirectAuthenticatedUser } from '@/features/auth/hooks/useRedirectAuthenticatedUser';
import { loginSchema, type LoginFormValues } from '@/features/auth/schemas/loginSchema';
import {
  getAuthTransitionDirection,
  getAuthTransitionKey,
} from '@/features/auth/utils/authTransition';
import { getErrorMessage } from '@/features/auth/utils/getErrorMessage';
import { triggerValidationFeedback } from '@/features/auth/utils/triggerValidationFeedback';
import { useToastStore } from '@/stores/useToastStore';
import { colors, iconSizes, iconStrokeWidths } from '@/theme';

export function LoginScreen() {
  const router = useRouter();
  const isAuthenticated = useRedirectAuthenticatedUser();
  const params = useLocalSearchParams();
  const transitionDirection = getAuthTransitionDirection(params.transition);
  const transitionKey = getAuthTransitionKey(params.transitionId);
  const googleLoginMutation = useGoogleLogin();
  const loginMutation = useLogin();
  const showToast = useToastStore((state) => state.showToast);
  const [rememberMe, setRememberMe] = useState(true);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { control, formState, handleSubmit } = useForm<LoginFormValues>({
    defaultValues: { email: '', password: '' },
    mode: 'onTouched',
    resolver: zodResolver(loginSchema),
  });

  const handleBackPress = useCallback(() => {
    if (router.canGoBack()) {
      router.back();
      return;
    }

    router.replace(routes.home);
  }, [router]);

  const handleLogin = handleSubmit(
    async (values) => {
      try {
        const response = await loginMutation.mutateAsync(values);
        showToast({ message: response.message, title: 'Login successful', tone: 'success' });
        router.replace(routes.home);
      } catch (error) {
        showToast({
          message: getErrorMessage(error, 'Something went wrong. Please try again.'),
          title: 'Login failed',
          tone: 'error',
        });
      }
    },
    (formErrors: FieldErrors<LoginFormValues>) => {
      const message = formErrors.email?.message ?? formErrors.password?.message;

      triggerValidationFeedback();
      showToast({
        message: typeof message === 'string' ? message : 'Check your login details.',
        title: 'Check your details',
        tone: 'error',
      });
    },
  );

  const openForgotPassword = useCallback(() => {
    router.replace({
      params: { transition: 'forward', transitionId: String(Date.now()) },
      pathname: routes.forgotPassword,
    });
  }, [router]);

  const showUnavailableMessage = useCallback(
    (provider: SocialProvider) => {
      const providerName = provider.charAt(0).toUpperCase() + provider.slice(1);
      showToast({
        message: `${providerName} sign-in is not configured for the mobile app yet.`,
        title: `${providerName} login unavailable`,
        tone: 'info',
      });
    },
    [showToast],
  );

  const handleSocialProviderPress = useCallback(
    (provider: SocialProvider) => {
      if (provider !== 'google') {
        showUnavailableMessage(provider);
        return;
      }

      void googleLoginMutation
        .mutateAsync()
        .then((response) => {
          showToast({ message: response.message, title: 'Login successful', tone: 'success' });
          router.replace(routes.home);
        })
        .catch((error: unknown) => {
          showToast({
            message: getErrorMessage(error, 'Google sign-in is unavailable. Please try again.'),
            title: 'Google login failed',
            tone: 'error',
          });
        });
    },
    [googleLoginMutation, router, showToast, showUnavailableMessage],
  );

  const isSubmitting =
    formState.isSubmitting || loginMutation.isPending || googleLoginMutation.isPending;

  if (isAuthenticated) {
    return null;
  }

  return (
    <AuthPageLayout
      activeTab="login"
      onBackPress={handleBackPress}
      onLoginPress={() => router.replace(routes.login)}
      onRegisterPress={() => router.replace(routes.register)}
      transitionDirection={transitionDirection}
      transitionKey={transitionKey}
    >
      <View className="gap-2">
        <Text variant="display">Good to see you again</Text>
        <Text tone="muted" variant="caption">
          Please enter your details to login
        </Text>
      </View>

      <View className="gap-5">
        <Controller
          control={control}
          name="email"
          render={({ field }) => (
            <AuthTextField
              autoCapitalize="none"
              autoCorrect={false}
              error={formState.errors.email?.message}
              keyboardType="email-address"
              label="Email Address"
              onBlur={field.onBlur}
              onChangeText={field.onChange}
              onSubmitEditing={() => void handleLogin()}
              placeholder="Enter your email address"
              returnKeyType="next"
              textContentType="emailAddress"
              value={field.value}
            />
          )}
        />
        <Controller
          control={control}
          name="password"
          render={({ field }) => (
            <AuthPasswordField
              error={formState.errors.password?.message}
              isVisible={isPasswordVisible}
              label="Password"
              onBlur={field.onBlur}
              onChangeText={field.onChange}
              onSubmitEditing={() => void handleLogin()}
              placeholder="Enter your password"
              returnKeyType="done"
              textContentType="password"
              onToggleVisibility={() => setIsPasswordVisible((visible) => !visible)}
              value={field.value}
            />
          )}
        />

        <View className="flex-row items-center justify-between">
          <Pressable
            accessibilityLabel="Remember me"
            accessibilityRole="checkbox"
            accessibilityState={{ checked: rememberMe }}
            className="flex-row items-center gap-2 active:opacity-70"
            onPress={() => setRememberMe((checked) => !checked)}
          >
            <View
              className={`size-4 items-center justify-center rounded-sm border ${rememberMe ? 'border-order-action bg-sale-surface' : 'border-neutral-400 bg-surface'}`}
            >
              {rememberMe ? (
                <Check
                  accessible={false}
                  color={colors.orderAction}
                  size={iconSizes.tiny}
                  strokeWidth={iconStrokeWidths.emphasized}
                />
              ) : null}
            </View>
            <Text variant="captionMedium">Remember me</Text>
          </Pressable>
          <Pressable
            accessibilityLabel="Forgot password"
            accessibilityRole="button"
            className="active:opacity-70"
            onPress={openForgotPassword}
          >
            <Text tone="orderAction" variant="captionStrong">
              Forgot password?
            </Text>
          </Pressable>
        </View>

        <Pressable
          accessibilityLabel="Login"
          accessibilityRole="button"
          accessibilityState={{ disabled: isSubmitting }}
          className="min-h-12 items-center justify-center rounded-sm bg-order-action p-4 active:opacity-85 disabled:opacity-50"
          disabled={isSubmitting}
          onPress={() => void handleLogin()}
        >
          <Text className="uppercase" tone="brandForeground" variant="label">
            {isSubmitting ? 'Logging in...' : 'Login'}
          </Text>
        </Pressable>
      </View>

      <AuthDivider />

      <View className="gap-3">
        <SocialAuthButtons disabled={isSubmitting} onProviderPress={handleSocialProviderPress} />
      </View>

      <Text className="text-center leading-4" tone="muted" variant="caption">
        By signing in you agree to our Terms of Service and Privacy Policy
      </Text>
    </AuthPageLayout>
  );
}
