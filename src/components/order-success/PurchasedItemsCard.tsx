import { memo } from 'react';
import { FlatList, View } from 'react-native';

import { PurchasedItem } from '@/components/order-success/PurchasedItem';
import { SectionTitle } from '@/components/order-success/SectionTitle';
import { TotalPaidRow } from '@/components/order-success/TotalPaidRow';
import type { OrderSuccessProduct } from '@/data/orderSuccess';

interface PurchasedItemsCardProps {
  amount: string;
  items: readonly OrderSuccessProduct[];
}

export const PurchasedItemsCard = memo(function PurchasedItemsCard({
  amount,
  items,
}: PurchasedItemsCardProps) {
  return (
    <View className="gap-3 rounded-md border border-border bg-surface p-4 shadow-sm">
      <SectionTitle>Items Purchased</SectionTitle>
      <FlatList
        data={items}
        contentContainerClassName="gap-4"
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <PurchasedItem item={item} />}
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
      />
      <View className="h-px border-t border-border" />
      <TotalPaidRow amount={amount} />
    </View>
  );
});
