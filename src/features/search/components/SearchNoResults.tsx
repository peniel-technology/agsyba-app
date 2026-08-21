import { Search } from 'lucide-react-native';
import { Pressable, View } from 'react-native';

import { Text } from '@/components/ui/Text';
import { colors, iconSizes, iconStrokeWidths } from '@/theme';

interface SearchNoResultsProps {
  onBrowseProductsPress: () => void;
  onClearSearchPress: () => void;
  onPopularSearchPress: (query: string) => void;
  query: string;
}

const searchTips = [
  'Check for typos or misspellings',
  'Use broader search terms',
  'Try searching by category',
] as const;

const popularSearches = ['Summer Dresses', 'Bags', 'Shoes', 'Jewelry', 'Denim Jackets'] as const;

export function SearchNoResults({
  onBrowseProductsPress,
  onClearSearchPress,
  onPopularSearchPress,
  query,
}: SearchNoResultsProps) {
  return (
    <>
      <View className="items-center gap-7 px-6 pb-10 pt-10">
        <View className="size-24 items-center justify-center rounded-full bg-subtle-surface">
          <Search
            accessibilityLabel="No search results"
            color={colors.neutral400}
            size={iconSizes.emptyState}
            strokeWidth={iconStrokeWidths.emphasized}
          />
        </View>

        <View className="items-center gap-3 self-stretch">
          <Text className="self-stretch text-center" variant="promotionalTitle">
            No Results Found
          </Text>
          <Text className="self-stretch text-center text-sm leading-5" tone="muted" variant="body">
            We couldn&apos;t find any results for &apos;{query}&apos;. Try checking your spelling or
            use more general terms.
          </Text>
        </View>

        <View className="h-0.5 w-10 bg-brand" />

        <View className="items-center gap-4 self-stretch">
          <Pressable
            accessibilityLabel="Clear search"
            accessibilityRole="button"
            className="self-stretch items-center justify-center rounded-sm bg-brand px-6 py-3.5 active:opacity-80"
            onPress={onClearSearchPress}
          >
            <Text className="font-manrope-bold uppercase" tone="brandForeground" variant="label">
              Clear Search
            </Text>
          </Pressable>

          <Pressable
            accessibilityLabel="Browse all products"
            accessibilityRole="button"
            className="rounded-sm px-2 py-1 active:opacity-70"
            onPress={onBrowseProductsPress}
          >
            <Text tone="brand" variant="label">
              Browse All Products →
            </Text>
          </Pressable>
        </View>
      </View>

      <View className="px-6 pb-8">
        <View className="gap-3.5 rounded-lg border border-border bg-subtle-surface p-5">
          <Text variant="bodyStrong">Search Tips:</Text>
          <View className="gap-2.5">
            {searchTips.map((tip) => (
              <View className="flex-row items-center gap-2" key={tip}>
                <View className="size-1 rounded-full bg-brand" />
                <Text className="flex-1" tone="muted" variant="caption">
                  {tip}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      <View className="gap-3 px-6 pb-8">
        <Text variant="bodyStrong">Popular Searches</Text>
        <View className="flex-row flex-wrap gap-2.5">
          {popularSearches.map((search) => (
            <Pressable
              accessibilityLabel={`Search for ${search}`}
              accessibilityRole="button"
              className="rounded-full border border-border px-3.5 py-2 active:opacity-70"
              key={search}
              onPress={() => onPopularSearchPress(search)}
            >
              <Text tone="muted" variant="caption">
                {search}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>
    </>
  );
}
