import { Text } from '@/components/ui/Text';
import { type ReactNode } from 'react';
import { View } from 'react-native';

export interface ContactInfoItemProps {
  icon: ReactNode;
  label: string;
  value: string;
  valueColor?: string;
}

export function ContactInfoItem({ icon, label, value, valueColor }: ContactInfoItemProps) {
  const isSmallValueText = label === 'OUR ADDRESS' || label === 'WORKING HOURS';
  const hasValueMediumWeight = label === 'EMAIL US' || label === 'WORKING HOURS';
  const valueToneClass = valueColor === 'primary' ? 'text-red-500' : 'text-neutral-900';
  const valueSizeClass = isSmallValueText ? 'text-xs' : 'text-sm';
  const valueWeightClass = hasValueMediumWeight ? 'font-medium' : 'font-normal';

  return (
    <View className="self-stretch flex-row items-start gap-4">
      <View className="size-9 items-center justify-center rounded-2xl bg-white shadow-md">
        {icon}
      </View>
      <View className="flex-1 flex-col items-start gap-1">
        <Text className="font-manrope justify-start text-xs font-bold uppercase text-neutral-500">
          {label}
        </Text>
        <Text
          className={`font-manrope self-stretch justify-start ${valueToneClass} ${valueSizeClass} ${valueWeightClass}`}
        >
          {value}
        </Text>
      </View>
    </View>
  );
}
