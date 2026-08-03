import { useMemo, useState, type ReactNode, type Ref } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import type { TextInput as TextInputType, TextInputProps } from 'react-native';
import { Pressable, TextInput, View } from 'react-native';

import { Text } from '@/components/ui/Text';
import {
  deliveryAddressSchema,
  type DeliveryAddressValues,
} from '@/features/checkout/schemas/deliveryAddressSchema';
import { colors, spacing } from '@/theme';

type DeliveryAddressTextField = Exclude<keyof DeliveryAddressValues, 'addressType' | 'isDefault'>;

interface DeliveryAddressFieldProps extends Pick<
  TextInputProps,
  | 'autoCapitalize'
  | 'keyboardType'
  | 'multiline'
  | 'onSubmitEditing'
  | 'placeholder'
  | 'returnKeyType'
  | 'submitBehavior'
  | 'textContentType'
> {
  expandedContent?: ReactNode;
  inputRef?: Ref<TextInputType>;
  label: string;
  name: DeliveryAddressTextField;
  prefix?: ReactNode;
}

export function DeliveryAddressField({
  autoCapitalize = 'sentences',
  expandedContent,
  inputRef,
  keyboardType = 'default',
  label,
  multiline = false,
  name,
  onSubmitEditing,
  placeholder,
  prefix,
  returnKeyType = 'next',
  submitBehavior = 'submit',
  textContentType,
}: DeliveryAddressFieldProps) {
  const minimumInputHeight = multiline ? spacing[16] : spacing[10];
  const [contentHeight, setContentHeight] = useState<number>(minimumInputHeight);
  const { clearErrors, control } = useFormContext<DeliveryAddressValues>();
  const {
    field: { onBlur, onChange, value },
    fieldState: { error },
  } = useController({ control, name });
  const errorMessage = error?.message;
  const borderClassName = error ? 'border-error' : 'border-border';
  const inputStyle = useMemo(
    () => ({ height: Math.max(minimumInputHeight, contentHeight) }),
    [contentHeight, minimumInputHeight],
  );

  const handleChangeText = (nextValue: string) => {
    onChange(nextValue);

    if (deliveryAddressSchema.shape[name].safeParse(nextValue).success) {
      clearErrors(name);
    }
  };

  const input = (
    <TextInput
      accessibilityHint={errorMessage}
      accessibilityLabel={label}
      autoCapitalize={autoCapitalize}
      className={`${
        prefix ? 'flex-1 px-0' : `rounded-sm border bg-subtle-surface px-3 ${borderClassName}`
      } ${multiline ? 'py-2' : 'py-0'} text-sm leading-5 text-foreground`}
      keyboardType={keyboardType}
      multiline
      onBlur={onBlur}
      onChangeText={handleChangeText}
      onContentSizeChange={(event) => {
        setContentHeight(
          Math.max(minimumInputHeight, Math.ceil(event.nativeEvent.contentSize.height)),
        );
      }}
      onSubmitEditing={onSubmitEditing}
      placeholder={placeholder}
      placeholderTextColor={colors.muted}
      ref={inputRef}
      returnKeyType={returnKeyType}
      scrollEnabled={false}
      selectionColor={colors.brand}
      style={inputStyle}
      submitBehavior={submitBehavior}
      textContentType={textContentType}
      textAlignVertical={multiline ? 'top' : 'center'}
      underlineColorAndroid="transparent"
      value={value}
    />
  );

  return (
    <View className={`gap-2 ${prefix ? 'z-40' : ''}`}>
      <Text className="uppercase" tone="muted" variant="captionStrong">
        {label} *
      </Text>
      {prefix ? (
        <View className={`overflow-hidden rounded-sm border bg-subtle-surface ${borderClassName}`}>
          <View className="min-h-10 flex-row items-start px-3">
            <View className="mr-2 h-10 justify-center border-r border-border pr-2">{prefix}</View>
            {input}
          </View>
          {expandedContent ? (
            <Pressable
              accessible={false}
              className="border-t border-border"
              onPress={(event) => event?.stopPropagation()}
            >
              {expandedContent}
            </Pressable>
          ) : null}
        </View>
      ) : (
        input
      )}
      {errorMessage ? (
        <Text accessibilityRole="alert" tone="error" variant="detail">
          {errorMessage}
        </Text>
      ) : null}
    </View>
  );
}
