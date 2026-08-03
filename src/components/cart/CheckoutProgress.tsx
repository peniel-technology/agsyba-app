import { Check } from 'lucide-react-native';
import { View } from 'react-native';

import { Text } from '@/components/ui/Text';
import { colors, iconSizes, iconStrokeWidths } from '@/theme';

export type CheckoutStep = 'cart' | 'address' | 'payment';

interface CheckoutProgressProps {
  activeStep: CheckoutStep;
}

const checkoutSteps = [
  { id: 'cart', label: 'CART' },
  { id: 'address', label: 'ADDRESS' },
  { id: 'payment', label: 'PAYMENT' },
] as const satisfies readonly { id: CheckoutStep; label: string }[];

export function CheckoutProgress({ activeStep }: CheckoutProgressProps) {
  const activeStepIndex = checkoutSteps.findIndex((step) => step.id === activeStep);

  return (
    <View
      accessibilityLabel={`Checkout step: ${activeStep}`}
      className="flex-row items-center justify-center gap-2 border-b border-subtle-border bg-surface px-6 py-3.5"
    >
      {checkoutSteps.map((step, index) => {
        const isCompleted = index < activeStepIndex;
        const isHighlighted = isCompleted || step.id === activeStep;

        return (
          <View className="flex-row items-center gap-2" key={step.id}>
            {index > 0 ? (
              <Text className="tracking-widest" tone="muted" variant="captionMedium">
                • • •
              </Text>
            ) : null}
            <View className="flex-row items-center gap-1">
              {isCompleted ? (
                <Check
                  color={colors.brand}
                  size={iconSizes.small}
                  strokeWidth={iconStrokeWidths.emphasized}
                />
              ) : null}
              <Text
                tone={isHighlighted ? 'brand' : 'muted'}
                variant={isHighlighted ? 'captionStrong' : 'captionMedium'}
              >
                {step.label}
              </Text>
            </View>
          </View>
        );
      })}
    </View>
  );
}
