import { render } from '@testing-library/react-native';

import { ProductDetailSummary } from '@/features/products/components/detail/ProductDetailSummary';
import { blushFloralWrapMidiDress } from '@/features/products/constants/blushFloralWrapMidiDress';

jest.mock('lucide-react-native', () => ({ Star: 'Star' }));

describe('ProductDetailSummary', () => {
  it('renders product pricing, discount, rating, and reviews', () => {
    const { getByText } = render(<ProductDetailSummary product={blushFloralWrapMidiDress} />);

    expect(getByText('Blush Floral Wrap Midi Dress')).toBeTruthy();
    expect(getByText('AED 892.00')).toBeTruthy();
    expect(getByText('AED 1,200.00')).toBeTruthy();
    expect(getByText('25% OFF')).toBeTruthy();
    expect(getByText('4.8')).toBeTruthy();
    expect(getByText('48 Reviews')).toBeTruthy();
  });
});
