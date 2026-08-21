import { Pressable, ScrollView, View } from 'react-native';

import { Text } from '@/components/ui/Text';

export type NotificationFilter = 'all' | 'orders' | 'promotions' | 'account';

interface NotificationsCategoryTabsProps {
  activeTab: NotificationFilter;
  onTabChange: (tab: NotificationFilter) => void;
}

const tabs: readonly { id: NotificationFilter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'orders', label: 'Orders' },
  { id: 'promotions', label: 'Promotions' },
  { id: 'account', label: 'Account' },
];

export function NotificationsCategoryTabs({
  activeTab,
  onTabChange,
}: NotificationsCategoryTabsProps) {
  return (
    <View className="border-b border-subtle-border bg-surface">
      <ScrollView
        accessibilityLabel="Notification categories"
        contentContainerClassName="gap-6 px-6 pt-3"
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;

          return (
            <Pressable
              accessibilityLabel={`${tab.label} notifications`}
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
