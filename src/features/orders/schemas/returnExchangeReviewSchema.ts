import { z } from 'zod';

export const returnExchangeReviewSchema = z.object({
  acceptedTerms: z.boolean().refine((value) => value, {
    message: 'Confirm that the item is in its original condition.',
  }),
});

export type ReturnExchangeReviewValues = z.infer<typeof returnExchangeReviewSchema>;
