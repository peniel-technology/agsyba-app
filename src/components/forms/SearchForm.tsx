import { zodResolver } from '@hookform/resolvers/zod';
import { Search } from 'lucide-react-native';
import { Controller, useForm } from 'react-hook-form';
import { TextInput, View } from 'react-native';
import { z } from 'zod';

import { Text } from '@/components/ui/Text';
import { colors, iconSizes, iconStrokeWidths } from '@/theme';

const searchSchema = z.object({
  query: z
    .string()
    .trim()
    .min(1, 'Enter a product or category to search')
    .max(100, 'Search must be 100 characters or fewer'),
});

type SearchValues = z.infer<typeof searchSchema>;

interface SearchFormProps {
  accessibilityLabel?: string;
  onQueryChange?: (query: string) => void;
  onSubmit?: (query: string) => void;
  placeholder?: string;
}

export function SearchForm({
  accessibilityLabel = 'Search products and categories',
  onQueryChange,
  onSubmit,
  placeholder = 'Search products, categories...',
}: SearchFormProps) {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<SearchValues>({
    defaultValues: { query: '' },
    resolver: zodResolver(searchSchema),
  });

  const handleSearchSubmit = ({ query }: SearchValues) => {
    onSubmit?.(query);
  };

  return (
    <View>
      <Controller
        control={control}
        name="query"
        render={({ field: { onBlur, onChange, value } }) => (
          <View
            className={`h-11 flex-row items-center gap-2 rounded-lg border bg-subtle-surface px-3 ${
              errors.query ? 'border-error' : 'border-border'
            }`}
          >
            <Search
              accessible={false}
              color={colors.muted}
              size={iconSizes.compact}
              strokeWidth={iconStrokeWidths.subtle}
            />
            <TextInput
              accessibilityHint={errors.query?.message}
              accessibilityLabel={accessibilityLabel}
              autoCapitalize="none"
              autoCorrect={false}
              className="h-full flex-1 font-manrope text-sm text-foreground"
              onBlur={onBlur}
              onChangeText={(query) => {
                onChange(query);
                onQueryChange?.(query);
              }}
              onSubmitEditing={handleSubmit(handleSearchSubmit)}
              placeholder={placeholder}
              placeholderTextColor={colors.muted}
              returnKeyType="search"
              value={value}
            />
          </View>
        )}
      />
      {errors.query ? (
        <Text accessibilityRole="alert" className="mt-1" tone="error" variant="detail">
          {errors.query.message}
        </Text>
      ) : null}
    </View>
  );
}
