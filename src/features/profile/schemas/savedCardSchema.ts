import { z } from 'zod';

export const savedCardSchema = z.object({
  cardHolderName: z.string().trim().min(2, 'Enter the name on your card'),
  cardNumber: z.string().regex(/^(?:\d{4} ?){3}\d{4}$/, 'Enter a valid 16-digit card number'),
  cvv: z.string().regex(/^\d{3,4}$/, 'Enter a valid CVV'),
  expiry: z.string().regex(/^(0[1-9]|1[0-2])\s*\/\s*\d{2}$/, 'Use MM / YY'),
});

export type SavedCardFormValues = z.infer<typeof savedCardSchema>;
