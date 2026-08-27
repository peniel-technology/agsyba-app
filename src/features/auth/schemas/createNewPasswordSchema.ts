import { z } from 'zod';

export const createNewPasswordSchema = z
  .object({
    confirmPassword: z.string().min(1, 'Confirm your new password.'),
    token: z.string().trim().min(1, 'Open the password reset link from your email first.'),
    newPassword: z
      .string()
      .min(8, 'Password must be at least 8 characters.')
      .regex(/[A-Z]/, 'Add at least one uppercase letter.')
      .regex(/[a-z]/, 'Add at least one lowercase letter.')
      .regex(/\d/, 'Add at least one number.')
      .regex(/[^A-Za-z0-9]/, 'Add at least one special character.'),
  })
  .refine(({ confirmPassword, newPassword }) => confirmPassword === newPassword, {
    message: 'Passwords must match.',
    path: ['confirmPassword'],
  });

export type CreateNewPasswordFormValues = z.infer<typeof createNewPasswordSchema>;
