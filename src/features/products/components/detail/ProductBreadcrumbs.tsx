import { View } from 'react-native';

import { Text } from '@/components/ui/Text';

interface ProductBreadcrumbsProps {
  productName: string;
}

export function ProductBreadcrumbs({ productName }: ProductBreadcrumbsProps) {
  return (
    <View
      accessibilityLabel={`Home, Products, ${productName}`}
      className="flex-row items-center gap-1 px-4"
    >
      <Text tone="muted" variant="caption">
        Home
      </Text>
      <Text tone="muted" variant="caption">
        /
      </Text>
      <Text tone="muted" variant="caption">
        Products
      </Text>
      <Text tone="muted" variant="caption">
        /
      </Text>
      <Text className="flex-1" numberOfLines={1} tone="brand" variant="caption">
        {productName}
      </Text>
    </View>
  );
}
