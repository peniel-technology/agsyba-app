import { View } from 'react-native';

import { Text } from '@/components/ui/Text';
import { Check } from 'lucide-react-native';
import { colors, iconSizes, iconStrokeWidths } from '@/theme';

const steps = ['Reason', 'Method', 'Review'] as const;

interface ReturnExchangeProgressProps {
  activeStep?: number;
}

export function ReturnExchangeProgress({ activeStep = 0 }: ReturnExchangeProgressProps) {
  return (
    <View className="flex-row items-center justify-center gap-2 border-b border-border bg-surface px-4 py-5">
      {steps.map((step, index) => {
        const isActive = index === activeStep;
        const isComplete = index < activeStep;
        const isHighlighted = isActive || isComplete;

        return (
          <View className="flex-row items-center gap-2" key={step}>
            <View
              accessibilityLabel={`${step} step${isActive ? ', current' : ''}`}
              className={`size-6 items-center justify-center rounded-full ${
                isHighlighted ? 'bg-order-action' : 'bg-border'
              }`}
            >
              {isComplete ? (
                <Check
                  accessible={false}
                  color={colors.brandForeground}
                  size={iconSizes.small}
                  strokeWidth={iconStrokeWidths.emphasized}
                />
              ) : (
                <Text tone={isHighlighted ? 'brandForeground' : 'muted'} variant="captionStrong">
                  {index + 1}
                </Text>
              )}
            </View>
            <Text tone={isHighlighted ? 'orderAction' : 'muted'} variant="captionStrong">
              {step}
            </Text>
            {index < steps.length - 1 ? (
              <View
                className={`h-px w-10 ${index < activeStep ? 'bg-order-action' : 'bg-border'}`}
              />
            ) : null}
          </View>
        );
      })}
    </View>
  );
}
