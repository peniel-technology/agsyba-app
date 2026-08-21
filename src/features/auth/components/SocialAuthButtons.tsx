import {
  AuthProviderButton,
  type SocialProvider,
} from '@/features/auth/components/AuthProviderButton';

interface SocialAuthButtonsProps {
  onProviderPress: (provider: SocialProvider) => void;
}

export function SocialAuthButtons({ onProviderPress }: SocialAuthButtonsProps) {
  return (
    <>
      <AuthProviderButton
        label="Continue with Google"
        onPress={() => onProviderPress('google')}
        provider="google"
      />
      <AuthProviderButton
        label="Continue with Apple"
        onPress={() => onProviderPress('apple')}
        provider="apple"
      />
      <AuthProviderButton
        label="Continue with Facebook"
        onPress={() => onProviderPress('facebook')}
        provider="facebook"
      />
    </>
  );
}
