import { Minus, Plus } from 'lucide-react-native';
import { memo } from 'react';
import { Pressable, View } from 'react-native';

import { Text } from '@/components/ui/Text';
import { colors } from '@/theme/colors';

interface FAQAccordionProps {
  title: string;
  description: string;
  expanded: boolean;
  onPress: () => void;
}

export const FAQAccordion = memo(function FAQAccordion({
  title,
  description,
  expanded,
  onPress,
}: FAQAccordionProps) {
  return (
    <View className="self-stretch overflow-hidden rounded-lg border border-zinc-100 bg-white">
      <Pressable
        accessibilityRole="button"
        accessibilityState={{ expanded }}
        className="flex-1 flex-row items-start justify-between px-5 py-4"
        onPress={onPress}
      >
        <Text className="flex-1 text-base font-manrope-bold leading-5 text-neutral-900">
          {title}
        </Text>
        <View className="ml-2 pt-0.5">
          {expanded ? (
            <Minus color={colors.neutral900} size={18} strokeWidth={1.8} />
          ) : (
            <Plus color={colors.neutral900} size={18} strokeWidth={1.8} />
          )}
        </View>
      </Pressable>
      {expanded ? (
        <View className="border-t border-zinc-100 px-5 pb-5 pt-3">
          <Text className="text-xs font-manrope leading-5 text-neutral-500">{description}</Text>
        </View>
      ) : null}
    </View>
  );
});
