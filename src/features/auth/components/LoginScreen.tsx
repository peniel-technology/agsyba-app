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

interface LoginErrors {
  email?: string;
  mobileNumber?: string;
  password?: string;
}

function validateLogin(email: string, mobileNumber: string, password: string): LoginErrors {
  const errors: LoginErrors = {};

  if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
    errors.email = 'Enter a valid email address.';
  }

  if (!/^\d{7,15}$/.test(mobileNumber.replace(/\D/g, ''))) {
    errors.mobileNumber = 'Enter a valid mobile number.';
  }

  if (password.length < 6) {
    errors.password = 'Password must be at least 6 characters.';
  }

  return errors;
}

export function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('hello@agsyba.com');
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [errors, setErrors] = useState<LoginErrors>({});

  const handleBackPress = useCallback(() => {
    if (router.canGoBack()) {
      router.back();
      return;
    }

    router.replace(routes.home);
  }, [router]);

  const handleLogin = useCallback(() => {
    const nextErrors = validateLogin(email, mobileNumber, password);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    Alert.alert('Login ready', 'Connect your account service to complete sign in.');
  }, [email, mobileNumber, password]);

  const showUnavailableMessage = useCallback((provider: SocialProvider) => {
    const providerName = provider.charAt(0).toUpperCase() + provider.slice(1);
    Alert.alert(`${providerName} login`, `${providerName} sign-in will be connected here.`);
  }, []);

  return (
    <AuthPageLayout
      activeTab="login"
      onBackPress={handleBackPress}
      onLoginPress={() => router.replace(routes.login)}
      onRegisterPress={() => router.replace(routes.register)}
    >
      <View className="gap-2">
        <Text variant="display">Good to see you again</Text>
        <Text tone="muted" variant="caption">
          Please enter your details to login
        </Text>
      </View>

      <View className="gap-5">
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
          placeholder="••••••••"
          value={password}
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
            onPress={() =>
              Alert.alert('Forgot password', 'Password recovery will be available soon.')
            }
          >
            <Text tone="orderAction" variant="captionStrong">
              Forgot password?
            </Text>
          </Pressable>
        </View>

        <Pressable
          accessibilityLabel="Login"
          accessibilityRole="button"
          className="min-h-12 items-center justify-center rounded-sm bg-order-action p-4 active:opacity-85"
          onPress={handleLogin}
        >
          <Text className="uppercase" tone="brandForeground" variant="label">
            Login
          </Text>
        </Pressable>
      </View>

      <AuthDivider />

      <View className="gap-3">
        <SocialAuthButtons onProviderPress={showUnavailableMessage} />
      </View>

      <Text className="text-center leading-4" tone="muted" variant="caption">
        By signing in you agree to our Terms of Service and Privacy Policy
      </Text>
    </AuthPageLayout>
  );
}
