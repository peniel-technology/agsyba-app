import { View } from 'react-native';

import { Text } from '@/components/ui/Text';

interface StatCardProps {
  label: string;
  value: string;
}

function StatCard({ label, value }: StatCardProps) {
  return (
    <View className="flex-1 gap-1">
      <Text
        className="text-4xl leading-none text-neutral-900 font-medium"
        tone="default"
        variant="heading"
      >
        {value}
      </Text>
      <Text className="text-xs uppercase" tone="muted" variant="captionStrong">
        {label}
      </Text>
    </View>
  );
}

interface VerticalDividerProps {
  visible: boolean;
}

function VerticalDivider({ visible }: VerticalDividerProps) {
  if (!visible) {
    return null;
  }

  return <View className="mx-4 h-10 w-px bg-red-500/30" />;
}

function HorizontalDivider() {
  return <View className="h-px bg-red-500/20" />;
}

interface StatsRowProps {
  items: readonly AboutStat[];
}

function StatsRow({ items }: StatsRowProps) {
  return (
    <View className="flex-row">
      {items.map((item, index) => (
        <View className="flex-row flex-1 items-center" key={`${item.value}-${item.label}-${index}`}>
          <StatCard label={item.label} value={item.value} />
          <VerticalDivider visible={index === 0 && items.length > 1} />
        </View>
      ))}
    </View>
  );
}

export interface AboutStat {
  label: string;
  value: string;
}

export interface AboutStatsSectionProps {
  stats: readonly AboutStat[];
}

function createRows(items: readonly AboutStat[]) {
  return items.reduce<AboutStat[][]>((acc, item, index) => {
    const rowIndex = Math.floor(index / 2);

    if (!acc[rowIndex]) {
      acc[rowIndex] = [];
    }

    acc[rowIndex].push(item);

    return acc;
  }, []);
}

export function AboutStatsSection({ stats }: AboutStatsSectionProps) {
  const rows = createRows(stats);

  return (
    <View className="bg-orange-50 px-6 py-10">
      <View className="gap-6">
        {rows.map((row, rowIndex) => {
          const isLastRow = rowIndex === rows.length - 1;

          return (
            <View className="gap-6" key={`about-stats-row-${rowIndex}`}>
              <StatsRow items={row} />
              {!isLastRow ? <HorizontalDivider /> : null}
            </View>
          );
        })}
      </View>
    </View>
  );
}
