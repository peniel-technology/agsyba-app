import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { Check } from 'lucide-react-native';
import { Controller, type FieldErrors, useForm, useWatch } from 'react-hook-form';
import { useCallback, useState } from 'react';
import { Pressable, View } from 'react-native';

import { Text } from '@/components/ui/Text';
import { routes } from '@/constants/routes';
import { AuthDivider } from '@/features/auth/components/AuthDivider';
import { AuthMobileField } from '@/features/auth/components/AuthMobileField';
import { AuthPageLayout } from '@/features/auth/components/AuthPageLayout';
import { AuthPasswordField } from '@/features/auth/components/AuthPasswordField';
import { type SocialProvider } from '@/features/auth/components/AuthProviderButton';
import { AuthTextField } from '@/features/auth/components/AuthTextField';
import { SocialAuthButtons } from '@/features/auth/components/SocialAuthButtons';
import { useGoogleLogin, useRegister } from '@/features/auth/hooks/useAuthMutations';
import { useRedirectAuthenticatedUser } from '@/features/auth/hooks/useRedirectAuthenticatedUser';
import { registerSchema, type RegisterFormValues } from '@/features/auth/schemas/registerSchema';
import { getErrorMessage } from '@/features/auth/utils/getErrorMessage';
import { triggerValidationFeedback } from '@/features/auth/utils/triggerValidationFeedback';
import { useToastStore } from '@/stores/useToastStore';
import { colors, iconSizes, iconStrokeWidths } from '@/theme';

