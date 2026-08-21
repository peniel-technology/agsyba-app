import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { useState } from 'react';
import { Pressable, View } from 'react-native';

import { Text } from '@/components/ui/Text';
import { SavedCardCheckbox } from '@/features/profile/components/SavedCardCheckbox';
import { SavedCardField } from '@/features/profile/components/SavedCardField';
import {
  savedCardSchema,
  type SavedCardFormValues,
} from '@/features/profile/schemas/savedCardSchema';

interface SavedCardFormProps {
  onSubmit: (values: SavedCardFormValues) => void;
}

export function SavedCardForm({ onSubmit }: SavedCardFormProps) {
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<SavedCardFormValues>({
    defaultValues: {
      cardHolderName: '',
      cardNumber: '',
      cvv: '',
      expiry: '',
    },
    mode: 'onTouched',
    resolver: zodResolver(savedCardSchema),
  });
  const [isSaveForFuture, setIsSaveForFuture] = useState(true);

  const handleFormSubmit = (values: SavedCardFormValues) => {
    onSubmit(values);
    reset();
    setIsSaveForFuture(true);
  };

  return (
    <View className="gap-5 pb-4 pt-2">
      <Text variant="title">Add a New Card</Text>

      <Controller
        control={control}
        name="cardNumber"
        render={({ field }) => (
          <SavedCardField
            autoCapitalize="characters"
            autoCorrect={false}
            error={errors.cardNumber?.message}
            keyboardType="number-pad"
            label="Card Number"
            maxLength={19}
            onBlur={field.onBlur}
            onChangeText={field.onChange}
            placeholder="1234 5678 9012 3456"
            value={field.value}
          />
        )}
      />

      <Controller
        control={control}
        name="cardHolderName"
        render={({ field }) => (
          <SavedCardField
            autoCapitalize="words"
            autoCorrect={false}
            error={errors.cardHolderName?.message}
            label="Name on Card"
            onBlur={field.onBlur}
            onChangeText={field.onChange}
            placeholder="Sarah Lawson"
            value={field.value}
          />
        )}
      />

      <View className="flex-row gap-4">
        <View className="flex-1">
          <Controller
            control={control}
            name="expiry"
            render={({ field }) => (
              <SavedCardField
                autoCapitalize="none"
                autoCorrect={false}
                error={errors.expiry?.message}
                keyboardType="number-pad"
                label="Expiry Date"
                maxLength={7}
                onBlur={field.onBlur}
                onChangeText={field.onChange}
                placeholder="MM / YY"
                value={field.value}
              />
            )}
          />
        </View>
        <View className="flex-1">
          <Controller
            control={control}
            name="cvv"
            render={({ field }) => (
              <SavedCardField
                autoCapitalize="none"
                autoCorrect={false}
                error={errors.cvv?.message}
                keyboardType="number-pad"
                label="CVV"
                maxLength={4}
                onBlur={field.onBlur}
                onChangeText={field.onChange}
                placeholder="•••"
                secureTextEntry
                value={field.value}
              />
            )}
          />
        </View>
      </View>

      <SavedCardCheckbox
        checked={isSaveForFuture}
        onToggle={() => setIsSaveForFuture((value) => !value)}
      />

      <Pressable
        accessibilityLabel="Save card"
        accessibilityRole="button"
        className="items-center justify-center rounded-sm bg-order-action py-3 active:opacity-70"
        onPress={() => void handleSubmit(handleFormSubmit)()}
      >
        <Text tone="brandForeground" variant="bodyStrong">
          Save Card
        </Text>
      </Pressable>
    </View>
  );
}
