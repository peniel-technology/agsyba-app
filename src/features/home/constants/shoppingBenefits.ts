import { LockKeyhole, RefreshCcw, Truck } from 'lucide-react-native';

import type { ShoppingBenefit } from '@/features/home/types/shoppingBenefit';

export const shoppingBenefits = [
  {
    id: 'free-shipping',
    title: 'Free Shipping',
    description: 'Over AED 49',
    icon: Truck,
  },
  {
    id: 'easy-returns',
    title: 'Easy Returns',
    description: '30 day policy',
    icon: RefreshCcw,
  },
  {
    id: 'secure-checkout',
    title: '100% Secure',
    description: 'Safe checkout',
    icon: LockKeyhole,
  },
] as const satisfies readonly ShoppingBenefit[];
