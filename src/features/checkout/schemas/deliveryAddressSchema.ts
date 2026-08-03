import { z } from 'zod';

export const deliveryAddressSchema = z.object({
  addressLine1: z.string().trim().min(3, 'Enter a valid house, building, or street'),
  addressLine2: z.string().trim().min(2, 'Enter a valid locality or area'),
  addressType: z.enum(['home', 'work', 'other']),
  city: z.string().trim().min(2, 'Enter a valid city'),
  countryCallingCode: z
    .string()
    .trim()
    .regex(/^\+\d{1,4}$/, 'Select a valid country calling code'),
  countryCode: z
    .string()
    .trim()
    .regex(/^[A-Z]{2}$/, 'Select a valid country'),
  fullName: z.string().trim().min(2, 'Enter your full name'),
  isDefault: z.boolean(),
  mobileNumber: z
    .string()
    .trim()
    .regex(/^\d{7,12}$/, 'Enter a valid mobile number'),
  postalCode: z
    .string()
    .trim()
    .min(3, 'Enter a valid pincode or ZIP')
    .max(12, 'Pincode or ZIP is too long'),
  state: z.string().trim().min(2, 'Enter a valid state'),
});

export type DeliveryAddressValues = z.infer<typeof deliveryAddressSchema>;
