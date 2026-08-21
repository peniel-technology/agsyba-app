import { useWindowDimensions, View } from 'react-native';

import { EmptyState } from '@/components/common/EmptyState';
import { ProductCard } from '@/components/product/ProductCard';
import { ProductSectionHeader } from '@/components/product/ProductSectionHeader';
import { layout, spacing } from '@/theme';
import type { ProductPreview } from '@/types/product';

interface ProductGridProps {
  addToCartLabel?: 'Add to Bag' | 'Add to Cart';
  bagProductIds?: ReadonlySet<string>;
  cardWidth?: number;
  emptyDescription?: string;
  emptyTitle?: string;
  onAddToCartPress?: (product: ProductPreview) => void;
  onFavoritePress?: (product: ProductPreview) => void;
  onGoToBagPress?: () => void;
  onProductPress?: (product: ProductPreview) => void;
  onSeeMorePress?: () => void;
  products: readonly ProductPreview[];
  productsContainerClassName?: string;
  seeMoreLabel?: string;
  showHeader?: boolean;
  showAddToCartButton?: boolean;
  showReviewCount?: boolean;
  title: string;
  wishlistProductIds?: ReadonlySet<string>;
}

export function ProductGrid({
  addToCartLabel,
  bagProductIds,
  cardWidth: requestedCardWidth,
  emptyDescription = 'There are no products available in this category. Try selecting another category.',
  emptyTitle = 'No products found',
  onAddToCartPress,
  onFavoritePress,
  onGoToBagPress,
  onProductPress,
  onSeeMorePress,
  products,
  productsContainerClassName = 'px-4',
  seeMoreLabel,
  showHeader = true,
  showAddToCartButton = true,
  showReviewCount = false,
  title,
  wishlistProductIds,
}: ProductGridProps) {
  const { width } = useWindowDimensions();
  const contentWidth = width - spacing[8];
  const columnCount = Math.max(
    layout.productGridMinimumColumns,
    Math.floor((contentWidth + spacing[4]) / (layout.productCardWidth + spacing[4])),
  );
  const cardWidth =
    requestedCardWidth ?? (contentWidth - spacing[4] * (columnCount - 1)) / columnCount;

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
        <View className={`flex-row flex-wrap items-start gap-4 ${productsContainerClassName}`}>
          {products.map((product) => (
            <ProductCard
              addToCartLabel={addToCartLabel}
              cardWidth={cardWidth}
              isInBag={bagProductIds?.has(product.id) ?? false}
              key={product.id}
              onAddToCartPress={onAddToCartPress}
              onFavoritePress={onFavoritePress}
              onGoToBagPress={onGoToBagPress}
              onPress={onProductPress}
              product={
                wishlistProductIds?.has(product.id) ? { ...product, isFavorite: true } : product
              }
              showAddToCartButton={showAddToCartButton}
              showReviewCount={showReviewCount}
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
