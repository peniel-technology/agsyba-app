import { ChevronRight, LoaderCircle, MapPin } from 'lucide-react-native';
import { Pressable } from 'react-native';

import { Text } from '@/components/ui/Text';
import { colors, iconSizes, iconStrokeWidths } from '@/theme';

interface CurrentLocationButtonProps {
  isLoading: boolean;
  onPress: () => void;
}

export function CurrentLocationButton({ isLoading, onPress }: CurrentLocationButtonProps) {
  return (
    <Pressable
      accessibilityLabel="Use current location"
      accessibilityRole="button"
      accessibilityState={{ busy: isLoading, disabled: isLoading }}
      className="h-12 flex-row items-center gap-2.5 rounded-md border border-dashed border-brand bg-surface px-3.5 active:opacity-70 disabled:opacity-60"
      disabled={isLoading}
      onPress={onPress}
    >
      {isLoading ? (
        <LoaderCircle
          color={colors.brand}
          size={iconSizes.compact}
          strokeWidth={iconStrokeWidths.regular}
        />
      ) : (
        <MapPin
          color={colors.brand}
          size={iconSizes.compact}
          strokeWidth={iconStrokeWidths.regular}
        />
      )}
      <Text className="flex-1" tone="brand" variant="label">
        {isLoading ? 'Finding your location…' : 'Use Current Location'}
      </Text>
      <ChevronRight
        color={colors.brand}
        size={iconSizes.small}
        strokeWidth={iconStrokeWidths.emphasized}
      />
    </Pressable>
  );
}
