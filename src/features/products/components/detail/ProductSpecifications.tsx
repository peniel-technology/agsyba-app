import { View } from 'react-native';

import { Text } from '@/components/ui/Text';
import type { ProductSpecification } from '@/features/products/types/productDetail';

interface ProductSpecificationsProps {
  specifications: readonly ProductSpecification[];
}

export function ProductSpecifications({ specifications }: ProductSpecificationsProps) {
  return (
    <View className="gap-3 px-4">
      <Text className="uppercase" variant="bodyStrong">
        Product Details / Specifications
      </Text>
      <View className="overflow-hidden rounded-xl border border-subtle-border bg-surface">
        {specifications.map((specification, index) => (
          <View
            className={`flex-row items-center justify-between gap-4 p-3 ${
              index < specifications.length - 1 ? 'border-b border-subtle-border' : ''
            }`}
            key={specification.id}
          >
            <Text tone="muted" variant="caption">
              {specification.label}
            </Text>
            <Text className="flex-1 text-right" variant="captionStrong">
              {specification.value}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}
