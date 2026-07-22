import { fireEvent, render } from '@testing-library/react-native';

import { FlashSaleBanner } from '@/features/home/components/FlashSaleBanner';
import { flashSale } from '@/features/home/constants/flashSale';

jest.mock('lucide-react-native', () => ({
  ChevronRight: 'ChevronRight',
  Zap: 'Zap',
}));

describe('FlashSaleBanner', () => {
  it('renders sale content and invokes its action', () => {
    const onPress = jest.fn();
    const { getByLabelText, getByText } = render(
      <FlashSaleBanner onPress={onPress} sale={flashSale} />,
    );

    fireEvent.press(getByLabelText('Flash Sale: Up to 50% Off'));

    expect(getByText('Limited time offer')).toBeTruthy();
    expect(getByText('02')).toBeTruthy();
    expect(getByText('56')).toBeTruthy();
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('disables the banner until a destination is provided', () => {
    const { getByLabelText } = render(<FlashSaleBanner sale={flashSale} />);

    expect(getByLabelText('Flash Sale: Up to 50% Off')).toBeDisabled();
  });
});
