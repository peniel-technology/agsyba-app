import { Check } from 'lucide-react-native';
import { useCallback, useState } from 'react';
import { Alert, Pressable, View } from 'react-native';
import { useRouter } from 'expo-router';

import { Text } from '@/components/ui/Text';
import { routes } from '@/constants/routes';
import { AuthDivider } from '@/features/auth/components/AuthDivider';
import { AuthMobileField } from '@/features/auth/components/AuthMobileField';
import { AuthPageLayout } from '@/features/auth/components/AuthPageLayout';
import { AuthPasswordField } from '@/features/auth/components/AuthPasswordField';
import { type SocialProvider } from '@/features/auth/components/AuthProviderButton';
import { AuthTextField } from '@/features/auth/components/AuthTextField';
import { SocialAuthButtons } from '@/features/auth/components/SocialAuthButtons';
import { colors, iconSizes, iconStrokeWidths } from '@/theme';

interface RegisterErrors {
  confirmPassword?: string;
  email?: string;
  fullName?: string;
  mobileNumber?: string;
  password?: string;
  terms?: string;
}

function validateRegister(
  fullName: string,
  email: string,
  mobileNumber: string,
  password: string,
  confirmPassword: string,
  termsAccepted: boolean,
): RegisterErrors {
  const errors: RegisterErrors = {};

  if (fullName.trim().length < 2) {
    errors.fullName = 'Enter your full name.';
  }

  if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
    errors.email = 'Enter a valid email address.';
  }

  if (!/^\d{7,15}$/.test(mobileNumber.replace(/\D/g, ''))) {
    errors.mobileNumber = 'Enter a valid mobile number.';
  }

  if (password.length < 6) {
    errors.password = 'Password must be at least 6 characters.';
  }

  if (confirmPassword !== password || confirmPassword.length === 0) {
    errors.confirmPassword = 'Passwords must match.';
  }

  if (!termsAccepted) {
    errors.terms = 'Accept the terms to continue.';
  }

  return errors;
}

export function RegisterScreen() {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const [errors, setErrors] = useState<RegisterErrors>({});

  const handleBackPress = useCallback(() => {
    if (router.canGoBack()) {
      router.back();
      return;
    }

    router.replace(routes.home);
  }, [router]);

  const handleRegister = useCallback(() => {
    const nextErrors = validateRegister(
      fullName,
      email,
      mobileNumber,
      password,
      confirmPassword,
      termsAccepted,
    );
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    Alert.alert('Registration ready', 'Connect your account service to complete registration.');
  }, [confirmPassword, email, fullName, mobileNumber, password, termsAccepted]);

  const showUnavailableMessage = useCallback((provider: SocialProvider) => {
    const providerName = provider.charAt(0).toUpperCase() + provider.slice(1);
    Alert.alert(`${providerName} login`, `${providerName} sign-in will be connected here.`);
  }, []);

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
        <AuthTextField
          autoCapitalize="words"
          error={errors.fullName}
          label="Full Name"
          onChangeText={setFullName}
          placeholder="Enter your full name"
          returnKeyType="next"
          value={fullName}
        />
        <AuthTextField
          autoCapitalize="none"
          autoCorrect={false}
          error={errors.email}
          keyboardType="email-address"
          label="Email Address"
          onChangeText={setEmail}
          placeholder="Enter your email address"
          returnKeyType="next"
          value={email}
        />
        <AuthMobileField
          error={errors.mobileNumber}
          onChangeText={setMobileNumber}
          onCountryCodePress={() =>
            Alert.alert('Country code', 'Country code selection will be available soon.')
          }
          value={mobileNumber}
        />
        <AuthPasswordField
          error={errors.password}
          isVisible={isPasswordVisible}
          label="Password"
          onChangeText={setPassword}
          onToggleVisibility={() => setIsPasswordVisible((visible) => !visible)}
          value={password}
        />
        <AuthPasswordField
          error={errors.confirmPassword}
          isVisible={isConfirmPasswordVisible}
          label="Confirm Password"
          onChangeText={setConfirmPassword}
          onToggleVisibility={() => setIsConfirmPasswordVisible((visible) => !visible)}
          value={confirmPassword}
        />

        <View className="gap-2">
          <Pressable
            accessibilityLabel="Agree to Terms and Conditions and Privacy Policy"
            accessibilityRole="checkbox"
            accessibilityState={{ checked: termsAccepted }}
            className="flex-row items-start gap-2.5 active:opacity-70"
            onPress={() => setTermsAccepted((accepted) => !accepted)}
          >
            <View
              className={`mt-0.5 size-4 items-center justify-center rounded-sm border ${termsAccepted ? 'border-order-action bg-sale-surface' : 'border-border bg-surface'}`}
            >
              {termsAccepted ? (
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
          {errors.terms ? (
            <Text accessibilityRole="alert" className="pl-6" tone="error" variant="detail">
              {errors.terms}
            </Text>
          ) : null}
        </View>

        <Pressable
          accessibilityLabel="Register"
          accessibilityRole="button"
          className="min-h-12 items-center justify-center rounded-sm bg-order-action p-4 active:opacity-85"
          onPress={handleRegister}
        >
          <Text className="uppercase" tone="brandForeground" variant="label">
            Register
          </Text>
        </Pressable>
      </View>

      <AuthDivider />

      <View className="gap-3">
        <SocialAuthButtons onProviderPress={showUnavailableMessage} />
      </View>

      <Text className="text-center leading-4" tone="muted" variant="caption">
        By registering you agree to our Terms of Use and Privacy Policy
      </Text>
    </AuthPageLayout>
  );
}