export function RegisterScreen() {
  const router = useRouter();
  const isAuthenticated = useRedirectAuthenticatedUser();
  const googleLoginMutation = useGoogleLogin();
  const registerMutation = useRegister();
  const showToast = useToastStore((state) => state.showToast);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const { control, formState, handleSubmit, setValue } = useForm<RegisterFormValues>({
    defaultValues: {
      acceptedTerms: false,
      confirmPassword: '',
      email: '',
      fullName: '',
      password: '',
      phone: '',
      phoneCountry: '+971',
    },
    mode: 'onTouched',
    resolver: zodResolver(registerSchema),
  });
  const phoneCountry = useWatch({ control, name: 'phoneCountry' });
  const isSubmitting =
    formState.isSubmitting || registerMutation.isPending || googleLoginMutation.isPending;

  const handleBackPress = useCallback(() => {
    if (router.canGoBack()) {
      router.back();
      return;
    }

    router.replace(routes.home);
  }, [router]);

  const handleRegister = handleSubmit(
    async (values) => {
      try {
        const response = await registerMutation.mutateAsync(values);
        showToast({
          message: response.message,
          title: 'Registration successful',
          tone: 'success',
        });
        router.replace(routes.home);
      } catch (error) {
        const message = getErrorMessage(error, 'Something went wrong. Please try again.');
        const requiresVerification = message.toLowerCase().includes('verify');
        showToast({
          message,
          title: requiresVerification ? 'Verify your email' : 'Registration failed',
          tone: requiresVerification ? 'info' : 'error',
        });
      }
    },
    (formErrors: FieldErrors<RegisterFormValues>) => {
      const message =
        formErrors.fullName?.message ??
        formErrors.email?.message ??
        formErrors.phone?.message ??
        formErrors.password?.message ??
        formErrors.confirmPassword?.message ??
        formErrors.acceptedTerms?.message;

      triggerValidationFeedback();
      showToast({
        message: typeof message === 'string' ? message : 'Check your registration details.',
        title: 'Complete your registration',
        tone: 'error',
      });
    },
  );

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
          showToast({
            message: response.message,
            title: 'Login successful',
            tone: 'success',
          });
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

  if (isAuthenticated) {
    return null;
  }

  return (
    <AuthPageLayout
      activeTab="register"
      onBackPress={handleBackPress}
      onLoginPress={() => router.replace(routes.login)}
      onRegisterPress={() => router.replace(routes.register)}
    >
      <View className="gap-2">
        <Text variant="display">Create your account</Text>
        <Text tone="muted" variant="caption">
          Please fill in the details to register
        </Text>
      </View>

      <View className="gap-5">
        <Controller
          control={control}
          name="fullName"
          render={({ field }) => (
            <AuthTextField
              autoCapitalize="words"
              error={formState.errors.fullName?.message}
              label="Full Name"
              onBlur={field.onBlur}
              onChangeText={field.onChange}
              placeholder="Enter your full name"
              returnKeyType="next"
              textContentType="name"
              value={field.value}
            />
          )}
        />
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
              placeholder="Enter your email address"
              returnKeyType="next"
              textContentType="emailAddress"
              value={field.value}
            />
          )}
        />
        <Controller
          control={control}
          name="phone"
          render={({ field }) => (
            <AuthMobileField
              callingCode={phoneCountry}
              error={formState.errors.phone?.message}
              onChangeText={field.onChange}
              onCountryChange={(country) => {
                setValue('phoneCountry', country.callingCode, {
                  shouldDirty: true,
                  shouldTouch: true,
                  shouldValidate: true,
                });
              }}
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
              onSubmitEditing={() => void handleRegister()}
              placeholder="Enter your password"
              returnKeyType="next"
              textContentType="newPassword"
              onToggleVisibility={() => setIsPasswordVisible((visible) => !visible)}
              value={field.value}
            />
          )}
        />
        <Controller
          control={control}
          name="confirmPassword"
          render={({ field }) => (
            <AuthPasswordField
              error={formState.errors.confirmPassword?.message}
              isVisible={isConfirmPasswordVisible}
              label="Confirm Password"
              onBlur={field.onBlur}
              onChangeText={field.onChange}
              onSubmitEditing={() => void handleRegister()}
              placeholder="Confirm your password"
              returnKeyType="done"
              textContentType="newPassword"
              onToggleVisibility={() => setIsConfirmPasswordVisible((visible) => !visible)}
              value={field.value}
            />
          )}
        />

        <Controller
          control={control}
          name="acceptedTerms"
          render={({ field }) => (
            <Pressable
              accessibilityLabel="Agree to Terms and Conditions and Privacy Policy"
              accessibilityRole="checkbox"
              accessibilityState={{ checked: field.value }}
              className="flex-row items-start gap-2.5 active:opacity-70"
              onPress={() => field.onChange(!field.value)}
            >
              <View
                className={`mt-0.5 size-4 items-center justify-center rounded-sm border ${field.value ? 'border-order-action bg-sale-surface' : 'border-border bg-surface'}`}
              >
                {field.value ? (
                  <Check
                    accessible={false}
                    color={colors.orderAction}
                    size={iconSizes.tiny}
                    strokeWidth={iconStrokeWidths.emphasized}
                  />
                ) : null}
              </View>
              <Text className="flex-1 leading-5" variant="caption">
                I agree to the{' '}
                <Text className="text-order-action underline">Terms &amp; Conditions</Text> and{' '}
                <Text className="text-order-action underline">Privacy Policy</Text>
              </Text>
            </Pressable>
          )}
        />

        <Pressable
          accessibilityLabel="Register"
          accessibilityRole="button"
          accessibilityState={{ disabled: isSubmitting }}
          className="min-h-12 items-center justify-center rounded-sm bg-order-action p-4 active:opacity-85 disabled:opacity-50"
          disabled={isSubmitting}
          onPress={() => void handleRegister()}
        >
          <Text className="uppercase" tone="brandForeground" variant="label">
            {isSubmitting ? 'Creating account...' : 'Register'}
          </Text>
        </Pressable>
      </View>

      <AuthDivider />

      <View className="gap-3">
        <SocialAuthButtons disabled={isSubmitting} onProviderPress={handleSocialProviderPress} />
      </View>

      <Text className="text-center leading-4" tone="muted" variant="caption">
        By registering you agree to our Terms of Use and Privacy Policy
      </Text>
    </AuthPageLayout>
  );
}
