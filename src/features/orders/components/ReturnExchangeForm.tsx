import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { Alert, Pressable, StyleSheet, TextInput, View } from 'react-native';

import { Text } from '@/components/ui/Text';
import { ReturnActionCards } from '@/features/orders/components/ReturnActionCards';
import { ReturnConditionSelector } from '@/features/orders/components/ReturnConditionSelector';
import { ReturnEvidenceUpload } from '@/features/orders/components/ReturnEvidenceUpload';
import { ReturnPolicyNotice } from '@/features/orders/components/ReturnPolicyNotice';
import { ReturnReasonChips } from '@/features/orders/components/ReturnReasonChips';
import type {
  ReturnAction,
  ReturnCondition,
  ReturnReason,
} from '@/features/orders/constants/returnExchangeData';
import {
  returnExchangeSchema,
  type ReturnExchangeFormValues,
} from '@/features/orders/schemas/returnExchangeSchema';
import { colors } from '@/theme';

interface ReturnExchangeFormProps {
  onCancel: () => void;
  onSubmit: (values: ReturnExchangeFormValues) => void;
}

const styles = StyleSheet.create({
  commentsInput: {
    height: 64,
    textAlignVertical: 'top',
  },
});

export function ReturnExchangeForm({ onCancel, onSubmit }: ReturnExchangeFormProps) {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<ReturnExchangeFormValues>({
    defaultValues: {
      action: 'refund',
      comments: '',
      condition: 'unused',
      reason: 'wrong-size-fit',
    },
    mode: 'onTouched',
    resolver: zodResolver(returnExchangeSchema),
  });

  const handleEvidencePress = () => {
    Alert.alert(
      'Upload Evidence',
      'Photo and video selection will be available when uploads are connected.',
    );
  };

  return (
    <View className="gap-5">
      <View className="gap-2.5">
        <Text variant="label">Select item condition</Text>
        <Controller
          control={control}
          name="condition"
          render={({ field }) => (
            <ReturnConditionSelector
              onChange={(value: ReturnCondition) => field.onChange(value)}
              value={field.value}
            />
          )}
        />
      </View>

      <View className="gap-2.5">
        <Text variant="label">Why are you returning this item?</Text>
        <Controller
          control={control}
          name="reason"
          render={({ field }) => (
            <ReturnReasonChips
              onChange={(value: ReturnReason) => field.onChange(value)}
              value={field.value}
            />
          )}
        />
      </View>

      <View className="gap-2">
        <Text variant="captionStrong">Additional Comments (Optional)</Text>
        <Controller
          control={control}
          name="comments"
          render={({ field }) => (
            <TextInput
              accessibilityLabel="Additional comments"
              className={`rounded-sm border bg-surface px-3 py-3 font-manrope text-xs text-foreground ${
                errors.comments ? 'border-error' : 'border-border'
              }`}
              multiline
              onBlur={field.onBlur}
              onChangeText={field.onChange}
              placeholder="Tell us more about the issue..."
              placeholderTextColor={colors.muted}
              style={styles.commentsInput}
              textAlignVertical="top"
              value={field.value}
            />
          )}
        />
        {errors.comments?.message ? (
          <Text accessibilityRole="alert" tone="error" variant="detail">
            {errors.comments.message}
          </Text>
        ) : null}
      </View>

      <View className="gap-3">
        <Text className="font-manrope-bold" variant="label">
          Select Action
        </Text>
        <Controller
          control={control}
          name="action"
          render={({ field }) => (
            <ReturnActionCards
              onChange={(value: ReturnAction) => field.onChange(value)}
              value={field.value}
            />
          )}
        />
      </View>

      <View className="gap-2">
        <Text variant="label">Upload Evidence (Optional)</Text>
        <ReturnEvidenceUpload onPress={handleEvidencePress} />
      </View>

      <ReturnPolicyNotice />

      <View className="flex-row gap-3 pt-2.5">
        <Pressable
          accessibilityLabel="Cancel return request"
          accessibilityRole="button"
          className="h-11 flex-1 items-center justify-center rounded-sm border border-muted active:bg-subtle-surface"
          onPress={onCancel}
        >
          <Text tone="muted" variant="label">
            CANCEL
          </Text>
        </Pressable>
        <Pressable
          accessibilityLabel="Continue to return method"
          accessibilityRole="button"
          className="h-11 flex-1 items-center justify-center rounded-sm bg-foreground active:opacity-70"
          onPress={() => void handleSubmit(onSubmit)()}
        >
          <Text tone="brandForeground" variant="label">
            NEXT
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
