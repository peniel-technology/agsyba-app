import { z } from 'zod';

export const contactFormSchema = z.object({
  agreement: z.boolean().refine((value) => value, {
    message: 'Please accept the Privacy Policy and Terms of Service.',
  }),
  email: z.string().trim().email('Enter a valid email address.'),
  firstName: z
    .string()
    .trim()
    .min(1, 'Enter your first name.')
    .max(50, 'Keep your name under 50 characters.'),
  lastName: z
    .string()
    .trim()
    .min(1, 'Enter your last name.')
    .max(50, 'Keep your name under 50 characters.'),
  message: z
    .string()
    .trim()
    .min(10, 'Please write at least 10 characters.')
    .max(1000, 'Keep your message under 1,000 characters.'),
  phone: z
    .string()
    .trim()
    .regex(/^[+\d][\d\s().-]{6,19}$/, 'Enter a valid phone number.')
    .refine((value) => {
      const digitCount = value.replace(/\D/g, '').length;

      return digitCount >= 7 && digitCount <= 15;
    }, 'Enter a valid phone number.'),
  subject: z.string().trim().min(1, 'Select a subject.'),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
