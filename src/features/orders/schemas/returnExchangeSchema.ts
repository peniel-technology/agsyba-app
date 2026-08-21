import { z } from 'zod';

export const returnExchangeSchema = z.object({
  action: z.enum(['refund', 'exchange']),
  comments: z.string().max(500, 'Keep comments under 500 characters.'),
  condition: z.enum(['unused', 'tried-on', 'damaged']),
  reason: z.enum([
    'wrong-size-fit',
    'defective-damaged',
    'not-as-described',
    'changed-my-mind',
    'quality-issues',
  ]),
});

export type ReturnExchangeFormValues = z.infer<typeof returnExchangeSchema>;
