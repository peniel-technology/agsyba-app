import { fireEvent, render } from '@testing-library/react-native';

import { PromotionalBanner } from '@/features/home/components/PromotionalBanner';
import { promotionBanner } from '@/features/home/constants/promotionBanner';

jest.mock('expo-image', () => ({ Image: 'ExpoImage' }));
jest.mock('expo-linear-gradient', () => ({ LinearGradient: 'LinearGradient' }));

describe('PromotionalBanner', () => {
  it('renders promotion content and invokes its action', () => {
    const onPress = jest.fn();
    const { getByLabelText, getByText } = render(
      <PromotionalBanner content={promotionBanner} onPress={onPress} />,
    );

    fireEvent.press(getByLabelText('Shop Now: Glam Your Daily Look'));

    expect(getByText('Explore our curated collection of statement pieces')).toBeTruthy();
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('disables the action until a destination is provided', () => {
    const { getByLabelText } = render(<PromotionalBanner content={promotionBanner} />);

    expect(getByLabelText('Shop Now: Glam Your Daily Look')).toBeDisabled();
  });
});
