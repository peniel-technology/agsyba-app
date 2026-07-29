import { X } from 'lucide-react-native';
import { useMemo, useState } from 'react';
import { Modal, Pressable, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { EmptyState } from '@/components/common/EmptyState';
import { SearchForm } from '@/components/forms/SearchForm';
import { ProductGrid } from '@/components/product/ProductGrid';
import { Text } from '@/components/ui/Text';
import { colors, iconSizes, iconStrokeWidths, spacing } from '@/theme';
import type { ProductPreview } from '@/types/product';

interface ProductSearchModalProps {
  isVisible: boolean;
  onClose: () => void;
  products: readonly ProductPreview[];
}

export function ProductSearchModal({ isVisible, onClose, products }: ProductSearchModalProps) {
  const [query, setQuery] = useState('');
  const normalizedQuery = query.trim().toLocaleLowerCase();
  const filteredProducts = useMemo(
    () =>
      normalizedQuery.length === 0
        ? products
        : products.filter((product) =>
            `${product.brand} ${product.name}`.toLocaleLowerCase().includes(normalizedQuery),
          ),
    [normalizedQuery, products],
  );
  const handleClose = () => {
    setQuery('');
    onClose();
  };

  return (
    <Modal
      animationType="slide"
      onRequestClose={handleClose}
      presentationStyle="fullScreen"
      visible={isVisible}
    >
      <SafeAreaView className="flex-1 bg-background">
        <View
          accessibilityRole="header"
          className="h-14 flex-row items-center justify-between border-b border-subtle-border bg-surface px-2"
        >
          <View className="size-10" />
          <Text variant="sectionHeading">Search</Text>
          <Pressable
            accessibilityLabel="Close search"
            accessibilityRole="button"
            className="size-10 items-center justify-center rounded-full active:bg-subtle-surface"
            hitSlop={spacing[1]}
            onPress={handleClose}
          >
            <X
              accessible={false}
              color={colors.text}
              size={iconSizes.medium}
              strokeWidth={iconStrokeWidths.regular}
            />
          </Pressable>
        </View>

        <View className="px-4 py-4">
          <SearchForm
            accessibilityLabel="Search the product catalog"
            onQueryChange={setQuery}
            onSubmit={setQuery}
          />
        </View>

        <ScrollView
          className="flex-1"
          contentContainerClassName="pb-8"
          keyboardDismissMode="on-drag"
          keyboardShouldPersistTaps="handled"
        >
          {filteredProducts.length > 0 ? (
            <ProductGrid products={filteredProducts} showHeader={false} title="Search Results" />
          ) : (
            <View className="px-4 py-8">
              <EmptyState
                description="Try another product name or brand."
                title="No products found"
              />
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
}
