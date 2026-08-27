import { Text } from '@/components/ui/Text';
import { View } from 'react-native';

interface PasswordStrengthIndicatorProps {
  password: string;
}

type PasswordStrength = 'empty' | 'weak' | 'medium' | 'strong';

function getPasswordStrength(password: string): PasswordStrength {
  if (password.length === 0) {
    return 'empty';
  }

  let score = 0;

  if (password.length >= 8) score += 1;
  if (password.length >= 12) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[a-z]/.test(password)) score += 1;
  if (/\d/.test(password) || /[^A-Za-z0-9]/.test(password)) score += 1;

  if (score <= 2) return 'weak';
  if (score <= 4) return 'medium';
  return 'strong';
}

const strengthLabels: Record<PasswordStrength, string> = {
  empty: '—',
  medium: 'Medium',
  strong: 'Strong',
  weak: 'Weak',
};

const strengthBarCounts: Record<PasswordStrength, number> = {
  empty: 0,
  medium: 2,
  strong: 3,
  weak: 1,
};

export function PasswordStrengthIndicator({ password }: PasswordStrengthIndicatorProps) {
  const strength = getPasswordStrength(password);
  const labelTone =
    strength === 'strong'
      ? 'success'
      : strength === 'medium'
        ? 'warning'
        : strength === 'weak'
          ? 'orderAction'
          : 'muted';
  const activeBarCount = strengthBarCounts[strength];

  return (
    <View className="gap-2">
      <View className="flex-row items-center justify-between">
        <Text tone="muted" variant="captionStrong">
          Password Strength
        </Text>
        <Text tone={labelTone} variant="captionStrong">
          {strengthLabels[strength]}
        </Text>
      </View>
      <View className="flex-row items-start gap-1">
        {[0, 1, 2].map((barIndex) => (
          <View
            className={`h-1 flex-1 rounded-xs ${barIndex < activeBarCount ? 'bg-order-action' : 'bg-border'}`}
            key={barIndex}
          />
        ))}
      </View>
    </View>
  );
}
