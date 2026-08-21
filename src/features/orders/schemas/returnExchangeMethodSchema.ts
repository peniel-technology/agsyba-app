import { z } from 'zod';

export const returnExchangeMethodSchema = z
  .object({
    method: z.enum(['home-pickup', 'drop-store', 'self-ship']),
    pickupDate: z.string(),
    pickupTimeSlot: z.enum(['9am-12pm', '12pm-3pm', '3pm-6pm']),
  })
  .superRefine((values, context) => {
    if (values.method === 'home-pickup' && values.pickupDate.length === 0) {
      context.addIssue({
        code: 'custom',
        message: 'Select a pickup date.',
        path: ['pickupDate'],
      });
    }
  });

export type ReturnExchangeMethodValues = z.infer<typeof returnExchangeMethodSchema>;
