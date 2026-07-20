import { render } from '@testing-library/react-native';

import { ShoppingBenefits } from '@/features/home/components/ShoppingBenefits';
import { shoppingBenefits } from '@/features/home/constants/shoppingBenefits';

jest.mock('lucide-react-native', () => ({
  LockKeyhole: 'LockKeyhole',
  RefreshCcw: 'RefreshCcw',
  Truck: 'Truck',
}));

describe('ShoppingBenefits', () => {
  it('renders each shopping benefit with an accessible description', () => {
    const { getByLabelText, getByText } = render(<ShoppingBenefits benefits={shoppingBenefits} />);

    expect(getByLabelText('Free Shipping. Over AED 49')).toBeTruthy();
    expect(getByLabelText('Easy Returns. 30 day policy')).toBeTruthy();
    expect(getByLabelText('100% Secure. Safe checkout')).toBeTruthy();
    expect(getByText('Safe checkout')).toBeTruthy();
  });
});
