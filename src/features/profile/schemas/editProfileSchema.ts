import { z } from 'zod';

const nameSchema = z.string().trim().max(80);
const phoneSchema = z
  .string()
  .trim()
  .refine((value) => !value || /^[0-9\s().-]+$/.test(value), 'Enter a valid phone number.')
  .refine((value) => !value || value.replace(/\D/g, '').length >= 7, 'Enter a valid phone number.');

export const editProfileSchema = z
  .object({
    day: z.string(),
    firstName: nameSchema,
    gender: z.enum(['Male', 'Female', 'Other']),
    lastName: nameSchema,
    month: z.string(),
    phone: phoneSchema,
    phoneCountry: z.string().min(1),
    year: z.string(),
  })
  .superRefine((values, context) => {
    const hasDatePart = Boolean(values.day || values.month || values.year);
    const hasCompleteDate = Boolean(values.day && values.month && values.year);

    if (hasDatePart && !hasCompleteDate) {
      context.addIssue({
        code: 'custom',
        message: 'Please complete your date of birth.',
        path: ['day'],
      });
      return;
    }

    if (!hasCompleteDate) {
      return;
    }

    const date = new Date(Number(values.year), Number(values.month) - 1, Number(values.day));
    const isValidDate =
      date.getFullYear() === Number(values.year) &&
      date.getMonth() === Number(values.month) - 1 &&
      date.getDate() === Number(values.day);

    if (!isValidDate || date > new Date()) {
      context.addIssue({
        code: 'custom',
        message: 'Enter a valid date of birth.',
        path: ['day'],
      });
    }
  });

export type EditProfileFormValues = z.infer<typeof editProfileSchema>;
