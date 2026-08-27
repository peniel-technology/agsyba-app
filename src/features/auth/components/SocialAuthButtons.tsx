import {
  AuthProviderButton,
  type SocialProvider,
} from '@/features/auth/components/AuthProviderButton';

interface SocialAuthButtonsProps {
  disabled?: boolean;
  onProviderPress: (provider: SocialProvider) => void;
}

export function SocialAuthButtons({ disabled = false, onProviderPress }: SocialAuthButtonsProps) {
  return (
    <>
      <AuthProviderButton
        disabled={disabled}
        label="Continue with Google"
        onPress={() => onProviderPress('google')}
        provider="google"
      />
      <AuthProviderButton
        disabled={disabled}
        label="Continue with Apple"
        onPress={() => onProviderPress('apple')}
        provider="apple"
      />
      <AuthProviderButton
        disabled={disabled}
        label="Continue with Facebook"
        onPress={() => onProviderPress('facebook')}
        provider="facebook"
      />
    </>
  );
}
