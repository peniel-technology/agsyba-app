import { fireEvent, render } from '@testing-library/react-native';

import { ProductRatingsReviews } from '@/features/products/components/detail/ProductRatingsReviews';
import type { ProductRatingSummary, ProductReview } from '@/features/products/types/productDetail';

jest.mock('expo-image', () => ({ Image: 'ExpoImage' }));
jest.mock('lucide-react-native', () => ({
  ChevronLeft: 'ChevronLeft',
  ChevronRight: 'ChevronRight',
  Star: 'Star',
  X: 'X',
}));

const summary: ProductRatingSummary = {
  average: 4.3,
  distribution: [
    { percentage: 65, stars: 5 },
    { percentage: 20, stars: 4 },
    { percentage: 8, stars: 3 },
    { percentage: 4, stars: 2 },
    { percentage: 3, stars: 1 },
  ],
  subtitle: 'Based on verified purchases',
  totalLabel: '2.4K ratings',
};

const reviews: readonly ProductReview[] = [
  {
    author: 'Aisha S.',
    date: 'Jul 12, 2025',
    id: 'aisha',
    images: [
      { accessibilityLabel: 'Aisha dress front review', id: 'front', source: 1 },
      { accessibilityLabel: 'Aisha dress side review', id: 'side', source: 2 },
    ],
    initials: 'AS',
    rating: 4,
    text: 'Beautiful fit and soft floral print.',
    verifiedPurchase: true,
  },
  {
    author: 'Rohan M.',
    date: 'Jun 28, 2025',
    id: 'rohan',
    images: [{ accessibilityLabel: 'Rohan fabric review', id: 'fabric', source: 3 }],
    initials: 'RM',
    rating: 3,
    text: 'Lightweight material and quick delivery.',
    verifiedPurchase: true,
  },
  {
    author: 'Meera K.',
    date: 'Jun 16, 2025',
    id: 'meera',
    images: [{ accessibilityLabel: 'Meera outfit review', id: 'outfit', source: 4 }],
    initials: 'MK',
    rating: 5,
    text: 'The color is exactly as shown.',
    verifiedPurchase: true,
  },
];

describe('ProductRatingsReviews', () => {
  it('renders the rating summary and expands the review list', () => {
    const { getByLabelText, getByText, queryByText } = render(
      <ProductRatingsReviews reviews={reviews} summary={summary} />,
    );

    expect(getByText('4.3')).toBeTruthy();
    expect(getByText('2.4K ratings')).toBeTruthy();
    expect(getByLabelText('5 star ratings: 65%')).toBeTruthy();
    expect(getByText('Aisha S.')).toBeTruthy();
    expect(getByText('Rohan M.')).toBeTruthy();
    expect(queryByText('Meera K.')).toBeNull();

    fireEvent.press(getByLabelText('View All Reviews'));

    expect(getByText('Meera K.')).toBeTruthy();
    expect(getByLabelText('Show Fewer Reviews')).toBeTruthy();
  });

  it('opens customer photos and navigates between multiple review images', () => {
    const { getByLabelText, getByText } = render(
      <ProductRatingsReviews reviews={reviews} summary={summary} />,
    );

    fireEvent.press(getByLabelText('Open Aisha dress front review'));

    expect(getByText('Customer Photos')).toBeTruthy();
    expect(getByText('1 of 2')).toBeTruthy();
    expect(getByText('1 / 2')).toBeTruthy();
    fireEvent.press(getByLabelText('Show next review image'));
    expect(getByText('2 of 2')).toBeTruthy();
    expect(getByText('2 / 2')).toBeTruthy();

    fireEvent.press(getByLabelText('Close review image viewer'));
  });
});
