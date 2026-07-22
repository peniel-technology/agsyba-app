import { useWindowDimensions, View } from 'react-native';

import { ProductCard } from '@/components/product/ProductCard';
import { ProductSectionHeader } from '@/components/product/ProductSectionHeader';
import { layout, spacing } from '@/theme';
import type { ProductPreview } from '@/types/product';

interface ProductGridProps {
  onFavoritePress?: (product: ProductPreview) => void;
  onProductPress?: (product: ProductPreview) => void;
  onSeeMorePress?: () => void;
  products: readonly ProductPreview[];
  seeMoreLabel?: string;
  title: string;
}

export function ProductGrid({
  onFavoritePress,
  onProductPress,
  onSeeMorePress,
  products,
  seeMoreLabel,
  title,
}: ProductGridProps) {
  const { width } = useWindowDimensions();
  const contentWidth = width - spacing[8];
  const columnCount = Math.max(
    layout.productGridMinimumColumns,
    Math.floor((contentWidth + spacing[4]) / (layout.productCardWidth + spacing[4])),
  );
  const cardWidth = (contentWidth - spacing[4] * (columnCount - 1)) / columnCount;

  if (products.length === 0) {
    return null;
  }

  return (
    <View className="gap-4">
      <ProductSectionHeader
        onSeeMorePress={onSeeMorePress}
        seeMoreLabel={seeMoreLabel}
        title={title}
      />
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
    </View>
  );
}
