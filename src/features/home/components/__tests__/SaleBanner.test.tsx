import { fireEvent, render } from '@testing-library/react-native';

import { SaleBanner } from '@/features/home/components/SaleBanner';
import { salePromotionBanner } from '@/features/home/constants/salePromotionBanner';

jest.mock('expo-image', () => ({ Image: 'ExpoImage' }));
jest.mock('expo-linear-gradient', () => ({ LinearGradient: 'LinearGradient' }));

describe('SaleBanner', () => {
  it('renders sale content and invokes its action', () => {
    const onPress = jest.fn();
    const { getByLabelText, getByText } = render(
      <SaleBanner content={salePromotionBanner} onPress={onPress} />,
    );

    fireEvent.press(getByLabelText('Shop Sale: Up to 50% Off'));

    expect(getByText('End of season sale on selected items')).toBeTruthy();
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
