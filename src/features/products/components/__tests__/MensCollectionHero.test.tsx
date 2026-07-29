import { fireEvent, render } from '@testing-library/react-native';

import { MensCollectionHero } from '@/features/products/components/MensCollectionHero';

jest.mock('expo-image', () => ({ Image: 'ExpoImage' }));
jest.mock('lucide-react-native', () => ({ ChevronRight: 'ChevronRight' }));

describe('MensCollectionHero', () => {
  it('renders the collection content and invokes its action', () => {
    const onShopPress = jest.fn();
    const { getByLabelText, getByText } = render(<MensCollectionHero onShopPress={onShopPress} />);

    fireEvent.press(getByLabelText('Shop Now: Men’s New Season'));

    expect(getByText('New Season')).toBeTruthy();
    expect(getByText('Men’s New Season')).toBeTruthy();
    expect(getByText("Discover the latest trends in premium men's fashion.")).toBeTruthy();
    expect(onShopPress).toHaveBeenCalledTimes(1);
  });

  it('disables the action until a destination is provided', () => {
    const { getByLabelText } = render(<MensCollectionHero />);

    expect(getByLabelText('Shop Now: Men’s New Season')).toBeDisabled();
  });
});
