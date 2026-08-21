export interface CouponOffer {
  code: string;
  description: string;
  validUntil: string;
}

export const availableCoupons = [
  {
    code: 'WELCOME10',
    description: 'Flat 10% off on your first order. Min. purchase AED 50.',
    validUntil: '31 Dec 2024',
  },
  {
    code: 'STYLE30',
    description: '30% off on orders above AED 200. Max discount AED 100.',
    validUntil: '15 Apr 2024',
  },
  {
    code: 'FREESHIP',
    description: 'Free shipping on any order, no minimum.',
    validUntil: '30 Jun 2024',
  },
] as const satisfies readonly CouponOffer[];

export const expiredCoupons = [
  {
    code: 'SAVE15',
    description: 'Get 15% off on selected categories.',
    validUntil: '28 Feb 2024',
  },
] as const satisfies readonly CouponOffer[];
