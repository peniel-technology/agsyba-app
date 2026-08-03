import type { DeliveryAddressValues } from '@/features/checkout/schemas/deliveryAddressSchema';

export const deliveryAddressDefaults: DeliveryAddressValues = {
  addressLine1: '',
  addressLine2: '',
  addressType: 'home',
  city: '',
  countryCallingCode: '+971',
  countryCode: 'AE',
  fullName: '',
  isDefault: true,
  mobileNumber: '',
  postalCode: '',
  state: '',
};
