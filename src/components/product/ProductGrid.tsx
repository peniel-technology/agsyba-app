import { useWindowDimensions, View } from 'react-native';

import { EmptyState } from '@/components/common/EmptyState';
import { ProductCard } from '@/components/product/ProductCard';
import { ProductSectionHeader } from '@/components/product/ProductSectionHeader';
import { layout, spacing } from '@/theme';
import type { ProductPreview } from '@/types/product';

interface ProductGridProps {
  emptyDescription?: string;
  emptyTitle?: string;
  onFavoritePress?: (product: ProductPreview) => void;
  onProductPress?: (product: ProductPreview) => void;
  onSeeMorePress?: () => void;
  products: readonly ProductPreview[];
  seeMoreLabel?: string;
  showHeader?: boolean;
  title: string;
}

export function ProductGrid({
  emptyDescription = 'There are no products available in this category. Try selecting another category.',
  emptyTitle = 'No products found',
  onFavoritePress,
  onProductPress,
  onSeeMorePress,
  products,
  seeMoreLabel,
  showHeader = true,
  title,
}: ProductGridProps) {
  const { width } = useWindowDimensions();
  const contentWidth = width - spacing[8];
  const columnCount = Math.max(
    layout.productGridMinimumColumns,
    Math.floor((contentWidth + spacing[4]) / (layout.productCardWidth + spacing[4])),
  );
  const cardWidth = (contentWidth - spacing[4] * (columnCount - 1)) / columnCount;

  return (
    <View className="gap-4">
      {showHeader ? (
        <ProductSectionHeader
          onSeeMorePress={onSeeMorePress}
          seeMoreLabel={seeMoreLabel}
          title={title}
        />
      ) : null}
      {products.length > 0 ? (
        <View className="flex-row flex-wrap items-start gap-4 px-4">
          {products.map((product) => (
            <ProductCard
              cardWidth={cardWidth}
              key={product.id}
              onFavoritePress={onFavoritePress}
              onPress={onProductPress}
              product={product}
            />
          ))}
        </View>
      ) : (
        <View className="px-4">
          <EmptyState description={emptyDescription} title={emptyTitle} />
        </View>
      )}
    </View>
  );
}
