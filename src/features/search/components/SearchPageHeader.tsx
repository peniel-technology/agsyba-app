import { ChevronLeft, Search } from 'lucide-react-native';
import { Pressable, TextInput, View } from 'react-native';

import { colors, iconSizes, iconStrokeWidths, spacing } from '@/theme';

interface SearchPageHeaderProps {
  onBackPress: () => void;
  onQueryChange: (query: string) => void;
  query: string;
}

export function SearchPageHeader({ onBackPress, onQueryChange, query }: SearchPageHeaderProps) {
  return (
    <View
      accessibilityRole="header"
      className="h-16 flex-row items-center gap-3 border-b border-subtle-border bg-surface px-4"
    >
      <Pressable
        accessibilityLabel="Go back"
        accessibilityRole="button"
        className="size-6 items-center justify-center rounded-full active:bg-subtle-surface"
        hitSlop={spacing[1]}
        onPress={onBackPress}
      >
        <ChevronLeft
          accessible={false}
          color={colors.text}
          size={iconSizes.large}
          strokeWidth={iconStrokeWidths.emphasized}
        />
      </Pressable>

      <View className="h-10 flex-1 flex-row items-center gap-2.5 bg-subtle-surface px-3.5">
        <Search
          accessible={false}
          color={colors.neutral500}
          size={iconSizes.compact}
          strokeWidth={iconStrokeWidths.subtle}
        />
        <TextInput
          accessibilityLabel="Search products and categories"
          autoCapitalize="none"
          autoCorrect={false}
          className="h-full flex-1 font-manrope-semibold text-sm text-foreground"
          onChangeText={onQueryChange}
          placeholder="Search products, categories..."
          placeholderTextColor={colors.neutral500}
          returnKeyType="search"
          value={query}
        />
      </View>
    </View>
  );
}
