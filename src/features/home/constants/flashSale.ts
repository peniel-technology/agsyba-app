import type { FlashSaleContent } from '@/features/home/types/flashSale';

export const flashSale = {
  countdown: {
    days: 2,
    hours: 18,
    minutes: 34,
    seconds: 56,
  },
  description: 'Limited time offer',
  eyebrow: 'Flash Sale',
  title: 'Up to 50% Off',
} as const satisfies FlashSaleContent;
