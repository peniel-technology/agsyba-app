import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Keyboard, Pressable, ScrollView } from 'react-native';

import { CheckoutProgress } from '@/components/cart/CheckoutProgress';
import { ShoppingBagHeader } from '@/components/cart/ShoppingBagHeader';
import { DeliverHereBar } from '@/components/checkout/DeliverHereBar';
import { OrderSummary } from '@/components/checkout/OrderSummary';
import { DeliveryAddressForm } from '@/components/forms/DeliveryAddressForm';
import { Screen } from '@/components/layouts';
import { StatusModal } from '@/components/modals/StatusModal';
import { routes } from '@/constants/routes';
import { deliveryAddressDefaults } from '@/features/checkout/constants/deliveryAddress';
import { useCheckoutSummary } from '@/features/checkout/hooks/useCheckoutSummary';
import {
  type LocationRecoveryAction,
  useCurrentLocation,
} from '@/features/checkout/hooks/useCurrentLocation';
import {
  deliveryAddressSchema,
  type DeliveryAddressValues,
} from '@/features/checkout/schemas/deliveryAddressSchema';
import { useCartStore } from '@/stores/useCartStore';

interface StatusModalState {
  locationRecovery?: LocationRecoveryAction;
  message: string;
  title: string;
  tone: 'error' | 'success';
}

export default function DeliveryAddressScreen() {
  const router = useRouter();
  const [isCountryPickerOpen, setIsCountryPickerOpen] = useState(false);
  const [statusModal, setStatusModal] = useState<StatusModalState | null>(null);
  const cartItemCount = useCartStore((state) => state.itemCount);
  const { discount, itemCount, selectedLines, subtotal, total } = useCheckoutSummary();
  const { findCurrentAddress, isLocating, recoverLocationAccess } = useCurrentLocation();
  const form = useForm<DeliveryAddressValues>({
    defaultValues: deliveryAddressDefaults,
    mode: 'onTouched',
    reValidateMode: 'onChange',
    resolver: zodResolver(deliveryAddressSchema),
  });

  const handleBackPress = useCallback(() => {
    if (router.canGoBack()) {
      router.back();
      return;
    }

    router.replace(routes.shoppingBag);
  }, [router]);

  const handleUseCurrentLocation = useCallback(async () => {
    Keyboard.dismiss();
    const result = await findCurrentAddress();

    if (result.error) {
      setStatusModal({
        locationRecovery: result.recovery,
        message: result.error,
        title: 'Location unavailable',
        tone: 'error',
      });
      return;
    }

    if (!result.address) {
      return;
    }

    const { addressLine1, addressLine2, city, postalCode, state } = result.address;

    if (addressLine1) {
      form.setValue('addressLine1', addressLine1, { shouldValidate: true });
    }
    if (addressLine2) {
      form.setValue('addressLine2', addressLine2, { shouldValidate: true });
    }
    if (city) {
      form.setValue('city', city, { shouldValidate: true });
    }
    if (postalCode) {
      form.setValue('postalCode', postalCode, { shouldValidate: true });
    }
    if (state) {
      form.setValue('state', state, { shouldValidate: true });
    }
  }, [findCurrentAddress, form]);

  const handleDeliverHere = form.handleSubmit((values) => {
    Keyboard.dismiss();
    setStatusModal({
      message: `Your order will be delivered to ${values.addressLine1}.`,
      title: 'Delivery address saved',
      tone: 'success',
    });
  });

  const handleCloseStatusModal = useCallback(() => {
    setStatusModal(null);
  }, []);

  const handleDismissCountryPicker = useCallback(() => {
    setIsCountryPickerOpen(false);
  }, []);

  const handleStatusModalAction = useCallback(async () => {
    const locationRecovery = statusModal?.locationRecovery;
    setStatusModal(null);

    if (!locationRecovery) {
      return;
    }

    const shouldRetry = await recoverLocationAccess(locationRecovery);

    if (shouldRetry) {
      await handleUseCurrentLocation();
    }
  }, [handleUseCurrentLocation, recoverLocationAccess, statusModal?.locationRecovery]);

  return (
    <Screen includeBottomInset={false} padded={false}>
      <FormProvider {...form}>
        <Pressable
          accessible={false}
          className="flex-1"
          onPress={isCountryPickerOpen ? handleDismissCountryPicker : undefined}
        >
          <ShoppingBagHeader
            itemCount={cartItemCount}
            onBackPress={handleBackPress}
            title="Add Delivery Address"
          />
          <CheckoutProgress activeStep="address" />
          <ScrollView
            className="flex-1 bg-background"
            contentContainerClassName="pb-3"
            keyboardDismissMode="on-drag"
            keyboardShouldPersistTaps="handled"
            nestedScrollEnabled
            scrollEnabled={!isCountryPickerOpen}
          >
            <Pressable
              accessible={false}
              onPress={isCountryPickerOpen ? handleDismissCountryPicker : undefined}
            >
              <DeliveryAddressForm
                isCountryPickerOpen={isCountryPickerOpen}
                isLocating={isLocating}
                onCountryPickerOpenChange={setIsCountryPickerOpen}
                onUseCurrentLocation={handleUseCurrentLocation}
              />
              <OrderSummary
                discount={discount}
                itemCount={itemCount}
                lines={selectedLines}
                subtotal={subtotal}
                total={total}
              />
            </Pressable>
          </ScrollView>
          <DeliverHereBar
            disabled={itemCount === 0}
            isSubmitting={form.formState.isSubmitting}
            onPress={handleDeliverHere}
          />
          <StatusModal
            isVisible={statusModal !== null}
            message={statusModal?.message ?? ''}
            onAction={handleStatusModalAction}
            onClose={handleCloseStatusModal}
            title={statusModal?.title ?? ''}
            tone={statusModal?.tone ?? 'error'}
          />
        </Pressable>
      </FormProvider>
    </Screen>
  );
}
