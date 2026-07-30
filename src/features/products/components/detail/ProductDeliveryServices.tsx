import { CreditCard, PackageCheck, RefreshCcw, Truck, type LucideIcon } from 'lucide-react-native';
import { useState } from 'react';
import { Pressable, TextInput, View } from 'react-native';

import { Text } from '@/components/ui/Text';
import type { ProductService, ProductServiceIcon } from '@/features/products/types/productDetail';
import { colors, iconSizes, iconStrokeWidths } from '@/theme';

interface ProductDeliveryServicesProps {
  services: readonly ProductService[];
}

const serviceIcons = {
  delivery: Truck,
  payment: CreditCard,
  return: RefreshCcw,
  shipping: PackageCheck,
} as const satisfies Record<ProductServiceIcon, LucideIcon>;

const pincodeLength = 6;

export function ProductDeliveryServices({ services }: ProductDeliveryServicesProps) {
  const [deliveryMessage, setDeliveryMessage] = useState('');
  const [pincode, setPincode] = useState('');
  const handlePincodeChange = (value: string) => {
    setPincode(value.replace(/\D/g, '').slice(0, pincodeLength));
    setDeliveryMessage('');
  };
  const checkDelivery = () => {
    setDeliveryMessage(
      pincode.length === pincodeLength
        ? `Delivery is available for ${pincode}.`
        : 'Enter a valid 6-digit pincode.',
    );
  };

  return (
    <View className="gap-3 px-4">
      <Text className="uppercase" variant="captionStrong">
        Delivery & Services
      </Text>

      <View className="flex-row items-center gap-2 rounded-lg border border-subtle-border bg-surface p-3">
        <TextInput
          accessibilityLabel="Delivery pincode"
          autoComplete="postal-code"
          className="min-h-10 flex-1 text-sm text-foreground"
          keyboardType="number-pad"
          maxLength={pincodeLength}
          onChangeText={handlePincodeChange}
          onSubmitEditing={checkDelivery}
          placeholder="Enter pincode for delivery details"
          placeholderTextColor={colors.muted}
          returnKeyType="done"
          textContentType="postalCode"
          value={pincode}
        />
        <Pressable
          accessibilityLabel="Check delivery availability"
          accessibilityRole="button"
          className="min-h-10 items-center justify-center rounded-md bg-brand px-3 active:opacity-70"
          onPress={checkDelivery}
        >
          <Text className="uppercase" tone="brandForeground" variant="captionStrong">
            Check
          </Text>
        </Pressable>
      </View>

      {deliveryMessage.length > 0 ? (
        <Text
          accessibilityLiveRegion="polite"
          accessibilityRole="alert"
          tone={pincode.length === pincodeLength ? 'success' : 'error'}
          variant="caption"
        >
          {deliveryMessage}
        </Text>
      ) : null}

      <View className="flex-row flex-wrap gap-2">
        {services.map((service) => {
          const ServiceIcon = serviceIcons[service.icon];

          return (
            <View
              className="flex-row items-center gap-1.5 rounded-md border border-subtle-border bg-surface px-2 py-1.5"
              key={service.id}
            >
              <ServiceIcon
                accessible={false}
                color={colors.brand}
                size={iconSizes.compact}
                strokeWidth={iconStrokeWidths.subtle}
              />
              <Text tone="muted" variant="caption">
                {service.label}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}
