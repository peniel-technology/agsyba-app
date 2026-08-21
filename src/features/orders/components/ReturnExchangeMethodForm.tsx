import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { Alert, Pressable, View } from 'react-native';

import { Text } from '@/components/ui/Text';
import { ReturnMethodCards } from '@/features/orders/components/ReturnMethodCards';
import { ReturnPickupAddressCard } from '@/features/orders/components/ReturnPickupAddressCard';
import { ReturnPickupDateField } from '@/features/orders/components/ReturnPickupDateField';
import { ReturnTimeSlotSelector } from '@/features/orders/components/ReturnTimeSlotSelector';
import type {
  PickupTimeSlot,
  ReturnMethod,
} from '@/features/orders/constants/returnExchangeMethodData';
import {
  returnExchangeMethodSchema,
  type ReturnExchangeMethodValues,
} from '@/features/orders/schemas/returnExchangeMethodSchema';

interface ReturnExchangeMethodFormProps {
  onBack: () => void;
  onConfirm: (values: ReturnExchangeMethodValues) => void;
}

export function ReturnExchangeMethodForm({ onBack, onConfirm }: ReturnExchangeMethodFormProps) {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<ReturnExchangeMethodValues>({
    defaultValues: {
      method: 'home-pickup',
      pickupDate: '',
      pickupTimeSlot: '12pm-3pm',
    },
    mode: 'onTouched',
    resolver: zodResolver(returnExchangeMethodSchema),
  });
  const selectedMethod = useWatch({ control, name: 'method' });

  const handleDatePress = (onChange: (value: string) => void) => {
    Alert.alert('Preferred Pickup Date', 'Choose a pickup date', [
      { onPress: () => onChange('19 May 2024'), text: '19 May 2024' },
      { onPress: () => onChange('20 May 2024'), text: '20 May 2024' },
      { onPress: () => onChange('21 May 2024'), text: '21 May 2024' },
      { style: 'cancel', text: 'Cancel' },
    ]);
  };

  const handleEditAddress = () => {
    Alert.alert('Edit Address', 'Address editing will be available soon.');
  };

  const handleAddAddress = () => {
    Alert.alert('Add New Address', 'Address management will be available soon.');
  };

  return (
    <View className="gap-5">
      <View className="gap-2.5">
        <Text variant="label">How would you like to return?</Text>
        <Controller
          control={control}
          name="method"
          render={({ field }) => (
            <ReturnMethodCards
              onChange={(value: ReturnMethod) => field.onChange(value)}
              value={field.value}
            />
          )}
        />
      </View>

      {selectedMethod === 'home-pickup' ? (
        <>
          <View className="gap-3">
            <Text variant="bodyStrong">Schedule Pickup</Text>
            <Controller
              control={control}
              name="pickupDate"
              render={({ field }) => (
                <ReturnPickupDateField
                  error={errors.pickupDate?.message}
                  onPress={() => handleDatePress(field.onChange)}
                  value={field.value}
                />
              )}
            />
            <Controller
              control={control}
              name="pickupTimeSlot"
              render={({ field }) => (
                <ReturnTimeSlotSelector
                  onChange={(value: PickupTimeSlot) => field.onChange(value)}
                  value={field.value}
                />
              )}
            />
          </View>

          <ReturnPickupAddressCard
            onAddAddressPress={handleAddAddress}
            onEditPress={handleEditAddress}
          />
        </>
      ) : null}

      <View className="rounded-md bg-subtle-surface p-3">
        <Text tone="muted" variant="caption">
          Please ensure the item is packed securely. Use the original packaging if possible.
        </Text>
      </View>

      <View className="flex-row gap-3 pt-2.5">
        <Pressable
          accessibilityLabel="Go back to return reason"
          accessibilityRole="button"
          className="h-11 flex-1 items-center justify-center rounded-sm border border-border active:bg-subtle-surface"
          onPress={onBack}
        >
          <Text tone="muted" variant="label">
            BACK
          </Text>
        </Pressable>
        <Pressable
          accessibilityLabel="Confirm return method"
          accessibilityRole="button"
          className="h-11 flex-1 items-center justify-center rounded-sm bg-foreground active:opacity-70"
          onPress={() => void handleSubmit(onConfirm)()}
        >
          <Text className="text-center" tone="brandForeground" variant="captionStrong">
            CONFIRM METHOD
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
