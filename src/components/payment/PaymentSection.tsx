import type { ReactNode } from 'react';
import { memo } from 'react';
import { View } from 'react-native';

interface PaymentSectionProps {
  children: ReactNode;
  className?: string;
}

export const PaymentSection = memo(function PaymentSection({
  children,
  className = '',
}: PaymentSectionProps) {
  return <View className={`gap-3 ${className}`}>{children}</View>;
});
