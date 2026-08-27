import { zodResolver } from '@hookform/resolvers/zod';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Controller, type FieldErrors, useForm, useWatch } from 'react-hook-form';
import { useCallback, useEffect, useState } from 'react';
import { Pressable, View } from 'react-native';

import { Text } from '@/components/ui/Text';
import { routes } from '@/constants/routes';
import { AuthBreadcrumbs } from '@/features/auth/components/AuthBreadcrumbs';
import { AuthPageLayout } from '@/features/auth/components/AuthPageLayout';
import { AuthPasswordField } from '@/features/auth/components/AuthPasswordField';
import { useResetPassword } from '@/features/auth/hooks/useAuthMutations';
import { PasswordStrengthIndicator } from '@/features/auth/components/PasswordStrengthIndicator';
import {
  createNewPasswordSchema,
  type CreateNewPasswordFormValues,
} from '@/features/auth/schemas/createNewPasswordSchema';
import { getErrorMessage } from '@/features/auth/utils/getErrorMessage';
import { triggerValidationFeedback } from '@/features/auth/utils/triggerValidationFeedback';
import { useToastStore } from '@/stores/useToastStore';

export function CreateNewPasswordScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ token?: string | string[] }>();
  const resetToken = typeof params.token === 'string' ? params.token : (params.token?.[0] ?? '');
  const resetPasswordMutation = useResetPassword();
  const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const showToast = useToastStore((state) => state.showToast);
  const {
    control,
    formState: { errors, isSubmitting: formIsSubmitting },
    handleSubmit,
    setValue,
  } = useForm<CreateNewPasswordFormValues>({
    defaultValues: {
      confirmPassword: '',
      newPassword: '',
      token: resetToken,
    },
    mode: 'onTouched',
    resolver: zodResolver(createNewPasswordSchema),
  });
  const newPassword = useWatch({ control, name: 'newPassword' });
  const isSubmitting = formIsSubmitting || resetPasswordMutation.isPending;

  useEffect(() => {
    setValue('token', resetToken);
  }, [resetToken, setValue]);

  const handleBackPress = useCallback(() => {
    router.replace(routes.forgotPassword);
  }, [router]);

  const handleFormSubmit = useCallback(
    async (values: CreateNewPasswordFormValues) => {
      try {
        const response = await resetPasswordMutation.mutateAsync({
          confirmPassword: values.confirmPassword,
          password: values.newPassword,
          token: values.token,
        });
        showToast({
          message: response.message,
          title: 'Password updated',
          tone: 'success',
        });
        router.replace(routes.login);
      } catch (error) {
        showToast({
          message: getErrorMessage(error, 'Unable to reset your password.'),
          title: 'Password reset failed',
          tone: 'error',
        });
      }
    },
    [resetPasswordMutation, router, showToast],
  );
  const handleInvalidSubmit = useCallback(
    (formErrors: FieldErrors<CreateNewPasswordFormValues>) => {
      const message =
        formErrors.token?.message ??
        formErrors.newPassword?.message ??
        formErrors.confirmPassword?.message;

      triggerValidationFeedback();
      showToast({
        message: typeof message === 'string' ? message : 'Check your password details.',
        title: 'Password needs attention',
        tone: 'error',
      });
    },
    [showToast],
  );
  const submitResetRequest = handleSubmit(handleFormSubmit, handleInvalidSubmit);

  return (
    <AuthPageLayout onBackPress={handleBackPress}>
      <AuthBreadcrumbs
        currentLabel="Reset Password"
        onLoginPress={() => router.replace(routes.login)}
      />

      <View className="gap-3">
        <Text variant="display">Create new password</Text>
        <Text className="text-sm leading-5" tone="muted" variant="caption">
          Your new password must be different from previously used passwords.
        </Text>
      </View>

      <View className="gap-6">
        <Controller
          control={control}
          name="newPassword"
          render={({ field }) => (
            <AuthPasswordField
              error={errors.newPassword?.message}
              isVisible={isNewPasswordVisible}
              label="New Password"
              onBlur={field.onBlur}
              onChangeText={field.onChange}
              onSubmitEditing={() => void submitResetRequest()}
              placeholder="Enter your new password"
              returnKeyType="next"
              textContentType="newPassword"
              onToggleVisibility={() => setIsNewPasswordVisible((visible) => !visible)}
              value={field.value}
            />
          )}
        />

        <PasswordStrengthIndicator password={newPassword} />

        <Controller
          control={control}
          name="confirmPassword"
          render={({ field }) => (
            <AuthPasswordField
              error={errors.confirmPassword?.message}
              isVisible={isConfirmPasswordVisible}
              label="Confirm Password"
              onBlur={field.onBlur}
              onChangeText={field.onChange}
              onSubmitEditing={() => void submitResetRequest()}
              placeholder="Confirm your new password"
              returnKeyType="done"
              textContentType="newPassword"
              onToggleVisibility={() => setIsConfirmPasswordVisible((visible) => !visible)}
              value={field.value}
            />
          )}
        />

        <Pressable
          accessibilityLabel="Reset password"
          accessibilityRole="button"
          accessibilityState={{ disabled: isSubmitting }}
          className="items-center justify-center rounded-sm bg-order-action p-4 active:opacity-85 disabled:opacity-50"
          disabled={isSubmitting}
          onPress={() => void submitResetRequest()}
        >
          <Text className="uppercase" tone="brandForeground" variant="label">
            Reset Password
          </Text>
        </Pressable>
      </View>

      <View className="items-center">
        <Pressable
          accessibilityLabel="Back to Login"
          accessibilityRole="link"
          className="active:opacity-70"
          onPress={() => router.replace(routes.login)}
        >
          <Text className="text-sm underline" tone="orderAction" variant="captionStrong">
            Back to Login
          </Text>
        </Pressable>
      </View>
    </AuthPageLayout>
  );
}
