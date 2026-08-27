import { z } from 'zod';

const passwordMessage =
  'Password must be at least 8 characters and include uppercase, lowercase, number, and special character.';

const passwordSchema = z
  .string()
  .min(8, passwordMessage)
  .regex(/[A-Z]/, passwordMessage)
  .regex(/[a-z]/, passwordMessage)
  .regex(/[0-9]/, passwordMessage)
  .regex(/[^A-Za-z0-9]/, passwordMessage);

const phoneSchema = z
  .string()
  .trim()
  .min(1, 'Mobile number is required.')
  .refine((value) => {
    const digits = value.replace(/\D/g, '');
    return digits.length >= 7 && digits.length <= 15;
  }, 'Enter a valid mobile number.');

export const registerSchema = z
  .object({
    acceptedTerms: z.boolean().refine((accepted) => accepted, {
      message: 'Please accept the Terms & Conditions and Privacy Policy.',
    }),
    confirmPassword: z.string().min(1, 'Confirm password is required.'),
    email: z.string().trim().min(1, 'Email is required.').email('Enter a valid email address.'),
    fullName: z.string().trim().min(2, 'Enter your full name.'),
    password: passwordSchema,
    phone: phoneSchema,
    phoneCountry: z.string().trim().min(2, 'Select a country calling code.'),
  })
  .refine(({ confirmPassword, password }) => confirmPassword === password, {
    message: 'Passwords must match.',
    path: ['confirmPassword'],
  });

export type RegisterFormValues = z.infer<typeof registerSchema>;
