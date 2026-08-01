import { View } from 'react-native';

import { Text } from '@/components/ui/Text';

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
  return (
    <View
      accessibilityLabel={`Checkout step: ${activeStep}`}
      className="flex-row items-center justify-center gap-2 border-b border-subtle-border bg-surface px-6 py-3.5"
    >
      {checkoutSteps.map((step, index) => (
        <View className="flex-row items-center gap-2" key={step.id}>
          {index > 0 ? (
            <Text className="tracking-widest" tone="muted" variant="captionMedium">
              • • • •
            </Text>
          ) : null}
          <Text
            tone={step.id === activeStep ? 'brand' : 'muted'}
            variant={step.id === activeStep ? 'captionStrong' : 'captionMedium'}
          >
            {step.label}
          </Text>
        </View>
      ))}
    </View>
  );
}
