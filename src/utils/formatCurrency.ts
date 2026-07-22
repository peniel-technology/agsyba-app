import type { Money } from '@/types/product';

export function formatCurrency({ amount, currency }: Money): string {
  return new Intl.NumberFormat('en-AE', {
    currency,
    currencyDisplay: 'code',
    minimumFractionDigits: 2,
    style: 'currency',
  })
    .format(Math.max(0, amount))
    .replace(/\u00a0/g, ' ');
}
