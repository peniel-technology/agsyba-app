export interface ReturnTimelineItem {
  date: string;
  description: string;
  isActive: boolean;
  title: string;
}

export const returnExchangeSuccessData = {
  estimatedRefund: 'AED 89.99',
  pickupDate: 'Wed, 22 May 2024',
  pickupTime: '12pm - 3pm',
  returnId: '#RT-2024-0893',
  timeline: [
    {
      date: 'Wed, 22 May 2024',
      description: 'Your return request has been received',
      isActive: true,
      title: 'Return Requested',
    },
    {
      date: 'Wed, 22 May 2024',
      description: 'Our courier will collect the item from your address',
      isActive: false,
      title: 'Item Pickup',
    },
    {
      date: '1-2 business days after pickup',
      description: 'Returned item will be inspected by our team',
      isActive: false,
      title: 'Quality Check',
    },
    {
      date: '5-7 business days after check',
      description: 'Refund initiated to original payment method',
      isActive: false,
      title: 'Refund Processed',
    },
  ] as const satisfies readonly ReturnTimelineItem[],
} as const;
