import { ActivityIndicator, Pressable, View } from 'react-native';

import { Text } from '@/components/ui/Text';
import { colors } from '@/theme';

interface ProductResultsLoaderProps {
  displayedCount: number;
  isLoading?: boolean;
  onLoadMore?: () => void;
  totalCount: number;
}

export function ProductResultsLoader({
  displayedCount,
  isLoading = false,
  onLoadMore,
  totalCount,
}: ProductResultsLoaderProps) {
  const normalizedTotalCount = Math.max(0, Math.trunc(totalCount));
  const normalizedDisplayedCount = Math.min(
    Math.max(0, Math.trunc(displayedCount)),
    normalizedTotalCount,
  );
  const isDisabled = isLoading || !onLoadMore || normalizedDisplayedCount >= normalizedTotalCount;

  return (
    <View className="items-center gap-2 py-2">
      <Text tone="muted" variant="caption">
        Showing {normalizedDisplayedCount} of {normalizedTotalCount}
      </Text>
      <Pressable
        accessibilityLabel={isLoading ? 'Loading more items' : 'View more items'}
        accessibilityRole="button"
        accessibilityState={{ busy: isLoading, disabled: isDisabled }}
        className="min-h-10 min-w-40 items-center justify-center rounded-sm border border-brand px-6 py-2.5 active:opacity-70"
        disabled={isDisabled}
        onPress={onLoadMore}
      >
        {isLoading ? (
          <ActivityIndicator color={colors.brand} size="small" />
        ) : (
          <Text className="text-sm" tone="brand" variant="captionMedium">
            View More Items
          </Text>
        )}
      </Pressable>
    </View>
  );
}
