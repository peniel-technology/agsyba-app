import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { Pressable, View } from 'react-native';

import { Text } from '@/components/ui/Text';
import { ReturnConfirmationCheckbox } from '@/features/orders/components/ReturnConfirmationCheckbox';
import {
  returnExchangeReviewSchema,
  type ReturnExchangeReviewValues,
} from '@/features/orders/schemas/returnExchangeReviewSchema';

interface ReturnExchangeReviewFormProps {
  onBack: () => void;
  onSubmit: (values: ReturnExchangeReviewValues) => void;
}

export function ReturnExchangeReviewForm({ onBack, onSubmit }: ReturnExchangeReviewFormProps) {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<ReturnExchangeReviewValues>({
    defaultValues: { acceptedTerms: false },
    mode: 'onTouched',
    resolver: zodResolver(returnExchangeReviewSchema),
  });

  return (
    <View className="gap-5">
      <Controller
        control={control}
        name="acceptedTerms"
        render={({ field }) => (
          <ReturnConfirmationCheckbox
            checked={field.value}
            error={errors.acceptedTerms?.message}
            onToggle={() => field.onChange(!field.value)}
          />
        )}
      />

      <View className="flex-row gap-3 pt-2.5">
        <Pressable
          accessibilityLabel="Go back to return method"
          accessibilityRole="button"
          className="h-11 flex-1 items-center justify-center rounded-sm border border-border active:bg-subtle-surface"
          onPress={onBack}
        >
          <Text tone="muted" variant="label">
            BACK
          </Text>
        </Pressable>
        <Pressable
          accessibilityLabel="Submit return request"
          accessibilityRole="button"
          className="h-11 flex-1 items-center justify-center rounded-sm bg-order-action active:opacity-70"
          onPress={() => void handleSubmit(onSubmit)()}
        >
          <Text className="text-center" tone="brandForeground" variant="captionStrong">
            SUBMIT REQUEST
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
