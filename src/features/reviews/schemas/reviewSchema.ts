import { z } from 'zod';

export const reviewSchema = z.object({
  detail: z
    .string()
    .trim()
    .min(10, 'Please write at least 10 characters.')
    .max(1000, 'Keep your review under 1,000 characters.'),
  recommendation: z.enum(['yes', 'no']),
  title: z
    .string()
    .trim()
    .min(3, 'Please add a short review title.')
    .max(80, 'Keep your title under 80 characters.'),
});

export type ReviewFormValues = z.infer<typeof reviewSchema>;
