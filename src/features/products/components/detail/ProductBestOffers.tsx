import { TicketPercent } from 'lucide-react-native';
import { View } from 'react-native';

import { Text } from '@/components/ui/Text';
import type { ProductOffer } from '@/features/products/types/productDetail';
import { colors, iconSizes, iconStrokeWidths } from '@/theme';

interface ProductBestOffersProps {
  offers: readonly ProductOffer[];
}

export function ProductBestOffers({ offers }: ProductBestOffersProps) {
  return (
    <View className="gap-3 px-4">
      <Text className="uppercase" variant="captionStrong">
        Best Offers
      </Text>
      <View className="gap-3">
        {offers.map((offer) => (
          <View
            className="flex-row items-center gap-3 rounded-xl border border-subtle-border bg-surface p-3"
            key={offer.id}
          >
            <View className="size-8 items-center justify-center rounded-lg bg-sale-surface">
              <TicketPercent
                accessible={false}
                color={colors.brand}
                size={iconSizes.compact}
                strokeWidth={iconStrokeWidths.subtle}
              />
            </View>
            <Text className="flex-1" variant="label">
              {offer.description}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}
