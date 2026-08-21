import { Pressable, ScrollView, View } from 'react-native';

import { Text } from '@/components/ui/Text';

export type OrderStatusFilter = 'all' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

interface OrdersStatusTabsProps {
  activeTab: OrderStatusFilter;
  onTabChange: (tab: OrderStatusFilter) => void;
}

const tabs: readonly { id: OrderStatusFilter; label: string }[] = [
  { id: 'all', label: 'All Orders' },
  { id: 'processing', label: 'Processing' },
  { id: 'shipped', label: 'Shipped' },
  { id: 'delivered', label: 'Delivered' },
  { id: 'cancelled', label: 'Cancelled' },
];

export function OrdersStatusTabs({ activeTab, onTabChange }: OrdersStatusTabsProps) {
  return (
    <View className="border-b border-subtle-border bg-surface">
      <ScrollView
        accessibilityLabel="Order status filters"
        contentContainerClassName="gap-4 px-4 pt-3"
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;

          return (
            <Pressable
              accessibilityLabel={`${tab.label} orders`}
              accessibilityRole="tab"
              accessibilityState={{ selected: isActive }}
              className={`pb-3 ${isActive ? 'border-b-2 border-order-action' : ''}`}
              key={tab.id}
              onPress={() => onTabChange(tab.id)}
            >
              <Text
                className={isActive ? 'font-manrope-bold' : 'font-manrope-medium'}
                tone={isActive ? 'orderAction' : 'muted'}
                variant="label"
              >
                {tab.label}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}
