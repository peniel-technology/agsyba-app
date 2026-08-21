import { StyleSheet, View } from 'react-native';

import { Text } from '@/components/ui/Text';
import type { TrackingHistoryEntry } from '@/features/orders/constants/trackingData';
import { colors } from '@/theme';

interface TrackingHistoryCardProps {
  entries: readonly TrackingHistoryEntry[];
}

const styles = StyleSheet.create({
  currentDotInner: {
    backgroundColor: colors.orderAction,
    borderColor: colors.orderAction,
    borderRadius: 5,
    borderWidth: 1,
    height: 10,
    width: 10,
  },
  currentDotOuter: {
    alignItems: 'center',
    backgroundColor: `${colors.orderAction}33`,
    borderColor: colors.orderAction,
    borderRadius: 6,
    borderWidth: 1,
    height: 12,
    justifyContent: 'center',
    width: 12,
  },
  dot: {
    backgroundColor: colors.orderAction,
    borderRadius: 4,
    height: 8,
    width: 8,
  },
  timeline: {
    flex: 1,
    marginTop: 4,
    minHeight: 16,
    width: 2,
  },
});

export function TrackingHistoryCard({ entries }: TrackingHistoryCardProps) {
  return (
    <View className="gap-4 rounded-md border border-border bg-surface p-5">
      <Text variant="bodyStrong">Tracking History</Text>
      <View>
        {entries.map((entry, index) => {
          const isLast = index === entries.length - 1;

          return (
            <View
              className="flex-row items-stretch gap-3"
              key={`${entry.timestamp}-${entry.description}`}
            >
              <View className="w-4 items-center">
                {entry.isCurrent ? (
                  <View style={styles.currentDotOuter}>
                    <View style={styles.currentDotInner} />
                  </View>
                ) : (
                  <View style={styles.dot} />
                )}
                {!isLast ? (
                  <View
                    className={entry.isCurrent ? 'bg-order-action' : 'bg-border'}
                    style={styles.timeline}
                  />
                ) : null}
              </View>
              <View className={`flex-1 gap-0.5 ${isLast ? '' : 'pb-4'}`}>
                <Text tone={entry.isCurrent ? 'orderAction' : 'muted'} variant="captionStrong">
                  {entry.timestamp}
                </Text>
                <Text
                  tone={entry.isCurrent ? 'default' : 'muted'}
                  variant={entry.isCurrent ? 'captionStrong' : 'caption'}
                >
                  {entry.description}
                </Text>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
}
