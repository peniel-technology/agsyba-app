import { fireEvent, render } from '@testing-library/react-native';

import { CategoryOfferBanner } from '@/features/products/components/CategoryOfferBanner';

jest.mock('expo-linear-gradient', () => ({ LinearGradient: 'LinearGradient' }));

describe('CategoryOfferBanner', () => {
  it('renders the offer and invokes its action', () => {
    const onPress = jest.fn();
    const { getByLabelText, getByText } = render(<CategoryOfferBanner onPress={onPress} />);

    fireEvent.press(getByLabelText('Shop the special offer'));

    expect(getByText('Special Offer')).toBeTruthy();
    expect(getByText('Up to 50% Off')).toBeTruthy();
    expect(getByText('On selected fashion & footwear categories')).toBeTruthy();
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('disables the action until a destination is available', () => {
    const { getByLabelText } = render(<CategoryOfferBanner />);

    expect(getByLabelText('Shop the special offer')).toBeDisabled();
  });
});
