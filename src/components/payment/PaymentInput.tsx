import type { ComponentProps } from 'react';
import { memo } from 'react';

import { Input } from '@/components/ui/Input';

type InputProps = ComponentProps<typeof Input>;

interface PaymentInputProps extends Omit<InputProps, 'value' | 'onChangeText'> {
  value: string;
  onValueChange: (value: string) => void;
}

export const PaymentInput = memo(function PaymentInput({
  onValueChange,
  value,
  ...props
}: PaymentInputProps) {
  return <Input {...props} value={value} onChangeText={onValueChange} />;
});
