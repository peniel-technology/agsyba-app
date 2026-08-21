import { ChevronDown } from 'lucide-react-native';
import { Pressable, TextInput, View } from 'react-native';

import { Text } from '@/components/ui/Text';
import { colors, iconSizes, iconStrokeWidths } from '@/theme';

interface AuthMobileFieldProps {
  error?: string;
  onChangeText: (value: string) => void;
  onCountryCodePress: () => void;
  value: string;
}

export function AuthMobileField({
  error,
  onChangeText,
  onCountryCodePress,
  value,
}: AuthMobileFieldProps) {
  return (
    <View className="gap-2">
      <Text variant="captionStrong">Mobile Number</Text>
      <View
        className={`min-h-12 flex-row items-center gap-3 rounded-sm border bg-surface px-4 py-3 ${error ? 'border-error' : 'border-border'}`}
      >
        <Pressable
          accessibilityLabel="Country calling code, plus one"
          accessibilityRole="button"
          className="flex-row items-center gap-1 rounded-xs border border-border bg-subtle-surface px-2 py-1 active:bg-border"
          onPress={onCountryCodePress}
        >
          <Text variant="captionStrong">+1</Text>
          <ChevronDown
            accessible={false}
            color={colors.muted}
            size={iconSizes.tiny}
            strokeWidth={iconStrokeWidths.subtle}
          />
        </Pressable>
        <TextInput
          accessibilityLabel="Mobile Number"
          autoComplete="tel"
          className="min-h-6 flex-1 py-0 font-manrope text-sm text-foreground"
          keyboardType="phone-pad"
          onChangeText={onChangeText}
          placeholder="Enter your mobile number"
          placeholderTextColor={colors.muted}
          returnKeyType="next"
          value={value}
        />
      </View>
      {error ? (
        <Text accessibilityRole="alert" tone="error" variant="detail">
          {error}
        </Text>
      ) : null}
    </View>
  );
}
