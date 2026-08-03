import { deliveryAddressDefaults } from '@/features/checkout/constants/deliveryAddress';
import {
  deliveryAddressSchema,
  type DeliveryAddressValues,
} from '@/features/checkout/schemas/deliveryAddressSchema';

const validAddress: DeliveryAddressValues = {
  addressLine1: '12 Market Street',
  addressLine2: 'Central District',
  addressType: 'home',
  city: 'Dubai',
  countryCallingCode: '+971',
  countryCode: 'AE',
  fullName: 'Test Customer',
  isDefault: true,
  mobileNumber: '501234567',
  postalCode: '12345',
  state: 'Dubai',
};

describe('deliveryAddressSchema', () => {
  it('accepts a complete delivery address', () => {
    expect(deliveryAddressSchema.safeParse(validAddress).success).toBe(true);
  });

  it('rejects an invalid mobile number and missing address', () => {
    const result = deliveryAddressSchema.safeParse({
      ...validAddress,
      addressLine1: '',
      mobileNumber: '123',
    });

    expect(result.success).toBe(false);
  });

  it('starts with empty values instead of sample customer data', () => {
    expect(deliveryAddressDefaults).toMatchObject({
      addressLine1: '',
      addressLine2: '',
      city: '',
      countryCallingCode: '+971',
      countryCode: 'AE',
      fullName: '',
      mobileNumber: '',
      postalCode: '',
      state: '',
    });
  });
});
