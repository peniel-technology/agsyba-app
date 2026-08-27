import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, type FieldErrors, useForm } from 'react-hook-form';
import { useCallback } from 'react';
import { Pressable, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

import { Text } from '@/components/ui/Text';
import { config } from '@/constants/config';
import { routes } from '@/constants/routes';
import { AuthBreadcrumbs } from '@/features/auth/components/AuthBreadcrumbs';
import { AuthPageLayout } from '@/features/auth/components/AuthPageLayout';
import { AuthTextField } from '@/features/auth/components/AuthTextField';
import { useForgotPassword } from '@/features/auth/hooks/useAuthMutations';
import {
  forgotPasswordSchema,
  type ForgotPasswordFormValues,
} from '@/features/auth/schemas/forgotPasswordSchema';
import {
  getAuthTransitionDirection,
  getAuthTransitionKey,
} from '@/features/auth/utils/authTransition';
import { getErrorMessage } from '@/features/auth/utils/getErrorMessage';
import { triggerValidationFeedback } from '@/features/auth/utils/triggerValidationFeedback';
import { useToastStore } from '@/stores/useToastStore';

export function ForgotPasswordScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const transitionDirection = getAuthTransitionDirection(params.transition);
  const transitionKey = getAuthTransitionKey(params.transitionId);
  const showToast = useToastStore((state) => state.showToast);
  const forgotPasswordMutation = useForgotPassword();
  const {
    control,
    formState: { errors, isSubmitting: formIsSubmitting },
    handleSubmit,
  } = useForm<ForgotPasswordFormValues>({
    defaultValues: { email: '' },
    mode: 'onTouched',
    resolver: zodResolver(forgotPasswordSchema),
  });

  const handleBackPress = useCallback(() => {
    router.replace({
      params: { transition: 'back', transitionId: String(Date.now()) },
      pathname: routes.login,
    });
  }, [router]);

  const handleFormSubmit = useCallback(
    async ({ email }: ForgotPasswordFormValues) => {
      try {
        const response = await forgotPasswordMutation.mutateAsync({
          countryCode: config.defaultCountryCode,
          email,
        });
        showToast({
          message: response.message,
          title: 'Reset link sent',
          tone: 'success',
        });
      } catch (error) {
        showToast({
          message: getErrorMessage(error, 'Unable to send the reset link.'),
          title: 'Reset request failed',
          tone: 'error',
        });
      }
    },
    [forgotPasswordMutation, showToast],
  );
  const handleInvalidSubmit = useCallback(
    (formErrors: FieldErrors<ForgotPasswordFormValues>) => {
      const message = formErrors.email?.message;

      triggerValidationFeedback();
      showToast({
        message: typeof message === 'string' ? message : 'Enter a valid email address.',
        title: 'Check your email',
        tone: 'error',
      });
    },
    [showToast],
  );
  const submitResetRequest = handleSubmit(handleFormSubmit, handleInvalidSubmit);
  const isSubmitting = formIsSubmitting || forgotPasswordMutation.isPending;

  return (
    <AuthPageLayout
      onBackPress={handleBackPress}
      transitionDirection={transitionDirection}
      transitionKey={transitionKey}
    >
      <AuthBreadcrumbs currentLabel="Forgot Password" onLoginPress={handleBackPress} />

      <View className="gap-3">
        <Text variant="display">Forgot your password?</Text>
        <Text className="text-sm leading-5" tone="muted" variant="caption">
          Enter your email address and we&apos;ll send you a link to reset your password.
        </Text>
      </View>

      <View className="gap-6">
        <Controller
          control={control}
          name="email"
          render={({ field }) => (
            <AuthTextField
              autoCapitalize="none"
              autoCorrect={false}
              error={errors.email?.message}
              keyboardType="email-address"
              label="Email Address"
              onBlur={field.onBlur}
              onChangeText={field.onChange}
              onSubmitEditing={() => void submitResetRequest()}
              placeholder="Enter your email address"
              returnKeyType="done"
              textContentType="emailAddress"
              value={field.value}
            />
          )}
        />

        <Pressable
          accessibilityLabel="Send reset link"
          accessibilityRole="button"
          accessibilityState={{ disabled: isSubmitting }}
          className="items-center justify-center rounded-sm bg-order-action p-4 active:opacity-85 disabled:opacity-50"
          disabled={isSubmitting}
          onPress={() => void submitResetRequest()}
        >
          <Text className="uppercase" tone="brandForeground" variant="label">
            Send Reset Link
          </Text>
        </Pressable>
      </View>

      <View className="items-center">
        <Text className="text-center text-sm leading-5" tone="muted" variant="caption">
          Remember your password?{' '}
          <Text
            accessibilityLabel="Login"
            accessibilityRole="link"
            className="text-order-action underline"
            onPress={handleBackPress}
            variant="captionStrong"
          >
            Login
          </Text>
        </Text>
      </View>
    </AuthPageLayout>
  );
}
