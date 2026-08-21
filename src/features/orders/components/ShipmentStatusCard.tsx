import { Check } from 'lucide-react-native';
import { StyleSheet, View } from 'react-native';

import { Text } from '@/components/ui/Text';
import type { TrackingStep } from '@/features/orders/constants/trackingData';
import { colors, iconSizes, iconStrokeWidths } from '@/theme';

interface ShipmentStatusCardProps {
  steps: readonly TrackingStep[];
}

const styles = StyleSheet.create({
  currentNode: {
    alignItems: 'center',
    backgroundColor: `${colors.orderAction}33`,
    borderColor: colors.orderAction,
    borderRadius: 16,
    borderWidth: 1,
    height: 32,
    justifyContent: 'center',
    width: 32,
  },
  currentNodeInner: {
    backgroundColor: colors.orderAction,
    borderRadius: 8,
    height: 16,
    width: 16,
  },
  line: {
    borderTopWidth: 3,
    height: 0,
    left: 12,
    position: 'absolute',
    right: 12,
    top: 13,
  },
  progressLine: {
    borderTopColor: colors.orderAction,
    borderTopWidth: 3,
    height: 0,
    left: 12,
    position: 'absolute',
    top: 13,
    width: '75%',
  },
  completedNode: {
    alignItems: 'center',
    backgroundColor: colors.orderAction,
    borderRadius: 12,
    height: 24,
    justifyContent: 'center',
    width: 24,
  },
  upcomingNode: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 12,
    borderWidth: 2,
    height: 24,
    width: 24,
  },
});

function ShipmentStepNode({ state }: { state: TrackingStep['state'] }) {
  if (state === 'completed') {
    return (
      <View style={styles.completedNode}>
        <Check
          color={colors.brandForeground}
          size={iconSizes.small}
          strokeWidth={iconStrokeWidths.emphasized}
        />
      </View>
    );
  }

  if (state === 'current') {
    return (
      <View style={styles.currentNode}>
        <View style={styles.currentNodeInner} />
      </View>
    );
  }

  return <View style={styles.upcomingNode} />;
}

export function ShipmentStatusCard({ steps }: ShipmentStatusCardProps) {
  return (
    <View className="gap-5 rounded-md border border-border bg-surface p-5">
      <Text variant="bodyStrong">Shipment Status</Text>
      <View className="relative h-16 w-full">
        <View pointerEvents="none" style={[styles.line, { borderTopColor: colors.subtleBorder }]} />
        <View pointerEvents="none" style={styles.progressLine} />
        <View className="absolute inset-x-0 top-0 flex-row items-start">
          {steps.map((step) => (
            <View className="flex-1 items-center gap-2" key={step.label}>
              <ShipmentStepNode state={step.state} />
              <Text
                className="w-full text-center"
                tone={
                  step.state === 'current'
                    ? 'orderAction'
                    : step.state === 'upcoming'
                      ? 'muted'
                      : 'default'
                }
                variant={step.state === 'upcoming' ? 'micro' : 'microStrong'}
              >
                {step.label}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}
