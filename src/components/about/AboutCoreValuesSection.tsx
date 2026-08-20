import { Heart, Leaf, ShieldCheck } from 'lucide-react-native';
import type { ComponentType } from 'react';
import { View } from 'react-native';

import { Text } from '@/components/ui/Text';
import { colors, iconSizes, iconStrokeWidths } from '@/theme';

type CoreValueIconName = 'quality' | 'customer' | 'sustainable';

type CoreValueIconComponent = ComponentType<{ color: string; size: number; strokeWidth: number }>;

interface CoreValueCardProps {
  icon: CoreValueIconName;
  description: string;
  title: string;
}

interface AboutCoreValue {
  description: string;
  icon: CoreValueIconName;
  id: string;
  title: string;
}

const iconMap: Record<CoreValueIconName, CoreValueIconComponent> = {
  customer: Heart,
  quality: ShieldCheck,
  sustainable: Leaf,
};

function SectionHeading({ title }: { title: string }) {
  return (
    <Text className="text-center text-3xl text-white" variant="promotionalTitle">
      {title}
    </Text>
  );
}

function CoreValueCard({ description, icon, title }: CoreValueCardProps) {
  const Icon = iconMap[icon];

  return (
    <View className="gap-3 self-stretch rounded-lg bg-neutral-800 p-5">
      <View className="size-8 items-center justify-center">
        <Icon color={colors.brand} size={iconSizes.large} strokeWidth={iconStrokeWidths.regular} />
      </View>
      <Text className="text-lg font-semibold text-white">{title}</Text>
      <Text className="text-xs leading-5 text-neutral-500">{description}</Text>
    </View>
  );
}

export interface AboutCoreValuesSectionProps {
  title: string;
  values: readonly AboutCoreValue[];
}

export function AboutCoreValuesSection({ title, values }: AboutCoreValuesSectionProps) {
  return (
    <View className="w-full gap-6 bg-stone-900 p-6">
      <SectionHeading title={title} />
      <View className="gap-4">
        {values.map((value) => (
          <CoreValueCard
            description={value.description}
            icon={value.icon}
            key={value.id}
            title={value.title}
          />
        ))}
      </View>
    </View>
  );
}
